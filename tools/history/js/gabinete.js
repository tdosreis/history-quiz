
/* ═══════════════════════════════════════════════════
   GABINETE DE CURIOSIDADES — the games that are not rounds of questions,
   kept the way a collector of the 1600s kept wonders: a walnut cabinet,
   each one in its niche on velvet, with a brass label under it.
═══════════════════════════════════════════════════ */
let fromGab = false;   // a game opened from the cabinet goes back to it
const GAB = [
  { id: 'gab-tf', n: 'Super Trunfo', d: 'Suas figurinhas viram cartas', art: 'trophy', go: () => startTrunfo(),
    tail: () => stats.tfWins > 0 ? stats.tfWins + (stats.tfWins === 1 ? ' vitória' : ' vitórias') : 'Contra o Arquivista', isNew: () => !(stats.tfGames > 0) },
  { id: 'gab-cc', n: 'Cara a cara', d: 'Adivinhe quem é o mistério', art: 'telescope', go: () => startCaraCara(),
    tail: () => stats.ccBest > 0 ? 'Recorde: ' + stats.ccBest : 'Dezesseis rostos', isNew: () => !(stats.ccGames > 0) },
  { id: 'gab-rio', n: 'Rio do tempo', d: 'Pesque o século certo', art: 'ship', go: () => startRio(),
    tail: () => stats.rioBest > 0 ? 'Recorde: ' + stats.rioBest : 'Reflexo e História', isNew: () => !(stats.rioGames > 0) },
  { id: 'gab-mt', n: 'Máquina do tempo', d: 'Aventuras em quatro momentos', art: 'hourglass', go: () => startMaquina(),
    tail: () => { const n = Object.keys(LS.get('maquinaFins', {})).length; return n ? n + (n === 1 ? ' final visto' : ' finais vistos') : 'Para quando vamos?'; }, isNew: () => !(stats.mtTrips > 0) },
  { id: 'gab-sg', n: 'Seis graus', d: 'De uma figura a outra, por contemporâneos', art: 'chains', go: () => startGraus(!sgDiaRes()),
    tail: () => sgDiaRes() ? 'Corrente do dia feita' : 'Corrente do dia nº ' + dayIndex(), isNew: () => !(stats.sgGames > 0) },
  { id: 'gab-sf', n: 'Selfie de época', d: 'Você num retrato a óleo', art: 'palette', go: () => startSelfie(),
    tail: () => stats.selfies > 0 ? stats.selfies + (stats.selfies === 1 ? ' retrato' : ' retratos') : 'Câmera e fantasia', isNew: () => !(stats.selfies > 0) },
  { id: 'gab-mm', n: 'Mímica', d: 'Para jogar em turma', art: 'masks', go: () => startMimica(),
    tail: () => stats.mmGames > 0 ? stats.mmGames + (stats.mmGames === 1 ? ' festa' : ' festas') : 'Dois times', isNew: () => !(stats.mmGames > 0) },
  { id: 'gab-mf', n: 'Mito ou fato?', d: 'Arraste a carta: lenda ou verdade?', art: 'scales', go: () => startMito(),
    tail: () => LS.get('mfBest', 0) > 0 ? 'Recorde: ' + LS.get('mfBest', 0) : 'Novo', isNew: () => !(stats.mfGames > 0) },
  { id: 'gab-duo', n: 'Duelo a dois', d: 'Dois jogadores, um celular', art: 'sword', go: () => startDuoSetup(),
    tail: () => stats.duoGames > 0 ? stats.duoGames + (stats.duoGames === 1 ? ' duelo' : ' duelos') : 'Passe o celular' },
  { id: 'gab-ret', n: 'Retrato de época', d: 'Quem você seria na História?', art: 'bust', go: () => startRetrato(),
    tail: () => { const r = LS.get('retrato', null), f = r && PL.find(p => p.id === r.id); return f ? 'Você foi ' + f.n : 'Oito perguntas'; } },
  { id: 'gab-gz', n: 'Gazeta do seu dia', d: 'A primeira página de qualquer data', art: 'quill', go: () => startGazeta(),
    tail: () => stats.gazetas > 0 ? stats.gazetas + (stats.gazetas === 1 ? ' edição' : ' edições') : 'Seu aniversário?' },
];
function gabineteHtml() {
  return `
  <div class="pg gab-pg">
    ${topbar('Curiosidades')}
    <div class="gab-in">
      <div class="gab-pedim" aria-hidden="true"><svg viewBox="0 0 300 34" preserveAspectRatio="none"><path d="M0 34L150 3 300 34z" fill="var(--gab-wood)"/><path d="M18 31L150 8l132 23" fill="none" stroke="var(--gab-brass)" stroke-width="1.4"/><circle cx="150" cy="22" r="4.2" fill="var(--gab-brass)"/></svg></div>
      <div class="gab-title"><span class="display"><em>Gabinete de curiosidades</em></span></div>
      <div class="gab-case">
        ${GAB.map((g, i) => `<button id="${g.id}" class="gab-niche" type="button" style="--i:${i}">
          <span class="gab-velvet"><span class="gab-obj">${(QICON[g.art] || QICON.scroll)(84)}</span>${g.isNew && g.isNew() ? '<span class="gab-new">Novo</span>' : ''}</span>
          <span class="gab-label"><b>${g.n}</b><small>${g.d}</small><span class="gab-tail">${_esc(g.tail())}</span></span>
        </button>`).join('')}
      </div>
    </div>
  </div>`;
}
function wireGabinete() {
  const ready = tapArmed();
  GAB.forEach(g => document.getElementById(g.id)?.addEventListener('click', () => { if (ready()) { snd.select(); fromGab = true; g.go(); } }));
}
