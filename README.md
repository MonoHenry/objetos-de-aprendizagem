# Objeto de Aprendizagem: Quiz de Computação

Este repositório documenta a proposta de um objeto de aprendizagem digital para introduzir estudantes aos conceitos básicos da Computação. A ideia central é um quiz eletrônico com dinâmica de jogo, organizado em fases progressivas e composto por questões visuais, associações, classificações e situações-problema.

O objeto busca favorecer uma aprendizagem inicial, acessível e motivadora, permitindo que o estudante reconheça elementos da área, compreenda suas funções básicas e tome decisões adequadas em situações simples de uso da tecnologia.

## Acesso ao objeto de aprendizagem

O objeto está implementado como um site web estático (HTML, CSS e JavaScript, sem dependências externas), responsivo para computador, tablet e celular.

- **Acesso online:** https://monohenry.github.io/objetos-de-aprendizagem/
- **Execução local:** clone o repositório e abra o arquivo `index.html` no navegador. Para evitar restrições do navegador a arquivos locais, é possível servir a pasta com um servidor simples, por exemplo `python3 -m http.server`, e acessar `http://localhost:8000`.

### Estrutura do repositório

- `index.html` — página principal do quiz;
- `css/styles.css` — estilos e layout responsivo;
- `js/data.js` — banco de questões, requisitos, fases e componentes;
- `js/app.js` — lógica do quiz (fases, feedback, autoavaliação e relatório);
- `modelo-instrucional(1).drawio` — modelo instrucional (statechart) que orienta a implementação.

## Público-alvo

O público-alvo principal são estudantes do Ensino Fundamental em etapa introdutória de Computação, especialmente em atividades mediadas por professor nos anos iniciais ou em turmas que estejam começando a estudar Mundo Digital e Cultura Digital.

O objeto também pode apoiar professores que desejam realizar avaliação diagnóstica ou formativa sobre conhecimentos básicos de hardware, software, redes, armazenamento e segurança digital.

## Descrição do objeto

O objeto de aprendizagem será desenvolvido como um quiz interativo de caráter formativo. O estudante avançará por níveis de dificuldade crescente e poderá dar um feedback durante a atividade.

As questões poderão utilizar:

- imagens de componentes e dispositivos;
- textos curtos;
- associação entre itens e funções;
- classificação de elementos por categoria;
- situações-problema relacionadas ao uso cotidiano da tecnologia.

Pedagogicamente, o objeto tem três finalidades principais:

- introduzir conceitos fundamentais da Computação;
- desenvolver a capacidade de classificar, relacionar e analisar elementos tecnológicos;
- estimular autonomia, atenção, persistência e uso responsável da tecnologia.

## Requisitos de aprendizagem

