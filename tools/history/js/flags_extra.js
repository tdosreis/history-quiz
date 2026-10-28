
/* The flags history needs that football did not: drawn on the same 9×6 field. */
const _H3 = (a, b, c) => _HORZ(a, b, c);
Object.assign(FLAGS, {
  USA: (() => {
    let s = `<rect width="9" height="6" fill="#fff"/>`;
    for (let i = 0; i < 7; i++) s += `<rect y="${(i * 2 * 6 / 13).toFixed(3)}" width="9" height="${(6 / 13).toFixed(3)}" fill="#B22234"/>`;
    s += `<rect width="3.9" height="3.23" fill="#3C3B6E"/>`;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++)
      s += `<circle cx="${(.42 + c * .76 + (r % 2) * .0).toFixed(2)}" cy="${(.4 + r * .72).toFixed(2)}" r=".15" fill="#fff"/>`;
    return s;
  })(),
  GRC: (() => {
    let s = `<rect width="9" height="6" fill="#0D5EAF"/>`;
    for (let i = 0; i < 4; i++) s += `<rect y="${(1.333 + i * 1.333).toFixed(3)}" width="9" height=".667" fill="#fff"/>`;
    s += `<rect width="3.333" height="3.333" fill="#0D5EAF"/><rect x="1.333" width=".667" height="3.333" fill="#fff"/><rect y="1.333" width="3.333" height=".667" fill="#fff"/>`;
    return s;
  })(),
  TUR: `<rect width="9" height="6" fill="#E30A17"/><circle cx="3.2" cy="3" r="1.5" fill="#fff"/><circle cx="3.65" cy="3" r="1.2" fill="#E30A17"/>` + _STAR(4.95, 3, .5, '#fff'),
  IRN: _H3('#239F40', '#fff', '#DA0000') + `<circle cx="4.5" cy="3" r=".5" fill="none" stroke="#DA0000" stroke-width=".18"/>`,
  IRQ: _H3('#CE1126', '#fff', '#000') + `<path d="M3.2 3h.7M4.2 3h.6M5.2 3h.7" stroke="#007A3D" stroke-width=".35"/>`,
  ISR: `<rect width="9" height="6" fill="#fff"/><rect y=".55" width="9" height=".75" fill="#0038B8"/><rect y="4.7" width="9" height=".75" fill="#0038B8"/>`
     + `<path d="M4.5 1.9 5.5 3.65H3.5ZM4.5 4.1 3.5 2.35H5.5Z" fill="none" stroke="#0038B8" stroke-width=".2"/>`,
  IND: _H3('#FF9933', '#fff', '#138808') + `<circle cx="4.5" cy="3" r=".78" fill="none" stroke="#000080" stroke-width=".13"/><circle cx="4.5" cy="3" r=".14" fill="#000080"/>`,
  CHN: `<rect width="9" height="6" fill="#DE2910"/>` + _STAR(1.5, 1.45, .9, '#FFDE00') + _STAR(3.2, .55, .3, '#FFDE00') + _STAR(3.8, 1.2, .3, '#FFDE00') + _STAR(3.8, 2.05, .3, '#FFDE00') + _STAR(3.2, 2.7, .3, '#FFDE00'),
  MNG: _VERT('#C4272F', '#015197', '#C4272F') + `<circle cx="1.5" cy="1.5" r=".4" fill="#F9CF02"/><path d="M1.5 2.1v2.6M.9 2.5h1.2M.9 4.7h1.2" stroke="#F9CF02" stroke-width=".28"/>`,
  TUN: `<rect width="9" height="6" fill="#E70013"/><circle cx="4.5" cy="3" r="1.7" fill="#fff"/><circle cx="4.4" cy="3" r="1.15" fill="#E70013"/><circle cx="4.7" cy="3" r=".92" fill="#fff"/>` + _STAR(4.85, 3, .5, '#E70013'),
  AUT: _H3('#ED2939', '#fff', '#ED2939'),
  CUB: `<rect width="9" height="6" fill="#002A8F"/><rect y="1.2" width="9" height="1.2" fill="#fff"/><rect y="3.6" width="9" height="1.2" fill="#fff"/>`
     + `<path d="M0 0 4 3 0 6Z" fill="#CF142B"/>` + _STAR(1.25, 3, .72, '#fff'),
  VEN: _H3('#FFCC00', '#00247D', '#CF142B') + Array.from({ length: 8 }, (_, i) => {
       const a = Math.PI * (1.1 + i * .115); return `<circle cx="${(4.5 + Math.cos(a) * 1.9).toFixed(2)}" cy="${(3.9 + Math.sin(a) * 1.9).toFixed(2)}" r=".15" fill="#fff"/>`; }).join(''),
  HAI: `<rect width="9" height="3" fill="#00209F"/><rect y="3" width="9" height="3" fill="#D21034"/><rect x="3.2" y="1.9" width="2.6" height="2.2" fill="#fff"/><circle cx="4.5" cy="3" r=".45" fill="#016A16"/>`,
  ZAF: `<rect width="9" height="3" fill="#E03C31"/><rect y="3" width="9" height="3" fill="#001489"/>`
     + `<path d="M0 0 3.7 3 0 6M3.7 3H9" fill="none" stroke="#fff" stroke-width="1.5"/>`
     + `<path d="M0 .1 3.2 3 0 5.9Z" fill="#FFB81C"/><path d="M0 .6 2.3 3 0 5.4Z" fill="#000"/>`
     + `<path d="M0 0 3.6 3 0 6M3.6 3H9" fill="none" stroke="#007749" stroke-width=".85"/>`,
  MLI: _VERT('#14B53A', '#FCD116', '#CE1126'),
  MAR: `<rect width="9" height="6" fill="#C1272D"/><path d="M4.5 1.4 5.3 4.4 3.1 2.5H5.9L3.7 4.4Z" fill="none" stroke="#006233" stroke-width=".18" stroke-linejoin="miter"/>`,
  UZB: `<rect width="9" height="2" fill="#0099B5"/><rect y="2" width="9" height="2" fill="#fff"/><rect y="4" width="9" height="2" fill="#1EB53A"/><rect y="1.9" width="9" height=".15" fill="#CE1126"/><rect y="3.95" width="9" height=".15" fill="#CE1126"/>`
     + `<circle cx="1.5" cy="1" r=".5" fill="#fff"/><circle cx="1.7" cy="1" r=".42" fill="#0099B5"/><circle cx="2.7" cy=".6" r=".1" fill="#fff"/><circle cx="3.1" cy="1" r=".1" fill="#fff"/><circle cx="2.7" cy="1.4" r=".1" fill="#fff"/>`,
  NPL: `<path d="M1.9 .2 7 3.15H3.7L7 5.85H1.9Z" fill="#DC143C" stroke="#003893" stroke-width=".28" stroke-linejoin="round"/>` + `<circle cx="2.9" cy="4.55" r=".38" fill="#fff"/><circle cx="2.9" cy="1.9" r=".28" fill="#fff"/>`,
  VNM: `<rect width="9" height="6" fill="#DA251D"/>` + _STAR(4.5, 3.05, 1.75, '#FFFF00'),
  CHE: `<rect width="9" height="6" fill="#DA291C"/><rect x="3.9" y=".9" width="1.2" height="4.2" fill="#fff"/><rect x="2.4" y="2.4" width="4.2" height="1.2" fill="#fff"/>`,
  SRB: _H3('#C6363C', '#0C4076', '#fff') + `<rect x="1.7" y="1.5" width="1.3" height="1.7" rx=".2" fill="#C6363C" stroke="#EDB92E" stroke-width=".14"/>`,
  MKD: `<rect width="9" height="6" fill="#D20000"/>` + Array.from({ length: 8 }, (_, i) => {
       const a = i * Math.PI / 4; return `<path d="M4.5 3L${(4.5 + Math.cos(a) * 6).toFixed(2)} ${(3 + Math.sin(a) * 6).toFixed(2)}" stroke="#FFE600" stroke-width=".4"/>`; }).join('')
     + `<circle cx="4.5" cy="3" r=".95" fill="#FFE600" stroke="#D20000" stroke-width=".2"/>`,
  ETH: _H3('#078930', '#FCDD09', '#DA121D') + `<circle cx="4.5" cy="3" r="1.05" fill="#0F47AF"/>` + _STAR(4.5, 3, .6, '#FCDD09'),
  AGO: `<rect width="9" height="3" fill="#CC092F"/><rect y="3" width="9" height="3" fill="#000"/><circle cx="4.5" cy="3" r=".95" fill="none" stroke="#FFCB00" stroke-width=".28"/>` + _STAR(4.5, 3, .5, '#FFCB00'),
  /* the places the chase runs through (js/ladrao.js) */
  SYR: _H3('#CE1126', '#fff', '#000') + _STAR(3.3, 3, .5, '#007A3D') + _STAR(5.7, 3, .5, '#007A3D'),
  BOL: _H3('#D52B1E', '#F9E300', '#007934'),
  LTU: _H3('#FDB913', '#006A44', '#C1272D'),
  BHS: _H3('#00778B', '#FFC72C', '#00778B') + `<path d="M0 0L3.9 3L0 6z" fill="#000"/>`,
  KAZ: `<rect width="9" height="6" fill="#00AFCA"/><rect x=".35" width=".32" height="6" fill="#FEC50C" opacity=".85"/><circle cx="4.7" cy="2.7" r=".85" fill="#FEC50C"/>`
     + Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI / 8; return `<path d="M${(4.7 + Math.cos(a) * 1.05).toFixed(2)} ${(2.7 + Math.sin(a) * 1.05).toFixed(2)}L${(4.7 + Math.cos(a) * 1.4).toFixed(2)} ${(2.7 + Math.sin(a) * 1.4).toFixed(2)}" stroke="#FEC50C" stroke-width=".16"/>`; }).join('')
     + `<path d="M3.4 4.6q1.3-.7 2.6 0" stroke="#FEC50C" stroke-width=".3" fill="none"/>`,
  BIH: `<rect width="9" height="6" fill="#002395"/><path d="M2.7 0H7V6z" fill="#FECB00"/>`
     + Array.from({ length: 8 }, (_, i) => `<circle cx="${(2.15 + i * .62).toFixed(2)}" cy="${(.3 + i * .78).toFixed(2)}" r=".19" fill="#fff"/>`).join(''),
  ECU: `<rect width="9" height="3" fill="#FFD100"/><rect y="3" width="9" height="1.5" fill="#034EA2"/><rect y="4.5" width="9" height="1.5" fill="#ED1C24"/><ellipse cx="4.5" cy="3" rx=".6" ry=".75" fill="#8B6B3D" stroke="#FFD100" stroke-width=".12"/>`,
  VAT: `<rect width="4.5" height="6" fill="#FFE000"/><rect x="4.5" width="4.5" height="6" fill="#fff"/><path d="M5.9 2.4l1.6 1.9M7.5 2.4L5.9 4.3" stroke="#C9A04E" stroke-width=".28" stroke-linecap="round"/><path d="M6.35 1.9h.7l-.35-.45z" fill="#C9A04E"/>`,
  SAU: `<rect width="9" height="6" fill="#006C35"/><path d="M2.3 2.4c.6-.3 1-.1 1.5-.3s.9.2 1.4-.1.9.1 1.5-.2" stroke="#fff" stroke-width=".42" fill="none" stroke-linecap="round"/><path d="M2.6 3.9h3.9l.35-.2" stroke="#fff" stroke-width=".22" fill="none"/>`,
  CAN: `<rect width="9" height="6" fill="#fff"/><rect width="2.25" height="6" fill="#D52B1E"/><rect x="6.75" width="2.25" height="6" fill="#D52B1E"/>`
     + `<path d="M4.5 1.1l.33.66.55-.22-.13.86.6-.5.12.5.55-.1-.3.8.25.13-1.0.82.12.38-.95-.12V4.7h-.28v-.42l-.95.12.12-.38-1-.82.25-.13-.3-.8.55.1.12-.5.6.5-.13-.86.55.22z" fill="#D52B1E"/>`,
});
