// Banco de Dados Centralizado do Curso Expandido de HTML & CSS 101
const SITE_DATA = {
  title: "HTML & CSS 101",
  subtitle: "Aprenda estrutura, estilização, Flexbox, formulários e responsividade!",

  // Estrutura de Módulos da Teoria Ampliada
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "Módulo 1: Fundamentos (HTML & CSS)",
      badge: "🧱",
      concepts: [
        {
          id: "html-basics",
          title: "1. Estrutura e Tags HTML",
          description: "O HTML (HyperText Markup Language) constrói o esqueleto físico de páginas web. Usamos tags demarcadoras como <code>&lt;h1&gt;</code> para títulos de destaque, <code>&lt;p&gt;</code> para parágrafos e <code>&lt;a&gt;</code> para hiperlinks.<br>Os títulos vão de <code>&lt;h1&gt;</code> (o mais importante) até <code>&lt;h6&gt;</code> (o menos importante). Use <code>&lt;h2&gt;</code> e <code>&lt;h3&gt;</code> para subtítulos dentro da página.",
          example: `<h1>Meu Primeiro Título</h1>
<p>Este é um parágrafo contendo um <a href="https://google.com">link externo</a>.</p>`,
          analogy: "<strong>Analogia:</strong> O HTML é a estrutura de tijolos e colunas de uma casa."
        },
        {
          id: "css-basics",
          title: "2. Estilos e Seletores CSS",
          description: "O CSS (Cascading Style Sheets) pinta e estiliza a estrutura HTML. Usamos seletores de tag (ex: <code>h1</code>), seletores de classe (ex: <code>.destaque</code>) e seletores de ID (ex: <code>#topo</code>) para declarar cores, fontes e alinhamentos.",
          example: `/* Estilização Básica */
h1 {
  color: #1E3A8A;
  font-family: sans-serif;
}

.destaque {
  color: #0D9488;
  font-weight: bold;
}`,
          analogy: "<strong>Analogia:</strong> O CSS é a pintura das paredes e a escolha dos móveis."
        },
        {
          id: "box-model",
          title: "3. O Box Model (Content, Padding, Border, Margin)",
          description: "Todo elemento HTML é renderizado como uma caixa retangular. O Box Model é composto por quatro camadas: Conteúdo (Content), Preenchimento Interno (Padding), Borda Externa (Border) e Margem de Afastamento (Margin).",
          example: `.caixa {
  width: 250px;
  padding: 20px;
  border: 2px solid #1E3A8A;
  margin: 15px;
}`,
          analogy: "<strong>Analogia:</strong> Content = presente, Padding = plástico bolha, Border = caixa de papelão, Margin = espaço até a próxima caixa no caminhão."
        }
      ]
    },
    {
      id: "mod-2",
      number: 2,
      title: "Módulo 2: Layout Moderno & Flexbox",
      badge: "📐",
      concepts: [
        {
          id: "flexbox-intro",
          title: "1. Introdução ao Flexbox (display: flex)",
          description: "O Flexbox é o modelo de layout unidimensional do CSS moderno. Ao aplicar <code>display: flex;</code> no elemento pai (container), os elementos filhos passam a se organizar em linha ou coluna de forma inteligente.",
          example: `.container {
  display: flex;
  flex-direction: row; /* Alinha em linha (padrão) ou column */
}`,
          analogy: "<strong>Analogia:</strong> Uma prateleira inteligente que organiza e ajusta a largura dos objetos automaticamente."
        },
        {
          id: "flexbox-alignment",
          title: "2. Alinhamento com justify-content e align-items",
          description: "Use <code>justify-content</code> para controlar a distribuição no eixo principal (horizontal) e <code>align-items</code> no eixo cruzado (vertical). Defina espaçamentos diretos entre os itens com a propriedade <code>gap</code>.",
          example: `.painel-centralizado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}`,
          analogy: "<strong>Analogia:</strong> Justify alinha os passageiros na fila da bilheteria; Align ajusta a altura dos bancos do ônibus."
        }
      ]
    },
    {
      id: "mod-3",
      number: 3,
      title: "Módulo 3: Formulários & Interatividade",
      badge: "📝",
      concepts: [
        {
          id: "forms-basics",
          title: "1. Estrutura de Formulários e Inputs",
          description: "A tag <code>&lt;form&gt;</code> coleta dados do usuário. Utilizamos campos <code>&lt;input&gt;</code> de vários tipos (<code>type=\"text\"</code>, <code>type=\"password\"</code>, <code>type=\"email\"</code>, <code>type=\"color\"</code>), conectando rótulos com a tag <code>&lt;label for=\"id\"&gt;</code>.",
          example: `<form>
  <label for="usuario">Usuário:</label>
  <input type="text" id="usuario" placeholder="Digite seu login">
  
  <label for="senha">Senha:</label>
  <input type="password" id="senha">
  
  <button type="submit">Entrar</button>
</form>`,
          analogy: "<strong>Analogia:</strong> Um formulário digital funciona exatamente como uma ficha de cadastro física em papel."
        },
        {
          id: "css-pseudo-classes",
          title: "2. Pseudo-classes de Interatividade (:hover, :focus, :active)",
          description: "As pseudo-classes criam respostas visuais instantâneas às ações do usuário:<br>• <code>:hover</code> ativa ao passar o cursor do mouse.<br>• <code>:focus</code> ativa ao clicar dentro de um campo de texto.<br>• <code>:active</code> ativa durante o clique físico do botão.",
          example: `/* Efeitos de Interação */
button {
  background-color: #0D9488;
  color: white;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #0F766E; /* Fica escuro ao passar o mouse */
  transform: translateY(-2px);
}

input:focus {
  border-color: #38BDF8; /* Borda brilha no foco */
  outline: none;
}`,
          analogy: "<strong>Analogia:</strong> Pseudo-classes são como botões com iluminação LED que acendem quando tocados."
        }
      ]
    },
    {
      id: "mod-4",
      number: 4,
      title: "Módulo 4: Mídia & Responsividade",
      badge: "📱",
      concepts: [
        {
          id: "media-images",
          title: "1. Imagens Flexíveis & object-fit",
          description: "Inserimos imagens via tag <code>&lt;img src=\"url\" alt=\"descrição\"&gt;</code>. Para ajustar a imagem dentro de um container sem esticá-la ou achatar o rosto, usamos a propriedade CSS <code>object-fit: cover;</code> combinada com <code>border-radius</code>.",
          example: `img.foto-perfil {
  width: 140px;
  height: 140px;
  object-fit: cover; /* Mantém a proporção sem distorcer */
  border-radius: 50%; /* Transforma a imagem em círculo */
}`,
          analogy: "<strong>Analogia:</strong> `object-fit: cover` recorta uma foto para caber em um porta-retratos sem achatar a imagem."
        },
        {
          id: "media-queries",
          title: "2. Design Responsivo com Media Queries (@media)",
          description: "Permite que uma única página web se adapte automaticamente a telas de computadores, tablets e celulares. Usamos <code>@media (max-width: 768px)</code> para aplicar novos estilos quando a tela for pequena.",
          example: `/* Estilo Padrão para Computadores */
.grid-cards {
  display: flex;
  flex-direction: row;
}

/* Regra Responsiva para Celulares */
@media (max-width: 768px) {
  .grid-cards {
    flex-direction: column; /* Transforma a linha em coluna */
  }
}`,
          analogy: "<strong>Analogia:</strong> O Design Responsivo faz o site se comportar como água que assume o formato de qualquer recipiente."
        }
      ]
    },
    {
      id: "mod-5",
      number: 5,
      title: "Módulo 5: Tipos Primitivos (JS)",
      badge: "💎",
      concepts: [
        {
          id: "js-basics",
          title: "1. Introdução & Tipos Primitivos",
          description: "O JavaScript dá dinâmica e lógica ao desenvolvimento web. Declaramos variáveis dinâmicas com <code>let</code> e constantes imutáveis com <code>const</code>. Seus tipos primitivos fundamentais são:<br>• <code>String</code> (texto entre aspas)<br>• <code>Number</code> (números inteiros ou decimais)<br>• <code>Boolean</code> (true ou false)<br>• <code>null</code> (vazio intencional)<br>• <code>undefined</code> (variável declarada sem valor definido).",
          example: `// Declaração de Variáveis
let nome = "João";      // String
const idade = 16;       // Number
let aprovado = true;    // Boolean
let endereco = null;    // null
let telefone;           // undefined`,
          analogy: "<strong>Analogia:</strong> Variáveis são gavetas rotuladas e os tipos primitivos são os tipos de objetos armazenados em cada gaveta."
        }
      ]
    },
    {
      id: "mod-6",
      number: 6,
      title: "Módulo 6: Operadores & Expressões (JS)",
      badge: "➗",
      concepts: [
        {
          id: "js-operators",
          title: "1. Operadores e Expressões",
          description: "Operadores processam e comparam dados no JS:<br>• <strong>Aritméticos:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (resto de divisão).<br>• <strong>Atribuição:</strong> <code>=</code>, <code>+=</code>, <code>-=</code>.<br>• <strong>Comparação Rígida:</strong> <code>===</code> (igualdade de valor e tipo), <code>!==</code> (diferença de valor e tipo).<br>• <strong>Lógicos:</strong> <code>&&</code> (E), <code>||</code> (OU), <code>!</code> (NÃO).",
          example: `let a = 10;
a += 5; // a vira 15
let sobra = 27 % 5; // 2 (resto da divisao de 27 por 5)
let resultado = (15 === "15"); // false (tipo diferente)
let permissao = (a > 12) && (10 !== 9); // true && true -> true`,
          analogy: "<strong>Analogia:</strong> Operadores são os motores de cálculo e sensores que dizem se condições lógicas são verdadeiras ou falsas."
        }
      ]
    }
  ],

  // Quizzes (15 Perguntas Didáticas)
  quiz: [
    {
      id: 1,
      moduleId: "mod-1",
      question: "Qual palavra-chave/abreviação significa HTML?",
      options: [
        "HyperText Markup Language",
        "HighTech Modern Language",
        "HyperTransfer Markup Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: 0,
      explanation: "HTML significa HyperText Markup Language (Linguagem de Marcação de Hipertexto) e constrói a estrutura básica de páginas web."
    },
    {
      id: 2,
      moduleId: "mod-1",
      question: "Qual tag HTML é usada para criar o título principal de maior importância em uma página web?",
      options: [
        "<title>",
        "<heading>",
        "<h1>",
        "<head>"
      ],
      correctAnswer: 2,
      explanation: "A tag <h1> define o título principal de nível 1 em uma página web."
    },
    {
      id: 3,
      moduleId: "mod-1",
      question: "No CSS, como selecionamos todos os elementos HTML que possuem a classe 'destaque' (ex: class=\"destaque\")?",
      options: [
        "#destaque",
        "destaque",
        ".destaque",
        "*destaque"
      ],
      correctAnswer: 2,
      explanation: "No CSS, seletores de classe iniciam com ponto ('.'), seletores de ID iniciam com cerquilha ('#') e seletores de tag não usam símbolo."
    },
    {
      id: 4,
      moduleId: "mod-1",
      question: "No CSS Box Model, qual propriedade representa o espaço interno entre o conteúdo do elemento e sua borda?",
      options: [
        "margin",
        "padding",
        "border",
        "spacing"
      ],
      correctAnswer: 1,
      explanation: "O 'padding' é o preenchimento interno. A 'margin' é a distância externa que afasta o elemento de outros vizinhos."
    },
    {
      id: 5,
      moduleId: "mod-1",
      question: "Qual a propriedade CSS correta para alterar a cor do texto de um elemento?",
      options: [
        "text-color",
        "font-color",
        "color",
        "background-color"
      ],
      correctAnswer: 2,
      explanation: "Usamos 'color' para a cor das letras do texto e 'background-color' para a cor de fundo do bloco."
    },
    {
      id: 6,
      moduleId: "mod-2",
      question: "Qual propriedade CSS deve ser aplicada em um container pai para ativá-lo como um container Flexbox?",
      options: [
        "display: block;",
        "display: flex;",
        "flex: 1;",
        "layout: flexbox;"
      ],
      correctAnswer: 1,
      explanation: "Aplicamos 'display: flex;' no container pai para que seus filhos diretos passem a seguir as regras de alinhamento do Flexbox."
    },
    {
      id: 7,
      moduleId: "mod-2",
      question: "Qual valor da propriedade 'justify-content' distribui os itens flexíveis colocando o primeiro no início, o último no fim e espaço igual entre eles?",
      options: [
        "justify-content: center;",
        "justify-content: space-around;",
        "justify-content: space-between;",
        "justify-content: flex-end;"
      ],
      correctAnswer: 2,
      explanation: "'space-between' coloca o máximo de espaço livre entre os itens internos, empurrando as extremidades para as bordas."
    },
    {
      id: 8,
      moduleId: "mod-2",
      question: "Para alinhar itens verticalmente ao centro dentro de um container Flexbox (com flex-direction em linha padrão), qual propriedade utilizamos?",
      options: [
        "align-items: center;",
        "justify-content: center;",
        "text-align: center;",
        "vertical-align: middle;"
      ],
      correctAnswer: 0,
      explanation: "'align-items: center;' controla o alinhamento no eixo cruzado (vertical por padrão no Flexbox)."
    },
    {
      id: 9,
      moduleId: "mod-2",
      question: "Como definimos um espaçamento uniforme de 16px diretamente entre os elementos dentro de um container Flexbox sem usar margin individual?",
      options: [
        "spacing: 16px;",
        "gap: 16px;",
        "padding: 16px;",
        "between: 16px;"
      ],
      correctAnswer: 1,
      explanation: "A propriedade 'gap: 16px;' define o espaço automático entre linhas e colunas dentro do Flexbox ou Grid."
    },
    {
      id: 10,
      moduleId: "mod-2",
      question: "Qual propriedade altera a orientação do container Flexbox para organizar os elementos de cima para baixo (em coluna)?",
      options: [
        "flex-direction: column;",
        "flex-orientation: vertical;",
        "display: column;",
        "flex-flow: vertical;"
      ],
      correctAnswer: 0,
      explanation: "'flex-direction: column;' muda o eixo principal do Flexbox para a vertical."
    },
    {
      id: 11,
      moduleId: "mod-3",
      question: "Qual pseudo-classe CSS é ativada quando o usuário passa o ponteiro do mouse por cima de um elemento?",
      options: [
        ":focus",
        ":hover",
        ":active",
        ":visited"
      ],
      correctAnswer: 1,
      explanation: "A pseudo-classe ':hover' aplica estilos enquanto o mouse estiver sobre o elemento."
    },
    {
      id: 12,
      moduleId: "mod-3",
      question: "Ao criar um campo de texto em formulários HTML, qual tipo de input deve ser usado para ocultar os caracteres com bolinhas de segurança?",
      options: [
        "<input type=\"text\">",
        "<input type=\"hidden\">",
        "<input type=\"password\">",
        "<input type=\"secret\">"
      ],
      correctAnswer: 2,
      explanation: "O tipo '<input type=\"password\">' substitui os caracteres visíveis por pontos ou asteriscos de privacidade."
    },
    {
      id: 13,
      moduleId: "mod-4",
      question: "Para evitar que uma imagem <img> fique esticada ou deformada quando definimos width e height fixos, qual propriedade CSS devemos usar?",
      options: [
        "image-fit: cover;",
        "object-fit: cover;",
        "background-size: cover;",
        "aspect-ratio: auto;"
      ],
      correctAnswer: 1,
      explanation: "'object-fit: cover;' faz a imagem preencher a área recortando os excessos sem distorcer o seu aspecto."
    },
    {
      id: 14,
      moduleId: "mod-4",
      question: "Qual sintaxe CSS é usada para aplicar estilos condicionados ao tamanho da tela (Design Responsivo)?",
      options: [
        "@screen (max-width: 768px) { ... }",
        "@media (max-width: 768px) { ... }",
        "@responsive (mobile) { ... }",
        "#media-query { ... }"
      ],
      correctAnswer: 1,
      explanation: "Usamos '@media (max-width: ...)' para declarar Media Queries que adaptam o CSS conforme o tamanho da tela."
    },
    {
      id: 15,
      moduleId: "mod-3",
      question: "Qual propriedade CSS arredonda os cantos de botões, caixas e imagens para criar bordas suaves ou círculos?",
      options: [
        "border-round",
        "corner-radius",
        "border-radius",
        "box-radius"
      ],
      correctAnswer: 2,
      explanation: "'border-radius' define o raio de arredondamento das bordas. Use '50%' para tornar um elemento quadrado em um círculo perfeito."
    },
    {
      id: 16,
      moduleId: "mod-5",
      question: "Qual palavra-chave é usada para declarar uma variável cujo valor NÃO pode ser reatribuído (constante)?",
      options: [
        "var",
        "let",
        "const",
        "static"
      ],
      correctAnswer: 2,
      explanation: "A palavra-chave 'const' é usada para declarar constantes de escopo de bloco que não podem ser alteradas por reatribuição."
    },
    {
      id: 17,
      moduleId: "mod-5",
      question: "Qual o resultado e o tipo da expressão (10 === '10') em JavaScript?",
      options: [
        "true (Boolean)",
        "false (Boolean)",
        "undefined",
        "Gera um erro de sintaxe"
      ],
      correctAnswer: 1,
      explanation: "O operador de igualdade estrita (===) compara tanto o valor quanto o tipo. Como 10 é Number e '10' é String, o resultado é false."
    },
    {
      id: 18,
      moduleId: "mod-6",
      question: "Qual o valor da variável x após a execução do código: let x = 5; x += 3;?",
      options: [
        "5",
        "3",
        "8",
        "15"
      ],
      correctAnswer: 2,
      explanation: "O operador '+=' realiza uma adição e atribuição. Assim, x += 3 é equivalente a x = x + 3. Como x era 5, ele passa a ser 8."
    },
    {
      id: 19,
      moduleId: "mod-6",
      question: "Qual o operador utilizado para obter o resto inteiro da divisão entre dois números em JavaScript?",
      options: [
        "/",
        "%",
        "&",
        "mod"
      ],
      correctAnswer: 1,
      explanation: "O operador de módulo (%) retorna o resto da divisão inteira de um número por outro (ex: 27 % 5 resulta em 2)."
    },
    {
      id: 20,
      moduleId: "mod-6",
      question: "Dadas as variáveis let a = true; let b = false;, qual o resultado de (a && b) || !b?",
      options: [
        "true",
        "false",
        "null",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "(a && b) resulta em false (true && false = false). A negação !b resulta em true. A expressão final (false || true) resulta em true."
    }
  ],

  // 10 Desafios Práticos com Validação DOM
  exercises: [
    {
      level: 1,
      moduleId: "mod-1",
      name: "Nível 1: Estruturando o Cabeçalho 🏷️",
      description: "Crie a tag de título principal da página. Crie um elemento <code>&lt;h1&gt;</code> contendo exatamente o texto <strong>Meu Primeiro Site</strong>.",
      starterCode: `<!-- Escreva sua tag h1 abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existe a tag <h1>?",
          validate: (doc) => doc.querySelector('h1') !== null
        },
        {
          id: 2,
          label: "O texto do <h1> é 'Meu Primeiro Site'?",
          validate: (doc) => doc.querySelector('h1')?.innerText.trim() === "Meu Primeiro Site"
        }
      ]
    },
    {
      level: 2,
      moduleId: "mod-1",
      name: "Nível 2: Dando Cor ao Título 🎨",
      description: "Dê vida ao seu título! Crie a tag <code>&lt;h1&gt;</code> com o texto <strong>Título Colorido</strong>. No bloco <code>&lt;style&gt;</code>, adicione uma regra CSS para que o <code>h1</code> tenha a cor vermelha (<code>red</code>).",
      starterCode: `<style>\n  /* Escreva sua regra CSS para o h1 abaixo: */\n  \n</style>\n\n<!-- Crie seu h1 abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existe a tag <h1>?",
          validate: (doc) => doc.querySelector('h1') !== null
        },
        {
          id: 2,
          label: "O texto do <h1> é 'Título Colorido'?",
          validate: (doc) => doc.querySelector('h1')?.innerText.trim() === "Título Colorido"
        },
        {
          id: 3,
          label: "A cor do <h1> é vermelha (red)?",
          validate: (doc) => {
            const h1 = doc.querySelector('h1');
            if (!h1) return false;
            const color = window.getComputedStyle(h1).color;
            return color === "rgb(255, 0, 0)" || color === "red";
          }
        }
      ]
    },
    {
      level: 3,
      moduleId: "mod-1",
      name: "Nível 3: Links e Parágrafos Aninhados 🔗",
      description: "Crie um parágrafo <code>&lt;p&gt;</code> contendo o texto 'Visite o site do ' seguido de uma tag de link <code>&lt;a&gt;</code> com o destino <code>href=\"https://www.google.com\"</code> e o texto interno <strong>Google</strong>.",
      starterCode: `<!-- Crie seu parágrafo p com o link a interno abaixo: -->\n<p>Visite o site do </p>`,
      testCases: [
        {
          id: 1,
          label: "Existe a tag <p>?",
          validate: (doc) => doc.querySelector('p') !== null
        },
        {
          id: 2,
          label: "Existe a tag <a> dentro do <p>?",
          validate: (doc) => doc.querySelector('p a') !== null
        },
        {
          id: 3,
          label: "O link aponta para https://www.google.com?",
          validate: (doc) => {
            const a = doc.querySelector('p a');
            if (!a) return false;
            const href = a.getAttribute('href')?.trim();
            return href === "https://www.google.com" || href === "https://www.google.com/";
          }
        },
        {
          id: 4,
          label: "O texto do link é 'Google'?",
          validate: (doc) => doc.querySelector('p a')?.innerText.trim() === "Google"
        }
      ]
    },
    {
      level: 4,
      moduleId: "mod-1",
      name: "Nível 4: Seleção com Classes 🏷️",
      description: "Crie dois parágrafos <code>&lt;p&gt;</code>:<br>1. O primeiro com a classe <code>importante</code> contendo o texto <strong>Atenção Aluno!</strong>.<br>2. O segundo comum contendo o texto <strong>Conteúdo normal.</strong>.<br>No CSS (bloco <code>&lt;style&gt;</code>), faça apenas a classe <code>.importante</code> ter a cor verde (<code>green</code>).",
      starterCode: `<style>\n  /* Estilize apenas a classe .importante abaixo: */\n  \n</style>\n\n<!-- Crie os dois parágrafos abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existem pelo menos dois parágrafos <p>?",
          validate: (doc) => doc.querySelectorAll('p').length >= 2
        },
        {
          id: 2,
          label: "Existe o parágrafo de classe 'importante'?",
          validate: (doc) => doc.querySelector('p.importante') !== null
        },
        {
          id: 3,
          label: "A classe .importante está com cor verde (green)?",
          validate: (doc) => {
            const imp = doc.querySelector('p.importante');
            if (!imp) return false;
            const color = window.getComputedStyle(imp).color;
            return color === "rgb(0, 128, 0)" || color === "green";
          }
        }
      ]
    },
    {
      level: 5,
      moduleId: "mod-1",
      name: "Nível 5: O Box Model na Prática 📦",
      description: "Monte uma caixa usando as 4 camadas do Box Model.<br><br><strong>Passo 1.</strong> Crie uma <code>&lt;div&gt;</code> com a classe <code>painel</code> e escreva um texto dentro dela.<br><strong>Passo 2.</strong> No CSS, na regra <code>.painel</code>, escreva:<br>• <code>padding: 20px;</code><br>• <code>border: 2px solid black;</code><br>• <code>margin: 10px;</code><br>• <code>background-color: lightgray;</code>",
      starterCode: `<style>\n  .painel {\n    /* Adicione as regras de Box Model aqui: */\n    \n  }\n</style>\n\n<!-- Crie a div com classe painel abaixo: -->\n<div class="painel">\n  Conteúdo do Painel\n</div>`,
      testCases: [
        {
          id: 1,
          label: "Existe a <div class=\"painel\">?",
          validate: (doc) => doc.querySelector('div.painel') !== null
        },
        {
          id: 2,
          label: "Padding interno de 20px?",
          validate: (doc) => {
            const painel = doc.querySelector('div.painel');
            if (!painel) return false;
            const style = window.getComputedStyle(painel);
            return style.paddingTop === "20px" && style.paddingRight === "20px";
          }
        },
        {
          id: 3,
          label: "Borda preta sólida de 2px?",
          validate: (doc) => {
            const painel = doc.querySelector('div.painel');
            if (!painel) return false;
            const style = window.getComputedStyle(painel);
            const isBlack = style.borderLeftColor === "rgb(0, 0, 0)" || style.borderLeftColor === "black";
            const isSolid = style.borderLeftStyle === "solid";
            const is2px = style.borderLeftWidth === "2px";
            return isBlack && isSolid && is2px;
          }
        },
        {
          id: 4,
          label: "Margin de 10px?",
          validate: (doc) => {
            const painel = doc.querySelector('div.painel');
            if (!painel) return false;
            const style = window.getComputedStyle(painel);
            return style.marginTop === "10px" && style.marginRight === "10px";
          }
        },
        {
          id: 5,
          label: "Possui cor de fundo (background-color)?",
          validate: (doc) => {
            const painel = doc.querySelector('div.painel');
            if (!painel) return false;
            const bg = window.getComputedStyle(painel).backgroundColor;
            // Aceita qualquer cor definida, desde que não seja o fundo padrão (transparente).
            return bg !== "" && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)";
          }
        }
      ]
    },
    {
      level: 6,
      moduleId: "mod-2",
      name: "Nível 6: Alinhamento com Flexbox 📐",
      description: "Alinhe dois botões nas pontas usando Flexbox.<br><br><strong>Passo 1.</strong> Crie uma <code>&lt;div&gt;</code> com a classe <code>menu-flex</code>.<br><strong>Passo 2.</strong> Dentro dela, crie <strong>2</strong> elementos <code>&lt;button&gt;</code>.<br><strong>Passo 3.</strong> No CSS, na regra <code>.menu-flex</code>, escreva:<br>• <code>display: flex;</code><br>• <code>justify-content: space-between;</code>",
      starterCode: `<style>\n  .menu-flex {\n    /* Adicione as regras de Flexbox aqui: */\n    \n  }\n</style>\n\n<div class="menu-flex">\n  <button>Início</button>\n  <button>Contato</button>\n</div>`,
      testCases: [
        {
          id: 1,
          label: "Existe o container .menu-flex?",
          validate: (doc) => doc.querySelector('div.menu-flex') !== null
        },
        {
          id: 4,
          label: "Existem 2 botões dentro do .menu-flex?",
          validate: (doc) => {
            const el = doc.querySelector('div.menu-flex');
            if (!el) return false;
            return el.querySelectorAll('button').length === 2;
          }
        },
        {
          id: 2,
          label: "display: flex aplicado?",
          validate: (doc) => {
            const el = doc.querySelector('div.menu-flex');
            if (!el) return false;
            return window.getComputedStyle(el).display === "flex";
          }
        },
        {
          id: 3,
          label: "justify-content: space-between aplicado?",
          validate: (doc) => {
            const el = doc.querySelector('div.menu-flex');
            if (!el) return false;
            return window.getComputedStyle(el).justifyContent === "space-between";
          }
        }
      ]
    },
    {
      level: 7,
      moduleId: "mod-3",
      name: "Nível 7: Interatividade com :hover 🖱️",
      description: "Faça o botão mudar de cor quando o mouse passar por cima.<br><br>O botão e a cor azul já estão prontos no editor.<br><br><strong>Passo único.</strong> No CSS, embaixo do comentário, escreva a regra:<br><code>.btn-interativo:hover { background-color: green; }</code>",
      starterCode: `<style>\n  .btn-interativo {\n    background-color: blue;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n  }\n  \n  /* Adicione a regra :hover abaixo: */\n  \n</style>\n\n<button class="btn-interativo">Clique Aqui</button>`,
      testCases: [
        {
          id: 1,
          label: "Existe o botão com a classe btn-interativo?",
          validate: (doc) => doc.querySelector('button.btn-interativo') !== null
        },
        {
          id: 2,
          label: "A cor de fundo inicial do botão é azul (blue)?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-interativo');
            if (!btn) return false;
            return window.getComputedStyle(btn).backgroundColor === "rgb(0, 0, 255)";
          }
        },
        {
          id: 3,
          label: "Existe a regra .btn-interativo:hover com fundo verde (green)?",
          validate: (doc) => {
            // Percorre as regras CSS reais da página para inspecionar o estado :hover,
            // que não aparece no getComputedStyle do botão.
            let ok = false;
            Array.from(doc.styleSheets).forEach(sheet => {
              let regras;
              try { regras = sheet.cssRules; } catch (e) { return; }
              Array.from(regras || []).forEach(regra => {
                if (!regra.selectorText || !regra.style) return;
                const seletor = regra.selectorText.replace(/\s+/g, '');
                if (!seletor.includes('.btn-interativo:hover')) return;
                const cor = regra.style.backgroundColor;
                if (cor === "green" || cor === "rgb(0, 128, 0)") ok = true;
              });
            });
            return ok;
          }
        }
      ]
    },
    {
      level: 8,
      moduleId: "mod-3",
      name: "Nível 8: Criando um Campo de Login 🔑",
      description: "Crie um pequeno formulário de login. Crie uma tag <code>&lt;form&gt;</code> contendo:<br>1. Um campo de texto <code>&lt;input type=\"text\" placeholder=\"Usuário\"&gt;</code>.<br>2. Um campo de senha <code>&lt;input type=\"password\" placeholder=\"Senha\"&gt;</code>.<br>3. Um botão de envio <code>&lt;button type=\"submit\"&gt;Entrar&lt;/button&gt;</code>.",
      starterCode: `<!-- Crie o formulário com os dois inputs e o botão de submit abaixo: -->\n<form>\n  \n</form>`,
      testCases: [
        {
          id: 1,
          label: "Existe a tag <form>?",
          validate: (doc) => doc.querySelector('form') !== null
        },
        {
          id: 2,
          label: "Existe o input de type='text'?",
          validate: (doc) => doc.querySelector('form input[type="text"]') !== null
        },
        {
          id: 3,
          label: "Existe o input de type='password'?",
          validate: (doc) => doc.querySelector('form input[type="password"]') !== null
        },
        {
          id: 4,
          label: "Existe o botão de submit?",
          validate: (doc) => doc.querySelector('form button') !== null
        }
      ]
    },
    {
      level: 9,
      moduleId: "mod-4",
      name: "Nível 9: Imagem com Arredondamento 🖼️",
      description: "Insira uma imagem usando a tag <code>&lt;img src=\"https://picsum.photos/200\" alt=\"Foto\" class=\"foto-arredondada\"&gt;</code>. No CSS, defina para a classe <code>.foto-arredondada</code> a propriedade <code>border-radius: 50%</code> para deixá-la circular.",
      starterCode: `<style>\n  /* Estilize a classe .foto-arredondada para border-radius: 50% abaixo: */\n  \n</style>\n\n<!-- Insira a imagem abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existe a imagem com a classe foto-arredondada?",
          validate: (doc) => doc.querySelector('img.foto-arredondada') !== null
        },
        {
          id: 2,
          label: "border-radius: 50% aplicado na imagem?",
          validate: (doc) => {
            const img = doc.querySelector('img.foto-arredondada');
            if (!img) return false;
            const radius = window.getComputedStyle(img).borderRadius;
            return radius === "50%";
          }
        }
      ]
    },
    {
      level: 10,
      moduleId: "mod-4",
      name: "Nível 10: Card de Produto Completo 🏆",
      description: "Monte o seu primeiro componente completo, juntando tudo o que você aprendeu.<br><br><strong>Passo 1.</strong> Crie uma <code>&lt;div&gt;</code> com a classe <code>card-produto</code>.<br><strong>Passo 2.</strong> Dentro dela, coloque nesta ordem:<br>• <code>&lt;h3&gt;Fone Bluetooth&lt;/h3&gt;</code><br>• <code>&lt;p&gt;R$ 199,00&lt;/p&gt;</code><br>• <code>&lt;button class=\"btn-comprar\"&gt;Comprar&lt;/button&gt;</code><br><strong>Passo 3.</strong> No CSS, na regra <code>.card-produto</code>, escreva:<br>• <code>padding: 20px;</code><br>• <code>border: 1px solid gray;</code><br>• <code>border-radius: 12px;</code><br>• <code>background-color: white;</code>",
      starterCode: `<style>\n  .card-produto {\n    /* Adicione os estilos do card abaixo: */\n    \n  }\n  \n  .btn-comprar {\n    background-color: #0D9488;\n    color: white;\n    border: none;\n    padding: 8px 16px;\n    border-radius: 6px;\n  }\n</style>\n\n<!-- Crie a div.card-produto com h3, p e button abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existe a div.card-produto?",
          validate: (doc) => doc.querySelector('div.card-produto') !== null
        },
        {
          id: 2,
          label: "Possui o h3, p e button internos?",
          validate: (doc) => {
            const card = doc.querySelector('div.card-produto');
            if (!card) return false;
            return card.querySelector('h3') !== null &&
                   card.querySelector('p') !== null &&
                   card.querySelector('button.btn-comprar') !== null;
          }
        },
        {
          id: 3,
          label: "Card possui padding: 20px e border-radius: 12px?",
          validate: (doc) => {
            const card = doc.querySelector('div.card-produto');
            if (!card) return false;
            const style = window.getComputedStyle(card);
            return style.paddingTop === "20px" && style.borderRadius === "12px";
          }
        },
        {
          id: 4,
          label: "Card possui borda cinza sólida de 1px?",
          validate: (doc) => {
            const card = doc.querySelector('div.card-produto');
            if (!card) return false;
            const s = window.getComputedStyle(card);
            return s.borderTopWidth === "1px" &&
                   s.borderTopStyle === "solid" &&
                   s.borderTopColor === "rgb(128, 128, 128)";
          }
        },
        {
          id: 5,
          label: "O fundo do card é branco (white)?",
          validate: (doc) => {
            const card = doc.querySelector('div.card-produto');
            if (!card) return false;
            return window.getComputedStyle(card).backgroundColor === "rgb(255, 255, 255)";
          }
        }
      ]
    }
  ],

  // Banco da Avaliação 1 Prática (3 Questões Prova)
  // Conteúdo restrito ao que é ensinado na Teoria:
  // Módulo 1 (seletores de classe, color, background-color, Box Model) e Módulo 2 (Flexbox).
  exam: [
    {
      id: 1,
      name: "Questão 1: Botão de Ação",
      description: "Crie um botão e pinte as suas cores.<br><br><strong>Passo 1.</strong> Crie um <code>&lt;button&gt;</code> com a classe <code>btn-acao</code>.<br><strong>Passo 2.</strong> Escreva dentro dele o texto <code>Clique Aqui</code>.<br><strong>Passo 3.</strong> No CSS, na regra <code>.btn-acao</code>, escreva:<br>• <code>background-color: blue;</code><br>• <code>color: white;</code><br>• <code>padding: 20px;</code>",
      starterCode: `<style>
  .btn-acao {
    /* Passo 3: escreva as 3 regras aqui */

  }
</style>

<!-- Passos 1 e 2: crie o botão aqui -->
`,
      testCases: [
        {
          id: 1,
          label: "Existe um <button> com a classe btn-acao?",
          validate: (doc) => doc.querySelector('button.btn-acao') !== null
        },
        {
          id: 2,
          label: "O texto do botão é 'Clique Aqui'?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-acao');
            if (!btn) return false;
            return btn.textContent.trim().toLowerCase() === "clique aqui";
          }
        },
        {
          id: 3,
          label: "A cor de fundo é azul (blue)?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-acao');
            if (!btn) return false;
            return window.getComputedStyle(btn).backgroundColor === "rgb(0, 0, 255)";
          }
        },
        {
          id: 4,
          label: "A cor do texto é branca (white)?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-acao');
            if (!btn) return false;
            return window.getComputedStyle(btn).color === "rgb(255, 255, 255)";
          }
        },
        {
          id: 5,
          label: "O padding é de 20px?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-acao');
            if (!btn) return false;
            const s = window.getComputedStyle(btn);
            return s.paddingTop === "20px" && s.paddingRight === "20px" &&
                   s.paddingBottom === "20px" && s.paddingLeft === "20px";
          }
        }
      ]
    },
    {
      id: 2,
      name: "Questão 2: Caixa com Box Model",
      description: "Monte uma caixa usando as camadas do Box Model.<br><br><strong>Passo 1.</strong> Crie uma <code>&lt;div&gt;</code> com a classe <code>cartao</code>.<br><strong>Passo 2.</strong> Escreva dentro dela o texto <code>Meu Cartao</code>.<br><strong>Passo 3.</strong> No CSS, na regra <code>.cartao</code>, escreva:<br>• <code>width: 250px;</code><br>• <code>padding: 20px;</code><br>• <code>border: 2px solid black;</code><br>• <code>margin: 15px;</code>",
      starterCode: `<style>
  .cartao {
    /* Passo 3: escreva as 4 regras aqui */

  }
</style>

<!-- Passos 1 e 2: crie a div aqui -->
`,
      testCases: [
        {
          id: 1,
          label: "Existe uma <div> com a classe cartao?",
          validate: (doc) => doc.querySelector('div.cartao') !== null
        },
        {
          id: 2,
          label: "O texto da div é 'Meu Cartao'?",
          validate: (doc) => {
            const el = doc.querySelector('div.cartao');
            if (!el) return false;
            return el.textContent.trim().toLowerCase() === "meu cartao";
          }
        },
        {
          id: 3,
          label: "A largura (width) é de 250px?",
          validate: (doc) => {
            const el = doc.querySelector('div.cartao');
            if (!el) return false;
            return window.getComputedStyle(el).width === "250px";
          }
        },
        {
          id: 4,
          label: "O padding é de 20px?",
          validate: (doc) => {
            const el = doc.querySelector('div.cartao');
            if (!el) return false;
            const s = window.getComputedStyle(el);
            return s.paddingTop === "20px" && s.paddingLeft === "20px";
          }
        },
        {
          id: 5,
          label: "A borda é preta, sólida e de 2px?",
          validate: (doc) => {
            const el = doc.querySelector('div.cartao');
            if (!el) return false;
            const s = window.getComputedStyle(el);
            return s.borderTopWidth === "2px" &&
                   s.borderTopStyle === "solid" &&
                   s.borderTopColor === "rgb(0, 0, 0)";
          }
        },
        {
          id: 6,
          label: "A margem (margin) é de 15px?",
          validate: (doc) => {
            const el = doc.querySelector('div.cartao');
            if (!el) return false;
            const s = window.getComputedStyle(el);
            return s.marginTop === "15px" && s.marginLeft === "15px";
          }
        }
      ]
    },
    {
      id: 3,
      name: "Questão 3: Painel Alinhado com Flexbox",
      description: "Use o Flexbox para alinhar três caixas lado a lado.<br><br><strong>Passo 1.</strong> Crie uma <code>&lt;div&gt;</code> com a classe <code>painel</code>.<br><strong>Passo 2.</strong> Dentro dela, crie <strong>3</strong> elementos <code>&lt;div&gt;</code>.<br><strong>Passo 3.</strong> No CSS, na regra <code>.painel</code>, escreva:<br>• <code>display: flex;</code><br>• <code>justify-content: space-between;</code><br>• <code>align-items: center;</code><br>• <code>gap: 16px;</code>",
      starterCode: `<style>
  .painel {
    /* Passo 3: escreva as 4 regras aqui */

  }
</style>

<!-- Passos 1 e 2: crie a div .painel com 3 divs dentro -->
`,
      testCases: [
        {
          id: 1,
          label: "Existe uma <div> com a classe painel?",
          validate: (doc) => doc.querySelector('div.painel') !== null
        },
        {
          id: 2,
          label: "Existem 3 <div> dentro do painel?",
          validate: (doc) => {
            const el = doc.querySelector('div.painel');
            if (!el) return false;
            return el.querySelectorAll(':scope > div').length === 3;
          }
        },
        {
          id: 3,
          label: "O painel usa display: flex?",
          validate: (doc) => {
            const el = doc.querySelector('div.painel');
            if (!el) return false;
            return window.getComputedStyle(el).display === "flex";
          }
        },
        {
          id: 4,
          label: "O justify-content é space-between?",
          validate: (doc) => {
            const el = doc.querySelector('div.painel');
            if (!el) return false;
            return window.getComputedStyle(el).justifyContent === "space-between";
          }
        },
        {
          id: 5,
          label: "O align-items é center?",
          validate: (doc) => {
            const el = doc.querySelector('div.painel');
            if (!el) return false;
            return window.getComputedStyle(el).alignItems === "center";
          }
        },
        {
          id: 6,
          label: "O gap é de 16px?",
          validate: (doc) => {
            const el = doc.querySelector('div.painel');
            if (!el) return false;
            const s = window.getComputedStyle(el);
            return s.gap === "16px" || s.rowGap === "16px" || s.columnGap === "16px";
          }
        }
      ]
    }
  ],
  exercisesJS: [
    {
      level: 1,
      moduleId: "mod-5",
      name: "Nível 1: Variáveis e Tipos Primitivos 💎",
      description: "Declare duas informações usando os dois tipos de declaração.<br><br><strong>Passo 1.</strong> Crie uma <strong>constante</strong> com <code>const</code>, chamada <code>nome</code>, com o texto <code>\"Desenvolvimento\"</code>.<br><strong>Passo 2.</strong> Crie uma <strong>variável</strong> com <code>let</code>, chamada <code>ano</code>, com o número <code>2026</code>.",
      starterCode: `// Passo 1: crie a constante 'nome' com const\n// Passo 2: crie a variável 'ano' com let\n`,
      testCases: [
        {
          id: 1,
          label: "A constante 'nome' foi declarada com const?",
          validate: (scope, ret, code) => /\bconst\s+nome\b/.test(code)
        },
        {
          id: 2,
          label: "A constante 'nome' é igual a 'Desenvolvimento'?",
          validate: (scope) => scope.nome === "Desenvolvimento"
        },
        {
          id: 3,
          label: "A variável 'ano' foi declarada com let?",
          validate: (scope, ret, code) => /\blet\s+ano\b/.test(code)
        },
        {
          id: 4,
          label: "A variável 'ano' é igual a 2026?",
          validate: (scope) => scope.ano === 2026
        }
      ]
    },
    {
      level: 2,
      moduleId: "mod-5",
      name: "Nível 2: Operadores Aritméticos ➗",
      description: "Utilize o operador de módulo (<code>%</code>) para obter o resto da divisão de <code>27</code> por <code>5</code> e armazene o resultado em uma constante chamada <code>resto</code>.",
      starterCode: `// Calcule o resto da divisão de 27 por 5 e salve na constante 'resto' abaixo:\n`,
      testCases: [
        {
          id: 1,
          label: "A constante 'resto' foi declarada?",
          validate: (scope) => scope.resto !== undefined
        },
        {
          id: 2,
          label: "A constante 'resto' possui o valor correto (2)?",
          validate: (scope) => scope.resto === 2
        }
      ]
    },
    {
      level: 3,
      moduleId: "mod-6",
      name: "Nível 3: Operadores de Atribuição ➕",
      description: "Some um valor a uma variável usando a forma simplificada.<br><br><strong>Passo 1.</strong> Crie uma variável com <code>let</code>, chamada <code>pontos</code>, com o valor <code>10</code>.<br><strong>Passo 2.</strong> Na linha seguinte, escreva <code>pontos += 5;</code>",
      starterCode: `// Passo 1: crie a variável 'pontos' com o valor 10\n// Passo 2: escreva pontos += 5;\n`,
      testCases: [
        {
          id: 1,
          label: "A variável 'pontos' foi declarada com let?",
          validate: (scope, ret, code) => /\blet\s+pontos\b/.test(code)
        },
        {
          id: 3,
          label: "Usou o operador += para somar?",
          validate: (scope, ret, code) => /\bpontos\s*\+=/.test(code)
        },
        {
          id: 2,
          label: "O valor final de 'pontos' é 15?",
          validate: (scope) => scope.pontos === 15
        }
      ]
    },
    {
      level: 4,
      moduleId: "mod-6",
      name: "Nível 4: Comparadores Rígidos ⚖️",
      description: "Compare um número com um texto e veja por que o resultado é <code>false</code>.<br><br><strong>Passo único.</strong> Escreva, na última linha, a expressão que compara o número <code>7</code> com o texto <code>\"7\"</code> usando <code>===</code>:<br><code>7 === \"7\"</code><br><br>O operador <code>===</code> compara o valor <strong>e</strong> o tipo. Como um é número e o outro é texto, o resultado é <code>false</code>.",
      starterCode: `// Passo único: escreva a expressão 7 === "7" abaixo\n`,
      testCases: [
        {
          id: 1,
          label: "O retorno da expressão é false?",
          validate: (scope, returnValue) => returnValue === false
        },
        {
          id: 2,
          label: "Utilizou o comparador de igualdade estrita (===)?",
          validate: (scope, returnValue, code) => code.includes('===')
        },
        {
          id: 3,
          label: "Comparou o número 7 com o texto '7'?",
          validate: (scope, returnValue, code) => {
            // Aceita as duas ordens: 7 === "7" ou "7" === 7.
            const limpo = code.replace(/\/\/[^\n]*/g, '').replace(/\s+/g, '');
            return /7===("7"|'7')/.test(limpo) || /("7"|'7')===7/.test(limpo);
          }
        }
      ]
    },
    {
      level: 5,
      moduleId: "mod-6",
      name: "Nível 5: Operações Lógicas Booleanas 🧠",
      description: "Verifique se o aluno pode estudar: basta ter o curso <strong>ou</strong> ter tempo.<br><br>As duas variáveis já estão prontas no editor.<br><br><strong>Passo único.</strong> Escreva, na última linha, a expressão usando os <strong>nomes das variáveis</strong> e o operador <code>||</code>:<br><code>temCurso || temTempo</code>",
      starterCode: `let temCurso = true;\nlet temTempo = false;\n\n// Passo único: escreva temCurso || temTempo abaixo\n`,
      testCases: [
        {
          id: 1,
          label: "As variáveis temCurso (true) e temTempo (false) existem?",
          validate: (scope) => scope.temCurso === true && scope.temTempo === false
        },
        {
          id: 2,
          label: "O retorno final da expressão é true?",
          validate: (scope, returnValue) => returnValue === true
        },
        {
          id: 3,
          label: "Utilizou o operador lógico || (OR)?",
          validate: (scope, returnValue, code) => code.includes('||')
        },
        {
          id: 4,
          label: "Usou as duas variáveis (e não os valores true/false direto)?",
          validate: (scope, returnValue, code) => {
            // Ignora as duas linhas de declaração já prontas no editor.
            const expressao = code
              .replace(/\/\/[^\n]*/g, '')
              .replace(/let\s+temCurso\s*=[^;\n]*[;\n]?/g, '')
              .replace(/let\s+temTempo\s*=[^;\n]*[;\n]?/g, '');
            return /temCurso/.test(expressao) && /temTempo/.test(expressao);
          }
        }
      ]
    }
  ]
};
