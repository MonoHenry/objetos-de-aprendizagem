/*
 * data.js — Conteúdo do objeto de aprendizagem "Quiz de Computação".
 * Banco de questões, requisitos, fases e componentes para exploração.
 * Mantido separado da lógica (app.js) para facilitar a revisão pedagógica.
 */

// Requisitos de aprendizagem (R1–R5) e habilidades da BNCC de Computação associadas.
const REQUISITOS = {
  R1: { nome: 'Reconhecer e diferenciar hardware e software', bncc: ['EF02CO04', 'EF15CO07'] },
  R2: { nome: 'Classificar elementos em categorias funcionais', bncc: ['EF02CO05', 'EF15CO06'] },
  R3: { nome: 'Relacionar componentes às suas funções', bncc: ['EF15CO06', 'EF15CO07', 'EF15CO08'] },
  R4: { nome: 'Analisar situações de uso e decidir', bncc: ['EF02CO05', 'EF15CO08'] },
  R5: { nome: 'Autonomia, persistência e responsabilidade', bncc: ['EF02CO06', 'EF15CO09'] },
};

// As quatro fases progressivas do quiz (uma por requisito cognitivo R1–R4).
// Cada fase traz o tipo de questão (conforme o mapa conceitual do quiz) e a
// explicação exibida na tela de introdução da fase.
const FASES = [
  {
    id: 1, req: 'R1', titulo: 'Reconhecer', icone: '🔍',
    objetivo: 'Identificar hardware e software no dia a dia.',
    tipoQuestao: 'Identificação',
    explicacao: 'Nesta fase você vai ver um item de cada vez e dizer se ele é HARDWARE (parte física, que dá para tocar) ou SOFTWARE (parte não física, que você não consegue tocar: funciona dentro do aparelho).',
    exemplo: 'A impressora é hardware, porque é uma peça física. Um joguinho de celular é software, porque é um programa.',
  },
  {
    id: 2, req: 'R2', titulo: 'Classificar', icone: '🗂️',
    objetivo: 'Organizar elementos em categorias funcionais.',
    tipoQuestao: 'Classificação',
    explicacao: 'Agora será classificação! Você vai colocar cada item na categoria certa: dispositivo de entrada, dispositivo de saída, armazenamento ou rede.',
    exemplo: 'A webcam envia imagens PARA o computador, então ela é um dispositivo de entrada.',
  },
  {
    id: 3, req: 'R3', titulo: 'Relacionar', icone: '🔗',
    objetivo: 'Ligar cada componente à sua função.',
    tipoQuestao: 'Associação',
    explicacao: 'Agora será associação! Você vai ligar cada componente à função que ele realiza no computador.',
    exemplo: 'A memória serve para guardar informações enquanto o computador trabalha.',
  },
  {
    id: 4, req: 'R4', titulo: 'Analisar', icone: '🧩',
    objetivo: 'Escolher a melhor solução em situações do cotidiano.',
    tipoQuestao: 'Situação-problema',
    explicacao: 'Agora serão situações do dia a dia! Você vai ler uma pequena história e escolher a atitude ou a ferramenta mais adequada para resolver cada uma.',
    exemplo: 'Para assistir a uma aula on-line, você precisa de um aparelho conectado à internet.',
  },
];

