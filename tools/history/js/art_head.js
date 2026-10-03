/* ═══════════════════════════════════════════════════
   ART — drawn, flat, and a little bit of an old schoolbook
   The vignettes a question can carry when it is not about a face, a crest
   or a flag. Screen-printed scenes in the album's inks — ochre, burgundy,
   verdigris, parchment — with the one heavy outline, no gradients, no gloss.
═══════════════════════════════════════════════════ */
const NUM = i => String((i || 0) + 1).padStart(2, '0');
const FIG_FRAME = {};

const _INK = '#2A1D10';
const ART = {
  _frame(w, label, body, vb) {
    return `<svg viewBox="${vb || '0 0 120 80'}" width="${w || 120}" role="img" aria-label="${label}"
      style="display:block;max-width:100%;height:auto;">${body}</svg>`;
  },
  _g(body, sw) {
    return `<g stroke="${_INK}" stroke-width="${sw || 2}" stroke-linejoin="round" stroke-linecap="round">${body}</g>`;
  },

  column(w) {
    return this._frame(w, 'Templo grego', `
      <rect width="120" height="80" fill="#E9C98B"/>
      <circle cx="96" cy="18" r="10" fill="#F4E3B6"/>
      <rect y="62" width="120" height="18" fill="#C9A66B"/>
      ${this._g(`
        <path d="M14 30 L60 10 L106 30 Z" fill="#EFE3C8"/>
        <rect x="14" y="30" width="92" height="7" fill="#D9C9A4"/>
        <path d="M22 37h10v22H22zM42 37h10v22H42zM68 37h10v22H68zM88 37h10v22H88z" fill="#F4ECD8"/>
        <path d="M12 59h96v5H12zM8 64h104v5H8z" fill="#D9C9A4"/>
        <path d="M60 18 l-4 8h8z" fill="#7B1E3A"/>`)}
      <path d="M27 40v17M47 40v17M73 40v17M93 40v17" stroke="${_INK}" stroke-width="1" opacity=".35"/>`);
  },
  pyramid(w) {
    return this._frame(w, 'Pirâmides do Egito', `
      <rect width="120" height="80" fill="#F0D08A"/>
      <circle cx="26" cy="20" r="11" fill="#D9602E"/>
      <path d="M0 62 q30 -8 60 -2 t60 -4 V80 H0Z" fill="#D9B16B"/>
      ${this._g(`
        <path d="M44 62 L84 18 L124 62 Z" fill="#E8C47C"/>
        <path d="M84 18 L124 62 L98 62 Z" fill="#C9A057"/>
        <path d="M6 66 L38 34 L70 66 Z" fill="#E3BB70"/>
        <path d="M38 34 L70 66 L52 66 Z" fill="#C9A057"/>`)}
      <path d="M50 66h14M62 54h12M18 62h14M74 62h14" stroke="${_INK}" stroke-width="1" opacity=".3"/>`);
  },
  ship(w) {
    return this._frame(w, 'Caravela', `
      <rect width="120" height="80" fill="#BFD3D9"/>
      <rect y="52" width="120" height="28" fill="#4F7A94"/>
      <path d="M0 58 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#EAF2F4" stroke-width="2" fill="none"/>
      <path d="M0 68 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#6D95AD" stroke-width="2" fill="none"/>
      ${this._g(`
        <path d="M22 50 h76 q-6 12 -20 14 h-34 q-14 -2 -22 -14z" fill="#8A5A34"/>
        <path d="M58 12 V50" fill="none" stroke-width="2.4"/>
        <path d="M60 14 q24 6 24 26 H60z" fill="#F5EFE0"/>
        <path d="M56 18 q-20 6 -22 22 h22z" fill="#EFE3C8"/>
        <path d="M66 22 v12 M60 28 h12" stroke="#B3402F" stroke-width="3" fill="none"/>
        <path d="M58 12 l14 3 -14 3z" fill="#B3402F"/>`)}`);
  },
  castle(w) {
    return this._frame(w, 'Castelo medieval', `
      <rect width="120" height="80" fill="#A9BFCB"/>
      <path d="M0 60 q30 -14 60 -4 t60 -6 V80 H0Z" fill="#6E8C5A"/>
      ${this._g(`
        <path d="M30 62 V34 h6 v-5 h6 v5 h6 v-5 h6 v5 h6 v28z" fill="#C9BFA8"/>
        <path d="M70 62 V40 h6 v-5 h6 v5 h6 v-5 h6 v5 h6 v27z" fill="#B9AE97"/>
        <path d="M54 62 V26 h12 V16 l-6 -8 -6 8 V26" fill="#D6CCB5"/>
        <path d="M54 26 h12 V62 H54z" fill="#D6CCB5"/>
        <path d="M60 62 v-10 a5 5 0 0 1 10 0 v10z" fill="#4A3523"/>
        <path d="M60 8 v-6 l9 3 -9 3" fill="#7B1E3A"/>
        <path d="M16 66 H104" stroke-width="3" fill="none"/>`)}
      <path d="M36 44v6M82 50v6M60 34v8" stroke="${_INK}" stroke-width="2.4" stroke-linecap="round"/>`);
  },
  crown(w) {
    return this._frame(w, 'Coroa real', `
      <rect width="120" height="80" fill="#6B1F33"/>
      <circle cx="60" cy="40" r="30" fill="#7B2A40"/>
      ${this._g(`
        <path d="M26 56 L22 24 L42 40 L60 14 L78 40 L98 24 L94 56 Z" fill="#E3B341"/>
        <path d="M26 56 H94 V66 H26 Z" fill="#C8922C"/>
        <circle cx="22" cy="22" r="4" fill="#E9D18A"/><circle cx="60" cy="12" r="4.5" fill="#E9D18A"/><circle cx="98" cy="22" r="4" fill="#E9D18A"/>
        <circle cx="44" cy="61" r="3" fill="#B3402F"/><circle cx="60" cy="61" r="3.4" fill="#1F4E8C"/><circle cx="76" cy="61" r="3" fill="#B3402F"/>`)}`);
  },
  sword(w) {
    return this._frame(w, 'Espadas cruzadas', `
      <rect width="120" height="80" fill="#C9BFA8"/>
      <path d="M60 6 q26 4 36 14 v22 q0 18 -36 32 q-36 -14 -36 -32 V20 q10 -10 36 -14z" fill="#9E1B1B" stroke="${_INK}" stroke-width="2.4"/>
      <path d="M60 6 V74" stroke="#E3B341" stroke-width="3"/><path d="M24 36 H96" stroke="#E3B341" stroke-width="3"/>
      ${this._g(`
        <path d="M22 14 L98 70" fill="none" stroke="#DADDE0" stroke-width="6"/>
        <path d="M98 14 L22 70" fill="none" stroke="#DADDE0" stroke-width="6"/>
        <path d="M18 24 l12 -12 M102 24 l-12 -12" fill="none" stroke="#7B5B2A" stroke-width="5"/>
        <path d="M17 12 l10 10 M103 12 l-10 10" fill="none" stroke="#7B5B2A" stroke-width="4"/>`)}`);
  },
  scroll(w) {
    return this._frame(w, 'Pergaminho', `
      <rect width="120" height="80" fill="#D8C39A"/>
      ${this._g(`
        <path d="M24 14 h72 v50 q0 8 8 8 H34 q-10 0 -10 -10z" fill="#F4E9CC"/>
        <path d="M24 14 q-8 0 -8 8 t8 8 M96 64 q8 0 8 -8" fill="none"/>
        <path d="M16 22 q0 -8 8 -8 M104 72 q8 0 0 -8" fill="none"/>`)}
      <path d="M34 28h52M34 36h52M34 44h40M34 52h46" stroke="${_INK}" stroke-width="1.8" opacity=".55" stroke-linecap="round"/>
      <circle cx="84" cy="56" r="7" fill="#9E1B1B" stroke="${_INK}" stroke-width="1.8"/>
      <path d="M84 52v8M80 56h8" stroke="#F4E9CC" stroke-width="1.6"/>`);
  },
  book(w) {
    return this._frame(w, 'Livro aberto', `
      <rect width="120" height="80" fill="#7A2E1D"/>
      ${this._g(`
        <path d="M60 20 q-22 -8 -44 -2 v44 q22 -6 44 2z" fill="#F4E9CC"/>
        <path d="M60 20 q22 -8 44 -2 v44 q-22 -6 -44 2z" fill="#EFE3C8"/>
        <path d="M60 20 v44" fill="none"/>
        <path d="M24 28 q14 -3 28 1 M24 36 q14 -3 28 1 M24 44 q14 -3 28 1 M68 29 q14 -4 28 -1 M68 37 q14 -4 28 -1" fill="none" stroke-width="1.3" opacity=".5"/>
        <path d="M88 8 q10 8 -6 30 l-4 -2 q8 -16 10 -28z" fill="#F4E9CC"/>`)}`);
  },
  globe(w) {
    return this._frame(w, 'Globo terrestre', `
      <rect width="120" height="80" fill="#E4D6B4"/>
      ${this._g(`
        <circle cx="60" cy="36" r="26" fill="#5E8DA6"/>
        <path d="M44 22 q8 -6 14 0 q4 8 -4 12 q-6 -2 -6 6 q-8 -6 -4 -18z M64 38 q10 -4 12 6 q-2 10 -10 12 q-4 -8 -2 -18z" fill="#8FAE6B" stroke-width="1.6"/>
        <ellipse cx="60" cy="36" rx="11" ry="26" fill="none" stroke-width="1.2" opacity=".5"/>
        <path d="M34 36h52M38 24h44M38 48h44" fill="none" stroke-width="1.2" opacity=".5"/>
        <path d="M36 60 q24 14 48 0" fill="none" stroke-width="3"/>
        <path d="M54 66h12v6H54z" fill="#8A5A34"/>`)}`);
  },
  torch(w) {
    return this._frame(w, 'Tocha da liberdade', `
      <rect width="120" height="80" fill="#2B3A55"/>
      <circle cx="60" cy="30" r="24" fill="#3B4B69"/>
      ${this._g(`
        <path d="M60 4 q16 14 10 26 q8 -2 6 8 q-4 10 -16 10 q-12 0 -16 -10 q-2 -10 6 -8 q-6 -12 10 -26z" fill="#E8A33C"/>
        <path d="M60 18 q8 8 4 16 q-4 6 -8 0 q-2 -8 4 -16z" fill="#F6D66B" stroke-width="1.6"/>
        <path d="M44 48 h32 l-6 8 H50z" fill="#C8922C"/>
        <path d="M52 56 h16 l-3 20 H55z" fill="#8A5A34"/>`)}`);
  },
  cannon(w) {
    return this._frame(w, 'Canhão', `
      <rect width="120" height="80" fill="#C5CFD4"/>
      <circle cx="104" cy="30" r="10" fill="#9AA6AC"/><circle cx="112" cy="22" r="7" fill="#B2BCC1"/>
      <rect y="62" width="120" height="18" fill="#7A6A4C"/>
      ${this._g(`
        <path d="M18 40 L84 28 l4 14 L22 58z" fill="#3D3D44"/>
        <path d="M84 28 l8 -1 3 13 -7 2z" fill="#55555E"/>
        <circle cx="38" cy="62" r="13" fill="#8A5A34"/><circle cx="38" cy="62" r="4" fill="#4A3523"/>
        <path d="M38 49v26M25 62h26M29 53l18 18M47 53L29 71" stroke-width="1.4" fill="none"/>`)}`);
  },
  map(w) {
    return this._frame(w, 'Mapa antigo', `
      <rect width="120" height="80" fill="#D8C39A"/>
      ${this._g(`
        <path d="M10 14 L40 10 L72 16 L108 10 V68 L74 72 L40 66 L10 70z" fill="#EBDDB8"/>
        <path d="M26 30 q10 -10 20 -4 q6 8 -2 14 q-12 2 -18 -10z M62 44 q12 -10 26 -4 q6 10 -6 16 q-18 2 -20 -12z" fill="#B9C49A" stroke-width="1.6"/>`)}
      <path d="M22 56 q16 -18 34 -8 t40 -26" stroke="#9E1B1B" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
      <path d="M92 16l8 8m0 -8l-8 8" stroke="#9E1B1B" stroke-width="3" stroke-linecap="round"/>
      <circle cx="96" cy="58" r="8" fill="none" stroke="${_INK}" stroke-width="1.6"/><path d="M96 49v18M87 58h18" stroke="${_INK}" stroke-width="1.4"/>`);
  },
  hourglass(w) {
    return this._frame(w, 'Ampulheta', `
      <rect width="120" height="80" fill="#C7D2C0"/>
      ${this._g(`
        <path d="M38 8 h44 M38 72 h44" fill="none" stroke-width="5"/>
        <path d="M42 8 q0 24 18 32 q-18 8 -18 32 h36 q0 -24 -18 -32 q18 -8 18 -32z" fill="#F4ECD8"/>
        <path d="M46 14 h28 q-2 12 -14 20 q-12 -8 -14 -20z" fill="#E3B341" stroke-width="1.4"/>
        <path d="M60 40 v18 M48 72 q12 -16 24 0z" fill="#E3B341" stroke-width="1.4"/>`)}`);
  },
  trophy(w) {   /* the laurel */
    return this._frame(w, 'Coroa de louros', `
      <rect width="120" height="80" fill="#EBD9A3"/>
      ${this._g(`
        <path d="M60 68 C30 66 18 44 24 20 M60 68 C90 66 102 44 96 20" fill="none" stroke="#5B7F4E" stroke-width="4"/>
        <path d="M24 22 q-8 4 -8 12 q8 -2 8 -12z M20 38 q-8 4 -6 12 q8 -2 6 -12z M26 52 q-6 6 -2 12 q8 -4 2 -12z M96 22 q8 4 8 12 q-8 -2 -8 -12z M100 38 q8 4 6 12 q-8 -2 -6 -12z M94 52 q6 6 2 12 q-8 -4 -2 -12z" fill="#7BA05E" stroke-width="1.6"/>
        <path d="M60 22 l6 12 13 2 -10 9 3 13 -12 -7 -12 7 3 -13 -10 -9 13 -2z" fill="#E3B341"/>`)}`);
  },
  gear(w) {
    return this._frame(w, 'Engrenagem e chaminé', `
      <rect width="120" height="80" fill="#B9B3A5"/>
      <path d="M70 30 q8 -10 18 -6 q8 -12 22 -6" stroke="#8C877B" stroke-width="7" fill="none" stroke-linecap="round"/>
      ${this._g(`
        <path d="M82 70 V30 h12 v40z" fill="#9E4B33"/><path d="M80 30 h16 v6 H80z" fill="#6E3322"/>
        <circle cx="42" cy="44" r="22" fill="#6E6A61"/>
        <path d="M42 18 l4 6 h-8z M42 70 l4 -6 h-8z M16 44 l6 -4 v8z M68 44 l-6 -4 v8z M24 26 l8 2 -2 6z M60 62 l-8 -2 2 -6z M60 26 l-2 8 -6 -2z M24 62 l2 -8 6 2z" fill="#6E6A61"/>
        <circle cx="42" cy="44" r="9" fill="#B9B3A5"/><circle cx="42" cy="44" r="3" fill="${_INK}"/>`)}`);
  },
  rocket(w) {
    return this._frame(w, 'Foguete', `
      <rect width="120" height="80" fill="#1E2A4A"/>
      <g fill="#F4ECD8"><circle cx="14" cy="14" r="1.4"/><circle cx="40" cy="8" r="1"/><circle cx="96" cy="12" r="1.4"/><circle cx="108" cy="46" r="1"/><circle cx="22" cy="60" r="1.2"/><circle cx="78" cy="70" r="1"/></g>
      <circle cx="94" cy="58" r="14" fill="#C9BFA8"/><circle cx="98" cy="54" r="3" fill="#A59B84"/><circle cx="90" cy="64" r="2" fill="#A59B84"/>
      ${this._g(`
        <path d="M44 62 q-4 -22 8 -40 q12 18 8 40z" fill="#F4ECD8" transform="rotate(32 52 44)"/>
        <path d="M40 40 q8 -22 22 -22 q4 14 -8 36z" fill="#F4ECD8"/>
        <circle cx="52" cy="34" r="4.5" fill="#5E8DA6"/>
        <path d="M42 46 l-10 8 10 -2z M56 56 l-2 12 8 -8z" fill="#9E1B1B"/>
        <path d="M44 56 q-8 10 -16 16 q12 -2 20 -10z" fill="#E8A33C"/>`)}`);
  },
  flag(w) {
    return this._frame(w, 'Bandeira', `
      <rect width="120" height="80" fill="#BFD3D9"/>
      <rect y="64" width="120" height="16" fill="#7BA05E"/>
      ${this._g(`
        <path d="M30 70 V8" fill="none" stroke-width="3.4"/>
        <path d="M32 12 q18 -8 36 0 t36 0 V46 q-18 8 -36 0 t-36 0z" fill="#9E1B1B"/>
        <circle cx="30" cy="8" r="3" fill="#E3B341"/>`)}
      <path d="M52 22 l3 7 7 .6 -5.4 4.8 1.7 7 -6.3 -4 -6.3 4 1.7 -7 -5.4 -4.8 7 -.6z" fill="#E3B341"/>`);
  },
  bust(w) {   /* a marble head — "who am I" */
    return this._frame(w, 'Busto de mármore', `
      <rect width="120" height="80" fill="#D8C39A"/>
      <rect x="30" y="66" width="60" height="10" fill="#B9AE97" stroke="${_INK}" stroke-width="2"/>
      ${this._g(`
        <path d="M36 66 q-2 -10 10 -14 h28 q12 4 10 14z" fill="#E9E2D0"/>
        <path d="M46 52 v-6 h28 v6" fill="#E9E2D0"/>
        <path d="M44 26 q0 -16 16 -16 t16 16 v8 q0 16 -16 16 t-16 -16z" fill="#F1EADA"/>
        <path d="M42 24 q4 -12 18 -12 q16 0 18 12 q-8 -6 -18 -4 q-10 -2 -18 4z" fill="#CFC6B0"/>
        <path d="M52 32h4M64 32h4M60 34v6M55 44q5 3 10 0" fill="none" stroke-width="1.6"/>`)}`);
  },
};
