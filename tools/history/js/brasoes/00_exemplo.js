
/* reference brasões — the quality bar for the regional files */
Object.assign(BRASAO, {
  /* the lambda of Lakedaimon on a hoplite's bronze shield */
  esparta: { shape: 'hoplon', field: '#9E2321', rim: '#B98545', what: 'o Λ da Lacedemônia num hoplon',
    draw: () => `<path d="M30 13.5L44.5 45H39L30 24.5L21 45H15.5Z" fill="#D9AE62" stroke="#7A4F22" stroke-width="1.1" stroke-linejoin="round"/>` },

  /* the legion's red vexillum: SPQR in a laurel wreath */
  republica_romana: { shape: 'vexillum', field: '#A3201F', what: 'SPQR numa coroa de louros, num vexilo',
    draw: () => {
      const leaf = (x, y, a) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="2.9" transform="rotate(${a} ${x} ${y})"/>`;
      const side = [[19.5, 38, -30], [17.4, 33, -12], [17, 27.6, 4], [18.3, 22.4, 20], [20.8, 18, 36]];
      return `<g fill="${BK.gold}">${side.map(p => leaf(...p)).join('')}${side.map(([x, y, a]) => leaf(60 - x, y, -a)).join('')}</g>`
        + `<path d="M21 40Q30 45 39 40" fill="none" stroke="${BK.gold}" stroke-width="1.2"/>`
        + B.text(30, 33.2, 'SPQR', 8.4, BK.goldHi, 'letter-spacing=".3"');
    } },

  /* Tre Kronor: three gold crowns on azure */
  suecia: { shape: 'heater', field: '#1D4F96', what: 'as três coroas (Tre Kronor)',
    draw: () => {
      const crown = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">`
        + `<path d="M-6 3L-7 -4L-3.5 -1L0 -6L3.5 -1L7 -4L6 3Z" fill="${BK.gold}" stroke="${BK.goldLo}" stroke-width=".6" stroke-linejoin="round"/>`
        + `<rect x="-6" y="3" width="12" height="2.4" rx=".6" fill="${BK.gold}" stroke="${BK.goldLo}" stroke-width=".6"/>`
        + `<circle cx="0" cy="-6.4" r=".9" fill="${BK.goldHi}"/><circle cx="-7" cy="-4.4" r=".8" fill="${BK.goldHi}"/><circle cx="7" cy="-4.4" r=".8" fill="${BK.goldHi}"/></g>`;
      return crown(21.5, 22, 1) + crown(38.5, 22, 1) + crown(30, 38, 1);
    } },

  /* hammer and sickle under the star, gold on red */
  urss: { shape: 'banner', field: '#C8191F', what: 'a foice e o martelo sob a estrela',
    draw: () => B.star(16, 20.5, 3, 5, 'none', 1.3).replace('fill="none"', `fill="none" stroke="${BK.gold}" stroke-width=".9" stroke-linejoin="round"`)
      + `<path d="M21.2 26.4a7.3 7.3 0 1 1-8.6 9.6" fill="none" stroke="${BK.gold}" stroke-width="2.1" stroke-linecap="round"/>`
      + `<path d="M12.6 36l-1.8 2.2" stroke="${BK.gold}" stroke-width="2.4" stroke-linecap="round"/>`
      + `<path d="M11.6 27.4l9.2 9.6" stroke="${BK.gold}" stroke-width="1.8" stroke-linecap="round"/>`
      + `<path d="M9.6 29.6l4.2-4.2l1.7 1.7l-4.2 4.2z" fill="${BK.gold}"/>` },
});
