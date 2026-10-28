// What the album's maps (albmapgen.mjs) and the "Onde foi?" hemispheres (ondemapgen.mjs) both letter and draw.
export const round = (v, k = 10) => Math.round(v * k) / k;

/* the great mountain ranges, drawn as old maps drew them: a row of little shaded hills — [lat, lon] along each crest */
export const RANGES = [
  [[10, -73], [5, -76], [0, -78], [-5, -79], [-10, -77], [-15, -72], [-20, -68], [-25, -68], [-30, -69.8], [-35, -70.4], [-40, -71.4], [-45, -72], [-50, -73.2]],
  [[62, -132], [58, -126], [54, -121], [50, -116], [46, -112], [42, -108], [38, -106], [34, -106.5]],
  [[29, -107.5], [25.5, -105.5], [21.5, -103.8], [18.5, -100]], [[46, -70], [43, -73.8], [40, -77.5], [37, -81], [34.8, -84]],
  [[44.2, 7], [45.9, 7.6], [46.5, 9.8], [47, 11.8], [47.3, 13.8], [47.6, 15.6]], [[42.8, -1.6], [42.6, .6], [42.5, 2.4]],
  [[49.4, 19.4], [49, 22.4], [47.6, 24.8], [46, 25.6], [45.5, 23]], [[43.6, 40], [43, 43.2], [42.2, 46], [41.2, 48.6]],
  [[67, 65], [63, 59.6], [59, 59.2], [55, 58.8], [52, 58.2]], [[35.2, -1], [33.6, -4.6], [31.8, -7], [30.8, -9], [35.4, 6.4]],
  [[35.6, 74], [33, 77], [31, 80], [29.2, 83.4], [28, 86.6], [27.8, 89.8], [28.2, 93.4]], [[36, 69.6], [37.6, 73]],
  [[41.8, 76], [42.6, 80], [43.2, 84], [43.4, 88]], [[37.2, 44.8], [35.2, 46.6], [32.8, 48.6], [30.6, 51.2], [28.6, 53.6]],
  [[13, 38.2], [10.6, 38.8], [8.2, 38], [6.4, 37.4]], [[-28.6, 29.4], [-30.6, 28.2], [-32.4, 26.2]],
  [[69.4, 19.6], [67, 15.6], [64.4, 13.4], [62.4, 10.4], [60.4, 7.8]], [[44.2, 10.4], [43.2, 12.6], [41.8, 13.8], [40.4, 15.8], [39, 16.4]],
  [[49.6, 87.4], [47.4, 91], [45.6, 94.6]], [[-19.8, -42.6], [-22.4, -44.6], [-24.2, -47.4]], [[40.2, 21.4], [41.8, 20.4], [43.4, 18.6], [44.6, 16.6]],
  [[39.6, 33], [37.6, 35.4], [38.8, 39.8], [39.4, 42.6]], [[33.6, 36], [32, 35.4]], [[-14, 48.6], [-18.6, 47.2], [-22.6, 46.4]],
  [[34.6, 103], [32, 102.6], [28.6, 101.4], [25.6, 101.2]], [[37.4, 138.4], [36, 137.6], [35.2, 136.2]],
];
export function hillsOf(at, ok, step) {
  const out = [];
  for (const r of RANGES) {
    const pts = r.map(([la, lo]) => (ok([la, lo]) ? at([la, lo]) : null));
    let carry = 0, n = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      if (!a || !b) { carry = 0; continue; }
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const nx = -(b[1] - a[1]) / (d || 1), ny = (b[0] - a[0]) / (d || 1);
      for (let t = carry; t < d; t += step) {
        const f = t / d, i = n++, s = .72 + ((i * 7) % 6) * .1, off = ((i % 3) - 1) * step * .32;
        out.push([round(a[0] + (b[0] - a[0]) * f + nx * off), round(a[1] + (b[1] - a[1]) * f + ny * off), round(s, 100)]);
      }
      carry = (carry - d) % step; if (carry < 0) carry += step;
    }
  }
  return out;
}

