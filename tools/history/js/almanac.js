
/* ═══════════════════════════════════════════════════
   HOJE NA HISTÓRIA — the almanac on the cover

   One line of history for the day the app is opened: what happened on this
   date, with the face, flag or brasão of who it happened to. On a day the
   list has nothing for, it says what is coming next. Only dates that are
   beyond dispute; a birthday is left to the birthday editions.
   [month, day, year, text, picture] — picture is a figure id, a country
   code (FLAGS) or a polity id.
═══════════════════════════════════════════════════ */
const ALMANAC = [
  [1, 1, 1804, 'O Haiti declara sua independência, a primeira república fundada por ex-escravizados', 'HAI'],
  [1, 1, 1959, 'Batista foge de Cuba e os revolucionários de Sierra Maestra chegam ao poder', 'fidel'],
  [1, 9, 1822, 'Dia do Fico: o príncipe regente decide ficar no Brasil', 'dom_pedro_i'],
  [1, 25, 1554, 'Jesuítas fundam o colégio que dá origem à cidade de São Paulo', 'BRA'],
  [1, 27, 1945, 'Tropas soviéticas libertam o campo de Auschwitz', 'urss'],
  [2, 11, 1990, 'Nelson Mandela deixa a prisão depois de 27 anos', 'mandela'],
  [2, 24, 1891, 'É promulgada a primeira Constituição republicana do Brasil', 'deodoro'],
  [3, 1, 1565, 'Estácio de Sá funda a cidade do Rio de Janeiro', 'BRA'],
  [3, 12, 1930, 'Gandhi parte de Ahmedabad na Marcha do Sal', 'gandhi'],
  [3, 15, -44, 'Nos Idos de Março, Júlio César é assassinado no Senado', 'cesar'],
  [3, 25, 1824, 'D. Pedro I outorga a primeira Constituição do Brasil', 'dom_pedro_i'],
  [3, 29, 1549, 'Tomé de Sousa funda Salvador, a primeira capital do Brasil', 'BRA'],
  [4, 6, 1896, 'Abrem-se em Atenas os primeiros Jogos Olímpicos da era moderna', 'GRC'],
  [4, 9, 1865, 'A rendição em Appomattox encerra a Guerra de Secessão', 'lincoln'],
  [4, 12, 1961, 'Iuri Gagarin torna-se o primeiro ser humano a ir ao espaço', 'gagarin'],
  [4, 15, 1912, 'O Titanic afunda no Atlântico Norte em sua viagem inaugural', 'ENG'],
  [4, 21, 1792, 'Tiradentes é executado no Rio de Janeiro', 'tiradentes'],
  [4, 21, 1960, 'Brasília é inaugurada como nova capital do Brasil', 'jk'],
  [4, 22, 1500, 'A frota de Cabral avista o Monte Pascoal', 'cabral'],
  [4, 25, 1974, 'A Revolução dos Cravos derruba a ditadura em Portugal', 'POR'],
  [5, 8, 1945, 'A rendição alemã encerra a Segunda Guerra na Europa', 'churchill'],
  [5, 13, 1888, 'A Lei Áurea extingue a escravidão no Brasil', 'princesa_isabel'],
  [5, 20, 1498, 'Vasco da Gama chega a Calicute, na Índia, por mar', 'vasco_gama'],
  [5, 29, 1453, 'Constantinopla cai diante do sultão otomano', 'maome_ii'],
  [6, 6, 1944, 'Dia D: os Aliados desembarcam na Normandia', 'de_gaulle'],
  [6, 15, 1215, 'O rei da Inglaterra sela a Magna Carta em Runnymede', 'inglaterra'],
  [6, 18, 1815, 'Napoleão é derrotado em Waterloo', 'napoleao'],
  [6, 25, 1876, 'Sioux e cheienes vencem a cavalaria americana em Little Bighorn', 'touro_sentado'],
  [6, 28, 1914, 'O arquiduque Francisco Fernando é assassinado em Sarajevo', 'austria_hungria'],
  [6, 28, 1919, 'É assinado o Tratado de Versalhes', 'wilson'],
  [7, 4, 1776, 'As treze colônias aprovam a Declaração de Independência', 'jefferson'],
  [7, 14, 1789, 'O povo de Paris toma a Bastilha', 'FRA'],
  [7, 20, 1969, 'A Apollo 11 pousa na Lua', 'armstrong'],
  [7, 28, 1914, 'A Áustria-Hungria declara guerra à Sérvia: começa a Primeira Guerra', 'austria_hungria'],
  [8, 6, 1945, 'Uma bomba atômica é lançada sobre Hiroshima', 'JPN'],
  [8, 13, 1961, 'Começa a ser erguido o Muro de Berlim', 'GER'],
  [8, 15, 1947, 'A Índia torna-se independente do Império Britânico', 'gandhi'],
  [8, 24, 1954, 'Getúlio Vargas morre no Palácio do Catete', 'getulio'],
  [8, 28, 1963, 'Martin Luther King discursa na Marcha sobre Washington', 'mlk'],
  [9, 1, 1939, 'A Alemanha invade a Polônia', 'POL'],
  [9, 2, 1945, 'O Japão assina a rendição e termina a Segunda Guerra', 'JPN'],
  [9, 6, 1522, 'Os sobreviventes da expedição de Magalhães completam a primeira volta ao mundo', 'magalhaes'],
  [9, 7, 1822, 'D. Pedro proclama a independência do Brasil', 'dom_pedro_i'],
  [10, 4, 1957, 'A União Soviética lança o Sputnik, o primeiro satélite artificial', 'urss'],
  [10, 12, 1492, 'Colombo desembarca nas Bahamas', 'colombo'],
  [10, 14, 1066, 'Guilherme da Normandia vence em Hastings', 'guilherme_conquistador'],
  [10, 23, 1906, 'Santos Dumont voa com o 14-Bis em Paris', 'santos_dumont'],
  [10, 24, 1945, 'Entra em vigor a Carta das Nações Unidas', 'fdr'],
  [10, 29, 1929, 'A Bolsa de Nova York desaba na Terça-Feira Negra', 'USA'],
  [10, 31, 1517, 'Lutero divulga suas 95 teses', 'lutero'],
  [11, 4, 1922, 'Howard Carter encontra a escadaria da tumba de Tutancâmon', 'tutancamon'],
  [11, 7, 1917, 'Os bolcheviques tomam o poder em Petrogrado', 'lenin'],
  [11, 9, 1989, 'Cai o Muro de Berlim', 'gorbachev'],
  [11, 11, 1918, 'O armistício encerra os combates da Primeira Guerra', 'FRA'],
  [11, 15, 1889, 'É proclamada a República no Brasil', 'deodoro'],
  [11, 19, 1863, 'Lincoln pronuncia o Discurso de Gettysburg', 'lincoln'],
  [11, 20, 1695, 'Zumbi dos Palmares é morto; a data é hoje o Dia da Consciência Negra', 'zumbi'],
  [11, 22, 1963, 'John F. Kennedy é assassinado em Dallas', 'kennedy'],
  [12, 1, 1955, 'Rosa Parks se recusa a ceder o lugar no ônibus em Montgomery', 'rosa_parks'],
  [12, 2, 1804, 'Napoleão é coroado imperador em Notre-Dame', 'napoleao'],
  [12, 7, 1941, 'O Japão ataca Pearl Harbor', 'USA'],
  [12, 14, 1911, 'A expedição de Amundsen chega ao Polo Sul', 'amundsen'],
  [12, 17, 1903, 'Os irmãos Wright fazem seus voos em Kitty Hawk', 'USA'],
  [12, 25, 800, 'Carlos Magno é coroado imperador em Roma', 'carlos_magno'],
  [12, 25, 1991, 'Gorbachev renuncia e a União Soviética deixa de existir', 'gorbachev'],
];
const MES_LONGO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

