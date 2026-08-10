// Banco de Dados Centralizado do Curso de Banco de Dados 101 - Turma 101
const SITE_DATA = {
  title: "Banco de Dados 101",
  subtitle: "Aprenda modelagem, relacionamentos, SGBD, transformação e normalização de dados!",

  // Estrutura de Módulos da Teoria baseada nos slides do prof. Euclides Paim
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "Módulo 1: Introdução a Banco de Dados",
      badge: "🔍",
      concepts: [
        {
          id: "data-info",
          title: "1. Dado vs Informação vs Conhecimento",
          description: "Os dados e a informação são as peças de construção do conhecimento:<br>" +
                       "• <strong>Dado:</strong> É um registro bruto, solto e sem contexto (ex: <code>42</code>, <code>Azul</code>).<br>" +
                       "• <strong>Informação:</strong> É o dado organizado e com contexto suficiente para fazer sentido (ex: <code>A temperatura da sala é 42°C</code>).<br>" +
                       "• <strong>Conhecimento:</strong> É a informação compreendida e aplicada para tomar decisões (ex: <code>A sala precisa ser evacuada pois 42°C oferece risco</code>).",
          example: `Dado: "25"
Informação: "O aluno tem 25 anos de idade"
Conhecimento: "Como o aluno tem 25 anos, pode se inscrever na autoescola"`,
          analogy: "<strong>Analogia:</strong> O dado é a peça de LEGO solta no chão; a informação é a nave espacial montada; o conhecimento é saber como brincar com ela."
        },
        {
          id: "data-types",
          title: "2. Dados Estruturados vs Não Estruturados",
          description: "Os dados podem se organizar de diferentes formas:<br>" +
                       "• <strong>Estruturados:</strong> Seguem um modelo predefinido e rígido, organizados em tabelas com linhas e colunas (ex: planilha de notas, extrato bancário).<br>" +
                       "• <strong>Não Estruturados:</strong> Não seguem um modelo rígido e precisam de processamento extra para extrair significado (ex: áudios de WhatsApp, fotos de eventos, vídeos de TikTok).",
          example: `Estruturados: Registro escolar (Matrícula, Nome, Turma)
Não Estruturados: Arquivos de áudio (.mp3), Imagens da galeria (.jpg)`,
          analogy: "<strong>Analogia:</strong> Dados estruturados são camisas organizadas em gavetas etiquetadas; dados não estruturados são roupas jogadas no cesto de roupa suja."
        },
        {
          id: "crud-operations",
          title: "3. O Poder do C.R.U.D.",
          description: "Representa as quatro operações fundamentais que qualquer sistema faz sobre os dados:<br>" +
                       "• <strong>C - Create (Criar):</strong> Inserir novos registros (ex: postar uma foto).<br>" +
                       "• <strong>R - Read (Ler):</strong> Consultar e ver registros (ex: olhar o feed).<br>" +
                       "• <strong>U - Update (Atualizar):</strong> Modificar registros existentes (ex: editar a legenda de um post).<br>" +
                       "• <strong>D - Delete (Excluir):</strong> Remover registros (ex: apagar um post antigo).",
          example: `Create: INSERT INTO Alunos VALUES (101, 'Ana');
Read: SELECT * FROM Alunos;
Update: UPDATE Alunos SET Nome = 'Ana Silva' WHERE RA = 101;
Delete: DELETE FROM Alunos WHERE RA = 101;`,
          analogy: "<strong>Analogia:</strong> CRUD são as quatro ações que você pode fazer com uma folha no fichário: anexar folha nova (Create), ler a folha (Read), passar corretivo e reescrever (Update), e arrancar e jogar fora (Delete)."
        }
      ]
    },
    {
      id: "mod-2",
      number: 2,
      title: "Módulo 2: Sistemas de Gerenciamento (SGBD)",
      badge: "🗄️",
      concepts: [
        {
          id: "sgbd-intro",
          title: "1. O que é um SGBD?",
          description: "Um Sistema de Gerenciamento de Banco de Dados (SGBD) é o software responsável por organizar, proteger e controlar o acesso às informações digitais. Sem ele, os dados seriam apenas arquivos espalhados sem integridade.",
          example: `SGBDs Relacionais Famosos: MySQL, PostgreSQL, Oracle, SQLite, SQL Server.
SGBDs NoSQL Famosos: Cassandra, MongoDB, Redis.`,
          analogy: "<strong>Analogia:</strong> O SGBD é o bibliotecário responsável por arquivar, catalogar e emprestar os livros, garantindo que ninguém perca ou rasgue as páginas."
        },
        {
          id: "sgbd-pillars",
          title: "2. Os 4 Pilares do SGBD",
          description: "Um banco de dados completo é mantido por um ecossistema composto por:<br>" +
                       "• <strong>Dados:</strong> A essência do banco, organizada em tabelas ou documentos.<br>" +
                       "• <strong>Software:</strong> O programa gerenciador (o próprio SGBD).<br>" +
                       "• <strong>Hardware:</strong> Os servidores físicos, discos de armazenamento e redes.<br>" +
                       "• <strong>Usuários:</strong> Administradores (DBAs), desenvolvedores e usuários finais.",
          example: `Dados: Cadastro de usuários
Software: PostgreSQL
Hardware: Servidores da AWS
Usuários: Desenvolvedor web escrevendo queries`,
          analogy: "<strong>Analogia:</strong> Em um restaurante, os Dados são os ingredientes, o Software (SGBD) é a receita e a cozinha, o Hardware são os fogões e geladeiras, e os Usuários são os cozinheiros e clientes."
        },
        {
          id: "sql-nosql",
          title: "3. Relacional (SQL) vs Não Relacional (NoSQL)",
          description: "• <strong>Relacional (SQL):</strong> Organiza tudo em tabelas estruturadas conectadas por chaves. Muito seguro e preciso (ex: transações bancárias, cadastros de escolas).<br>" +
                       "• <strong>Não Relacional (NoSQL):</strong> Armazena dados de forma flexível (documentos, chave-valor, grafos). Ótimo para velocidade e grandes volumes (ex: inventários de jogos, feeds de redes sociais).",
          example: `SQL: Tabela Alunos conectada à Tabela Notas.
NoSQL: Documento JSON contendo dados flexíveis do perfil do jogador.`,
          analogy: "<strong>Analogia:</strong> Relacional (SQL) é como um arquivo de aço com pastas suspensas padronizadas; Não Relacional (NoSQL) é como caixas organizadoras onde você joga itens de formatos diferentes."
        }
      ]
    },
    {
      id: "mod-3",
      number: 3,
      title: "Módulo 3: Modelo Entidade-Relacionamento (MER)",
      badge: "📐",
      concepts: [
        {
          id: "mer-elements",
          title: "1. Entidades, Atributos e Identificadores",
          description: "O MER é o planejamento visual do banco:<br>" +
                       "• <strong>Entidade (Substantivo):</strong> Representa objetos do mundo real (ex: <code>Aluno</code>, <code>Curso</code>). Desenha-se em <strong>Retângulos</strong>.<br>" +
                       "• <strong>Atributo (Adjetivo):</strong> Características que descrevem a entidade (ex: <code>Nome</code>, <code>CPF</code>). Desenha-se em <strong>Elipses</strong>.<br>" +
                       "• <strong>Atributo Identificador (Chave Primária):</strong> Atributo exclusivo que não se repete (ex: <code>Matrícula</code>). Seu nome fica <strong>Sublinhado</strong>.",
          example: `Entidade: Aluno
Atributos: RA (Identificador), Nome, Data de Nascimento`,
          analogy: "<strong>Analogia:</strong> Se a Entidade é um arquivo físico rotulado 'Clientes', os Atributos são os campos na ficha cadastral, e a Chave Primária é o número sequencial único impresso no topo da ficha."
        },
        {
          id: "mer-relationships",
          title: "2. Relacionamentos e Cardinalidade",
          description: "Os <strong>Relacionamentos (Verbos)</strong> conectam as entidades e são desenhados em <strong>Losangos</strong>. A <strong>Cardinalidade</strong> define as regras de quantidade:<br>" +
                       "• <strong>1:1 (Um para um):</strong> Um cidadão possui um único CPF.<br>" +
                       "• <strong>1:N (Um para muitos):</strong> Uma mãe pode ter vários filhos, mas cada filho tem uma mãe biológica.<br>" +
                       "• <strong>N:N (Muitos para muitos):</strong> Um aluno cursa várias disciplinas, e uma disciplina possui vários alunos.",
          example: `[Aluno] --- (1,N) --- <Estuda em> --- (1,1) --- [Turma]
[Professor] --- (1,N) --- <Ministra> --- (1,N) --- [Disciplina]`,
          analogy: "<strong>Analogia:</strong> Relacionamento é o casamento de informações; a cardinalidade é a regra que diz se o relacionamento é exclusivo (1:1), monogâmico de um lado (1:N) ou livre (N:N)."
        }
      ]
    },
    {
      id: "mod-4",
      number: 4,
      title: "Módulo 4: Transformação para o Modelo Relacional",
      badge: "🔄",
      concepts: [
        {
          id: "transformation-rules",
          title: "1. Regras de Transformação (MER para Relacional)",
          description: "Computadores não guardam diagramas. Traduzimos o MER em tabelas lógicas:<br>" +
                       "• <strong>Entidade</strong> vira <strong>Tabela</strong>.<br>" +
                       "• <strong>Atributo</strong> vira <strong>Coluna (Campo)</strong>.<br>" +
                       "• <strong>Atributo Identificador</strong> vira <strong>Chave Primária (PK)</strong>.<br>" +
                       "• <strong>Relacionamento</strong> vira <strong>Chave Estrangeira (FK)</strong> ou uma <strong>Nova Tabela</strong>.",
          example: `MER: Entidade Aluno(RA, Nome)
Relacional: Tabela Aluno com PK RA.`,
          analogy: "<strong>Analogia:</strong> A transformação é como traduzir a planta baixa desenhada pelo arquiteto em uma lista de materiais de construção para o mestre de obras."
        },
        {
          id: "transformation-keys",
          title: "2. Chave Primária (PK) vs Chave Estrangeira (FK)",
          description: "• <strong>Chave Primária (Primary Key - PK):</strong> Identifica de forma exclusiva o registro da própria tabela. Não aceita duplicados nem valores nulos.<br>" +
                       "• <strong>Chave Estrangeira (Foreign Key - FK):</strong> Uma coluna que aponta para a PK de outra tabela, criando uma ponte de conexão entre elas.",
          example: `Tabela Turma(CodTurma [PK], NomeTurma)
Tabela Aluno(RA [PK], Nome, CodTurma [FK -> aponta para Turma.CodTurma])`,
          analogy: "<strong>Analogia:</strong> A PK é a sua carteira de identidade nacional na sua casa; a FK é a cópia da identidade do seu responsável guardada na secretaria da escola."
        },
        {
          id: "transformation-cardinalities",
          title: "3. Mapeando 1:N e N:N nas Tabelas",
          description: "• <strong>Relacionamento 1:N:</strong> Copiamos a chave PK do lado '1' e jogamos para a tabela do lado 'N' como Chave Estrangeira (FK).<br>" +
                       "• <strong>Relacionamento N:N:</strong> Cria-se uma nova tabela própria (tabela de ligação ou ponte) contendo as duas chaves das tabelas originais juntas.",
          example: `1:N: Departamento(CodDep [PK]) e Funcionario(RA [PK], CodDep [FK])
N:N: Aluno(RA [PK]), Disciplina(CodDisc [PK]) e Matricula(RA [FK], CodDisc [FK])`,
          analogy: "<strong>Analogia:</strong> No 1:N, o filho carrega o sobrenome do pai. No N:N, cria-se uma certidão de casamento separada registrando a união de ambos."
        }
      ]
    },
    {
      id: "mod-5",
      number: 5,
      title: "Módulo 5: Normalização de Dados",
      badge: "🧼",
      concepts: [
        {
          id: "normalization-intro",
          title: "1. O que é Normalização?",
          description: "Normalizar é o processo de analisar e reestruturar as tabelas para eliminar redundâncias e evitar inconsistências ao inserir, atualizar ou excluir informações. Trata-se de colocar cada informação no seu devido lugar.",
          example: `Problema: Cadastrar o nome e telefone do cliente cinco vezes porque ele comprou cinco produtos.
Solução: Criar a tabela Clientes e a tabela Vendas conectadas por chaves.`,
          analogy: "<strong>Analogia:</strong> Normalizar é como organizar a sua caixa de ferramentas: chaves de fenda em um compartimento, pregos em outro, em vez de deixar tudo jogado e misturado em um balde."
        },
        {
          id: "normal-forms",
          title: "2. As Formas Normais (1FN, 2FN e 3FN)",
          description: "O processo é feito aplicando-se as Formas Normais em sequência:<br>" +
                       "• <strong>1ª Forma Normal (1FN):</strong> Exige valores atômicos. Sem listas ou múltiplos valores em uma única célula.<br>" +
                       "• <strong>2ª Forma Normal (2FN):</strong> Deve estar na 1FN e os campos não-chave devem depender de TODA a chave primária (elimina dependências parciais).<br>" +
                       "• <strong>3ª Forma Normal (3FN):</strong> Deve estar na 2FN e nenhum campo não-chave deve depender de outro campo não-chave (elimina dependências transitivas).",
          example: `1FN: Dividir uma célula com dois telefones em duas linhas.
3FN: Separar 'Cidade' e 'Estado' da tabela de Clientes se tivermos o campo CEP.`,
          analogy: "<strong>Analogia:</strong> 1FN: Cada gaveta só guarda um tipo de objeto (nada de misturar meias e cintos). 2FN: Toda a etiqueta da gaveta diz respeito a quem ela pertence. 3FN: Informações secundárias não brigam entre si na mesma pasta."
        }
      ]
    }
  ],

  // Quizzes (15 perguntas objetivas baseadas nos slides)
  quiz: [
    {
      id: 1,
      question: "Qual das opções a seguir é a definição correta de um 'Dado'?",
      options: [
        "A informação processada que conta uma história.",
        "Um registro bruto de um fato, medida ou ocorrência, sem interpretação.",
        "A capacidade de tomar decisões a partir de uma planilha.",
        "Uma chave estrangeira que conecta duas tabelas."
      ],
      correctAnswer: 1,
      explanation: "O dado é o valor bruto, solto e sem contexto, como um número ou palavra isolada."
    },
    {
      id: 2,
      question: "Classifique o seguinte cenário: 'A sala precisa ser evacuada porque 42°C oferece risco à saúde'. Trata-se de:",
      options: [
        "Dado",
        "Informação",
        "Conhecimento",
        "Tabela Relacional"
      ],
      correctAnswer: 2,
      explanation: "É conhecimento, pois envolve a informação interpretada e integrada à experiência, permitindo uma tomada de decisão (evacuar)."
    },
    {
      id: 3,
      question: "Qual destas opções é um exemplo de Dado Não Estruturado?",
      options: [
        "Uma planilha Excel com Nome, Idade e Telefone.",
        "Uma tabela de banco de dados SQL contendo notas de alunos.",
        "Um arquivo de áudio enviado pelo WhatsApp.",
        "Uma lista de chamada ordenada por matrícula."
      ],
      correctAnswer: 2,
      explanation: "Os áudios de WhatsApp, vídeos e imagens são dados não estruturados porque não seguem um formato rígido em colunas e tabelas."
    },
    {
      id: 4,
      question: "O conceito de CRUD descreve as quatro operações básicas. O que a letra 'U' representa?",
      options: [
        "User (Usuário)",
        "Update (Atualizar)",
        "Union (União)",
        "Underline (Sublinhado)"
      ],
      correctAnswer: 1,
      explanation: "A letra 'U' significa 'Update', que representa a modificação ou atualização de um registro já existente."
    },
    {
      id: 5,
      question: "Qual o papel principal de um SGBD em um ambiente de TI?",
      options: [
        "Prover a fiação física de redes e cabos dos servidores.",
        "Criar interfaces visuais e botões em páginas HTML.",
        "Gerenciar, organizar, proteger e controlar o acesso às informações de um banco.",
        "Executar algoritmos matemáticos no interpretador Python."
      ],
      correctAnswer: 2,
      explanation: "O SGBD (Sistema de Gerenciamento de Bancos de Dados) gerencia a persistência física, segurança e integridade de dados lógicos."
    },
    {
      id: 6,
      question: "Quais são os 4 Pilares de um SGBD estudados em aula?",
      options: [
        "HTML, CSS, JS e Python",
        "Dados, Software, Hardware e Usuários",
        "Tabelas, Colunas, Chaves e Queries",
        "Create, Read, Update e Delete"
      ],
      correctAnswer: 1,
      explanation: "Um ecossistema de banco de dados é composto por Dados (informação), Software (SGBD), Hardware (servidores) e Usuários."
    },
    {
      id: 7,
      question: "Qual modelo de SGBD organiza as informações como uma árvore genealógica, onde cada registro possui apenas um pai?",
      options: [
        "SGBD Relacional",
        "SGBD Em Rede",
        "SGBD Hierárquico",
        "SGBD Orientado a Objetos"
      ],
      correctAnswer: 2,
      explanation: "O modelo Hierárquico organiza dados em estruturas semelhantes a árvores (pai e filhos), muito utilizado nos anos 1960/70."
    },
    {
      id: 8,
      question: "No Modelo Entidade-Relacionamento (MER), como as Entidades são representadas graficamente?",
      options: [
        "Elipses",
        "Losangos",
        "Retângulos",
        "Círculos"
      ],
      correctAnswer: 2,
      explanation: "As entidades (substantivos do mundo real) são representadas por retângulos nos diagramas DER."
    },
    {
      id: 9,
      question: "O que representa uma linha sublinhada em um atributo no diagrama DER?",
      options: [
        "Um relacionamento multivalorado.",
        "Uma Chave Estrangeira (FK).",
        "O Atributo Identificador (Chave Primária - PK).",
        "Uma entidade fraca."
      ],
      correctAnswer: 2,
      explanation: "O atributo identificador (chave que identifica unicamente a entidade) deve estar sublinhado no diagrama conceitual."
    },
    {
      id: 10,
      question: "Qual tipo de cardinalidade é ilustrado pelo exemplo: 'Um cidadão tem um único CPF e cada CPF pertence a um único cidadão'?",
      options: [
        "1:N (Um para Muitos)",
        "N:N (Muitos para Muitos)",
        "1:1 (Um para Um)",
        "N:1 (Muitos para Um)"
      ],
      correctAnswer: 2,
      explanation: "Trata-se de uma associação exclusiva 1:1, onde um elemento de A se liga a no máximo um de B e vice-versa."
    },
    {
      id: 11,
      question: "No Dicionário de Tradução do MER para o Modelo Relacional, o que uma 'Entidade' se torna no banco?",
      options: [
        "Uma Coluna",
        "Uma Chave Estrangeira",
        "Uma Tabela",
        "Um Registro"
      ],
      correctAnswer: 2,
      explanation: "No modelo lógico-relacional, a entidade conceitual (Retângulo) se torna uma tabela física."
    },
    {
      id: 12,
      question: "O que é uma Chave Estrangeira (Foreign Key - FK)?",
      options: [
        "Uma chave secreta para criptografar senhas do administrador.",
        "Um atributo que identifica unicamente a linha da própria tabela.",
        "Um atributo que aponta para a Chave Primária de outra tabela, criando relacionamento.",
        "Um campo que contém apenas dados não estruturados."
      ],
      correctAnswer: 2,
      explanation: "A chave estrangeira é uma coluna que referencia a chave primária de outra tabela para ligar os registros."
    },
    {
      id: 13,
      question: "Qual a regra correta para mapear um Relacionamento N:N (Muitos para Muitos) no Modelo Relacional?",
      options: [
        "Colocar a FK na tabela que tiver menos registros.",
        "Criar uma nova tabela própria contendo as chaves primárias de ambas as tabelas como chaves estrangeiras.",
        "Fazer a fusão completa das duas entidades em uma única tabela gigante.",
        "Adicionar um atributo multivalorado na tabela do lado esquerdo."
      ],
      correctAnswer: 1,
      explanation: "Um relacionamento muitos-para-muitos (N:N) sempre resulta na criação de uma nova tabela ponte para evitar inconsistências."
    },
    {
      id: 14,
      question: "Qual regra define a Primeira Forma Normal (1FN) na normalização de dados?",
      options: [
        "Todos os campos devem depender de toda a chave primária.",
        "Cada coluna deve conter apenas valores atômicos (indivisíveis), sem listas ou múltiplos valores.",
        "Devem ser eliminadas as dependências transitivas.",
        "Todas as tabelas precisam ter pelo menos duas chaves estrangeiras."
      ],
      correctAnswer: 1,
      explanation: "A 1FN exige a eliminação de campos multivalorados e repetitivos; cada célula da tabela deve conter um único valor atômico."
    },
    {
      id: 15,
      question: "Na 3ª Forma Normal (3FN), o que tentamos eliminar nas tabelas?",
      options: [
        "Campos compostos e multivalorados.",
        "Dependências parciais da chave primária.",
        "Dependências transitivas (quando um campo depende de outro que não é chave).",
        "A necessidade de usar chaves estrangeiras."
      ],
      correctAnswer: 2,
      explanation: "A 3FN remove dependências transitivas, garantindo que colunas não-chave dependam exclusivamente da chave primária."
    }
  ],

  // 5 Desafios Conceituais Interativos
  challenges: [
    {
      level: 1,
      name: "Nível 1: Dado, Informação ou Conhecimento? 🧠",
      description: "Classifique os blocos conceituais nas colunas corretas para testar se você sabe a diferença entre Dado (bruto), Informação (contexto) e Conhecimento (ação).",
      items: [
        { text: "38 °C", type: "dado" },
        { text: "A febre do paciente atingiu 38 °C", type: "informacao" },
        { text: "Ministrar antitérmico porque 38 °C indica febre", type: "conhecimento" },
        { text: "R$ 1.500,00", type: "dado" },
        { text: "O aluguel do apartamento custa R$ 1.500,00", type: "informacao" }
      ],
      targets: ["dado", "informacao", "conhecimento"]
    },
    {
      level: 2,
      name: "Nível 2: Estruturado ou Não Estruturado? 📦",
      description: "Identifique como as mídias e formatos de armazenamento se dividem em dados Estruturados (tabelas padronizadas) e Não Estruturados (sem esquema fixo).",
      items: [
        { text: "Boletim escolar com notas e faltas", type: "estruturado" },
        { text: "Vídeo MP4 postado na rede social", type: "nao-estruturado" },
        { text: "Mensagem de voz enviada por aplicativo", type: "nao-estruturado" },
        { text: "Planilha de estoque com código de barras e preço", type: "estruturado" },
        { text: "Foto tirada de uma câmera fotográfica", type: "nao-estruturado" }
      ],
      targets: ["estruturado", "nao-estruturado"]
    },
    {
      level: 3,
      name: "Nível 3: Símbolos Conceituais (DER) 📐",
      description: "Mapeie cada elemento conceitual do diagrama Entidade-Relacionamento com a figura geométrica correspondente recomendada pela notação de Peter Chen.",
      items: [
        { text: "Entidade (ex: Aluno)", type: "retangulo" },
        { text: "Atributo Comum (ex: Nome)", type: "elipse" },
        { text: "Atributo Identificador / Chave (ex: CPF)", type: "elipse-sublinhada" },
        { text: "Relacionamento / Verbo (ex: Estuda)", type: "losango" }
      ],
      targets: ["retangulo", "elipse", "elipse-sublinhada", "losango"]
    },
    {
      level: 4,
      name: "Nível 4: Mapeamento de Relacionamentos (1:N) 🔄",
      description: "Temos duas entidades: <code>Departamento</code> e <code>Funcionário</code>. Um departamento possui <strong>vários</strong> funcionários e um funcionário pertence a <strong>um único</strong> departamento. Complete a regra de Chave Estrangeira:",
      questionText: "Onde devemos posicionar a Chave Estrangeira (FK) 'CodDepartamento' para conectar as duas tabelas corretamente?",
      options: [
        "Na tabela Departamento",
        "Na tabela Funcionário",
        "Em uma tabela intermediária nova"
      ],
      correctAnswer: 1, // Na tabela Funcionário (lado N)
      explanation: "Pelas regras de transformação do MER, em relacionamentos de 1:N, a chave estrangeira (FK) sempre deve ser adicionada na tabela correspondente ao lado 'N' da cardinalidade."
    },
    {
      level: 5,
      name: "Nível 5: Limpeza da Primeira Forma Normal (1FN) 🧼",
      description: "Analise a tabela a seguir:<br><table class='sim-table' style='width:100%; font-size:0.85rem; margin:10px 0;'><tr><th>ID</th><th>Nome</th><th>Telefones</th></tr><tr><td>1</td><td>Carlos</td><td>(47) 9911-2233, (47) 9888-4455</td></tr></table>Como essa linha de dados deve ficar para satisfazer à 1FN (Valores Atômicos)?",
      options: [
        "Criar mais uma coluna chamada 'Telefones_Completo' e juntar tudo com barra.",
        "Dividir os telefones em linhas separadas: uma linha com o primeiro telefone e outra linha repetindo o cliente Carlos com o segundo telefone.",
        "Remover a coluna Telefones por completo, pois dados multivalorados devem ser excluídos."
      ],
      correctAnswer: 1,
      explanation: "A Primeira Forma Normal proíbe listas de valores dentro de uma única célula. A correção clássica consiste em desmembrar os valores em registros/linhas separadas ou transferi-los para uma tabela dependente."
    }
  ],

  // Avaliação 1 (3 Questões práticas baseadas nos slides)
  exam: [
    {
      id: 1,
      name: "Questão 1: Definindo Cardinalidade da Regra de Negócio 🎢",
      description: "Analise a seguinte regra de negócio de uma escola: <em>'Um aluno pode se matricular em várias disciplinas no trimestre, e cada disciplina pode ter uma lista de vários alunos matriculados.'</em><br><br>Qual a cardinalidade correta deste relacionamento?",
      options: [
        "1:1 (Um para um)",
        "1:N (Um para muitos)",
        "N:N (Muitos para muitos)"
      ],
      correctAnswer: 2,
      explanation: "Como ambas as pontas admitem múltiplas associações (um aluno cursa muitas disciplinas e uma disciplina tem muitos alunos), o relacionamento é do tipo N:N."
    },
    {
      id: 2,
      name: "Questão 2: Regras de Chaves e Identificadores 🔑",
      description: "Ao mapear a entidade <code>Cliente(CPF, Nome, Telefone)</code> para o modelo relacional:<br>• O atributo <code>CPF</code> será configurado como o quê?<br>• E o atributo <code>CodCliente</code> em uma tabela de Vendas que aponta para o cliente será o quê?",
      options: [
        "CPF será Chave Estrangeira (FK) e CodCliente será Chave Primária (PK).",
        "CPF será Chave Primária (PK) e CodCliente será Chave Estrangeira (FK).",
        "Ambos serão Chaves Primárias (PK) da mesma tabela."
      ],
      correctAnswer: 1,
      explanation: "O CPF é o atributo identificador exclusivo (PK). O campo de referência na tabela dependente (Vendas) é a chave estrangeira (FK) que aponta para o cliente."
    },
    {
      id: 3,
      name: "Questão 3: Violação de Terceira Forma Normal (3FN) 🧼",
      description: "Em uma tabela de Funcionários, temos as colunas: <code>ID_Funcionario (PK)</code>, <code>Nome</code>, <code>Codigo_Departamento</code> e <code>Nome_Departamento</code>. <br>Notamos que <code>Nome_Departamento</code> depende diretamente de <code>Codigo_Departamento</code> (que não é a chave primária da tabela).<br><br>Qual forma normal está sendo violada aqui?",
      options: [
        "1ª Forma Normal (1FN)",
        "2ª Forma Normal (2FN)",
        "3ª Forma Normal (3FN)"
      ],
      correctAnswer: 2,
      explanation: "A dependência transitiva (quando um campo não-chave como Nome_Departamento depende de outro campo não-chave como Codigo_Departamento) viola as regras da 3ª Forma Normal (3FN)."
    }
  ]
};