/* the countries' names, as a Brazilian atlas prints them (Natural Earth's English → Portuguese) */
export const NAMES_PT = {
  'Fiji': 'Fiji', 'Tanzania': 'Tanzânia', 'W. Sahara': 'Saara Ocidental', 'Canada': 'Canadá', 'United States of America': 'Estados Unidos',
  'Kazakhstan': 'Cazaquistão', 'Uzbekistan': 'Uzbequistão', 'Papua New Guinea': 'Papua-Nova Guiné', 'Indonesia': 'Indonésia', 'Argentina': 'Argentina',
  'Chile': 'Chile', 'Dem. Rep. Congo': 'Congo', 'Somalia': 'Somália', 'Kenya': 'Quênia', 'Sudan': 'Sudão', 'Chad': 'Chade', 'Haiti': 'Haiti',
  'Dominican Rep.': 'Rep. Dominicana', 'Russia': 'Rússia', 'Bahamas': 'Bahamas', 'Falkland Is.': 'Malvinas', 'Norway': 'Noruega', 'Greenland': 'Groenlândia',
  'Fr. S. Antarctic Lands': '', 'Timor-Leste': 'Timor', 'South Africa': 'África do Sul', 'Lesotho': 'Lesoto', 'Mexico': 'México', 'Uruguay': 'Uruguai',
  'Brazil': 'Brasil', 'Bolivia': 'Bolívia', 'Peru': 'Peru', 'Colombia': 'Colômbia', 'Panama': 'Panamá', 'Costa Rica': 'Costa Rica', 'Nicaragua': 'Nicarágua',
  'Honduras': 'Honduras', 'El Salvador': 'El Salvador', 'Guatemala': 'Guatemala', 'Belize': 'Belize', 'Venezuela': 'Venezuela', 'Guyana': 'Guiana',
  'Suriname': 'Suriname', 'France': 'França', 'Ecuador': 'Equador', 'Puerto Rico': 'Porto Rico', 'Jamaica': 'Jamaica', 'Cuba': 'Cuba',
  'Zimbabwe': 'Zimbábue', 'Botswana': 'Botsuana', 'Namibia': 'Namíbia', 'Senegal': 'Senegal', 'Mali': 'Mali', 'Mauritania': 'Mauritânia', 'Benin': 'Benin',
  'Niger': 'Níger', 'Nigeria': 'Nigéria', 'Cameroon': 'Camarões', 'Togo': 'Togo', 'Ghana': 'Gana', "Côte d'Ivoire": 'Costa do Marfim', 'Guinea': 'Guiné',
  'Guinea-Bissau': 'Guiné-Bissau', 'Liberia': 'Libéria', 'Sierra Leone': 'Serra Leoa', 'Burkina Faso': 'Burkina Faso', 'Central African Rep.': 'Rep. Centro-Africana',
  'Congo': 'Congo', 'Gabon': 'Gabão', 'Eq. Guinea': 'Guiné Equatorial', 'Zambia': 'Zâmbia', 'Malawi': 'Malawi', 'Mozambique': 'Moçambique', 'eSwatini': 'Essuatíni',
  'Angola': 'Angola', 'Burundi': 'Burundi', 'Israel': 'Israel', 'Lebanon': 'Líbano', 'Madagascar': 'Madagascar', 'Palestine': 'Palestina', 'Gambia': 'Gâmbia',
  'Tunisia': 'Tunísia', 'Algeria': 'Argélia', 'Jordan': 'Jordânia', 'United Arab Emirates': 'Emirados Árabes', 'Qatar': 'Catar', 'Kuwait': 'Kuwait',
  'Iraq': 'Iraque', 'Oman': 'Omã', 'Vanuatu': 'Vanuatu', 'Cambodia': 'Camboja', 'Thailand': 'Tailândia', 'Laos': 'Laos', 'Myanmar': 'Mianmar',
  'Vietnam': 'Vietnã', 'North Korea': 'Coreia do Norte', 'South Korea': 'Coreia do Sul', 'Mongolia': 'Mongólia', 'India': 'Índia', 'Bangladesh': 'Bangladesh',
  'Bhutan': 'Butão', 'Nepal': 'Nepal', 'Pakistan': 'Paquistão', 'Afghanistan': 'Afeganistão', 'Tajikistan': 'Tajiquistão', 'Kyrgyzstan': 'Quirguistão',
  'Turkmenistan': 'Turcomenistão', 'Iran': 'Irã', 'Syria': 'Síria', 'Armenia': 'Armênia', 'Sweden': 'Suécia', 'Belarus': 'Bielorrússia', 'Ukraine': 'Ucrânia',
  'Poland': 'Polônia', 'Austria': 'Áustria', 'Hungary': 'Hungria', 'Moldova': 'Moldávia', 'Romania': 'Romênia', 'Lithuania': 'Lituânia', 'Latvia': 'Letônia',
  'Estonia': 'Estônia', 'Germany': 'Alemanha', 'Bulgaria': 'Bulgária', 'Greece': 'Grécia', 'Turkey': 'Turquia', 'Albania': 'Albânia', 'Croatia': 'Croácia',
  'Switzerland': 'Suíça', 'Luxembourg': 'Luxemburgo', 'Belgium': 'Bélgica', 'Netherlands': 'Holanda', 'Portugal': 'Portugal', 'Spain': 'Espanha',
  'Ireland': 'Irlanda', 'New Caledonia': 'Nova Caledônia', 'Solomon Is.': 'Ilhas Salomão', 'New Zealand': 'Nova Zelândia', 'Australia': 'Austrália',
  'Sri Lanka': 'Ceilão', 'China': 'China', 'Taiwan': 'Formosa', 'Italy': 'Itália', 'Denmark': 'Dinamarca', 'United Kingdom': 'Grã-Bretanha', 'Iceland': 'Islândia',
  'Azerbaijan': 'Azerbaijão', 'Georgia': 'Geórgia', 'Philippines': 'Filipinas', 'Malaysia': 'Malásia', 'Brunei': 'Brunei', 'Slovenia': 'Eslovênia',
  'Finland': 'Finlândia', 'Slovakia': 'Eslováquia', 'Czechia': 'Tchéquia', 'Eritrea': 'Eritreia', 'Japan': 'Japão', 'Paraguay': 'Paraguai', 'Yemen': 'Iêmen',
  'Saudi Arabia': 'Arábia', 'Antarctica': '', 'N. Cyprus': '', 'Cyprus': 'Chipre', 'Morocco': 'Marrocos', 'Egypt': 'Egito', 'Libya': 'Líbia',
  'Ethiopia': 'Etiópia', 'Djibouti': 'Djibuti', 'Somaliland': '', 'Uganda': 'Uganda', 'Rwanda': 'Ruanda', 'Bosnia and Herz.': 'Bósnia', 'Macedonia': 'Macedônia',
  'Serbia': 'Sérvia', 'Montenegro': 'Montenegro', 'Kosovo': 'Kosovo', 'Trinidad and Tobago': 'Trinidad', 'S. Sudan': 'Sudão do Sul',
};
/* a country's own point for its name: the spot of its largest landmass farthest from any of its coasts or borders */
export function labelPoint(ring) {
  const xs = ring.map(p => p[0]), ys = ring.map(p => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const inside = (x, y) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const dist = (x, y) => { let m = Infinity; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[j], [bx, by] = ring[i], dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
    const t = l ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l)) : 0;
    m = Math.min(m, Math.hypot(x - ax - t * dx, y - ay - t * dy)); } return m; };
  let best = [(x0 + x1) / 2, (y0 + y1) / 2], bd = -1;
  for (let i = 0; i <= 24; i++) for (let j = 0; j <= 24; j++) {
    const x = x0 + (x1 - x0) * i / 24, y = y0 + (y1 - y0) * j / 24;
    if (!inside(x, y)) continue;
    const d = dist(x, y); if (d > bd) { bd = d; best = [x, y]; }
  }
  return best;
}

