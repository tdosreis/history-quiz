"""The old map's paper (img/atelier/map-paper.webp): python3 tools/history/paper_gen.py

A seamless tile of aged rag paper: a warm cream, mottled at two scales the way
old paper browns unevenly, its laid lines (the faint ruled lines of a paper
mould), a few fibres and the brown specks of foxing. It is a tile, so every
pattern in it is periodic: the noise is shaped in Fourier space, which wraps.
The map lays it under everything; the sea and the lands are washes over it.
"""
import os
import numpy as np
from PIL import Image

N = 512
rng = np.random.default_rng(1607)          # the year of the Blaeu "Nova Totius Terrarum"


def noise(scale, power=1.0):
    """Periodic noise: nothing finer than about `scale` px, and a 1/f^power fall-off above that."""
    f = np.fft.fftfreq(N)[:, None] ** 2 + np.fft.fftfreq(N)[None, :] ** 2
    f = np.sqrt(f)
    f[0, 0] = 1
    amp = 1 / f ** power * np.exp(-(f * scale) ** 2 * 2) * (f > 1 / N * 0.9)
    spec = (rng.normal(size=(N, N)) + 1j * rng.normal(size=(N, N))) * amp
    n = np.real(np.fft.ifft2(spec))
    return (n - n.mean()) / (n.std() + 1e-9)


base = np.array([236, 222, 186], float)        # the cream of old rag paper
brown = np.array([168, 126, 70], float)          # what it browns towards
img = np.ones((N, N, 3)) * base
# the big blotches of uneven ageing, and a finer cloud on top
age = 0.6 * noise(90, 1.6) + 0.4 * noise(26, 1.2)
age = np.clip(age * 0.115, -0.2, 0.32)
img += (brown - base) * age[..., None]
# the grain of the sheet
grain = noise(1.2, 0.3)
img += grain[..., None] * 3.2
# laid lines: the mould's wires, close and horizontal, and the chain lines far apart
y = np.arange(N)[:, None]
x = np.arange(N)[None, :]
laid = 0.6 * np.sin(2 * np.pi * y / (N / 64)) + 0.4 * np.sin(2 * np.pi * y / (N / 32))
chain = np.exp(-((((x + 30) % (N // 4)) - N // 8) ** 2) / 18.0)
img -= (laid[..., None] * 1.6 + chain[..., None] * 4.5)
# fibres: short soft curved strokes, a shade darker
fib = np.zeros((N, N))
for _ in range(260):
    cx, cy = rng.uniform(0, N, 2)
    ang = rng.uniform(0, np.pi)
    length = rng.uniform(6, 22)
    bend = rng.uniform(-0.08, 0.08)
    for t in np.linspace(-length / 2, length / 2, int(length * 2)):
        a = ang + bend * t
        px = int(cx + np.cos(a) * t) % N
        py = int(cy + np.sin(a) * t) % N
        fib[py, px] += rng.uniform(0.4, 1.0)
blur = np.real(np.fft.ifft2(np.fft.fft2(fib) * np.exp(-2 * np.pi ** 2 * 0.6 ** 2 * (np.fft.fftfreq(N)[:, None] ** 2 + np.fft.fftfreq(N)[None, :] ** 2))))
img -= np.clip(blur, 0, 1.5)[..., None] * np.array([9, 11, 13])
# foxing: small rust-brown specks, a few with a faint halo
fox = np.zeros((N, N))
for _ in range(16):
    cx, cy = rng.uniform(0, N, 2)
    r = rng.uniform(0.6, 1.8)
    d2 = ((x - cx + N / 2) % N - N / 2) ** 2 + ((y - cy + N / 2) % N - N / 2) ** 2
    fox += np.exp(-d2 / (2 * r * r)) * rng.uniform(0.3, 0.8) + 0.12 * np.exp(-d2 / (2 * (r * 6) ** 2))
img += (np.array([158, 104, 52]) - img) * np.clip(fox, 0, 1)[..., None] * 0.42

img = np.clip(img, 0, 255).astype(np.uint8)
out = os.path.join(os.path.dirname(__file__), '..', '..', 'img', 'atelier', 'map-paper.webp')
Image.fromarray(img, 'RGB').save(out, 'WEBP', quality=72, method=6)
print('map paper', os.path.getsize(out), 'bytes')
