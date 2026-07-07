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
    explicacao: 'Nesta fase você vai ver um item de cada vez e dizer se ele é HARDWARE (parte física, que dá para tocar) ou SOFTWARE (programa, que funciona dentro do aparelho).',
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
    dica: 'Software é um programa: você não consegue segurá-lo na mão.',
    comentario: 'O navegador é SOFTWARE: é um programa usado para acessar a internet.',
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
    dica: 'É um programa que protege o computador.',
    comentario: 'O antivírus é SOFTWARE: é um programa que protege o computador contra vírus.',
  },
  {
    id: 'f1q5', fase: 1, req: 'R1', tipo: 'identificacao', icone: '🖱️',
    enunciado: 'O mouse é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 0,
    dica: 'Você o segura com a mão para mover o cursor.',
    comentario: 'O mouse é HARDWARE: é uma peça física usada para apontar e clicar.',
  },
  {
    id: 'f1q6', fase: 1, req: 'R1', tipo: 'identificacao', icone: '📱',
    enunciado: 'Um aplicativo de mensagens é hardware ou software?',
    opcoes: ['Hardware', 'Software'], correta: 1,
    dica: 'Aplicativo é um tipo de programa.',
    comentario: 'Um aplicativo é SOFTWARE: é um programa instalado no celular ou computador.',
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
    id: 'f2q3', fase: 2, req: 'R2', tipo: 'classificacao', icone: '💾',
    enunciado: 'A qual categoria pertence o pen drive?',
    opcoes: ['Dispositivo de entrada', 'Rede', 'Armazenamento', 'Dispositivo de saída'], correta: 2,
    dica: 'Ele serve para guardar e levar seus arquivos.',
    comentario: 'O pen drive é ARMAZENAMENTO: guarda dados que você pode levar de um lugar a outro.',
  },
  {
    id: 'f2q4', fase: 2, req: 'R2', tipo: 'classificacao', icone: '📶',
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
    id: 'f2q6', fase: 2, req: 'R2', tipo: 'classificacao', icone: '🖲️',
    enunciado: 'A qual categoria pertence o touchscreen (tela de toque)?',
    opcoes: ['Dispositivo de entrada', 'Rede', 'Armazenamento', 'Dispositivo de saída'], correta: 0,
    dica: 'Quando você toca a tela, está enviando um comando.',
    comentario: 'O touchscreen é um DISPOSITIVO DE ENTRADA: ao tocar, você envia comandos ao aparelho.',
  },

  // ---------- FASE 3 — Relacionar (R3): componente e função ----------
  {
    id: 'f3q1', fase: 3, req: 'R3', tipo: 'associacao', icone: '🧠',
    enunciado: 'Qual é a função principal do processador?',
    opcoes: ['Guardar arquivos', 'Processar as informações', 'Mostrar imagens', 'Conectar à internet'], correta: 1,
    dica: 'Ele é considerado o "cérebro" do computador.',
    comentario: 'O processador PROCESSA as informações: é o "cérebro" que faz os cálculos do computador.',
  },
  {
    id: 'f3q2', fase: 3, req: 'R3', tipo: 'associacao', icone: '💽',
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
const COMPONENTES = [
  { nome: 'Processador', icone: '🧠', tipo: 'Hardware', funcao: 'Processa as informações; é o "cérebro" do computador.' },
  { nome: 'Teclado', icone: '⌨️', tipo: 'Hardware · entrada', funcao: 'Permite digitar letras, números e comandos.' },
  { nome: 'Mouse', icone: '🖱️', tipo: 'Hardware · entrada', funcao: 'Move o cursor e seleciona itens com cliques.' },
  { nome: 'Monitor', icone: '🖥️', tipo: 'Hardware · saída', funcao: 'Mostra as imagens e os textos na tela.' },
  { nome: 'Caixa de som', icone: '🔊', tipo: 'Hardware · saída', funcao: 'Reproduz o som para você ouvir.' },
  { nome: 'Pen drive', icone: '💾', tipo: 'Hardware · armazenamento', funcao: 'Guarda e transporta arquivos.' },
  { nome: 'HD', icone: '💽', tipo: 'Hardware · armazenamento', funcao: 'Armazena os arquivos dentro do computador.' },
  { nome: 'Roteador', icone: '📶', tipo: 'Hardware · rede', funcao: 'Conecta os dispositivos à internet.' },
  { nome: 'Sistema operacional', icone: '⚙️', tipo: 'Software', funcao: 'Controla o hardware e organiza os programas.' },
  { nome: 'Navegador', icone: '🌐', tipo: 'Software', funcao: 'Acessa a internet e abre os sites.' },
  { nome: 'Aplicativo', icone: '📱', tipo: 'Software', funcao: 'Programa para uma tarefa específica (mensagens, jogos, etc.).' },
  { nome: 'Antivírus', icone: '🛡️', tipo: 'Software', funcao: 'Protege o computador contra vírus e ameaças.' },
];