Os requisitos de aprendizagem foram elaborados com base em verbos cognitivos associados à taxonomia de Bloom aplicada à Computação, contemplando conceitos, habilidades e disposições. Cada requisito indica, ao final, as habilidades da BNCC de Computação com as quais se relaciona; o mapeamento consolidado está na seção [Alinhamento com a BNCC de Computação](#alinhamento-com-a-bncc-de-computação).

### Requisito 1: reconhecer e diferenciar hardware e software

- Tipo: conceitos.
- Nível cognitivo predominante: reconhecer e compreender.
- Descrição: o estudante deverá reconhecer componentes físicos e programas digitais, diferenciando hardware e software em exemplos do cotidiano.
- Avaliação: atividades de identificação visual nas quais o estudante classifica imagens e nomes de itens em duas categorias: hardware ou software. A satisfação do requisito poderá ser verificada pelo percentual de acertos, pela redução de erros de confusão entre categorias e pela consistência das respostas ao longo de diferentes fases.
- BNCC de Computação: EF02CO04 (diferenciar hardware e software) e EF15CO07 (integração entre hardware e software).

### Requisito 2: classificar elementos da Computação em categorias funcionais

- Tipo: habilidades.
- Nível cognitivo predominante: classificar e organizar.
- Descrição: o estudante deverá classificar corretamente elementos da Computação em categorias como hardware, software, componentes de rede, dispositivos de entrada, dispositivos de saída e formas de armazenamento.
- Avaliação: atividades de arrastar e soltar, agrupamento de cartões ou múltipla escolha por categoria. O requisito será considerado satisfatório quando o estudante conseguir organizar os itens de forma coerente, justificar escolhas em questões selecionadas ou manter desempenho mínimo definido pelo professor.
- BNCC de Computação: EF02CO05 (reconhecer características e usos das tecnologias computacionais) e EF15CO06 (componentes básicos de dispositivos computacionais).

### Requisito 3: relacionar componentes às suas funções básicas

- Tipo: conceitos e habilidades.
- Nível cognitivo predominante: compreender e relacionar.
- Descrição: o estudante deverá relacionar componentes e tecnologias às suas funções básicas, como entrada, processamento, armazenamento, saída, conexão e proteção de dados.
- Avaliação: questões de associação entre item e função, além de atividades em que o estudante deverá escolher qual componente melhor atende a determinada necessidade. A verificação poderá ser feita pelo número de associações corretas e pela capacidade de explicar, em linguagem simples, por que determinado componente foi selecionado.
- BNCC de Computação: EF15CO06 (componentes básicos de dispositivos computacionais), EF15CO07 (integração entre hardware e software) e EF15CO08 (relacionar tecnologias ao acesso à informação e à resolução de problemas).

### Requisito 4: analisar situações de uso da tecnologia e selecionar a resposta mais adequada

- Tipo: habilidades e disposições.
- Nível cognitivo predominante: analisar e selecionar.
- Descrição: o estudante deverá analisar situações simples envolvendo o uso de dispositivos e ambientes digitais, selecionando a solução ou conduta mais adequada em cada caso.
- Avaliação: situações-problema curtas, como escolher o recurso mais adequado para acessar uma informação, armazenar um arquivo, compartilhar um conteúdo ou proteger dados pessoais. O requisito será satisfeito quando o estudante demonstrar capacidade de identificar a necessidade apresentada, selecionar uma resposta coerente e justificar sua decisão com base no contexto.
- BNCC de Computação: EF02CO05 (usos das tecnologias computacionais) e EF15CO08 (relacionar tecnologias ao acesso à informação e à resolução de problemas).

### Requisito 5: demonstrar autonomia, persistência e responsabilidade durante a atividade

- Tipo: disposições.
- Nível cognitivo predominante: aplicar e monitorar o próprio desempenho.
- Descrição: o estudante deverá demonstrar autonomia para avançar nas fases, persistência diante de desafios progressivos e responsabilidade ao interagir com conteúdos relacionados ao uso da tecnologia.
- Avaliação: acompanhamento do número de tentativas, continuidade da participação, tempo de permanência na atividade, uso do feedback oferecido pelo sistema e autoavaliação ao final do quiz. Esse requisito será observado por indicadores de engajamento e pela postura do estudante diante de erros e correções.
- BNCC de Computação: EF02CO06 (cuidados com a segurança no uso de dispositivos) e EF15CO09 (uso seguro, ético e responsável da tecnologia).

## Alinhamento com a BNCC de Computação

O objeto de aprendizagem dialoga com a BNCC de Computação, especialmente com habilidades relacionadas aos eixos Mundo Digital e Cultura Digital. As habilidades mais diretamente associadas são:

- EF02CO04: diferenciar hardware e software;
- EF02CO05: reconhecer características e usos das tecnologias computacionais;
- EF02CO06: abordar cuidados com a segurança no uso de dispositivos;
- EF15CO06: trabalhar componentes básicos de dispositivos computacionais;
- EF15CO07: introduzir a integração entre hardware e software;
- EF15CO08: relacionar tecnologias ao acesso à informação e à resolução de problemas;
- EF15CO09: tratar do uso seguro, ético e responsável da tecnologia.

O quadro a seguir relaciona cada requisito de aprendizagem às habilidades da BNCC de Computação que ele ajuda a desenvolver:

| Requisito de aprendizagem | Habilidades da BNCC de Computação |
| --- | --- |
| R1 — reconhecer e diferenciar hardware e software | EF02CO04, EF15CO07 |
| R2 — classificar elementos da Computação em categorias funcionais | EF02CO05, EF15CO06 |
| R3 — relacionar componentes às suas funções básicas | EF15CO06, EF15CO07, EF15CO08 |
| R4 — analisar situações de uso e selecionar a resposta mais adequada | EF02CO05, EF15CO08 |
| R5 — demonstrar autonomia, persistência e responsabilidade | EF02CO06, EF15CO09 |

Esse alinhamento fortalece a pertinência pedagógica do objeto e demonstra sua contribuição para a formação inicial do estudante em Computação.

## Requisitos técnicos

Para contemplar os requisitos de aprendizagem, o objeto deverá atender aos seguintes requisitos técnicos:

1. Apresentar o quiz em fases progressivas, com aumento gradual de dificuldade.
2. Vincular cada questão a um requisito de aprendizagem e a uma categoria de conteúdo.
3. Suportar diferentes formatos de questão, como múltipla escolha, associação, classificação e situações-problema.
4. Registrar acertos, erros, número de tentativas e desempenho por requisito.
5. Fornecer feedback imediato ao estudante após cada resposta ou ao final de cada fase.
6. Gerar relatório final com o desempenho do estudante por requisito de aprendizagem.
7. Apresentar interface simples, visual, responsiva e adequada ao uso em computador, tablet ou celular.

## Mapas conceituais

Definidos os requisitos de aprendizagem e técnicos, o modelo conceitual é apresentado em dois mapas separados.

O primeiro mapa tem **Computação** como conceito raiz, e todos os relacionamentos partem dele em direção aos conceitos mais específicos. A raiz deixa explícito o que a Computação é: a área que **estuda o processamento da informação**, **apoia-se em algoritmos** e **acontece em sistemas computacionais**. A partir desse núcleo, o mapa desce organizando os demais conceitos com três tipos de relacionamento:

- **de composição** (*são compostos por* / *é composta por*): por exemplo, os *Sistemas Computacionais* são compostos por *Hardware* e *Software*, e a *Rede de Computadores* é composta por *Roteador* e *Servidor*;
- **hierárquicos** (*pode ser*): partindo do conceito mais geral para o mais específico, o *Software* pode ser *Sistema Operacional*, *Aplicativo* ou *Navegador*; o *Hardware* pode ser *Dispositivo de Entrada* ou *Dispositivo de Saída*; o *Dispositivo Computacional* pode ser *Celular*, *Computador* ou *Televisão*; e a *Rede de Computadores* pode ser a *Internet*;
- **específicos de domínio**: por exemplo, o *Processamento da Informação* atua sobre os *Dados*, o *Hardware* é controlado pelo *Sistema Operacional*, o *Navegador* acessa a *Internet*, a *Rede de Computadores* conecta o *Dispositivo Computacional* e a *Cultura Digital* promove o *Uso Seguro e Responsável*.

O foco permanece no uso concreto da tecnologia no dia a dia, como celular, computador, televisão, teclado, touchscreen, navegador, internet e nuvem.

[Mapa conceitual principal no Cmaps Cloud](https://cmapscloud.ihmc.us/viewer/cmap/22QX0PKVD-M6R5HJ-1W557D)

O segundo mapa trata apenas dos aspectos avaliativos do **Quiz de Computação**. Ele é independente do mapa principal, mas cita o mapa de Computação como referência para orientar conceitos avaliados, tipos de questão, fases, evidências, feedback e relatório do professor.

[Mapa conceitual do quiz no Cmaps Cloud](https://cmapscloud.ihmc.us:443/rid=22NYXMXMV-P0Q7VY-MRC9K9)

## Modelo instrucional

<img width="1404" height="1680" alt="modelo-instrucional(3)(1)" src="https://github.com/user-attachments/assets/4be94d9f-9a3f-41e6-b196-b00526179b0a" />


## Desenvolvimento previsto

O desenvolvimento do objeto poderá ser organizado em três etapas.

Na primeira etapa, será construído o banco de questões, distribuído por temas e níveis de dificuldade. Cada questão receberá marcações internas relacionadas ao requisito de aprendizagem que pretende avaliar.

Na segunda etapa, será estruturada a navegação do quiz, com organização em fases. O estudante iniciará por questões de reconhecimento e classificação, avançando posteriormente para associação funcional e situações-problema. Essa progressão permitirá acompanhar o desenvolvimento cognitivo de forma gradual.

Na terceira etapa, será implementado o sistema de feedback e relatório. Ao final da atividade, o professor poderá visualizar em quais requisitos o estudante apresentou melhor desempenho e em quais ainda necessita de reforço. Dessa maneira, o objeto de aprendizagem não funcionará apenas como instrumento de acerto e erro, mas também como recurso diagnóstico e formativo.

## Conclusão

O objeto de aprendizagem proposto apresenta potencial para introduzir conceitos fundamentais da Computação de forma interativa, progressiva e pedagogicamente orientada. A definição dos requisitos de aprendizagem contempla conceitos, habilidades e disposições, além de estabelecer formas objetivas de avaliação para cada requisito.

Os requisitos técnicos definidos asseguram que o software ofereça condições adequadas para a aplicação da proposta pedagógica, garantindo progressão, registro de desempenho, feedback e geração de relatório. Assim, o objeto de aprendizagem torna-se um recurso viável tanto para apoiar a aprendizagem do estudante quanto para subsidiar a avaliação do professor.