/* today's entry (one of them, the same all day), or the next one coming up */
function almanacFor(d) {
  d = d || new Date();
  const m = d.getMonth() + 1, day = d.getDate();
  const today = ALMANAC.filter(e => e[0] === m && e[1] === day);
  if (today.length) return { e: today[(d.getFullYear() + day) % today.length], days: 0 };
  for (let k = 1; k <= 366; k++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + k);
    const hit = ALMANAC.find(e => e[0] === x.getMonth() + 1 && e[1] === x.getDate());
    if (hit) return { e: hit, days: k };
  }
  return null;
}
function almanacPic(id) {
  const p = PL.find(x => x.id === id);
  if (p && p.img) return `<span class="alm-pic alm-face"><img src="${p.img}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'" /></span>`;
  if (CL.some(c => c.id === id)) return `<span class="alm-pic alm-crest">${clubArt(id, '', false)}</span>`;
  if (FLAGS[id]) return `<span class="alm-pic alm-flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">${FLAGS[id]}</svg></span>`;
  return `<span class="alm-pic">${ICON.scroll('currentColor', 16)}</span>`;
}
function almanacHtml() {
  const a = almanacFor();
  if (!a) return '';
  const [m, day, y, txt, pic] = a.e;
  const when = a.days === 0 ? `Hoje na História · ${day} de ${MES_LONGO[m - 1]}`
             : a.days === 1 ? `Amanhã na História · ${day} de ${MES_LONGO[m - 1]}`
             : `Daqui a ${a.days} dias · ${day} de ${MES_LONGO[m - 1]}`;
  return `<div class="almanac${a.days === 0 ? ' is-today' : ''}" role="note">
    ${almanacPic(pic)}
    <span class="alm-t"><small>${when}</small><span><b class="num">${yearTxt(y)}</b> — ${txt}</span></span></div>`;
}