/* ── the lettering: seas, oceans and the parts of the world, in the names the Portuguese charts gave them ──
   [text, lat, lon, size (px on a phone), kind: 'sea' | 'land' | 'big'] — 'big' is a part of the world, spaced out */
export const LABELS = {
  W: [['AMÉRICA', 42, -104, 11, 'big'], ['SETENTRIONAL', 34, -100, 7, 'land'], ['AMÉRICA', -8, -62, 11, 'big'], ['MERIDIONAL', -16, -60, 7, 'land'],
      ['Mar do Sul', -15, -128, 9, 'sea'], ['Mar Oceano', 28, -48, 9, 'sea']],
  E: [['EUROPA', 52, 24, 9, 'big'], ['ÁFRICA', 8, 20, 11, 'big'], ['ÁSIA', 48, 92, 12, 'big'], ['Mar das Índias', -27, 82, 9, 'sea'],
      ['Mar Oceano', -12, -8, 8, 'sea'], ['Mar da China', 13, 113, 7, 'sea'], ['TERRA AUSTRAL', -76, 70, 7, 'land'], ['NOVA HOLANDA', -26, 133, 6, 'land']],
  EU: [['EUROPA', 53, 26, 15, 'big'], ['Mar Oceano', 46, -18, 11, 'sea'], ['Mar do Norte', 56.5, 3.2, 8, 'sea'], ['Mar Báltico', 58, 19.6, 7, 'sea'],
       ['Mar Mediterrâneo', 35.6, 18, 9, 'sea'], ['Mar Negro', 43.2, 34.6, 7, 'sea'], ['ÁFRICA', 30, 6, 10, 'big'], ['Mar Cáspio', 42.5, 50.5, 6, 'sea']],
  AS: [['ÁSIA', 62, 96, 17, 'big'], ['TARTÁRIA', 47, 84, 8, 'land'], ['Mar da China', 15, 116, 9, 'sea'], ['Mar das Índias', 2, 78, 10, 'sea'], ['Golfo de Bengala', 15, 88, 7, 'sea'],
       ['Mar do Sul', 26, 150, 9, 'sea'], ['Mar da Arábia', 15, 64, 8, 'sea'], ['Mar do Japão', 41, 134, 6, 'sea']],
  AF: [['ÁFRICA', 6, 21, 17, 'big'], ['Mar Oceano', 2, -18, 11, 'sea'], ['Mar Oceano', 20, -30, 10, 'sea'], ['Mar das Índias', -18, 64, 11, 'sea'], ['Mar das Índias', -8, 58, 10, 'sea'], ['Mar Mediterrâneo', 34.3, 18, 8, 'sea'],
       ['Mar Vermelho', 20, 38.6, 6, 'sea'], ['ARÁBIA', 23, 46, 9, 'land'], ['Golfo Pérsico', 27, 51.5, 5.5, 'sea'], ['Mar da Etiópia', -24, 1, 8, 'sea']],
  AM: [['AMÉRICA', 44, -100, 16, 'big'], ['AMÉRICA', -10, -62, 16, 'big'], ['Mar do Sul', -9, -110, 12, 'sea'], ['Mar Oceano', 26, -50, 12, 'sea'],
       ['Mar das Antilhas', 14.6, -76, 7, 'sea'], ['Golfo do México', 24.6, -91, 7, 'sea'], ['Mar do Norte', 52, -42, 9, 'sea'], ['Mar Oceano', -32, -36, 10, 'sea']],
};
/* where a compass rose, a ship or a monster may sit (all at sea) — [piece, lat, lon, size as a fraction of the map's width] */
export const DECO = {
  W: [['rosa', 8, -140, .2], ['serpente', -38, -120, .32], ['caravela', 14, -38, .2], ['baleia', 50, -160, .2]],
  E: [['caravela', -34, -4, .2], ['baleia', -43, 64, .24], ['rosa', -46, 120, .17], ['serpente', -9, 84, .16]],
  EU: [['rosa', 44, -23, .2], ['caravela', 38, -15, .16], ['serpente', 66, -12, .26], ['baleia', 72, 22, .2], ['rosa', 61.5, -21, .17], ['caravela', 55.5, -24, .14],
       ['rosa', 34, -16, .16], ['baleia', 76, 30, .17], ['serpente', 63, -14, .18], ['caravela', 33.5, 19, .12]],
  AS: [['rosa', -2, 128, .18], ['caravela', 6, 92, .14], ['baleia', 28, 152, .17], ['serpente', 50, 152, .2], ['baleia', -26, 92, .18], ['serpente', -20, 72, .2]],
  AF: [['rosa', -6, -28, .16], ['caravela', -30, 8, .14], ['baleia', -34, 52, .2], ['serpente', 30, -34, .18]],
  AM: [['rosa', -24, -118, .18], ['caravela', 18, -48, .14], ['serpente', 34, -140, .22], ['baleia', -44, -24, .18]],
};