// Figuras desenhadas (SVG) para os itens que não têm emoji fiel:
// o emoji de disquete não é um pen drive, o de barras de sinal não é um
// roteador, o de minidisc não é um HD, o de trackball não é um touchscreen
// e o de cérebro não é um processador (chip).
// Usadas tanto nas questões quanto no "Explorar componentes".
const SVG_PROCESSADOR = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="12" y="12" width="24" height="24" rx="3"/><rect x="19" y="19" width="10" height="10"/><line x1="18" y1="12" x2="18" y2="6"/><line x1="24" y1="12" x2="24" y2="6"/><line x1="30" y1="12" x2="30" y2="6"/><line x1="18" y1="36" x2="18" y2="42"/><line x1="24" y1="36" x2="24" y2="42"/><line x1="30" y1="36" x2="30" y2="42"/><line x1="12" y1="18" x2="6" y2="18"/><line x1="12" y1="24" x2="6" y2="24"/><line x1="12" y1="30" x2="6" y2="30"/><line x1="36" y1="18" x2="42" y2="18"/><line x1="36" y1="24" x2="42" y2="24"/><line x1="36" y1="30" x2="42" y2="30"/></svg>';
const SVG_PENDRIVE = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="15" width="27" height="18" rx="5"/><rect x="30" y="19" width="14" height="10"/><line x1="34" y1="21.8" x2="39" y2="21.8"/><line x1="34" y1="26.2" x2="39" y2="26.2"/></svg>';
const SVG_ROTEADOR = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="27" width="40" height="14" rx="4"/><line x1="14" y1="27" x2="14" y2="11"/><line x1="34" y1="27" x2="34" y2="11"/><circle cx="14" cy="9" r="1.8" fill="currentColor" stroke="none"/><circle cx="34" cy="9" r="1.8" fill="currentColor" stroke="none"/><circle cx="12" cy="34" r="1.7" fill="currentColor" stroke="none"/><circle cx="19" cy="34" r="1.7" fill="currentColor" stroke="none"/><circle cx="26" cy="34" r="1.7" fill="currentColor" stroke="none"/></svg>';
const SVG_HD = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="5" width="32" height="38" rx="4"/><circle cx="24" cy="19" r="8.5"/><circle cx="24" cy="19" r="1.6" fill="currentColor" stroke="none"/><line x1="24" y1="19" x2="30" y2="13.5"/><line x1="14" y1="37" x2="22" y2="37"/></svg>';
const SVG_TOUCHSCREEN = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="11" y="4" width="26" height="40" rx="5"/><line x1="21" y1="38" x2="27" y2="38"/><circle cx="24" cy="21" r="3.5" fill="currentColor" stroke="none"/><line x1="24" y1="11" x2="24" y2="14"/><line x1="15" y1="21" x2="18" y2="21"/><line x1="30" y1="21" x2="33" y2="21"/><line x1="17.5" y1="14.5" x2="19.5" y2="16.5"/><line x1="30.5" y1="14.5" x2="28.5" y2="16.5"/></svg>';

