/* Idade Média — the scenes of Christendom, Byzantium, Islam and the North (conventions in _core.js) */
Object.assign(SCENE, {
  /* Christmas night in the old basilica: a jewelled crown waits on its cushion before the altar, under the gold apse */
  coroacao_800: {
    label: 'Uma coroa sobre uma almofada diante do altar de uma basílica, à luz de velas',
    rx: /\b(coroacao|coroado|coroa|papa|basilica|altar)\b/,
    draw: () => {
      const col = (x, w, t, b) => `<path d="M${x} ${b}V${t}h${w}V${b}z" fill="${SCK.stone}"/><path d="M${x - 1} ${t}h${w + 2}v-2.4h-${w + 2}z" fill="${SCK.stoneLo}"/>`;
      const G = [[33, 36, 13], [87, 36, 13], [16, 20, 10], [104, 20, 10]], O = k => G.map(([x, y, r]) => `M${x + r * k} ${y}a${r * k} ${r * k} 0 1 1 0-.1z`).join('');
      const fl = [[33, 37], [87, 37], [13.6, 17], [16, 17], [18.4, 17], [101.6, 17], [104, 17], [106.4, 17]].map(([x, y]) => `M${x} ${y}q-2.4-3 0-6.4q2.4 3.4 0 6.4z`).join('');
      return SCH.bg('#2A2234')
        + SCH.g(col(3, 7, 6, 70) + col(17, 5, 15, 62) + col(26, 3.6, 22, 58) + col(110, 7, 6, 70) + col(98, 5, 15, 62) + col(90.4, 3.6, 22, 58)
          + `<path d="M36 44A24 24 0 0 1 84 44z" fill="${SCK.gold}"/><path d="M37 38h46v6H37z" fill="${SCK.teal}" stroke-width=".8"/><circle cx="60" cy="26" r="6.4" fill="#2E4775" stroke-width="1.2"/>
          <path d="M30 60V44A30 30 0 0 1 90 44v16h-6V44A24 24 0 0 0 36 44v16z" fill="#B9AE97"/>`, 1.3)
        + `<path d="M60 22v8M56.6 25h6.8" stroke="${SCK.goldHi}" stroke-width="1.6"/><path d="M49 24l-5-4M71 24l5-4M47 31l-6-1M73 31l6-1" stroke="${SCK.goldLo}" stroke-width="1.4"/>`
        + `<path d="M40 41h1M46 41h1M52 41h1M58 41h1M64 41h1M70 41h1M76 41h1" stroke="${SCK.goldHi}" stroke-width="1.4"/>`
        + `<path d="${O(1)}" fill="${SCK.goldHi}" opacity=".16"/><path d="${O(.5)}" fill="${SCK.goldHi}" opacity=".2"/>`
        + SCH.g(`<path d="M16 0v17M104 0v17" stroke-width="1"/><path d="M11 17h10l-2 4h-6zM99 17h10l-2 4h-6zM29 64h8l-2-3h-4zM83 64h8l-2-3h-4z" fill="${SCK.goldLo}" stroke-width="1.2"/>
          <path d="M14 64h92v6H14z" fill="${SCK.stone}"/><path d="M4 70h112v10H4z" fill="#D8CFBA"/>
          <path d="M42 64V48h36v16z" fill="${SCK.teal}"/><path d="M40 48h40v-3.4H40z" fill="${SCK.white}"/>
          <path d="M32 61V45h2v16zM86 61V45h2v16z" fill="${SCK.gold}" stroke-width="1"/>
          <path d="M30 45h6M84 45h6" stroke-width="2"/><path d="M31.6 44v-7h2.8v7zM85.6 44v-7h2.8v7z" fill="${SCK.white}" stroke-width="1"/>`, 1.4)
        + `<path d="${fl}" fill="${SCK.goldHi}" stroke="${SCK.gold}" stroke-width=".7"/>`
        + SCH.g(`<path d="M39 62q21-5 42 0q3 4 0 8q-21 4-42 0q-3-4 0-8z" fill="${SCK.red}"/><path d="M38 69l-2.4 4h4.2zM82 69l2.4 4h-4.2z" fill="${SCK.gold}" stroke-width="1"/>
          <path d="M44 61V51q0-4 5-4q5 0 5 4v11zM66 62V51q0-4 5-4q5 0 5 4v10zM54 62.6V47q0-5 6-5q6 0 6 5v15.6z" fill="${SCK.gold}"/>
          <path d="M43.4 58q16.6 5 33.2 0v4q-16.6 5-33.2 0z" fill="${SCK.goldLo}" stroke-width="1.4"/>
          <ellipse cx="60" cy="52" rx="3" ry="3.8" fill="${SCK.red}" stroke-width="1"/><path d="M46.8 54a2.2 2.2 0 1 1 0 .1zM68.8 54a2.2 2.2 0 1 1 0 .1z" fill="#2E5DA0" stroke-width="1"/>
          <path d="M60 42v-7M57 38h6" stroke-width="3.2"/>`, 1.6)
        + `<path d="M60 42v-7M57 38h6" stroke="${SCK.goldHi}" stroke-width="1.4" stroke-linecap="round"/>`
        + `<g fill="${SCK.white}"><circle cx="49" cy="48.4" r="1"/><circle cx="71" cy="48.4" r="1"/><circle cx="60" cy="44.4" r="1"/><circle cx="47" cy="61" r=".9"/><circle cx="53" cy="62.3" r=".9"/><circle cx="60" cy="62.8" r=".9"/><circle cx="67" cy="62.3" r=".9"/><circle cx="73" cy="61" r=".9"/></g>`;
    } },

  /* the Norman keep: four corner turrets with their caps, the curtain wall and the river in front */
  torre_branca: {
    label: 'A Torre Branca de Londres, de pedra clara, junto ao Tâmisa',
    rx: /\b(torre de londres|torre branca|londres)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const R = v => Math.round(v * 10) / 10, cap = (x, w, y) => `<path d="M${x} ${y}q0-${R(w * .5)} ${w / 2}-${R(w * .8)}q${w / 2} ${R(w * .3)} ${w / 2} ${R(w * .8)}z" fill="#7C8590"/>`;
      const vane = (x, y) => `M${x} ${y}v-5`;
      let mer = '', win = '';
      for (let x = 0; x < 120; x += 6) mer += `M${x + 1} 50v-3h3v3z`;
      for (let x = 38; x < 84; x += 4) mer += `M${x} 17v-2.6h2v2.6z`;
      [41.5, 53, 67, 78.5].forEach(x => { win += `M${x - 1.4} 29v-3.4a1.4 1.4 0 0 1 2.8 0V29zM${x - 1.4} 41v-3.4a1.4 1.4 0 0 1 2.8 0V41z`; });
      return SCH.bg('#A6C1CD') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + `<ellipse cx="20" cy="14" rx="16" ry="4" fill="${SCK.white}" opacity=".5"/><ellipse cx="104" cy="22" rx="12" ry="3" fill="${SCK.white}" opacity=".4"/>`
        + SCH.g(`<path d="M72 17V9h9v8z" fill="#E2D9C4"/><path d="M41 17V11h8v6z" fill="#E2D9C4"/>${cap(72, 9, 9)}${cap(41, 8, 11)}
          <path d="M32 54V16h56v38z" fill="#F1EADA"/>
          <path d="M27 54V12h10v42zM83 54V12h10v42z" fill="#E8E0CC"/>${cap(27, 10, 12)}${cap(83, 10, 12)}
          <path d="${vane(32, 4)}${vane(88, 4)}${vane(76.5, 1.8)}${vane(45, 4.6)}" fill="none" stroke-width="1"/>`, 1.5)
        + `<path d="M32 3l4 1-4 1zM88 3l4 1-4 1zM76.5 1l4 1-4 1z" fill="${SCK.gold}"/>`
        + `<path d="${mer.slice(mer.indexOf('M38'))}" fill="#F1EADA" stroke="${SCK.ink}" stroke-width="1"/>`
        + `<path d="M46 18v36M60 18v36M74 18v36" stroke="${SCK.ink}" stroke-width=".9" opacity=".35"/><path d="M27 30h10M83 30h10M27 42h10M83 42h10" stroke="${SCK.ink}" stroke-width=".7" opacity=".3"/>`
        + `<path d="${win}" fill="#3E3A40"/><path d="M30 33v-3a1.2 1.2 0 0 1 2.4 0v3zM87.6 33v-3a1.2 1.2 0 0 1 2.4 0v3z" fill="#3E3A40"/>`
        + `<path d="M0 64h120v16H0z" fill="${SCK.sea}"/>` + SCH.waves(70, '#7FA3B8', 1.4) + SCH.waves(77, '#6D95AD', 1.4)
        + SCH.g(`<path d="M-2 64V50h124v14z" fill="${SCK.stoneLo}"/><path d="${mer.slice(0, mer.indexOf('M38'))}" fill="${SCK.stoneLo}" stroke-width="1"/>
          <path d="M6 64V44h14v20zM100 64V44h14v20z" fill="${SCK.stone}"/>
          <path d="M5 44v-3h3v3zM11.5 44v-3h3v3zM18 44v-3h3v3zM99 44v-3h3v3zM105.5 44v-3h3v3zM112 44v-3h3v3z" fill="${SCK.stone}" stroke-width="1"/>
          <path d="M53 64v-7a7 7 0 0 1 14 0v7z" fill="#3B4A57"/>`, 1.4)
        + `<path d="M0 58h120M20 54h80M10 52v4M30 56v6M90 56v6M110 52v4" stroke="${SCK.ink}" stroke-width=".7" opacity=".3"/>`
        + SCH.g(`<path d="M10 70h24q-2 5-9 5h-9q-4 0-6-5z" fill="${SCK.wood}"/><path d="M21 70V56" fill="none" stroke-width="1.2"/><path d="M15.6 58h11v9q-5.5 1.6-11 0z" fill="${SCK.parch}" stroke-width="1.2"/><path d="M14.6 58h13" stroke-width="1.6"/>
          <path d="M84 73h18q-2 4-7 4h-6q-3 0-5-4z" fill="#6E4A2C" stroke-width="1.2"/><path d="M80 78l8-6M106 78l-8-6" fill="none" stroke-width="1"/>`, 1.4) + '</g>';
    } },

  /* two mounted knights in mail, cross on shield and trapper, lances and pennants up; the walls and a siege tower behind */
  ev_cruzadas: {
    label: 'Cavaleiros cruzados com escudos e estandartes diante de muralhas no deserto',
    rx: /\b(cruzada|cruzadas|cruzado|cruzados)\b/,
    ev: 'cruzadas',
    draw: () => {
      const fc = SCH.uid('fc');
      const N = 'M9 2l3 7 2 7M-15 1l-1.6 8 1.6 8', K = 'M-1 -11l4 8-1 6';
      const knight = (x, y, s, coat, cloth, shield, cross, pen) => `<g transform="translate(${x} ${y}) scale(${s})"><g fill="none"><path d="M4 -12 9 -52M7 -12.6 13 -21.4" stroke-width="2.4"/><path d="M7 2l1 8 1 7M-11 1l1 8-1 8M-18 -6q-6 3-5 14" stroke-width="3.6"/></g>`
        + `<path d="M8.6 -50l12 3-11.6 3.4z" fill="${pen}"/><path d="M-18 -4c0-5 4-6 8-6h12q4-1 7-6l4-6 1-3.4 1.6 3.4q2.4 1 4.4 4l5 6q1 2-1 3l-3-.6q-2-1.4-4-3.4l-3 7q-1 4-3 7l-2 2h-21q-6-1-6-7z" fill="${coat}"/>`
        + `<path d="M-19.4 -5c0-5 4.4-6.4 8.4-6.4h16L10.4 -6 11 3 8.6 8.4 6 6.4 3.4 9 .8 6.4-1.8 9-4.4 6.4-7 9-9.6 6.4-12.2 9-14.8 6.4-17.4 9-19.4 7z" fill="${cloth}"/>`
        + `<g fill="none"><path d="M-7 -6v10M-11.6 -1.4h9.2" stroke="${cross}" stroke-width="2.4"/><path d="${N}${K}" stroke-width="4.6"/><path d="${N}" stroke="${coat}" stroke-width="2.6"/><path d="${K}" stroke="#9AA0A6" stroke-width="2.6"/></g>`
        + `<path d="M-5 -11q-1-9 1-15h8q2 6 1 15z" fill="${SCK.white}"/><path d="M-3 -26v-9h8v9z" fill="#A9AEB4"/><path d="M-9 -25h11q0 13-5.5 21q-5.5-8-5.5-21z" fill="${shield}"/>`
        + `<path d="M-3.5 -23v15M-8 -19h9" stroke="${cross}" stroke-width="2.4"/></g>`;
      return SCH.bg('#ECC58C') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + SCH.sun(30, 14, 8, '#F7E6B8')
        + SCH.g(`<path d="M-2 50V28h16v-3h3.6v3${'h3.4v-3h3.6v3'.repeat(15)}h2V50z" fill="#C99A5B"/>
          <path d="M-2 50V16h2v-3h4v3h2v-3h4v3h1.6v-3h3v3h1.4v34z" fill="#D2A666"/><path d="M3 26h4v6H3z" fill="#5A3A22" stroke-width="1"/>
          <path d="M84 56l4-48h20l4 48z" fill="${SCK.wood}"/><path d="M87 26h22M86 40h24" fill="none" stroke-width="1.2"/>
          <path d="M88 8l-12 6 1 3 12-6z" fill="#6A4426" stroke-width="1.2"/><path d="M86 18h4v6h-4zM98 14h4v6h-4zM92 30h4v6h-4z" fill="#3A2614" stroke-width="1"/>`, 1.5)
        + `<path d="M20 38h10M24 44h12M70 34h8M36 34h6M66 46h10M92 12v42M100 12v42" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + `<path d="M0 50h120v30H0z" fill="#E2B977"/><path d="M0 50h120" stroke="${SCK.ink}" stroke-width="1.2"/><path d="M80 66h30M6 74h20M90 76h20" stroke="#B88A50" stroke-width="1.4"/>`
        + SCH.g(`<circle cx="88" cy="56" r="4" fill="#6A4426"/><circle cx="104" cy="56" r="4" fill="#6A4426"/>`
          + knight(24, 55, .8, '#6E4A2E', SCK.red, SCK.red, SCK.white, SCK.white) + knight(54, 62, 1, '#8A5A34', SCK.white, SCK.white, SCK.red, SCK.red), 1.4) + '</g>';
    } },

  /* Jerusalem from the Mount of Olives: the walls and their walled-up double gate, roofs, and the golden dome on its octagon; olive trees in front */
  cupula_da_rocha: {
    label: 'Jerusalém com as muralhas e a cúpula dourada sobre o monte',
    rx: /\b(cupula da rocha|cupula dourada|jerusalem)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      let mer = '', arc = '';
      for (let x = 0; x < 120; x += 6) mer += `M${x + 1} 54v-3h3v3z`;
      for (let x = 48.6; x < 73; x += 5) arc += `M${x} 44v-3.6a1.4 1.4 0 0 1 2.8 0V44z`;
      const olive = (x, y, f) => SCH.g(`<path d="M${x} ${y + 16}q${f * 2}-8 0-14M${x} ${y + 8}q${f * 6}-2 ${f * 8}-6" fill="none" stroke="${SCK.wood}" stroke-width="3"/>`, 1)
        + SCH.g(`<path d="M${x - 14} ${y + 2}q-2-8 6-9q2-6 10-4q6-4 11 1q8 0 7 7q4 6-3 9q-4 5-11 2q-6 4-12 0q-9 1-8-6z" fill="#7E8F5E"/>`, 1.5)
        + `<path d="M${x - 8} ${y - 1}q4-2 7 0M${x + 3} ${y - 3}q4-1 6 2M${x - 2} ${y + 5}q5-1 8 1" stroke="#B9C49A" stroke-width="1.2" fill="none"/>`;
      return SCH.bg('#C6DADD') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + `<path d="M0 38q30-8 60-4t60-4v20H0z" fill="#D9CBA6"/>`
        + SCH.g(`<path d="M2 50V42h10v-3h8v11zM90 50V41h10v-4h12v13z" fill="#EDE3CC" stroke-width="1.2"/><path d="M100 37a6 6 0 0 1 12 0z" fill="#A9AEB4" stroke-width="1.2"/><path d="M76 50v-6h6v-2h4v8z" fill="#E4D6B4" stroke-width="1.2"/>
          <path d="M60 9V3" fill="none" stroke-width="1.4"/>
          <path d="M49.4 27q0-16 10.6-18q10.6 2 10.6 18z" fill="${SCK.gold}"/>
          <path d="M51 34v-7h18v7z" fill="${SCK.teal}"/>
          <path d="M36 56V38l10-2v20zM74 36l10 2v18H74z" fill="#3A6A72"/><path d="M46 56V36h28v20z" fill="#4D8792"/>
          <path d="M34.4 38.4l11.6-3.2h28l11.6 3.2" fill="none" stroke-width="1.6"/>`, 1.5)
        + `<circle cx="60" cy="2.6" r="1.2" fill="${SCK.gold}"/><path d="M53 22q1-7 5-10M56 25q0-5 2-8" stroke="${SCK.goldHi}" stroke-width="1.2" fill="none"/>`
        + `<path d="M53 32v-2.4a1 1 0 0 1 2 0V32zM59 32v-2.4a1 1 0 0 1 2 0V32zM65 32v-2.4a1 1 0 0 1 2 0V32z" fill="#1F3A40"/>`
        + `<path d="${arc}M38.6 44.6v-3.4a1.2 1.2 0 0 1 2.4 0v3.4zM79 44.6v-3.4a1.2 1.2 0 0 1 2.4 0v3.4z" fill="#1F3A40"/><path d="M36 47h48" stroke="${SCK.white}" stroke-width="1.2" opacity=".7"/>`
        + SCH.g(`<path d="M-2 68V54h124v14z" fill="#D8B47A"/><path d="${mer}" fill="#D8B47A" stroke-width="1"/>
          <path d="M20 68V46h28v22z" fill="#CFA86C"/><path d="M20 46v-3h4v3zM28 46v-3h4v3zM36 46v-3h4v3zM44 46v-3h4v3z" fill="#CFA86C" stroke-width="1"/>
          <path d="M23 66v-9a5.4 5.4 0 0 1 10.8 0v9zM34.2 66v-9a5.4 5.4 0 0 1 10.8 0v9z" fill="#B08A52"/>`, 1.5)
        + `<path d="M4 60h8M50 58h12M70 62h10M96 58h12M23 61h11M34.2 61H45" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/>`
        + `<path d="M0 68q40-4 120 2v10H0z" fill="#8E9A5E"/><path d="M0 68q40-4 120 2" stroke="${SCK.ink}" stroke-width="1.2" fill="none"/>`
        + olive(6, 62, 1) + olive(113, 63, -1) + '</g>';
    } },

  /* a longship under sail: dragon prow, clinker strakes, a row of painted shields, oars out; a green shore behind */
  drakkar: {
    label: 'Um barco longo nórdico com proa de dragão e escudos redondos, perto de uma costa verde',
    rx: /\b(drakkar|dracar|drakar|viking|vikings)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const cs = [SCK.red, SCK.gold, SCK.white, SCK.teal];
      let sh = '', oars = '', stripes = '';
      for (let i = 0; i < 9; i++) { const x = Math.round(300 + i * 66) / 10; sh += `<circle cx="${x}" cy="47" r="3.4" fill="${cs[i % 4]}"/>`; oars += `M${(x + 2).toFixed(1)} 51.4l-5 12.6`; }
      for (let x = 43; x < 79; x += 8) stripes += `M${x} 13h4v27.6q-2 .3-4 .2z`;
      return SCH.bg(SCK.sky) + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + SCH.sun(98, 16, 7, '#F4E3B6')
        + SCH.g(`<path d="M-2 46q14-16 30-14q10-10 22-4q14-6 28 4v14H-2z" fill="${SCK.green}" stroke-width="1.4"/>`, 1.4)
        + `<path d="M10 36l3-7 3 7zM18 34l3-8 3 8zM40 30l3-7 3 7z" fill="${SCK.olive}"/>`
        + `<path d="M0 52h120v28H0z" fill="${SCK.sea}"/>` + SCH.waves(66, '#7FA3B8', 1.6) + SCH.waves(75, '#6D95AD', 1.6)
        + SCH.g(`<path d="M60 52V8" stroke-width="2.6" fill="none"/><path d="M38 12h44" stroke-width="2.4" fill="none"/>
          <path d="M40 12h40v28.6q-20 4-40 0z" fill="${SCK.white}"/>`, 1.5)
        + `<path d="${stripes}" fill="${SCK.red}"/><path d="M40 12h40v28.6q-20 4-40 0z" fill="none" stroke="${SCK.ink}" stroke-width="1.5"/><path d="M38 12h44" stroke="${SCK.ink}" stroke-width="2.4"/>`
        + `<path d="M60 40.6V52M44 41l-8 7M76 41l8 7" stroke="${SCK.ink}" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M11 28q4 14 15 20h64q11-6 13-21l3.4 1.4q-1 20-13 31-10 3-60 3-11 0-15-7-5-8-7.4-26z" fill="${SCK.wood}"/>
          <path d="M103 27q-2-9 3-14q4-4 9-2l3 4-4 1q-3-1-4 1l1 3q-4 0-5-2q-1 4 1 10z" fill="${SCK.wood}"/>
          <path d="M11 28q-4-8 0-12q4-3 6 1q1 3-2 4" fill="none" stroke-width="2.2"/>`, 1.6)
        + `<path d="M22 52q30 3 70 0M18 46q20 7 90-2" stroke="${SCK.ink}" stroke-width="1" fill="none" opacity=".5"/><path d="M108 9l2-4 1 4zM104 11l-1-4 3 3z" fill="${SCK.ink}"/><circle cx="111.4" cy="12.4" r=".9" fill="${SCK.goldHi}"/>`
        + `<path d="${oars}" stroke="${SCK.ink}" stroke-width="2.6" fill="none"/><path d="${oars}" stroke="#C9A66B" stroke-width="1" fill="none"/>`
        + SCH.g(sh, 1.2) + `<g fill="${SCK.ink}">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<circle cx="${Math.round(300 + i * 66) / 10}" cy="47" r="1"/>`).join('')}</g>` + '</g>';
    } },

  /* a muddy field: longbowmen at full draw behind their stakes, the volley in the air, armoured horsemen with plain banners charging */
  ev_guerra_cem_anos: {
    label: 'Arqueiros com arcos longos disparam contra cavaleiros de armadura',
    rx: /\b(cem anos|arco longo|arcos longos|arqueiros|azincourt|agincourt|crecy)\b/,
    ev: 'guerra_cem_anos',
    draw: () => {
      const N = 'M9 2l3 6 6 3M-15 1l-7 5-6 4', K = 'M-1 -11l4 8-1 6', B = 'M12 -50q12 21 0 42', A = 'M2 -28h15M-1 -28l-7-2 5-1.6', L = 'M1 -15l5 8 1 7M-1 -15l-6 8-1 7';
      const rider = (x, y, s, cloth, ban) => `<g transform="translate(${x} ${y}) scale(-${s} ${s})"><g fill="none"><path d="M4 -12 6 -52" stroke-width="2.6"/><path d="M7 2l6 3 6 5M-12 1l-4 7-5 5M-18 -6q-7 0-11 6" stroke-width="3.6"/></g>`
        + `<path d="M-18 -4c0-5 4-6 8-6h12q4-1 7-6l4-6 1-3.4 1.6 3.4q2.4 1 4.4 4l5 6q1 2-1 3l-3-.6q-2-1.4-4-3.4l-3 7q-1 4-3 7l-2 2h-21q-6-1-6-7z" fill="#5E4030"/>`
        + `<path d="M-19.4 -5c0-5 4.4-6.4 8.4-6.4h16l5.4 5.4.6 10h-30.4z" fill="${cloth}"/><path d="M6 -51h13v9H6z" fill="${ban}"/>`
        + `<g fill="none"><path d="${N}${K}" stroke-width="4.6"/><path d="${N}" stroke="#5E4030" stroke-width="2.6"/><path d="${K}" stroke="#A9AEB4" stroke-width="2.6"/></g>`
        + `<path d="M-5 -11q-1-9 1-15h8q2 6 1 15zM-3 -26q0-8 4-9q4 1 4 9zM5 -30l5 2.4-5 1.6z" fill="#B3B8BE"/></g>`;
      const archer = (x, y, s, tunic) => `<g transform="translate(${x} ${y}) scale(${s})"><g fill="none"><path d="M12.4 -49.4-2 -31.6 12.4 -8.6M-3 -31.6h25" stroke-width=".8"/>`
        + `<path d="${L}${A}" stroke-width="4.6"/><path d="${L}" stroke="${SCK.burg}" stroke-width="2.6"/><path d="${A}" stroke="${tunic}" stroke-width="2.6"/></g>`
        + `<path d="${B}q5-21 0-42z" fill="#C08A50"/><path d="M-5 -31h9l2.4 18h-13.4z" fill="${tunic}"/><circle cy="-34.4" r="3.6" fill="#D9A77E"/><path d="M-4.4 -36q4.4-7 8.8 0zM-6.4 -36h12.8" fill="${SCK.stone}"/><path d="M21.4 -33.6l3.4 2-3.4 2z" fill="${SCK.ink}"/></g>`;
      const v = [[50, 14], [62, 9], [75, 13], [66, 21], [82, 20], [92, 12]];
      return SCH.bg('#C3CDD0')
        + `<path d="M0 44q40-6 70-2t50-2v40H0z" fill="${SCK.olive}"/><path d="M0 52q50-6 120 0v28H0z" fill="#7E6A48"/>`
        + `<path d="M30 58h20M70 60h24M96 66h18M51 67q3-2 6 0M59 73q3-2 6 0M67 79q3-2 6 0" stroke="#5A4A30" stroke-width="1.6" fill="none"/>`
        + SCH.g(rider(100, 56, .6, SCK.burg, SCK.gold) + rider(88, 63, .7, SCK.teal, SCK.red)
          + `<path d="${v.map(([x, y]) => `M${x} ${y}l10 4.4-3.8.4m3.8-.4-2.2-2.8`).join('')}" fill="none" stroke-width="1.2"/>`
          + `<path d="M54 66l7-10M62 72l7-10M70 78l7-10" stroke-width="4.2"/><path d="M54 66l7-10M62 72l7-10M70 78l7-10" stroke="${SCK.wood}" stroke-width="2.2"/>`
          + archer(38, 60, .7, '#7C8A58') + archer(16, 78, 1, SCK.olive), 1.5);
    } },

  /* the manor: the lord's castle on the hill, a village church below, and the long strips where a pair of oxen draws the plough */
  campo_feudal: {
    label: 'Um castelo no alto da colina sobre campos em faixas, onde servos aram a terra',
    rx: /\b(servo|servos|servidao|castelo|castelos|arado|senhorio)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const cs = ['#7E9A5E', '#B98E58', '#5E6B3A', '#D2B278', '#6E8C5A', '#9A7048'], sp = cs.map(() => '');
      for (let i = 0; i < 16; i++) { const a = -100 + i * 20, b = a + 20, t = v => (60 + (v - 60) * .4).toFixed(1); sp[i % 6] += `M${a} 80H${b}L${t(b)} 44H${t(a)}z`; }
      const ox = (x, y, c, yoke) => `<g transform="translate(${x} ${y})"><path d="M-8 -7v7M-4 -7v7M9 -7v7M13 -7v7" stroke-width="4.4"/><path d="M-8 -7v7M-4 -7v7M9 -7v7M13 -7v7" stroke="${c}" stroke-width="2.6"/>
        <path d="M16 -17q4 4 2 12" stroke-width="1.8"/><path d="M-12 -14q0-7 7-7l15 1q6 0 6 7v5q0 2-3 2h-23q-2 0-2-3z" fill="${c}"/><path d="M-11 -19l-6 2q-4 2-4 6l1 3q1 2 4 1l4-3z" fill="${c}"/>
        <path d="M-14.6 -17.6q-1-5-5.4-5.4M-12.6 -18.6q1-5 4.6-5.4" stroke="${SCK.white}" stroke-width="1.6"/>${yoke ? `<path d="M-13 -21.4h5v4h-5z" fill="${SCK.wood}" stroke-width="1.2"/>` : ''}</g>`;
      return SCH.bg('#C9DCDF') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + SCH.sun(20, 14, 7, '#F4E3B6') + `<path d="M0 46q30-10 60-4v4H0z" fill="#9AAE84"/>`
        + SCH.g(`<path d="M52 46q14-28 40-28q22 0 30 16v12z" fill="${SCK.green}"/>
          <g transform="translate(0 4)"><path d="M76 30V18h30v12z" fill="${SCK.stone}"/><path d="M72 30V9h3v3h2V9h3v21zM102 30V9h3v3h2V9h3v21z" fill="${SCK.stone}"/><path d="M85 18V3h3v3h2.6V3H93v3h2V3h2v15z" fill="#D6CCB5"/>
          <path d="M91 3V-4" stroke-width="1.2"/><path d="M91 -4l7 2-7 2z" fill="${SCK.red}" stroke-width="1"/><path d="M89 30v-4a2 2 0 0 1 4 0v4zM75 20h2M105 20h2" fill="${SCK.ink}" stroke-width="1.2"/></g>
          <path d="M8 46v-7h10v7zM20 46v-6h8v6zM34 46v-12h7v12z" fill="${SCK.white}" stroke-width="1.2"/><path d="M7 39l6-5 6 5zM19 40l5-4 5 4z" fill="${SCK.wood}" stroke-width="1.2"/><path d="M33 34l4.4-14 4.4 14z" fill="#7C8590" stroke-width="1.2"/>`, 1.4)
        + `<path d="M60 40q8 2 10 6" stroke="#C9B48A" stroke-width="1.6" fill="none"/>`
        + sp.map((d, i) => `<path d="${d}" fill="${cs[i]}"/>`).join('') + `<path d="M0 44h120" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<path d="M20 80l24-36M40 80l20-36M60 80V44M80 80l-12-36M100 80l-12-36" stroke="${SCK.ink}" stroke-width=".6" opacity=".35"/>`
        + SCH.g(`<g fill="none">` + ox(34, 68, '#6A4A30', 1) + `<path d="M30 60 60 66" stroke-width="3"/><path d="M30 60 60 66" stroke="${SCK.wood}" stroke-width="1.4"/>` + ox(26, 73, '#B98A5A')
          + `<path d="M62 66l8-10M60 66l6-11M82 62l-4 12M84 62l4 12M81 51l-5 3-3-4" stroke-width="4.4"/><path d="M62 66l8-10M60 66l6-11" stroke="${SCK.wood}" stroke-width="1.2"/><path d="M82 62l-4 12M84 62l4 12" stroke="#5A4A3A" stroke-width="2.6"/></g>`
          + `<path d="M12 50.6h5v4h-5z" fill="${SCK.wood}" stroke-width="1.2"/><path d="M58 65h6l-3 6h-5z" fill="#7C8590" stroke-width="1.2"/>`
          + `<path d="M79 48h8l3 15H77z" fill="${SCK.ochre}"/><circle cx="81" cy="46" r="3.2" fill="#D9A77E"/><path d="M78 47q2-7 8-3l1 5-4-1z" fill="${SCK.red}"/><path d="M81 51l-5 3-3-4" fill="none" stroke="${SCK.ochre}" stroke-width="2.6"/>`, 1.4) + '</g>';
    } },

  /* a lecture under Gothic vaults: the master in his gown at the raised chair and lectern, students on the benches with their books */
  aula_medieval: {
    label: 'Um mestre lê de uma cátedra para estudantes com livros, sob arcos góticos',
    rx: /\b(universidade|universidades|aula|catedra|mestre)\b/,
    draw: () => {
      const lancet = x => `M${x} 40V20q0-10 7-13q7 3 7 13v20z`;
      const row = (y, st, hair, legs) => SCH.g((legs ? `<g fill="none"><path d="${legs}" stroke-width="4"/><path d="${legs}" stroke="#5A4A3A" stroke-width="2.2"/></g>` : '')
        + st.map(([x, g]) => `<path d="M${x - 5} ${y - 16}q-2 8-1 16h12q1-2 0-4l-4-1q0-6-1-11zM${x} ${y - 14.4}l5.6 4.4-1.2 1.6-5.6-4.4z" fill="${g}"/>`).join('')
        + `<path d="${st.map(([x]) => `M${x + 3.6} ${y - 19.6}a3.6 3.6 0 1 1 0-.1z`).join('')}" fill="#D9A77E"/><path d="${st.map(([x]) => `M${x - 3.6} ${y - 19}q0-5 3.6-5t3.4 3.6q-3 0-3.4 3.4z`).join('')}" fill="${hair}"/>`
        + `<path d="${st.map(([x]) => `M${x + 1} ${y - 9}l6-2.4 6 2.4v1.2l-6-2-6 2z`).join('')}" fill="${SCK.white}" stroke-width="1.1"/>`, 1.4);
      return SCH.bg('#D9CCAE')
        + `<path d="M0 6h120M0 44h120" stroke="${SCK.stoneLo}" stroke-width="1"/>`
        + SCH.g(`<path d="${lancet(6)}${lancet(64)}" fill="#3B5376"/><circle cx="42" cy="17" r="12" fill="${SCK.stone}"/><circle cx="42" cy="17" r="9.4" fill="#3B5376"/>`, 1.4)
        + `<path d="M32.6 17h18.8M42 7.6v18.8M35.4 10.4l13.2 13.2M48.6 10.4L35.4 23.6M13 7v33M71 7v33M6 24h14M64 24h14" stroke="${SCK.stone}" stroke-width="1.6"/><circle cx="42" cy="17" r="3.4" fill="${SCK.red}" stroke="${SCK.stone}" stroke-width="1.4"/>`
        + `<path d="M8 20h4M15 30h4M66 32h4M73 18h4" stroke="${SCK.red}" stroke-width="2.2"/>`
        + `<path d="M0 64h120v16H0z" fill="#A9875A"/><path d="M0 64h120" stroke="${SCK.ink}" stroke-width="1"/>`
        + SCH.g(`<path d="M76 66v-6h42v6z" fill="${SCK.stoneLo}"/><path d="M94 60V14l9-8 9 8v46zM90 60h24V46H90z" fill="${SCK.wood}"/><path d="M98 56V18l5-5 5 5v38z" fill="#6A4426"/>
          <path d="M96 60V42q-1-8 2-12h8q3 4 2 12v18z" fill="${SCK.burg}"/><circle cx="101" cy="26" r="4" fill="#D9A77E"/>
          <path d="M96.4 27q-1-8 4.6-8q5.6 0 4.6 8q-1-4-4.6-4t-4.6 4z" fill="${SCK.burg}"/><path d="M97 20.6q4-3 8 0v-2.6q-4-2-8 0z" fill="${SCK.ink}" stroke-width="1"/>
          <path d="M86 60V44M80 60h12M98 34l-8 6" stroke-width="2.6" fill="none"/><path d="M98 34l-8 6" stroke="${SCK.burg}" stroke-width="1.2"/><path d="M76 43l20-5v3l-20 5z" fill="${SCK.wood}"/>
          <path d="M77 41.4q5-4 9.6-2.6q5-3.4 9.4-.8l-.2 1.4q-4.6-2-9.2 1.4q-4.6-1.4-9.4 2z" fill="${SCK.white}" stroke-width="1.2"/>`, 1.4)
        + `<path d="M8 60h64v3H8z" fill="#7A5232" stroke="${SCK.ink}" stroke-width="1"/>` + row(60, [[18, SCK.teal], [40, SCK.ochre], [62, SCK.olive]], '#4A3020')
        + SCH.g(`<path d="M2 72h80v4H2z" fill="${SCK.wood}"/>`, 1.2) + row(72, [[10, SCK.sea], [34, SCK.red], [58, '#7C8590']], '#3A2614', 'M15 72l1 8M39 72l1 8M63 72l1 8');
    } },

  /* the meadow by the river: the barons' striped pavilions with pennants, and on the little table the candle, the stick of red wax, the seal matrix and a blank charter with its wax seal hanging */
  runnymede: {
    label: 'Tendas de barões num prado à beira do rio, com uma mesa de selos e cera',
    rx: /\b(runnymede|selo|lacre|baroes)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const R = v => Math.round(v * 10) / 10;
      const tent = (x, y, w, h, c1, c2, pen) => {
        const l = x - w / 2, b = R(h * .45), top = R(y - h * .55), q = R(w / 8);
        let st = '';
        for (let i = 0; i < 6; i += 2) st += `M${R(l + i * w / 6)} ${y}h${R(w / 6)}v${b}h-${R(w / 6)}z`;
        return `<path d="M${x} ${top}v-6" stroke-width="1.2"/><path d="M${x} ${R(top - 6)}l7 2-7 2z" fill="${pen}" stroke-width="1"/><path d="M${l} ${y + b}V${y}h${w}v${b}z" fill="${c2}"/><path d="${st}" fill="${c1}" stroke="none"/>`
          + `<path d="M${l} ${y + b}V${y}h${w}v${b}z" fill="none"/><path d="M${l - 2} ${y + 1}L${x} ${top}L${x + w / 2 + 2} ${y + 1}${`q-${q} 3-${2 * q} 0`.repeat(4)}z" fill="${c1}"/><path d="M${x - 2.6} ${y + b}v-${R(h * .3)}h5.2v${R(h * .3)}z" fill="#3A2614" stroke-width="1"/>`;
      };
      return SCH.bg('#C9DDE2') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">`
        + SCH.g(`<path d="M-2 34q4-8 10-6q4-6 10-2q6-6 12 0q6-4 12 1q6-6 13-1q6-5 12 0q6-4 12 1q6-6 12-1q6-4 12 1q6-4 10 2v6H-2z" fill="${SCK.olive}"/>`, 1.2)
        + `<path d="M0 34h120v8H0z" fill="${SCK.sea}"/><path d="M8 37h14M40 39h20M80 36h16M104 39h12" stroke="#B8D0DA" stroke-width="1.2"/>`
        + `<path d="M0 41h120v39H0z" fill="${SCK.green}"/><path d="M0 41h120" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + SCH.g(tent(60, 34, 18, 18, SCK.white, '#3A6A72', SCK.gold) + tent(20, 32, 30, 34, SCK.red, SCK.white, SCK.red) + tent(100, 32, 28, 32, SCK.gold, SCK.burg, '#2E5DA0'), 1.4)
        + `<path d="M6 72l3-4M14 76l2-5M104 74l3-5M112 70l2-4" stroke="#4A6A3A" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M34 72v6M86 72v6" stroke-width="2.6"/><path d="M34 52h52l6 6H28z" fill="${SCK.paper}"/><path d="M28 58h64v12H28z" fill="${SCK.paper}"/>`, 1.5)
        + `<path d="M28 66h64v4H28z" fill="${SCK.teal}" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + `<circle cx="40" cy="38" r="6" fill="${SCK.goldHi}" opacity=".3"/>`
        + SCH.g(`<ellipse cx="40" cy="55.4" rx="5" ry="1.8" fill="${SCK.gold}"/><path d="M38.4 55V42h3.2v13z" fill="${SCK.white}" stroke-width="1.2"/>
          <path d="M44.6 57.8l7-2.4.6 1.8-7 2.4z" fill="${SCK.red}" stroke-width="1.1"/><path d="M57 52.6h21l3 5.4H54zM54 58h27v6.4q-13.5 2-27 0z" fill="#E2C98E"/>
          <path d="M83 56.6h7l-1-1.8h-5zM85 54.8l1.5-4.4 1.5 4.4z" fill="${SCK.goldLo}" stroke-width="1"/><circle cx="67.5" cy="73" r="4.6" fill="${SCK.red}" stroke-width="1.3"/>`, 1.4)
        + `<path d="M40 42q-2.4-3 0-6.6q2.4 3.6 0 6.6z" fill="${SCK.goldHi}" stroke="${SCK.gold}" stroke-width=".7"/><path d="M40 42v-1.4" stroke="${SCK.ink}" stroke-width=".8"/><path d="M65.6 65.4l1 3.4M69.4 65.4l-1 3.4" stroke="${SCK.goldLo}" stroke-width="1.2"/><circle cx="67.5" cy="73" r="2.6" fill="none" stroke="#5E1010" stroke-width=".8"/>` + '</g>';
    } },

  /* an early-medieval battle: a wall of round shields and spears at left, Moorish horsemen with turbans and leather adargas charging at right; dry hills */
  mouros_batalha: {
    label: 'Cavaleiros mouros com escudos de couro enfrentam uma parede de escudos de guerreiros cristãos',
    rx: /\b(mouro|mouros|sarraceno|sarracenos|adarga)\b/,
    draw: () => {
      const N = 'M9 2l3 6 6 3M-15 1l-7 5-6 4', K = 'M-1 -11l4 8-1 6';
      const rider = (x, y, s, coat, robe, band) => `<g transform="translate(${x} ${y}) scale(-${s} ${s})"><g fill="none"><path d="M-16 -27 28 -14M7 -12.6 13 -21.4" stroke-width="2.4"/><path d="M7 2l6 3 6 5M-12 1l-4 7-5 5M-18 -6q-7 0-11 6" stroke="${coat === SCK.white ? SCK.stoneLo : SCK.ink}" stroke-width="3.6"/></g>`
        + `<path d="M27 -15.4l5 2.4-5.6 1z" fill="#C3C8CE"/><path d="M-18 -4c0-5 4-6 8-6h12q4-1 7-6l4-6 1-3.4 1.6 3.4q2.4 1 4.4 4l5 6q1 2-1 3l-3-.6q-2-1.4-4-3.4l-3 7q-1 4-3 7l-2 2h-21q-6-1-6-7z" fill="${coat}"/><path d="M-8 -11h12l-1 8h-10z" fill="${band}"/>`
        + `<g fill="none"><path d="${N}${K}" stroke-width="4.6"/><path d="${N}" stroke="${coat}" stroke-width="2.6"/><path d="${K}" stroke="${SCK.red}" stroke-width="2.4"/></g>`
        + `<path d="M-4 -10q-8-4-12 4q4-6 12-1z" fill="${band}"/><path d="M-5 -11q-1-9 1-15h8q2 6 1 15z" fill="${robe}"/><circle cx="1" cy="-29" r="3.4" fill="#A0704A"/><path d="M-3.4 -30q0-6 4.4-6t4.4 6z" fill="${SCK.white}"/>`
        + `<path d="M7 -26q-6-6-6 2q0 8 6 10q6-2 6-10q0-8-6-2z" fill="${SCK.ochre}"/></g>`;
      const xs = [10, 23, 36, 49], sc = [SCK.red, SCK.teal, SCK.stone, SCK.burg], legs = xs.map(x => `M${x - 3} 60l-1 14M${x + 3} 60l1 14`).join('');
      return SCH.bg('#E8DCBC') + SCH.sun(64, 14, 8, '#F7E9C2')
        + `<path d="M0 38q20-14 42-8q22-12 46-2q18-8 32 0v20H0z" fill="#C9A66B"/><path d="M0 46q30-8 60-2t60-2v14H0z" fill="#B48A55"/>`
        + `<path d="M0 52h120v28H0z" fill="#D8B47A"/><path d="M0 52h120" stroke="${SCK.ink}" stroke-width="1.2"/>`
        + SCH.g(rider(101, 52, .6, '#3E2A1C', '#E4D6B4', SCK.teal) + rider(86, 62, .9, SCK.white, '#F1E7CF', SCK.red)
          + `<g fill="none"><path d="${xs.map(x => `M${x + 3} 64 ${x + 18} 22`).join('')}M2 56 14 18" stroke="#5A3A22" stroke-width="2"/><path d="${legs}" stroke-width="4.4"/><path d="${legs}" stroke="#6A5A48" stroke-width="2.4"/></g>`
          + `<path d="${xs.map(x => `M${x + 16.4} 25.6l3.4-6.4-.2 5.6z`).join('')}" fill="#C3C8CE" stroke-width="1"/>`
          + xs.map(x => `<circle cx="${x + 1}" cy="44" r="3.4" fill="#C08A60"/>`).join('') + `<path d="${xs.map(x => `M${x - 2.6} 43q0-7 3.6-9q3.6 2 3.6 9z`).join('')}" fill="#9AA0A6"/>`
          + xs.map((x, i) => `<circle cx="${x}" cy="54" r="8.4" fill="${sc[i]}"/>`).join('') + `<path d="${xs.map(x => `M${x + 2.4} 54a2.4 2.4 0 1 1 0-.1z`).join('')}" fill="#7C8590" stroke-width="1"/>`, 1.4);
    } },

  /* standing inside the Great Church: the vast golden dome overhead, its ribs running to the crowning cross, the ring of arched windows pouring light; galleries of arches beneath and the hanging lamps */
  hagia_sofia: {
    label: 'O interior de Santa Sofia: a grande cúpula com o anel de janelas e mosaicos dourados',
    rx: /\b(santa sofia|hagia sofia|constantinopla|bizancio)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      let rib = '', win = '';
      for (let i = 0; i < 17; i++) { const x = +(8.6 + i * 6.2).toFixed(1); win += `M${x} 39.4v-4a1.7 1.7 0 0 1 3.4 0v4z`; if (i) rib += `M60 5Q${+(60 + (x - 61.1) * .92).toFixed(1)} 6 ${+(x - 1.1).toFixed(1)} 32`; }
      const L = [34, 86], dot = (x, y, r) => `M${+(x + r).toFixed(1)} ${y}a${r} ${r} 0 1 1 0-.1z`;
      return SCH.bg('#8A6630') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + `<path d="M1 40A59 49 0 0 1 119 40" fill="none" stroke="#6A4C22" stroke-width="4"/>`
        + SCH.g(`<path d="M6 40A54 44 0 0 1 114 40z" fill="${SCK.gold}"/>`, 1.6)
        + `<path d="${rib}" stroke="${SCK.goldLo}" stroke-width="1.1" fill="none"/>`
        + SCH.g(`<path d="M6 40A54 44 0 0 1 6.9 32H113.1A54 44 0 0 1 114 40z" fill="#6E4E22" stroke-width="1.2"/><circle cx="60" cy="5" r="4.6" fill="${SCK.goldLo}" stroke-width="1.2"/>
          <path d="M0 43.4V80h120V43.4z" fill="#D9C9A4"/><path d="M0 40h120v3.4H0z" fill="${SCK.stone}"/>
          <path d="M10 56${'v-6a3.4 3.4 0 0 1 6.8 0v6zm12.4 0'.repeat(9)}M7 76${'V67a6.4 6.4 0 0 1 12.8 0v9zm22 0'.repeat(5)}" fill="#2B2024" stroke-width="1.2"/>
          <path d="M0 58.4h120v2.6H0zM0 76h120v4H0z" fill="#5E7A62" stroke-width="1.2"/>`, 1.5)
        + `<path d="${win}" fill="#FFF3CF"/><path d="M60 2v6M57 5h6" stroke="${SCK.goldHi}" stroke-width="1.4"/>`
        + `<path d="M40 40h3.4l22 36h-6zM65 40h3.4l22 36h-6z" fill="#FFF3CF" opacity=".18"/>`
        + `<path d="${L.map(x => dot(x, 68, 7.4)).join('')}" fill="${SCK.goldHi}" opacity=".22"/>`
        + `<path d="${L.map(x => `M${x} 43.4v17l-8.6 7.6M${x} 60.4l8.6 7.6`).join('')}" stroke="${SCK.ink}" stroke-width=".7" fill="none"/>`
        + `<path d="${L.map(x => `M${x - 8.6} 68a8.6 2 0 1 0 17.2 0a8.6 2 0 1 0-17.2 0`).join('')}" stroke="${SCK.ink}" stroke-width="2.4" fill="none"/>`
        + `<path d="${L.map(x => `M${x - 8.6} 68a8.6 2 0 1 0 17.2 0a8.6 2 0 1 0-17.2 0`).join('')}" stroke="${SCK.goldLo}" stroke-width="1" fill="none"/>`
        + `<path d="${L.map(x => dot(x - 8.6, 67.6, 1.4) + dot(x - 4.4, 69.6, 1.4) + dot(x + 4.4, 69.6, 1.4) + dot(x + 8.6, 67.6, 1.4) + dot(x, 70, 1.4)).join('')}" fill="${SCK.goldHi}" stroke="${SCK.ink}" stroke-width=".5"/>` + '</g>';
    } },

  /* the qibla wall: a horseshoe-arched niche with gold and cream voussoirs in a tiled frame, glass lamps hanging, prayer rugs in rows */
  mihrab: {
    label: 'O nicho de oração de uma mesquita, com tapetes estendidos e lâmpadas penduradas',
    rx: /\b(mihrab|nicho de oracao|tapete de oracao|tapetes de oracao|mesquita)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const P = (r, a, cy = 30) => `${+(60 + r * Math.cos(a * Math.PI / 180)).toFixed(1)} ${+(cy + r * Math.sin(a * Math.PI / 180)).toFixed(1)}`, st = 280 / 15;
      let vous = '', shell = '', inner = '';
      for (let a = 130; a < 410; a += 2 * st) vous += `M${P(13, a)}L${P(18, a)}L${P(18, a + st)}L${P(13, a + st)}z`;
      for (let a = 200; a <= 340; a += 23.3) shell += `M60 34L${P(9, a, 34)}`;
      const rugs = { [SCK.burg]: [[7, 64, 22, 6], [91, 64, 22, 6]], [SCK.red]: [[35, 64, 22, 6], [63, 64, 22, 6], [6, 72, 30, 7.4], [84, 72, 30, 7.4]], [SCK.teal]: [[45, 72, 30, 7.4]] };
      const rr = Object.keys(rugs).map(c => `<path d="${rugs[c].map(([x, y, w, h]) => { inner += `M${x + 2.4} ${+(y + h - 1.6).toFixed(1)}V${y + 3.6}l${w / 2 - 2.4}-2 ${w / 2 - 2.4} 2V${+(y + h - 1.6).toFixed(1)}z`; return `M${x} ${y}h${w}v${h}h-${w}z`; }).join('')}" fill="${c}"/>`).join('');
      const lamp = x => `<path d="M${x - 6} 19h12l-3.4 4.6q6.4 2 6.4 7.4 0 5-9 5t-9-5q0-5.4 6.4-7.4z" fill="#9CC4B4"/><path d="M${x} 0v14l-5 5M${x} 14l5 5" fill="none" stroke-width=".8"/><path d="M${x} 27.4q-1.6 2.4 0 4.6q1.6-2.2 0-4.6z" fill="${SCK.goldHi}" stroke="${SCK.goldLo}" stroke-width=".6"/>`;
      return SCH.bg('#E6D8B6') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">`
        + `<path d="M0 52V20q0-14 16-18M120 52V20q0-14-16-18M30 52V22q0-12 4-16M90 52V22q0-12-4-16" stroke="${SCK.stoneLo}" stroke-width="1.2" fill="none" opacity=".7"/>`
        + `<path d="M0 50h120v12H0z" fill="${SCK.teal}"/><path d="M0 52${'l4 4 4-4'.repeat(5)}M80 52${'l4 4 4-4'.repeat(5)}" stroke="${SCK.gold}" stroke-width="1.1" fill="none"/>`
        + `<path d="M26 27a9 9 0 1 1 0-.1zM112 27a9 9 0 1 1 0-.1z" fill="${SCK.goldHi}" opacity=".25"/>` + SCH.g(lamp(17) + lamp(103), 1.3)
        + `<path d="M10.6 30h12.8M96.6 30h12.8" stroke="${SCK.gold}" stroke-width="1"/>`
        + SCH.g(`<path d="M38 4h44v58H38z" fill="${SCK.gold}"/><path d="M41 7h38v55H41z" fill="${SCK.teal}"/>`, 1.6)
        + `<path d="M42 10.6h37M42 15.6h37" stroke="${SCK.goldHi}" stroke-width="2.2" stroke-dasharray="2.2 2.8"/>`
        + SCH.g(`<path d="M${P(18, 130)}A18 18 0 1 1 ${P(18, 50)}V62H48.4z" fill="${SCK.white}"/>`, 1.5)
        + `<path d="${vous}" fill="${SCK.gold}"/>`
        + SCH.g(`<path d="M${P(13, 130)}A13 13 0 1 1 ${P(13, 50)}V62H51.6z" fill="#1E3A3E"/>`, 1.5)
        + `<path d="${shell}M51 34a9 9 0 0 1 18 0" stroke="${SCK.gold}" stroke-width="1.1" fill="none"/>`
        + SCH.g(`<path d="M48.6 62V44h2.8v18zM68.6 62V44h2.8v18z" fill="${SCK.goldHi}"/><path d="M47.6 44h4.8v-2h-4.8zM67.6 44h4.8v-2h-4.8z" fill="${SCK.gold}"/>`, 1)
        + `<path d="M0 62h120v18H0z" fill="#B48A55"/><path d="M0 62h120" stroke="${SCK.ink}" stroke-width="1.4"/>`
        + SCH.g(rr, 1.2) + `<path d="${inner}" fill="none" stroke="${SCK.goldHi}" stroke-width=".8"/>` + '</g>';
    } },

  /* a hall of scholars at night: the great brass astrolabe on its stand before the starry window, manuscripts stacked on the shelves, two sages reading on the carpet, a lamp burning */
  casa_sabedoria: {
    label: 'Sábios com livros e um astrolábio numa sala de arcos',
    rx: /\b(casa da sabedoria|astrolabio|astrolabios|bagda)\b/,
    draw: () => {
      const bk = ['', '', ''], cs = [SCK.burg, SCK.teal, SCK.white];
      [[7, 26, 16], [10, 37, 13], [6, 48, 17], [93, 26, 15], [96, 37, 16], [92, 48, 14]].forEach(([x, y, w], j) => {
        for (let i = 0; i < 2 + j % 2; i++) bk[(i + j) % 3] += `M${x + i} ${+(y - 2.6 * (i + 1)).toFixed(1)}h${w - 2 * i}v2.6h-${w - 2 * i}z`; });
      const sage = (x, robe, f, arm) => `<g transform="translate(${x} 66)${f < 0 ? ' scale(-1 1)' : ''}" stroke-width="1.4"><path d="M-13 0q0-8 7-9h1q-1.6-10 3-14h8q4 4 3 14q8 1 10 9z" fill="${robe}"/>`
        + `<circle cy="-26.6" r="4" fill="#B58560"/><path d="M-4.6 -28q0-6.4 4.6-6.4t4.6 6.4q-4.6-1.6-9.2 0z" fill="${SCK.white}"/><path d="M1.6 -24.4q1 4.6 4.4 1.4q-1-1.4-1-3z" fill="#3A2A20"/>`
        + `<path d="M4 -10.4l7-2 7 2v1.6l-7-2-7 2z" fill="${SCK.white}" stroke-width="1.1"/><path d="${arm}" stroke-width="4.4"/><path d="${arm}" stroke="${robe}" stroke-width="2.4"/></g>`;
      return SCH.bg('#E2CFA6')
        + SCH.g(`<path d="M36 54V29A28 28 0 0 1 60 1.3A28 28 0 0 1 84 29V54z" fill="${SCK.ochre}"/><path d="M40 54V30A26 26 0 0 1 60 4.7A26 26 0 0 1 80 30V54z" fill="${SCK.night}"/>
          <path d="M4 52V22A17 17 0 0 1 17 5.5A17 17 0 0 1 30 22V52zM90 52V22A17 17 0 0 1 103 5.5A17 17 0 0 1 116 22V52z" fill="#6A4426"/>`, 1.5)
        + `<path d="M4 26h26M4 37h26M4 48h26M90 26h26M90 37h26M90 48h26" stroke="${SCK.sand}" stroke-width="1.6"/>`
        + bk.map((d, i) => `<path d="${d}" fill="${cs[i]}" stroke="${SCK.ink}" stroke-width=".7"/>`).join('')
        + `<path d="M74 16h.1M70 24h.1M76 44h.1M45 44h.1" stroke="${SCK.goldHi}" stroke-width="2" stroke-linecap="round"/>`
        + `<path d="M0 62h120v18H0z" fill="${SCK.burg}"/><path d="M0 62h120" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M0 65h120M0 77h120" stroke="${SCK.gold}" stroke-width="1"/><path d="M4 71l3-3 3 3-3 3zM24 71l3-3 3 3-3 3zM90 71l3-3 3 3-3 3zM110 71l3-3 3 3-3 3z" fill="${SCK.gold}"/>`
        + `<circle cx="47" cy="15" r="6" fill="${SCK.goldHi}" opacity=".3"/>`
        + SCH.g(`<path d="M60 47v19M52 70l8-4 8 4" stroke-width="3.6" fill="none"/><path d="M60 47v19M52 70l8-4 8 4" stroke="${SCK.goldLo}" stroke-width="1.6" fill="none"/>
          <path d="M47 0v9l-4 4M47 9l4 4" stroke-width=".8" fill="none"/><path d="M42 13h10q0 5-5 5t-5-5z" fill="${SCK.gold}"/><path d="M47 12.6q-1.6-2.6 0-5q1.6 2.4 0 5z" fill="${SCK.goldHi}" stroke-width=".6"/>
          <path d="M55 20q0-5 5-5t5 5z" fill="${SCK.gold}"/><circle cx="60" cy="13" r="2" fill="none"/><circle cx="60" cy="32" r="14" fill="${SCK.gold}" stroke-width="1.6"/><circle cx="60" cy="32" r="11.6" fill="${SCK.goldHi}"/>`, 1.2)
        + `<circle cx="60" cy="32" r="12.8" fill="none" stroke="${SCK.goldLo}" stroke-width="2.2" stroke-dasharray=".8 2.6"/><path d="M49.4 37q10.6-9 21.2 0M53 33q7-5.4 14 0" stroke="${SCK.goldLo}" stroke-width=".9" fill="none"/>`
        + SCH.g(`<circle cx="60" cy="28.4" r="7.6" fill="none" stroke-width="1.4"/><path d="M48.4 32h23.2" fill="none" stroke-width="1.1"/><path d="M46.6 35.4 73.4 28.6" stroke-width="1.6"/><circle cx="60" cy="32" r="1.4" fill="${SCK.goldLo}"/>`
          + `<g fill="none">` + sage(24, SCK.teal, 1, 'M-1 -19 7 -11') + sage(96, '#8C3A3A', -1, 'M-1 -19 11 -23') + `</g>`, 1)
        ;
    } },

  /* the smithy open to the street: forge aglow under its hood, the master with his hammer up, the apprentice holding the hot iron to the anvil, tools on the rack, the sign of the trade overhead */
  oficina_artesao: {
    label: 'A oficina de um mestre ferreiro com um aprendiz junto à bigorna',
    rx: /\b(oficina|artesao|artesaos|aprendiz|aprendizes|bigorna|ferreiro)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const L = (d, c, w) => `<path d="${d}" stroke-width="${w + 2}"/><path d="${d}" stroke="${c}" stroke-width="${w}"/>`;
      return SCH.bg('#4A3222') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">`
        + `<path d="M12 10v62M24 10v62M48 10v62M72 10v62M96 10v62M108 10v62" stroke="#2E1E12" stroke-width="1" opacity=".6"/>`
        + `<path d="M40 46a20 20 0 1 1 0-.1z" fill="${SCK.goldHi}" opacity=".12"/><path d="M32 46a12 12 0 1 1 0-.1z" fill="${SCK.goldHi}" opacity=".18"/><path d="M0 70h120v10H0z" fill="#6E5640"/>`
        + SCH.g(`<path d="M34 17h30v3H34z" fill="${SCK.wood}"/><path d="M38 22h14v2.4H38z" fill="#7A4E2C"/><path d="M52 21h5v5h-5zM40 20l2 13h1.6l-1.2-13zM45 20l-2 13h-1.6l1.2-13zM58 21v5a3.4 3.4 0 0 0 6.8 0v-5h-2v5a1.4 1.4 0 0 1-2.8 0v-5z" fill="#7C858D" stroke-width="1"/>
          <path d="M10 10h20l-3 22H13z" fill="${SCK.stoneLo}"/><path d="M6 66V46h28v20z" fill="${SCK.stone}"/><path d="M7 46q3-6 7-2q3-6 7-1q4-5 7 0q3-3 5 3z" fill="${SCK.red}"/>
          <path d="M53 62h14v14H53z" fill="#9A6A40"/><path d="M37 52.6q6-1.6 11-1.6h24v4.4q-4 1-6 3v2h3.6V64H52.4v-3.6H56v-2q-2-2.4-6-3.2q-6-.2-13-2.6z" fill="#7C858D" stroke-width="1.5"/>`, 1.2)
        + `<path d="M12 44q2-5 4-1M19 43q2-6 4-1M26 44q1-4 3 0" stroke="${SCK.goldHi}" stroke-width="1.6" fill="none"/><path d="M9 52h22M9 59h22M16 46v6M24 52v7M55 70h10" stroke="${SCK.ink}" stroke-width=".8" opacity=".4"/><path d="M50 51.6h21" stroke="#B9C0C6" stroke-width="1"/>`
        + SCH.g(`<path d="M54 49.6h11" stroke-width="3.6"/><path d="M54 49.6h11" stroke="${SCK.goldHi}" stroke-width="1.8"/><path d="M62 49.6h3" stroke="${SCK.red}" stroke-width="1.6"/><path d="M66 46l3-3M68 49l4-1M63 45v-4M69 51.4l3 1.6" stroke="${SCK.goldHi}" stroke-width="1.1"/>`, 1)
        + SCH.g(`<g fill="none">${L('M39 64l-2 12M43 64l2 12', '#5A4A3A', 2.4)}${L('M82 62l-3 14M88 62l3 14', '#4A3A2E', 2.8)}</g>`
          + `<path d="M35 65q-1-12 3-17h7q3 5 3 17z" fill="${SCK.red}"/><circle cx="41" cy="43.6" r="3.6" fill="#D9A77E"/><path d="M37.4 43q0-4.6 3.6-4.6q3.6 0 3.6 3.4q-3 0-3.4 1.6z" fill="#7A4A24"/>`
          + `<path d="M78 64q-1-16 3-21h9q4 5 3 21z" fill="${SCK.white}"/><path d="M78.4 50h11.6l2 15H76.6z" fill="#7A4E2C"/><circle cx="85" cy="37.4" r="4.4" fill="#D9A77E"/>`
          + `<path d="M80.6 36.6q0-5.4 4.6-5.4q4.4 0 4.6 4.4q-2 .4-3-1.6q-2 2.6-6.2 2.6zM80.8 38.6q1 5 4 4.6q-.4-2-1-3z" fill="#3A2614"/>`
          + `<g fill="none">${L('M42 52l6 1.6', SCK.red, 2.2)}<path d="M47 53l8-2.6M47 54l8-2.4" stroke-width="1.2"/>${L('M83 45l-6-16M82 46l-5 8', SCK.white, 2.6)}${L('M77 29l-5-10', SCK.wood, 1.4)}</g>`
          + `<path d="M66.6 21.6l9-4.4 1.4 3-9 4.4z" fill="#7C858D" stroke-width="1.2"/>`
          + `<path d="M0 0h120v10H0z" fill="#E4D6B4"/><path d="M0 10h120" stroke-width="2.4"/><path d="M0 8h120M10 10l8-10M28 0l8 10M84 10l8-10M102 0l8 10" stroke="#5A3A22" stroke-width="2.4"/>`
          + `<path d="M0 10h6v70H0zM114 10h6v70h-6z" fill="#6A4426"/><path d="M114 14H97M100 14v3M110 14v3" stroke-width="1.2" fill="none"/><path d="M97 17h16v10H97z" fill="${SCK.ochre}"/>`
          + `<path d="M101 25l5-5" stroke-width="1.6"/><path d="M103.4 18.6l3-3 3 3-3 3z" fill="${SCK.ink}" stroke-width=".6"/>`, 1.4) + '</g>';
    } },

  /* the abbey crowning its mountain, bell tower and church; below, the curved terraces where hooded monks hoe and carry their baskets */
  monte_cassino: {
    label: 'Uma abadia no alto do monte, com monges trabalhando nos campos abaixo',
    rx: /\b(mosteiro|mosteiros|abadia|monte cassino|monge|monges)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const id = SCH.uid('mc'), hill = 'M-2 80V62Q14 48 28 38Q36 31 42 29H82Q88 31 96 38Q110 48 122 60V80z', cs = ['#6E7E48', '#8EA766', SCK.green, '#B5A060', '#7E9A5E'];
      let ter = '', wall = '', vine = '';
      for (let i = 0; i < 5; i++) { const y = 30 + i * 9;
        ter += `<path d="M-2 ${y + 5}Q60 ${y - 6} 122 ${y + 5}V${y + 15}Q60 ${y + 4} -2 ${y + 15}z" fill="${cs[i]}"/>`;
        wall += `M-2 ${y + 14}Q60 ${y + 3} 122 ${y + 14}`; if (i % 2) vine += `M-2 ${y + 10}Q60 ${y - 1} 122 ${y + 10}`; }
      const monk = (x, y, s, f, tool) => `<g transform="translate(${x} ${y}) scale(${f * s} ${s})">${tool}<path d="M-5 0q-1-10 1-15q1.6-4 4-4q3 0 4 4q2 5 1 15z" fill="#463A33"/><circle cx="1.8" cy="-17.4" r="2.4" fill="#D9A77E" stroke-width="1"/><path d="M-3.4 -15q-1-7.4 3.8-7.4q4 0 4.4 4q-2.6-1-3.6 2z" fill="#463A33"/></g>`;
      return SCH.bg('#C9DCE0') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + `<ellipse cx="104" cy="10" rx="14" ry="3" fill="${SCK.white}" opacity=".6"/>`
        + `<path d="M-2 48 16 30l8 6 10-12 8 6v30H-2zM82 30l12-12 10 8 8-6 10 10v30H82z" fill="#A9BCC0"/>`
        + `<clipPath id="${id}"><path d="${hill}"/></clipPath><g clip-path="url(#${id})">${ter}
          <path d="${vine}" stroke="#46562A" stroke-width="2.2" stroke-dasharray="2.4 3" fill="none"/>
          <path d="${wall}" stroke="${SCK.ink}" stroke-width="3.4" fill="none"/><path d="${wall}" stroke="${SCK.stone}" stroke-width="1.6" fill="none"/></g>`
        + SCH.g(`<path d="${hill}" fill="none"/>
          <path d="M30 31V22h62v9z" fill="${SCK.stone}"/><path d="M34 22V11h40v11z" fill="#E4D9C2"/><path d="M33 11l3-3.4h36l3 3.4z" fill="#A8553A"/>
          <path d="M74 22V10h16v12z" fill="#E4D9C2"/><path d="M72.6 10 82 2.6l9.4 7.4z" fill="#A8553A"/>
          <path d="M44 22V6h8v16z" fill="#D6CCB5"/><path d="M43 6l5-5.6 5 5.6z" fill="#A8553A"/>`, 1.4)
        + `<path d="M45.6 8h1.8v3.4h-1.8zM48.6 8h1.8v3.4h-1.8zM78 18h2v4h-2zM84 18h2v4h-2z" fill="${SCK.ink}"/><path d="M37 14.6h32M37 19.6h32" stroke="${SCK.ink}" stroke-width="3" stroke-dasharray="2 3"/>`
        + `<circle cx="82" cy="13.6" r="2" fill="${SCK.ink}"/><path d="M36 26.6h54" stroke="${SCK.ink}" stroke-width=".8" stroke-dasharray="4 6" opacity=".45"/>`
        + SCH.g(monk(70, 43, .5, -1, '') + monk(98, 54, .6, 1, '')
        + monk(30, 78, 1.1, 1, `<path d="M3 -12l9 12" stroke-width="2.8"/><path d="M3 -12l9 12" stroke="${SCK.wood}" stroke-width="1.2"/><path d="M9 1.6l6-1-1-3z" fill="#7C858D" stroke-width="1"/>`)
        + monk(84, 77, 1.1, -1, `<path d="M-9 -16q2-4 4-1q2-3 4 1z" fill="#5E8C3A" stroke-width="1"/><path d="M-1 -5h-9l-1-11h11z" fill="${SCK.ochre}"/><path d="M-10 -12h9M-10 -8.6h9" stroke="#8A6A3A" stroke-width=".8"/>`), 1.3) + '</g>';
    } },

  /* a street in the plague year: gabled half-timbered houses with every door shut and shuttered, one boarded with planks, a handcart left in the road, the church tower beyond */
  peste_negra: {
    label: 'Uma rua medieval vazia, com portas fechadas e uma carroça parada',
    rx: /\b(peste|carroca|portas fechadas)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      let stone = '', tim = '';
      const house = (x, w, apex, plaster, roof) => {
        const m = x + w / 2;
        stone += `M${x} 70V50h${w}v20z`;
        tim += `M${x - 1.6} 30h${w + 3.2}M${x - 1.6} 50h${w + 3.2}M${x + 1} 30v20M${x + w - 1} 30v20M${m} ${apex + 2}V50M${x + 1} 50L${m} 32M${x + w - 1} 50L${m} 32`;
        return `<path d="M${x - 1.6} 50V30h${w + 3.2}v20zM${x - 2.4} 30L${m} ${apex}L${m + w / 2 + 2.4} 30z" fill="${plaster}"/><path d="M${x - 4} 31.4L${m} ${apex - 2}L${m + w / 2 + 4} 31.4l-2 1.6L${m} ${apex + 1.4}L${x - 2} 33z" fill="${roof}"/>`;
      };
      const hs = house(0, 24, 8, '#E4D6B4', '#5E5A55') + house(28, 20, 16, '#D9C59C', '#8A4A34') + house(72, 22, 12, '#E8DCC0', '#8A4A34') + house(100, 22, 18, '#D9C9A4', '#5E5A55');
      const sh = [3, 14, 34.5, 75, 86, 107.5];
      return SCH.bg('#C9C7B9') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + `<ellipse cx="30" cy="8" rx="26" ry="4" fill="#B5B3A6"/><ellipse cx="96" cy="14" rx="22" ry="3.4" fill="#B5B3A6"/>`
        + SCH.g(`<path d="M52 70V12h16v58z" fill="#B3A890"/><path d="M50.6 12 60 -1l9.4 13z" fill="#5E5A55"/><path d="M50 12h20v3H50z" fill="${SCK.stoneLo}" stroke-width="1"/>`, 1.4)
        + `<path d="M56 26v-4a4 4 0 0 1 8 0v4z" fill="${SCK.ink}"/><path d="M50 50h20v20H50z" fill="#6E6656"/>`
        + SCH.g(`<path d="${stone}" fill="${SCK.stone}"/>${hs}`, 1.4) + `<path d="${tim}" stroke="#4A3020" stroke-width="1.6" fill="none"/>`
        + SCH.g(`<path d="${sh.map(x => `M${x} 36h7v8h-7z`).join('')}" fill="${SCK.wood}" stroke-width="1.1"/><path d="${sh.map(x => `M${x + 3.5} 36v8`).join('')}" stroke-width=".8"/>
          <path d="M8 70V60a4 4 0 0 1 8 0v10zM34 70V58h8v12zM78 70V60a4 4 0 0 1 8 0v10zM106 70V58h8v12z" fill="#6A4426"/><path d="M32.4 59.4l11.2-.8v2l-11.2.8zM32.4 65.4l11.2.8v2l-11.2-.8z" fill="#B48A55" stroke-width=".9"/>
          <path d="M35 60.4h.1M41 59.8h.1M35 66.2h.1M41 66.8h.1" stroke-width="1.2"/>`, 1.3)
        + `<path d="M0 70h120v10H0z" fill="#8E877A"/><path d="M0 70h120" stroke="${SCK.ink}" stroke-width="1.4"/><path d="M6 74h8M22 77h10M40 73h8M60 76h12M84 74h6M100 77h12" stroke="#6E685C" stroke-width="1.4"/>`
        + SCH.g(`<path d="M86 72l26-8 1 4-24 8z" fill="#8A6A44"/><path d="M90 66l22-6.6 1.2 4.6-22 6.6z" fill="#A87C4E"/><path d="M90 70.6 70 76M104.4 72a6.4 6.4 0 1 1 0-.1z" stroke-width="2.6" fill="none"/>
          <path d="M90 70.6 70 76M104.4 72a6.4 6.4 0 1 1 0-.1z" stroke="${SCK.wood}" stroke-width="1.1" fill="none"/><path d="M98 65.6v12.8M91.6 72h12.8M93.5 67.5l9 9M102.5 67.5l-9 9" stroke-width=".9"/><circle cx="98" cy="72" r="1.6" fill="${SCK.ink}"/>`, 1.4) + '</g>';
    } },

  /* a dhow running before the monsoon: the great lateen sail on its long yard, the sewn hull, a palm-fringed shore and a white town beyond the turquoise sea */
  dhow_oceano: {
    label: 'Um barco de vela latina navegando no oceano Índico',
    rx: /\b(dhow|pangaio|vela latina)\b/,
    draw: () => SCH.bg('#BFDCDC') + SCH.sun(100, 14, 8, '#F4E3B6')
      + `<path d="M0 54V47.2q16-2.6 30 1.8l4 5z" fill="${SCK.sand}"/>`
      + SCH.g(`<path d="M2 50v-6h6v6zM9 50v-9h7v9zM17 50v-5h6v5z" fill="${SCK.white}" stroke-width="1"/><path d="M11 41a1.6 1.6 0 0 1 3 0z" fill="${SCK.white}" stroke-width="1"/>
        <path d="M27 52q1-8-1-14" fill="none" stroke="${SCK.wood}" stroke-width="1.6"/>`, 1)
      + `<path d="M3 47h1.4v2H3zM11 46h1.6v2.4H11zM19 47h1.4v2H19z" fill="${SCK.ink}"/>`
      + `<path d="M26 38q-6-3-9 1M26 38q4-5 9-2M26 38q-1-5 3-7M26 38q6 0 7 4" stroke="#4E7A3E" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
      + `<path d="M0 52h120v28H0z" fill="#3F8F8F"/>` + SCH.waves(66, '#7FC0B8', 1.4) + SCH.waves(75, '#62AAA6', 1.4)
      + `<path d="M8 58h10M104 60h10" stroke="#7FC0B8" stroke-width="1.2"/><g transform="translate(20 8) scale(.84)">`
      + SCH.g(`<path d="M69 57 77 26" stroke-width="2.6" fill="none"/>
        <path d="M24 7Q60 22 101 41Q66 47 34 51Q34 28 24 7z" fill="${SCK.white}"/>`, 1.5)
      + `<path d="M36 15l1 35M48 21l-1 29M60 27l-2 22M72 32.6l-3 15.4M84 37l-3 9" stroke="${SCK.stoneLo}" stroke-width=".8"/>`
      + `<path d="M20 5 104 43" stroke="${SCK.ink}" stroke-width="3"/><path d="M20 5 104 43" stroke="${SCK.wood}" stroke-width="1.4"/><path d="M101 41 104 54M34 51l-4 6" stroke="${SCK.ink}" stroke-width=".8"/>`
      + SCH.g(`<path d="M16 50q8 2 14 1h68q6 0 12-8l2 1q-4 9-10 15q-8 6-30 6H38q-14 0-18-6z" fill="${SCK.wood}"/>
        <path d="M17 50l-5-8 2.4-1 4 7zM110 43l3-6 2 1-3 7z" fill="${SCK.wood}"/>`, 1.5)
      + `<path d="M22 55.4q20 3 80-2" stroke="${SCK.ink}" stroke-width=".9" fill="none" opacity=".6"/><path d="M24 55.6q20 3 76-2" stroke="${SCK.goldHi}" stroke-width="1.2" fill="none" stroke-dasharray="1 2.4"/><path d="M30 60q20 2 64 0" stroke="${SCK.ink}" stroke-width=".9" fill="none" opacity=".5"/>`
      + '</g>' },

  /* the poem's three realms at night: the dark wood closing in at the edges, the funnel of the abyss opening below, and the mountain climbing in ledges to the garden lit from the heavens */
  selva_dante: {
    label: 'Uma floresta escura na encosta de uma montanha que sobe em terraços até o céu',
    rx: /\b(inferno|purgatorio|paraiso|selva escura)\b/,
    draw: () => {
      const fc = SCH.uid('fc');
      const T = [[38, 30, 19, 14, -1.6, '#9A9584'], [47, 38, 28, 22, 1.6, '#878272'], [57, 47, 37, 31, -1.6, '#9A9584'], [68, 57, 47, 40, 1.6, '#878272']];
      let led = '', crack = '';
      const tiers = T.map(([b, t, wb, wt, d, c], i) => { const m = (t + b) / 2 - 1, j = (wt + wb) / 2;
        led += `M${68 - wt} ${t - d}Q68 ${t + 5} ${68 + wt} ${t + d}`; crack += `M${68 - wt + 6} ${t + 3}v${b - t - 5}M${68 + wt - 9} ${t + 4}v${b - t - 6}`;
        return `<path d="M${68 - wt} ${t - d}Q68 ${t + 5} ${68 + wt} ${t + d}L${68 + j + (i % 2 ? 2.4 : -1)} ${m}L${68 + wb} ${b + 6}H${68 - wb}L${68 - j - (i % 2 ? -1 : 2.4)} ${m}z" fill="${c}"/>`; }).join('');
      const leaf = (x, y) => `M${x - 6} ${y + 2}q-1-6 5-6q2-4 6-1q5 0 4 5q2 4-3 4h-9q-3 0-3-2z`, A = 'M7 82q-5-14 1-26q5-10-1-22', B = 'M8 50q-6-4-8-14M8 40q8-4 11-14M7 33q-4-6-2-14';
      const tree = f => `<g transform="matrix(${f} 0 0 1 ${f < 0 ? 120 : 0} 0)">` + SCH.g(`<g fill="none"><path d="${A}" stroke-width="6.4"/><path d="${B}" stroke-width="4.2"/><path d="${A}" stroke="#4A3A2E" stroke-width="4"/><path d="${B}" stroke="#4A3A2E" stroke-width="1.8"/></g>
        <path d="${leaf(0, 32)}${leaf(18, 22)}${leaf(5, 15)}" fill="#334128"/>`, 1.3) + `</g>`;
      return SCH.bg('#232B42') + `<clipPath id="${fc}"><path d="M0 0h120v80H0z"/></clipPath><g clip-path="url(#${fc})">` + `<circle cx="68" cy="12" r="34" fill="#30395A"/><circle cx="68" cy="12" r="22" fill="#4C5878"/><circle cx="68" cy="12" r="12.6" fill="#C9C3A0"/><circle cx="68" cy="12" r="7.6" fill="${SCK.goldHi}"/>`
        + `<path d="M30 6h.1M108 5h.1M22 44h.1M112 40h.1" stroke="${SCK.white}" stroke-width="1.4" stroke-linecap="round"/>`
        + SCH.g(`<path d="M57 30.4L62 22h12l5 8.4z" fill="#7E9A5E"/>${tiers}`, 1.4) + `<path d="${led}" stroke="${SCK.ink}" stroke-width="3.4" fill="none"/><path d="${led}" stroke="#D8D0B2" stroke-width="1.6" fill="none"/>`
        + `<path d="${crack}" stroke="${SCK.ink}" stroke-width=".8" opacity=".35"/>`
        + SCH.g(`<path d="M59.6 23.4q-1-5 3.4-5.6q1-4.4 5-3.6q3.4-3 6.4.6q4.4-.4 4.4 4q3 2.4.6 4.6z" fill="${SCK.green}"/>`, 1.3) + `<path d="M64 20q2-2 4 0M69 17.6q2-2 4 0" stroke="${SCK.olive}" stroke-width="1" fill="none"/>`
        + SCH.g(`<path d="M-2 64q32-4 62 0t62-1v19H-2z" fill="#22281C"/>`, 1.4)
        + `<path d="M66 80q4-6 6-10q2-3 0-6h4q2 3 0 7q-2 4-2 9z" fill="#8C8470"/>`
        + SCH.g(`<ellipse cx="36" cy="72" rx="19" ry="6" fill="#120C0E"/>`, 1.4)
        + `<g fill="none" stroke="#5A2A22" stroke-width="1"><ellipse cx="36" cy="72.6" rx="14" ry="4.2"/><ellipse cx="36" cy="73.2" rx="9" ry="2.6"/></g><ellipse cx="36" cy="73.6" rx="4.4" ry="1.2" fill="#8A2A1E"/>`
        + tree(1) + tree(-1) + '</g>';
    } },
});
