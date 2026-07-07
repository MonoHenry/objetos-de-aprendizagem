/*
 * app.js — Lógica do Quiz de Computação.
 * Implementa o modelo instrucional (statechart): abertura, 4 fases com
 * introdução explicativa, feedback em até 2 tentativas, "explorar
 * componentes", modo revisão (voltar às páginas anteriores), encerramento
 * com autoavaliação, mensagem de uso seguro e relatório do professor.
 * Vanilla JS, sem dependências — funciona offline e no GitHub Pages.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'quiz-computacao-estado-v1';
  var app = document.getElementById('app');

  // ---- Estado ----------------------------------------------------------
  var estado = null;

  // Posição do modo revisão (não persistida): null = tela ao vivo;
  // número = índice em paginasAnteriores().
  var revisaoPos = null;

  function estadoInicial() {
    return {
      criterio: 70,            // % mínimo para considerar a fase dominada
      faseIdx: 0,              // índice em FASES
      subtela: 'intro',        // posição dentro da fase: 'intro' | 'questao' | 'resumo'
      questaoIdx: 0,           // índice da questão dentro da fase
      tentativas: 0,           // tentativas na questão atual (0, 1 ou 2)
      escolhasAtual: [],       // alternativas já escolhidas na questão atual
      registros: {},           // qid -> { fase, req, primeiraCorreta, acertou, tentativas, escolhas }
      iniciadoEm: Date.now(),
      tempoMs: 0,              // tempo acumulado (atualizado ao salvar)
      autoavaliacao: null,     // respostas da autoavaliação
      concluido: false,
    };
  }

  function questoesDaFase(faseId) {
    return QUESTOES.filter(function (q) { return q.fase === faseId; });
  }

  // ---- Persistência (pausar / retomar — estado de histórico "H") --------
  function salvar() {
    if (!estado) return;
    estado.tempoMs = Date.now() - estado.iniciadoEm + (estado._tempoBase || 0);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(estado)); } catch (e) { /* ignora */ }
  }

  function carregar() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var e = JSON.parse(raw);
      // Migração de estados salvos por versões anteriores (iterações 1 e 2).
      if (e && typeof e === 'object') {
        if (!e.subtela) e.subtela = 'questao';
        if (!e.escolhasAtual) e.escolhasAtual = [];
      }
      return e;
    } catch (e) { return null; }
  }

  function limpar() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignora */ }
  }

  // ---- Utilidades ------------------------------------------------------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') {
          node.addEventListener(k.slice(2), attrs[k]);
        } else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function limparTela() { app.innerHTML = ''; }

  function formatarTempo(ms) {
    var s = Math.round(ms / 1000);
    var m = Math.floor(s / 60);
    return m + 'min ' + (s % 60) + 's';
  }

  // ---- Roteador da tela "ao vivo" ---------------------------------------
  // Decide qual tela mostrar a partir do estado salvo. Também é o que
  // permite retomar corretamente de qualquer ponto (inclusive após a fase 4).
  function renderLive() {
    revisaoPos = null;
    if (!estado) { telaAbertura(false); return; }
    if (estado.concluido) { telaRelatorio(); return; }
    if (estado.faseIdx >= FASES.length) {
      if (estado.autoavaliacao) telaSeguranca();
      else telaAutoavaliacao();
      return;
    }
    if (estado.subtela === 'intro') renderIntroFase(estado.faseIdx, false);
    else if (estado.subtela === 'resumo') telaResumoFase();
    else renderQuestao();
  }

  // ---- Navegação "Voltar" (modo revisão) --------------------------------
  // Lista todas as páginas anteriores à tela ao vivo: a introdução de cada
  // fase e as questões já respondidas. Rever não altera a pontuação.
  function paginasAnteriores() {
    var pags = [];
    if (!estado) return pags;
    var faseLimite = Math.min(estado.faseIdx, FASES.length - 1);
    for (var f = 0; f <= faseLimite; f++) {
      var ehAtual = f === estado.faseIdx;
      if (ehAtual && estado.subtela === 'intro') break; // a intro atual é a tela ao vivo
      pags.push({ tipo: 'intro', faseIdx: f });
      var qs = questoesDaFase(FASES[f].id);
      var limite = (ehAtual && estado.subtela === 'questao') ? estado.questaoIdx : qs.length;
      for (var i = 0; i < limite; i++) pags.push({ tipo: 'questao', faseIdx: f, questaoIdx: i });
    }
    return pags;
  }

  function entrarRevisao() {
    var pags = paginasAnteriores();
    if (!pags.length) return;
    revisaoPos = pags.length - 1;
    renderRevisao();
  }

  function renderRevisao() {
    var pags = paginasAnteriores();
    if (revisaoPos == null || revisaoPos < 0 || revisaoPos >= pags.length) { renderLive(); return; }
    var pag = pags[revisaoPos];
    if (pag.tipo === 'intro') renderIntroFase(pag.faseIdx, true);
    else renderQuestaoRevisao(pag);
  }

  function revisaoAnterior() {
    if (revisaoPos > 0) { revisaoPos -= 1; renderRevisao(); }
  }

  function revisaoProxima() {
    var pags = paginasAnteriores();
    revisaoPos += 1;
    if (revisaoPos >= pags.length) renderLive();
    else renderRevisao();
  }

  function bannerRevisao() {
    return el('div', { class: 'banner-revisao', role: 'status' }, [
      '👀 Modo revisão — você está revendo páginas anteriores. Nada aqui muda a sua pontuação.',
    ]);
  }

  function navRevisao() {
    return el('div', { class: 'botoes-centro' }, [
      revisaoPos > 0 ? el('button', { class: 'btn btn-ghost', onclick: revisaoAnterior }, ['⬅️ Anterior']) : null,
      el('button', { class: 'btn btn-ghost', onclick: revisaoProxima }, ['Próxima ➡️']),
      el('button', { class: 'btn btn-primario', onclick: renderLive }, ['▶️ Continuar o quiz']),
    ]);
  }

  // ---- Barra superior (progresso + ações) ------------------------------
  function barraProgresso() {
    var fase = FASES[estado.faseIdx];
    var passos = el('div', { class: 'passos' }, FASES.map(function (f, i) {
      var cls = 'passo' + (i < estado.faseIdx ? ' feito' : '') + (i === estado.faseIdx ? ' atual' : '');
      return el('div', { class: cls, title: 'Fase ' + f.id + ' — ' + f.titulo }, [
        el('span', { class: 'passo-icone' }, [f.icone]),
        el('span', { class: 'passo-nome' }, [f.titulo]),
      ]);
    }));
    var temAnteriores = paginasAnteriores().length > 0;
    var acoes = el('div', { class: 'acoes' }, [
      temAnteriores ? el('button', { class: 'btn btn-ghost', onclick: entrarRevisao }, ['⬅️ Voltar']) : null,
      el('button', { class: 'btn btn-ghost', onclick: abrirExplorar }, ['🧭 Explorar componentes']),
      el('button', { class: 'btn btn-ghost', onclick: pausar }, ['⏸️ Pausar']),
    ]);
    return el('header', { class: 'topo' }, [
      el('div', { class: 'topo-titulo' }, ['Fase ' + fase.id + ' · ' + fase.titulo]),
      passos,
      acoes,
    ]);
  }

  // ---- Telas -----------------------------------------------------------

  // Abertura (Gagné: ganhar atenção, informar objetivos, recordar pré-requisitos)
  function telaAbertura(retomavel) {
    limparTela();
    var card = el('div', { class: 'card abertura' }, [
      el('div', { class: 'emoji-grande' }, ['💻']),
      el('h1', null, ['Quiz de Computação']),
      el('p', { class: 'subtitulo' }, ['Vamos descobrir o mundo da Computação jogando! Você vai passar por 4 fases.']),
      el('div', { class: 'objetivos' }, [
        el('h2', null, ['O que você vai aprender']),
        el('ul', null, FASES.map(function (f) {
          return el('li', null, [el('strong', null, [f.icone + ' ' + f.titulo + ': ']), f.objetivo]);
        })),
      ]),
      el('div', { class: 'disparadora' }, [
        el('strong', null, ['Para começar a pensar: ']),
        'você sabe a diferença entre as partes que pode tocar (hardware) e os programas (software)? Ao final do quiz você vai saber!',
      ]),
      el('div', { class: 'config' }, [
        el('label', { for: 'criterio' }, ['Critério para avançar de fase (definido pelo professor): ']),
        el('input', { id: 'criterio', type: 'number', min: '0', max: '100', step: '5', value: '70' }),
        el('span', null, ['%']),
      ]),
      el('div', { class: 'botoes-centro' }, [
        retomavel ? el('button', { class: 'btn btn-secundario', onclick: retomar }, ['↩️ Retomar de onde parei']) : null,
        el('button', { class: 'btn btn-primario', onclick: function () { iniciar(false); } }, [retomavel ? '🔄 Começar do zero' : '▶️ Começar']),
      ]),
    ]);
    app.appendChild(card);
  }

  function iniciar(retomada) {
    if (!retomada) {
      estado = estadoInicial();
      var inp = document.getElementById('criterio');
      if (inp) {
        var v = parseInt(inp.value, 10);
        if (!isNaN(v)) estado.criterio = Math.max(0, Math.min(100, v));
      }
    }
    estado._tempoBase = estado.tempoMs || 0;
    estado.iniciadoEm = Date.now();
    salvar();
    renderLive();
  }

  function retomar() { estado = carregar() || estadoInicial(); iniciar(true); }

  function pausar() {
    salvar();
    limparTela();
    var card = el('div', { class: 'card centralizado' }, [
      el('div', { class: 'emoji-grande' }, ['⏸️']),
      el('h1', null, ['Quiz pausado']),
      el('p', { class: 'subtitulo' }, ['Seu progresso foi salvo. Você pode retomar exatamente de onde parou.']),
      el('div', { class: 'botoes-centro' }, [
        el('button', { class: 'btn btn-primario', onclick: function () { iniciar(true); } }, ['▶️ Retomar']),
      ]),
    ]);
    app.appendChild(card);
  }

  // Introdução da fase: explica o tipo de questão antes de começar
  // ("Agora será classificação..."), com exemplo e lembrete das 2 tentativas.
  function renderIntroFase(faseIdx, emRevisao) {
    var fase = FASES[faseIdx];
    var questoes = questoesDaFase(fase.id);
    if (!emRevisao) salvar();

    limparTela();
    if (emRevisao) app.appendChild(bannerRevisao());
    else app.appendChild(barraProgresso());

    var card = el('div', { class: 'card intro-fase' }, [
      el('div', { class: 'emoji-grande' }, [fase.icone]),
      el('h1', { class: 'centro' }, ['Fase ' + fase.id + ' — ' + fase.titulo]),
      el('div', { class: 'centro' }, [
        el('span', { class: 'tipo-badge' }, ['Tipo de questão: ' + fase.tipoQuestao]),
      ]),
      el('p', { class: 'intro-explicacao' }, [fase.explicacao]),
      el('div', { class: 'exemplo-box' }, [
        el('strong', null, ['✨ Exemplo: ']),
        fase.exemplo,
      ]),
      el('div', { class: 'lembrete-box' }, [
        el('strong', null, ['💡 Lembrete: ']),
        'você tem 2 chances em cada questão. Se errar a primeira, aparece uma dica para você tentar de novo!',
      ]),
      el('p', { class: 'intro-qtd centro' }, ['Esta fase tem ' + questoes.length + ' questões. Boa sorte! 🍀']),
      emRevisao ? navRevisao() : el('div', { class: 'botoes-centro' }, [
        el('button', { class: 'btn btn-primario btn-grande', onclick: comecarFase }, ['▶️ Começar a fase']),
      ]),
    ]);
    app.appendChild(card);
  }

  function comecarFase() {
    estado.subtela = 'questao';
    estado.questaoIdx = 0;
    estado.tentativas = 0;
    estado.escolhasAtual = [];
    salvar();
    renderQuestao();
  }

  // Apresentação da questão
  function renderQuestao() {
    var fase = FASES[estado.faseIdx];
    var questoes = questoesDaFase(fase.id);
    var q = questoes[estado.questaoIdx];
    salvar();

    limparTela();
    app.appendChild(barraProgresso());

    var pctBarra = Math.round((estado.questaoIdx / questoes.length) * 100);
    var progressoFase = el('div', { class: 'progresso-fase' }, [
      el('div', null, ['Questão ' + (estado.questaoIdx + 1) + ' de ' + questoes.length]),
      el('div', { class: 'barra-prog', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(pctBarra) }, [
        el('div', { class: 'barra-prog-fill', style: 'width:' + pctBarra + '%' }),
      ]),
    ]);

    var opcoes = el('div', { class: 'opcoes' }, q.opcoes.map(function (texto, i) {
      return el('button', {
        class: 'opcao',
        onclick: function () { responder(i, this); },
      }, [texto]);
    }));

    var feedback = el('div', { class: 'feedback', id: 'feedback', role: 'status', 'aria-live': 'polite' }, []);

    var card = el('div', { class: 'card questao' }, [
      progressoFase,
      el('div', { class: 'questao-cabecalho' }, [
        el('span', { class: 'questao-icone' }, [q.icone || '❓']),
        el('span', { class: 'tag-req', title: REQUISITOS[q.req].nome }, [q.req]),
      ]),
      el('h2', { class: 'enunciado' }, [q.enunciado]),
      opcoes,
      feedback,
    ]);
    app.appendChild(card);

    // Reconstrói o meio da questão (após recarregar a página ou voltar da
    // revisão com uma tentativa errada já feita).
    if (estado.escolhasAtual && estado.escolhasAtual.length) {
      var botoes = card.querySelectorAll('.opcao');
      estado.escolhasAtual.forEach(function (i) {
        if (botoes[i]) { botoes[i].classList.add('errada'); botoes[i].disabled = true; }
      });
      if (estado.tentativas === 1) {
        mostrarFeedback(feedback, 'dica', '🤔 Quase! Tente de novo.', '💡 Dica: ' + q.dica, false);
      }
    }
  }

  // Revisão de uma questão já respondida: mostra a resposta correta, as
  // escolhas do estudante e o comentário — sem alterar a pontuação.
  function renderQuestaoRevisao(pag) {
    var fase = FASES[pag.faseIdx];
    var questoes = questoesDaFase(fase.id);
    var q = questoes[pag.questaoIdx];
    var reg = estado.registros[q.id];

    limparTela();
    app.appendChild(bannerRevisao());

    var opcoes = el('div', { class: 'opcoes' }, q.opcoes.map(function (texto, i) {
      var cls = 'opcao';
      if (i === q.correta) cls += ' certa';
      else if (reg && reg.escolhas && reg.escolhas.indexOf(i) !== -1) cls += ' errada';
      return el('button', { class: cls, disabled: 'disabled' }, [texto]);
    }));

    var resultadoTxt;
    if (!reg) resultadoTxt = 'Questão ainda sem resposta registrada.';
    else if (reg.primeiraCorreta) resultadoTxt = '✅ Você acertou na 1ª tentativa (1,0 ponto).';
    else if (reg.acertou) resultadoTxt = '✅ Você acertou na 2ª tentativa (0,5 ponto).';
    else resultadoTxt = '📘 Você não acertou desta vez (0,0 ponto). Releia o comentário para aprender!';

    var card = el('div', { class: 'card questao' }, [
      el('div', { class: 'progresso-fase' }, [
        'Fase ' + fase.id + ' · ' + fase.titulo + ' — Questão ' + (pag.questaoIdx + 1) + ' de ' + questoes.length,
      ]),
      el('div', { class: 'questao-cabecalho' }, [
        el('span', { class: 'questao-icone' }, [q.icone || '❓']),
        el('span', { class: 'tag-req', title: REQUISITOS[q.req].nome }, [q.req]),
      ]),
      el('h2', { class: 'enunciado' }, [q.enunciado]),
      opcoes,
      el('div', { class: 'resultado-revisao' }, [
        el('div', { class: 'feedback-titulo' }, [resultadoTxt]),
        el('div', { class: 'feedback-texto' }, [q.comentario]),
      ]),
      navRevisao(),
    ]);
    app.appendChild(card);
  }

  // Decisão de feedback (modelo instrucional):
  // correta -> feedback positivo e avança;
  // 1ª incorreta -> dica e repete; 2ª incorreta -> resposta comentada e avança.
  function responder(escolha, botao) {
    var fase = FASES[estado.faseIdx];
    var q = questoesDaFase(fase.id)[estado.questaoIdx];
    var feedback = document.getElementById('feedback');
    var botoes = document.querySelectorAll('.opcao');

    var acertou = escolha === q.correta;
    estado.tentativas += 1;
    if (!acertou) estado.escolhasAtual.push(escolha);

    if (acertou) {
      botao.classList.add('certa');
      desabilitarOpcoes(botoes);
      registrar(q, true);
      mostrarFeedback(feedback, 'ok', '✅ Isso mesmo!', q.comentario, true);
    } else if (estado.tentativas < 2) {
      // 1ª tentativa errada: dica e repetir
      botao.classList.add('errada');
      botao.disabled = true;
      mostrarFeedback(feedback, 'dica', '🤔 Quase! Tente de novo.', '💡 Dica: ' + q.dica, false);
    } else {
      // 2ª tentativa errada: resposta comentada e avançar
      botao.classList.add('errada');
      botoes[q.correta].classList.add('certa');
      desabilitarOpcoes(botoes);
      registrar(q, false);
      mostrarFeedback(feedback, 'erro', '📘 Vamos aprender juntos!', q.comentario, true);
    }
    salvar();
  }

  function desabilitarOpcoes(botoes) {
    botoes.forEach(function (b) { b.disabled = true; });
  }

  function mostrarFeedback(container, tipo, titulo, texto, podeAvancar) {
    container.className = 'feedback feedback-' + tipo + ' visivel';
    container.innerHTML = '';
    container.appendChild(el('div', { class: 'feedback-titulo' }, [titulo]));
    container.appendChild(el('div', { class: 'feedback-texto' }, [texto]));
    if (podeAvancar) {
      var btn = el('button', { class: 'btn btn-primario', onclick: avancarQuestao }, ['Continuar ➜']);
      container.appendChild(btn);
      btn.focus();
    }
  }

  function registrar(q, primeiraCorreta) {
    estado.registros[q.id] = {
      fase: q.fase,
      req: q.req,
      primeiraCorreta: primeiraCorreta && estado.tentativas === 1,
      acertou: primeiraCorreta,
      tentativas: estado.tentativas,
      escolhas: (estado.escolhasAtual || []).slice(),
    };
  }

  function avancarQuestao() {
    var fase = FASES[estado.faseIdx];
    var questoes = questoesDaFase(fase.id);
    estado.tentativas = 0;
    estado.escolhasAtual = [];
    estado.questaoIdx += 1;
    if (estado.questaoIdx >= questoes.length) {
      estado.subtela = 'resumo';
      telaResumoFase();
    } else {
      renderQuestao();
    }
    salvar();
  }

  // Pontuação ponderada por questão: 1ª certa = 1.0; 2ª certa = 0.5; errou = 0.
  function pontuacaoQuestao(reg) {
    if (!reg) return 0;
    if (reg.primeiraCorreta) return 1;
    if (reg.acertou) return 0.5;
    return 0;
  }

  function desempenhoFase(faseId) {
    var questoes = questoesDaFase(faseId);
    var soma = questoes.reduce(function (acc, q) { return acc + pontuacaoQuestao(estado.registros[q.id]); }, 0);
    return Math.round((soma / questoes.length) * 100);
  }

  // Resumo da fase + verificação do critério (concluída [desempenho >= critério*])
  function telaResumoFase() {
    var fase = FASES[estado.faseIdx];
    salvar();
    var pct = desempenhoFase(fase.id);
    var passou = pct >= estado.criterio;
    var ehUltima = estado.faseIdx === FASES.length - 1;

    limparTela();
    var botoes = [];
    botoes.push(el('button', { class: 'btn btn-ghost', onclick: entrarRevisao }, ['⬅️ Rever minhas respostas']));
    if (passou) {
      botoes.push(el('button', { class: 'btn btn-primario', onclick: proximaFase }, [
        ehUltima ? '🏁 Ver encerramento' : '➡️ Ir para a próxima fase',
      ]));
    } else {
      botoes.push(el('button', { class: 'btn btn-primario', onclick: refazerFase }, ['🔁 Refazer esta fase']));
      botoes.push(el('button', { class: 'btn btn-secundario', onclick: proximaFase }, [
        ehUltima ? 'Continuar mesmo assim' : 'Continuar mesmo assim ➜',
      ]));
    }

    var card = el('div', { class: 'card centralizado' }, [
      el('div', { class: 'emoji-grande' + (passou ? ' celebrar' : '') }, [passou ? '🌟' : '💪']),
      el('h1', null, ['Fase ' + fase.id + ' — ' + fase.titulo]),
      el('div', { class: 'medidor' }, [
        el('div', { class: 'medidor-num' + (passou ? ' ok' : ' baixo') }, [pct + '%']),
        el('div', { class: 'medidor-rotulo' }, ['de aproveitamento (critério: ' + estado.criterio + '%)']),
      ]),
      el('p', { class: 'subtitulo' }, [
        passou
          ? 'Muito bem! Você alcançou o critério e pode avançar.'
          : 'Você ainda não alcançou o critério. Que tal refazer esta fase para treinar?',
      ]),
      el('div', { class: 'botoes-centro' }, botoes),
    ]);
    app.appendChild(card);
  }

  function refazerFase() {
    var fase = FASES[estado.faseIdx];
    questoesDaFase(fase.id).forEach(function (q) { delete estado.registros[q.id]; });
    estado.subtela = 'intro';
    estado.questaoIdx = 0;
    estado.tentativas = 0;
    estado.escolhasAtual = [];
    salvar();
    renderLive();
  }

  function proximaFase() {
    estado.faseIdx += 1;
    estado.subtela = 'intro';
    estado.questaoIdx = 0;
    estado.tentativas = 0;
    estado.escolhasAtual = [];
    salvar();
    renderLive();
  }

  // ---- Encerramento (R5) ----------------------------------------------
  function telaAutoavaliacao() {
    limparTela();
    var aa = estado.autoavaliacao || {};
    var card = el('div', { class: 'card' }, [
      el('div', { class: 'emoji-grande centro' }, ['📝']),
      el('h1', { class: 'centro' }, ['Autoavaliação']),
      el('p', { class: 'subtitulo centro' }, ['Antes de terminar, conte para a gente como foi a sua experiência.']),
      campoEscolha('sentimento', 'Como você se sentiu fazendo o quiz?', ['😀 Diverti-me', '🙂 Foi tranquilo', '😐 Mais ou menos', '😕 Achei difícil'], aa.sentimento),
      campoEscolha('dificuldade', 'Qual fase foi mais difícil para você?', FASES.map(function (f) { return f.icone + ' ' + f.titulo; }).concat(['Nenhuma']), aa.dificuldade),
      campoEscolha('confianca', 'Você se sente mais confiante sobre Computação agora?', ['Sim, bastante!', 'Um pouco', 'Ainda não'], aa.confianca),
      el('div', { class: 'botoes-centro' }, [
        el('button', { class: 'btn btn-ghost', onclick: entrarRevisao }, ['⬅️ Rever minhas respostas']),
        el('button', { class: 'btn btn-primario', onclick: salvarAutoavaliacao }, ['Concluir ➜']),
      ]),
    ]);
    app.appendChild(card);
  }

  function campoEscolha(nome, pergunta, opcoes, valorSalvo) {
    return el('fieldset', { class: 'campo-escolha' }, [
      el('legend', null, [pergunta]),
      el('div', { class: 'chips' }, opcoes.map(function (op, i) {
        var id = nome + '-' + i;
        var attrs = { type: 'radio', name: nome, id: id, value: op };
        if (valorSalvo === op) attrs.checked = 'checked';
        var input = el('input', attrs);
        var label = el('label', { for: id, class: 'chip' }, [op]);
        return el('span', { class: 'chip-wrap' }, [input, label]);
      })),
    ]);
  }

  function salvarAutoavaliacao() {
    function val(n) { var c = document.querySelector('input[name="' + n + '"]:checked'); return c ? c.value : '—'; }
    estado.autoavaliacao = { sentimento: val('sentimento'), dificuldade: val('dificuldade'), confianca: val('confianca') };
    salvar();
    telaSeguranca();
  }

  // Mensagem de uso seguro e responsável (Cultura Digital)
  function telaSeguranca() {
    limparTela();
    var card = el('div', { class: 'card' }, [
      el('div', { class: 'emoji-grande centro' }, ['🛡️']),
      el('h1', { class: 'centro' }, ['Uso seguro e responsável']),
      el('ul', { class: 'lista-seguranca' }, [
        el('li', null, ['🔐 Crie senhas fortes e nunca as compartilhe.']),
        el('li', null, ['🙅 Não digite seus dados em sites estranhos ou suspeitos.']),
        el('li', null, ['🧑‍🏫 Diante de algo suspeito, avise um adulto de confiança.']),
        el('li', null, ['🤝 Use a internet com respeito e gentileza com as outras pessoas.']),
      ]),
      el('div', { class: 'botoes-centro' }, [
        el('button', { class: 'btn btn-ghost', onclick: telaAutoavaliacao }, ['⬅️ Voltar']),
        el('button', { class: 'btn btn-primario', onclick: telaRelatorio }, ['📊 Ver relatório final']),
      ]),
    ]);
    app.appendChild(card);
  }

  // Relatório do professor — desempenho consolidado por requisito (R1–R5)
  function telaRelatorio() {
    estado.concluido = true;
    salvar();
    limparTela();

    var linhas = ['R1', 'R2', 'R3', 'R4'].map(function (req) {
      var faseId = FASES.filter(function (f) { return f.req === req; })[0].id;
      var questoes = questoesDaFase(faseId);
      var acertos = questoes.filter(function (q) { var r = estado.registros[q.id]; return r && r.acertou; }).length;
      var tentativas = questoes.reduce(function (a, q) { var r = estado.registros[q.id]; return a + (r ? r.tentativas : 0); }, 0);
      var pct = desempenhoFase(faseId);
      return { req: req, nome: REQUISITOS[req].nome, bncc: REQUISITOS[req].bncc.join(', '), acertos: acertos, total: questoes.length, tentativas: tentativas, pct: pct, status: statusDominio(pct) };
    });

    var tabela = el('table', { class: 'relatorio' }, [
      el('thead', null, [el('tr', null, [
        el('th', null, ['Req.']), el('th', null, ['Aprendizagem']), el('th', null, ['BNCC']),
        el('th', null, ['Acertos']), el('th', null, ['Tentativas']), el('th', null, ['Desempenho']), el('th', null, ['Situação']),
      ])]),
      el('tbody', null, linhas.map(function (l) {
        return el('tr', null, [
          el('td', null, [l.req]),
          el('td', null, [l.nome]),
          el('td', { class: 'col-bncc' }, [l.bncc]),
          el('td', { class: 'centro' }, [l.acertos + '/' + l.total]),
          el('td', { class: 'centro' }, [String(l.tentativas)]),
          el('td', { class: 'centro' }, [l.pct + '%']),
          el('td', null, [el('span', { class: 'badge ' + l.status.cls }, [l.status.txt])]),
        ]);
      })),
    ]);

    var aa = estado.autoavaliacao || {};
    var r5 = el('div', { class: 'bloco-r5' }, [
      el('h3', null, ['R5 — Autonomia, persistência e responsabilidade']),
      el('ul', null, [
        el('li', null, ['Tempo total na atividade: ' + formatarTempo(estado.tempoMs)]),
        el('li', null, ['Concluiu todas as fases: sim']),
        el('li', null, ['Autoavaliação — sentimento: ' + (aa.sentimento || '—')]),
        el('li', null, ['Autoavaliação — fase mais difícil: ' + (aa.dificuldade || '—')]),
        el('li', null, ['Autoavaliação — confiança: ' + (aa.confianca || '—')]),
        el('li', null, ['Mensagem de uso seguro e responsável: visualizada']),
      ]),
    ]);

    var card = el('div', { class: 'card relatorio-card' }, [
      el('div', { class: 'emoji-grande centro' }, ['🏆']),
      el('h1', { class: 'centro' }, ['Relatório do professor']),
      el('p', { class: 'subtitulo centro' }, ['Desempenho do estudante por requisito de aprendizagem.']),
      tabela,
      r5,
      el('p', { class: 'nota-relatorio' }, ['Critério adotado: ' + estado.criterio + '% · Apoio à avaliação diagnóstica e formativa.']),
      el('div', { class: 'botoes-centro nao-imprimir' }, [
        el('button', { class: 'btn btn-secundario', onclick: function () { window.print(); } }, ['🖨️ Imprimir / salvar PDF']),
        el('button', { class: 'btn btn-ghost', onclick: reiniciar }, ['🔄 Recomeçar o quiz']),
      ]),
    ]);
    app.appendChild(card);
  }

  function statusDominio(pct) {
    if (pct >= estado.criterio) return { txt: 'Dominado', cls: 'ok' };
    if (pct >= 50) return { txt: 'Em desenvolvimento', cls: 'medio' };
    return { txt: 'Precisa reforço', cls: 'baixo' };
  }

  function reiniciar() {
    limpar();
    estado = null;
    telaAbertura(false);
  }

  // ---- Explorar componentes (consulta livre; não pontua) ---------------
  // Painel lateral (não é mais um modal): fica aberto ao lado do quiz, para
  // que o estudante consulte os componentes ENQUANTO resolve a questão,
  // como sugere o modelo instrucional. Ao selecionar um componente, o
  // painel mostra a explicação detalhada dele.

  // Figura do componente: usa o SVG desenhado quando não existe emoji fiel
  // ao item (pen drive, roteador e HD).
  function iconeComponente(c) {
    if (c.svg) return el('div', { class: 'componente-icone', html: c.svg });
    return el('div', { class: 'componente-icone' }, [c.icone]);
  }

  function abrirExplorar() {
    if (document.getElementById('painel-explorar')) { fecharExplorar(); return; }
    var painel = el('aside', { class: 'painel-explorar', id: 'painel-explorar', 'aria-label': 'Explorar componentes' });
    document.body.appendChild(painel);
    document.body.classList.add('explorar-aberto');
    renderListaComponentes(painel);
  }

  function renderListaComponentes(painel) {
    painel.innerHTML = '';
    painel.appendChild(el('div', { class: 'painel-topo' }, [
      el('h2', null, ['🧭 Explorar componentes']),
      el('button', { class: 'btn btn-ghost', onclick: fecharExplorar }, ['✕ Fechar']),
    ]));
    painel.appendChild(el('p', { class: 'painel-dica' }, [
      'Toque em um componente para ver a explicação completa. O painel pode ficar aberto enquanto você responde às questões — isto não altera a sua pontuação.',
    ]));
    painel.appendChild(el('div', { class: 'grade-componentes' }, COMPONENTES.map(function (c) {
      return el('button', {
        class: 'componente',
        onclick: function () { renderDetalheComponente(painel, c); },
      }, [
        iconeComponente(c),
        el('div', { class: 'componente-nome' }, [c.nome]),
        el('div', { class: 'componente-tipo' }, [c.tipo]),
      ]);
    })));
  }

  function renderDetalheComponente(painel, c) {
    painel.innerHTML = '';
    painel.appendChild(el('div', { class: 'painel-topo' }, [
      el('button', { class: 'btn btn-ghost', onclick: function () { renderListaComponentes(painel); } }, ['⬅️ Todos']),
      el('button', { class: 'btn btn-ghost', onclick: fecharExplorar }, ['✕ Fechar']),
    ]));
    painel.appendChild(el('div', { class: 'detalhe-componente' }, [
      iconeComponente(c),
      el('h2', null, [c.nome]),
      el('div', { class: 'componente-tipo' }, [c.tipo]),
      el('p', { class: 'detalhe-funcao' }, [el('strong', null, ['O que faz: ']), c.funcao]),
      el('p', { class: 'detalhe-texto' }, [c.detalhe]),
      el('a', { class: 'componente-link', href: c.wiki, target: '_blank', rel: 'noopener' }, ['🔗 Ler mais na Wikipédia']),
    ]));
  }

  function fecharExplorar() {
    var m = document.getElementById('painel-explorar');
    if (m) m.remove();
    document.body.classList.remove('explorar-aberto');
  }

  // ---- Inicialização ---------------------------------------------------
  window.addEventListener('beforeunload', salvar);

  var salvo = carregar();
  telaAbertura(!!(salvo && !salvo.concluido));
})();