// Banco de questões. Cada questão indica fase, requisito, tipo, dica e resposta comentada.
const QUESTOES = [
  // ---------- FASE 1 — Reconhecer (R1): hardware ou software ----------
  {
    id: 'f1q1', fase: 1, req: 'R1', tipo: 'identificacao', icone: '⌨️',
    enunciado: 'O teclado é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 0,
    dica: 'Hardware é a parte física, que você pode tocar com as mãos.',
    comentario: 'O teclado é HARDWARE: é uma peça física do computador que você toca para digitar.',
  },
  {
    id: 'f1q2', fase: 1, req: 'R1', tipo: 'identificacao', icone: '🌐',
    enunciado: 'O navegador (como o Chrome) é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 1,
    dica: 'Tente pegar o navegador com a mão... não dá! Você toca a tela e o mouse, mas o navegador é um programa que o computador executa para abrir os sites.',
    comentario: 'O navegador é SOFTWARE: ninguém compra um navegador numa caixinha para parafusar no computador — ele é instalado e funciona lá dentro, abrindo os sites para você.',
  },
  {
    id: 'f1q3', fase: 1, req: 'R1', tipo: 'identificacao', icone: '🖥️',
    enunciado: 'O monitor é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 0,
    dica: 'É uma peça física que mostra as imagens.',
    comentario: 'O monitor é HARDWARE: é o equipamento físico que exibe as imagens na tela.',
  },
  {
    id: 'f1q4', fase: 1, req: 'R1', tipo: 'identificacao', icone: '🛡️',
    enunciado: 'O antivírus é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 1,
    dica: 'Um guarda de verdade você vê e toca. O antivírus é um "guarda invisível": trabalha dentro do computador caçando vírus, sem ser uma peça.',
    comentario: 'O antivírus é SOFTWARE: ele chega por download (não numa caixa com parafusos) e fica vigiando o computador por dentro para bloquear os vírus.',
  },
  {
    id: 'f1q5', fase: 1, req: 'R1', tipo: 'identificacao', icone: '🖱️',
    enunciado: 'O mouse é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 0,
    dica: 'Você o segura com a mão para mover o cursor.',
    comentario: 'O mouse é HARDWARE: é uma peça física usada para apontar e clicar.',
  },
  {
    id: 'f1q6', fase: 1, req: 'R1', tipo: 'identificacao', icone: '💬',
    enunciado: 'Um aplicativo de mensagens é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 1,
    dica: 'Quando você baixa ou apaga um aplicativo, nenhuma peça entra ou sai do celular — ele continua igualzinho por fora. O que muda está por dentro!',
    comentario: 'Um aplicativo é SOFTWARE: você o baixa da loja e ele passa a morar dentro do celular, enviando as suas mensagens. Se apagar, não fica buraco nenhum — porque o app não é uma peça física.',
  },

  // ---------- FASE 2 — Classificar (R2): categoria funcional ----------
  {
    id: 'f2q1', fase: 2, req: 'R2', tipo: 'classificacao', icone: '⌨️',
    enunciado: 'A qual categoria pertence o teclado?',
    opcoes: ['Dispositivo de entrada', 'Dispositivo de saída', 'Armazenamento', 'Rede'], correta: 0,
    dica: 'Pense: ele coloca informação no computador ou tira informação dele?',
    comentario: 'O teclado é um DISPOSITIVO DE ENTRADA: serve para enviar informação ao computador.',
  },
  {
    id: 'f2q2', fase: 2, req: 'R2', tipo: 'classificacao', icone: '🖨️',
    enunciado: 'A qual categoria pertence a impressora?',
    opcoes: ['Dispositivo de entrada', 'Dispositivo de saída', 'Armazenamento', 'Rede'], correta: 1,
    dica: 'Ela mostra para fora um resultado do computador.',
    comentario: 'A impressora é um DISPOSITIVO DE SAÍDA: entrega para fora o que o computador produziu.',
  },
  {
    id: 'f2q3', fase: 2, req: 'R2', tipo: 'classificacao', svg: SVG_PENDRIVE,
    enunciado: 'A qual categoria pertence o pen drive?',
    opcoes: ['Dispositivo de entrada', 'Rede', 'Armazenamento', 'Dispositivo de saída'], correta: 2,
    dica: 'Ele serve para guardar e levar seus arquivos.',
    comentario: 'O pen drive é ARMAZENAMENTO: guarda dados que você pode levar de um lugar a outro.',
  },
  {
    id: 'f2q4', fase: 2, req: 'R2', tipo: 'classificacao', svg: SVG_ROTEADOR,
    enunciado: 'A qual categoria pertence o roteador?',
    opcoes: ['Armazenamento', 'Rede', 'Dispositivo de saída', 'Dispositivo de entrada'], correta: 1,
    dica: 'Ele tem a ver com conectar dispositivos à internet.',
    comentario: 'O roteador faz parte da REDE: conecta os dispositivos à internet.',
  },
  {
    id: 'f2q5', fase: 2, req: 'R2', tipo: 'classificacao', icone: '🔊',
    enunciado: 'A qual categoria pertence a caixa de som?',
    opcoes: ['Dispositivo de entrada', 'Dispositivo de saída', 'Armazenamento', 'Rede'], correta: 1,
    dica: 'Ela entrega o som para você ouvir.',
    comentario: 'A caixa de som é um DISPOSITIVO DE SAÍDA: leva o som do computador até você.',
  },
  {
    id: 'f2q6', fase: 2, req: 'R2', tipo: 'classificacao', svg: SVG_TOUCHSCREEN,
    enunciado: 'A qual categoria pertence o touchscreen (tela de toque)?',
    opcoes: ['Dispositivo de entrada', 'Rede', 'Armazenamento', 'Dispositivo de saída'], correta: 0,
    dica: 'Quando você toca a tela, está enviando um comando.',
    comentario: 'O touchscreen é um DISPOSITIVO DE ENTRADA: ao tocar, você envia comandos ao aparelho.',
  },

  // ---------- FASE 3 — Relacionar (R3): componente e função ----------
  {
    id: 'f3q1', fase: 3, req: 'R3', tipo: 'associacao', svg: SVG_PROCESSADOR,
    enunciado: 'Qual é a função principal do processador?',
    opcoes: ['Guardar arquivos', 'Processar as informações', 'Mostrar imagens', 'Conectar à internet'], correta: 1,
    dica: 'Ele é considerado o "cérebro" do computador.',
    comentario: 'O processador PROCESSA as informações: é o "cérebro" que faz os cálculos do computador.',
  },
  {
    id: 'f3q2', fase: 3, req: 'R3', tipo: 'associacao', svg: SVG_HD,
    enunciado: 'Para que serve o HD (disco rígido)?',
    opcoes: ['Digitar textos', 'Imprimir páginas', 'Armazenar dados', 'Tocar música'], correta: 2,
    dica: 'Pense onde ficam guardados seus arquivos no computador.',
    comentario: 'O HD serve para ARMAZENAR dados: é onde ficam guardados os arquivos do computador.',
  },
  {
    id: 'f3q3', fase: 3, req: 'R3', tipo: 'associacao', icone: '⚙️',
    enunciado: 'Qual é a função do sistema operacional?',
    opcoes: ['Controlar o hardware', 'Proteger contra vírus', 'Mostrar o vídeo', 'Guardar fotos'], correta: 0,
    dica: 'É o software principal que faz tudo funcionar junto.',
    comentario: 'O sistema operacional CONTROLA o hardware e organiza o funcionamento de todos os programas.',
  },
  {
    id: 'f3q4', fase: 3, req: 'R3', tipo: 'associacao', icone: '🌐',
    enunciado: 'Para que serve o navegador?',
    opcoes: ['Imprimir documentos', 'Acessar a internet', 'Ligar o computador', 'Guardar senhas'], correta: 1,
    dica: 'É o programa que abre os sites.',
    comentario: 'O navegador serve para ACESSAR a internet e abrir páginas e sites.',
  },
  {
    id: 'f3q5', fase: 3, req: 'R3', tipo: 'associacao', icone: '🖥️',
    enunciado: 'Qual é a função do monitor?',
    opcoes: ['Mostrar imagens e textos', 'Armazenar arquivos', 'Conectar à rede', 'Processar dados'], correta: 0,
    dica: 'É por ele que você enxerga o que o computador faz.',
    comentario: 'O monitor MOSTRA as imagens e os textos: é a saída visual do computador.',
  },

  // ---------- FASE 4 — Analisar (R4): situações-problema ----------
  {
    id: 'f4q1', fase: 4, req: 'R4', tipo: 'situacao', icone: '🎒',
    enunciado: 'Você quer levar suas fotos para a casa de um amigo. O que é mais adequado usar?',
    opcoes: ['Um monitor', 'Um pen drive', 'Um teclado', 'Um roteador'], correta: 1,
    dica: 'Você precisa de algo que guarde e transporte arquivos.',
    comentario: 'O pen drive é o ideal: ele ARMAZENA e transporta seus arquivos de um lugar a outro.',
  },
  {
    id: 'f4q2', fase: 4, req: 'R4', tipo: 'situacao', icone: '🔎',
    enunciado: 'Você precisa pesquisar uma informação na internet. Qual programa abrir?',
    opcoes: ['O navegador', 'O antivírus', 'A calculadora', 'O editor de fotos'], correta: 0,
    dica: 'Qual programa abre os sites?',
    comentario: 'O navegador é a escolha certa: é o programa usado para acessar sites e pesquisar na internet.',
  },
  {
    id: 'f4q3', fase: 4, req: 'R4', tipo: 'situacao', icone: '⚠️',
    enunciado: 'Um site estranho pede a sua senha de repente. O que é mais seguro fazer?',
    opcoes: ['Digitar a senha rápido', 'Não digitar e avisar um adulto', 'Compartilhar com um colega', 'Clicar em todos os botões'], correta: 1,
    dica: 'Cuidado com pedidos suspeitos: pense em segurança digital.',
    comentario: 'O mais seguro é NÃO digitar a senha e avisar um adulto: é assim que nos protegemos de golpes virtuais.',
  },
  {
    id: 'f4q4', fase: 4, req: 'R4', tipo: 'situacao', icone: '🔐',
    enunciado: 'Para proteger melhor a sua conta, o que você deve fazer?',
    opcoes: ['Usar a senha "1234"', 'Criar uma senha forte', 'Contar a senha para todos', 'Não usar senha'], correta: 1,
    dica: 'Uma boa senha é difícil de adivinhar.',
    comentario: 'Criar uma SENHA FORTE protege seus dados pessoais: senhas fáceis ou compartilhadas colocam você em risco.',
  },
  {
    id: 'f4q5', fase: 4, req: 'R4', tipo: 'situacao', icone: '🔊',
    enunciado: 'Você quer ouvir um vídeo, mas o computador está sem som. O que conectar?',
    opcoes: ['Uma impressora', 'Uma caixa de som', 'Um pen drive', 'Um teclado'], correta: 1,
    dica: 'Você precisa de um dispositivo de saída de áudio.',
    comentario: 'A caixa de som resolve: é o dispositivo de SAÍDA que leva o som até você.',
  },
];

// Componentes disponíveis em "Explorar componentes" (consulta livre, não pontua).
// "detalhe" é a explicação completa mostrada ao selecionar o componente
// (conforme o modelo instrucional); "wiki" aponta para o artigo do item na
// Wikipédia em português.
const COMPONENTES = [
  { nome: 'Processador', svg: SVG_PROCESSADOR, tipo: 'Hardware', funcao: 'Processa as informações; é o "cérebro" do computador.',
    detalhe: 'O processador (também chamado de CPU) é uma peça pequena, mas muito poderosa: ele faz todos os cálculos e executa as instruções dos programas. Quanto mais rápido o processador, mais rápido o computador trabalha. Ele esquenta tanto que precisa de um pequeno ventilador (cooler) para esfriar!',
    wiki: 'https://pt.wikipedia.org/wiki/Unidade_central_de_processamento' },
  { nome: 'Teclado', icone: '⌨️', tipo: 'Hardware · entrada', funcao: 'Permite digitar letras, números e comandos.',
    detalhe: 'Cada tecla que você aperta envia um código para o computador, que o transforma na letra ou no comando correspondente. Além das letras e dos números, há teclas especiais, como Enter e Espaço, que dão ordens ao computador. No celular existe o teclado virtual, que aparece na tela — esse é software!',
    wiki: 'https://pt.wikipedia.org/wiki/Teclado_(inform%C3%A1tica)' },
  { nome: 'Mouse', icone: '🖱️', tipo: 'Hardware · entrada', funcao: 'Move o cursor e seleciona itens com cliques.',
    detalhe: 'O mouse percebe o movimento da sua mão (hoje quase sempre com uma luzinha por baixo) e move o cursor na tela. Com os botões você escolhe, abre e arrasta itens; com a rodinha, sobe e desce nas páginas. Nos notebooks, o touchpad faz o mesmo papel.',
    wiki: 'https://pt.wikipedia.org/wiki/Mouse' },
  { nome: 'Monitor', icone: '🖥️', tipo: 'Hardware · saída', funcao: 'Mostra as imagens e os textos na tela.',
    detalhe: 'O monitor é formado por milhares de pontinhos de luz chamados pixels. Juntos, eles formam as imagens, os textos e os vídeos que você vê. É um dispositivo de saída: mostra para você o resultado do que o computador está fazendo.',
    wiki: 'https://pt.wikipedia.org/wiki/Monitor_de_v%C3%ADdeo' },
  { nome: 'Caixa de som', icone: '🔊', tipo: 'Hardware · saída', funcao: 'Reproduz o som para você ouvir.',
    detalhe: 'A caixa de som transforma os sinais elétricos do computador em sons que podemos ouvir: músicas, vozes e os sons dos jogos. Os fones de ouvido fazem o mesmo trabalho, só que pertinho da orelha. É um dispositivo de saída de áudio.',
    wiki: 'https://pt.wikipedia.org/wiki/Alto-falante' },
  { nome: 'Pen drive', svg: SVG_PENDRIVE, tipo: 'Hardware · armazenamento', funcao: 'Guarda e transporta arquivos.',
    detalhe: 'O pen drive guarda arquivos em uma memória especial que não se apaga quando ele é desconectado. Ele entra na portinha USB do computador, e por isso é fácil levar trabalhos, fotos e vídeos de um lugar para outro. É pequeno, mas pode guardar milhares de fotos!',
    wiki: 'https://pt.wikipedia.org/wiki/Pen_drive' },
  { nome: 'HD', svg: SVG_HD, tipo: 'Hardware · armazenamento', funcao: 'Armazena os arquivos dentro do computador.',
    detalhe: 'O HD (disco rígido) é a "memória permanente" do computador: guarda o sistema, os programas e os seus arquivos mesmo com o computador desligado. Dentro dele há discos que giram bem rápido enquanto uma agulha lê e grava os dados. Hoje também existe o SSD, que faz o mesmo trabalho sem peças girando — por isso é mais rápido e silencioso.',
    wiki: 'https://pt.wikipedia.org/wiki/Disco_r%C3%ADgido' },
  { nome: 'Roteador', svg: SVG_ROTEADOR, tipo: 'Hardware · rede', funcao: 'Conecta os dispositivos à internet.',
    detalhe: 'O roteador recebe a internet que chega à sua casa e a distribui para todos os aparelhos, por cabo ou pelo Wi-Fi (sem fio). É ele quem escolhe o caminho (a "rota") das informações entre os seus aparelhos e a internet. As luzinhas piscando mostram que os dados estão passando por ele.',
    wiki: 'https://pt.wikipedia.org/wiki/Roteador' },
  { nome: 'Sistema operacional', icone: '⚙️', tipo: 'Software', funcao: 'Controla o hardware e organiza os programas.',
    detalhe: 'O sistema operacional é o programa mais importante: sem ele, o computador nem consegue funcionar. Ele controla o hardware, organiza os arquivos e permite que os outros programas rodem. Windows, Linux, Android e iOS são exemplos de sistemas operacionais.',
    wiki: 'https://pt.wikipedia.org/wiki/Sistema_operacional' },
  { nome: 'Navegador', icone: '🌐', tipo: 'Software', funcao: 'Acessa a internet e abre os sites.',
    detalhe: 'O navegador busca as páginas da internet e as mostra na sua tela. É com ele que você pesquisa, assiste a vídeos e visita sites. Chrome, Firefox, Safari e Edge são exemplos de navegadores.',
    wiki: 'https://pt.wikipedia.org/wiki/Navegador_web' },
  { nome: 'Aplicativo', icone: '📱', tipo: 'Software', funcao: 'Programa para uma tarefa específica (mensagens, jogos, etc.).',
    detalhe: 'Aplicativo (ou "app") é um programa feito para uma tarefa específica: conversar, jogar, desenhar, estudar... Você instala os aplicativos pela loja do celular ou do computador. Cada ícone na tela do seu celular é um aplicativo diferente!',
    wiki: 'https://pt.wikipedia.org/wiki/Aplicativo_m%C3%B3vel' },
  { nome: 'Antivírus', icone: '🛡️', tipo: 'Software', funcao: 'Protege o computador contra vírus e ameaças.',
    detalhe: 'O antivírus fica vigiando o computador o tempo todo, procurando programas malvados (os vírus) que tentam roubar dados ou estragar arquivos. Quando encontra algo suspeito, ele avisa e bloqueia. Mesmo com antivírus, é importante não clicar em links estranhos!',
    wiki: 'https://pt.wikipedia.org/wiki/Antiv%C3%ADrus' },
];
