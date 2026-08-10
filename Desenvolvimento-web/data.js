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
          description: "O HTML (HyperText Markup Language) constrói o esqueleto físico de páginas web. Usamos tags demarcadoras como <code>&lt;h1&gt;</code> para títulos de destaque, <code>&lt;p&gt;</code> para parágrafos e <code>&lt;a&gt;</code> para hiperlinks.",
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
      description: "Crie uma <code>&lt;div&gt;</code> com a classe <code>painel</code> contendo qualquer texto. No CSS, estilize a classe <code>.painel</code> para ter:<br>• Preenchimento interno (<code>padding</code>) de <code>20px</code>.<br>• Borda sólida preta de <code>2px</code> (<code>border: 2px solid black</code>).<br>• Margem externa (<code>margin</code>) de <code>10px</code>.<br>• Cor de fundo de destaque (ex: <code>lightgray</code> ou hexadecimais).",
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
        }
      ]
    },
    {
      level: 6,
      moduleId: "mod-2",
      name: "Nível 6: Alinhamento com Flexbox 📐",
      description: "Crie uma <code>&lt;div&gt;</code> com a classe <code>menu-flex</code> contendo duas tags <code>&lt;button&gt;</code>. No CSS, transforme <code>.menu-flex</code> em um container Flexbox (<code>display: flex</code>) e alinhe os botões com distribuição de espaço nas pontas usando <code>justify-content: space-between</code>.",
      starterCode: `<style>\n  .menu-flex {\n    /* Adicione as regras de Flexbox aqui: */\n    \n  }\n</style>\n\n<div class="menu-flex">\n  <button>Início</button>\n  <button>Contato</button>\n</div>`,
      testCases: [
        {
          id: 1,
          label: "Existe o container .menu-flex?",
          validate: (doc) => doc.querySelector('div.menu-flex') !== null
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
      description: "Crie um botão <code>&lt;button class=\"btn-interativo\"&gt;Clique Aqui&lt;/button&gt;</code>. No CSS, defina a cor de fundo inicial do botão como azul (<code>blue</code>) e adicione uma regra de pseudo-classe <code>.btn-interativo:hover</code> para que a cor mude para verde (<code>green</code>) ao passar o mouse.",
      starterCode: `<style>\n  .btn-interativo {\n    background-color: blue;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n  }\n  \n  /* Adicione a regra :hover abaixo: */\n  \n</style>\n\n<button class="btn-interativo">Clique Aqui</button>`,
      testCases: [
        {
          id: 1,
          label: "Existe o botão com a classe btn-interativo?",
          validate: (doc) => doc.querySelector('button.btn-interativo') !== null
        },
        {
          id: 2,
          label: "Possui regra de CSS contendo a pseudo-classe :hover?",
          validate: (doc) => {
            const styles = doc.querySelectorAll('style');
            let hasHoverRule = false;
            styles.forEach(s => {
              if (s.innerHTML.includes(':hover')) hasHoverRule = true;
            });
            return hasHoverRule;
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
      description: "Monte o seu primeiro componente completo! Crie uma <code>&lt;div class=\"card-produto\"&gt;</code> contendo:<br>• Um título <code>&lt;h3&gt;Fone Bluetooth&lt;/h3&gt;</code>.<br>• Um parágrafo <code>&lt;p&gt;R$ 199,00&lt;/p&gt;</code>.<br>• Um botão <code>&lt;button class=\"btn-comprar\"&gt;Comprar&lt;/button&gt;</code>.<br>No CSS, faça o <code>.card-produto</code> ter <code>padding: 20px</code>, <code>border: 1px solid gray</code>, <code>border-radius: 12px</code> e fundo branco.",
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
        }
      ]
    }
  ],

  // Banco da Avaliação 1 Prática (3 Questões Prova)
  exam: [
    {
      id: 1,
      name: "Questão 1: Botão Customizado de Ação 🔘",
      description: "Crie um botão (<code>&lt;button&gt;</code>) com a classe <code>btn-acao</code> e o texto 'Clique Aqui'. No bloco CSS, estilize o botão para ter:<br>• Cor de fundo azul (<code>blue</code>) e cor de texto branca (<code>white</code>).<br>• Preenchimento interno (<code>padding</code>) de <code>10px</code> na vertical e <code>20px</code> na horizontal.<br>• Sem borda externa (<code>border: none</code>).",
      starterCode: `<style>\n  /* Estilize o botão .btn-acao abaixo: */\n  \n</style>\n\n<!-- Crie o botão com a classe btn-acao abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existe o botão com a classe btn-acao?",
          validate: (doc) => doc.querySelector('button.btn-acao') !== null
        },
        {
          id: 2,
          label: "O texto do botão é 'Clique Aqui'?",
          validate: (doc) => doc.querySelector('button.btn-acao')?.innerText.trim() === "Clique Aqui"
        },
        {
          id: 3,
          label: "Fundo azul e texto branco?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-acao');
            if (!btn) return false;
            const style = window.getComputedStyle(btn);
            const isBlue = style.backgroundColor === "rgb(0, 0, 255)" || style.backgroundColor === "blue";
            const isWhite = style.color === "rgb(255, 255, 255)" || style.color === "white";
            return isBlue && isWhite;
          }
        },
        {
          id: 4,
          label: "Padding vertical 10px e horizontal 20px?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-acao');
            if (!btn) return false;
            const style = window.getComputedStyle(btn);
            return style.paddingTop === "10px" && style.paddingBottom === "10px" &&
                   style.paddingLeft === "20px" && style.paddingRight === "20px";
          }
        },
        {
          id: 5,
          label: "Sem borda (border: none)?",
          validate: (doc) => {
            const btn = doc.querySelector('button.btn-acao');
            if (!btn) return false;
            const style = window.getComputedStyle(btn);
            return style.borderStyle === "none" || style.borderWidth === "0px";
          }
        }
      ]
    },
    {
      id: 2,
      name: "Questão 2: Lista de Tarefas sem Marcadores 📋",
      description: "Crie uma lista não ordenada (<code>&lt;ul&gt;</code>) contendo três itens de lista (<code>&lt;li&gt;</code>) com os seguintes textos exatos em ordem: 'Aprender HTML', 'Aprender CSS' e 'Criar Sites'. No CSS:<br>• Remova as bolinhas padrão da lista (<code>list-style-type: none</code>).<br>• Adicione um espaçamento inferior (<code>margin-bottom</code>) de <code>8px</code> a cada item <code>li</code>.",
      starterCode: `<style>\n  /* Remova as bolinhas da lista ul e adicione margem aos itens li abaixo: */\n  \n</style>\n\n<!-- Crie a lista ul com os três itens li abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existe a tag <ul>?",
          validate: (doc) => doc.querySelector('ul') !== null
        },
        {
          id: 2,
          label: "Existem 3 itens <li> internos?",
          validate: (doc) => doc.querySelectorAll('ul li').length === 3
        },
        {
          id: 3,
          label: "Textos dos itens <li> estão corretos?",
          validate: (doc) => {
            const lis = doc.querySelectorAll('ul li');
            if (lis.length !== 3) return false;
            return lis[0].innerText.trim() === "Aprender HTML" &&
                   lis[1].innerText.trim() === "Aprender CSS" &&
                   lis[2].innerText.trim() === "Criar Sites";
          }
        },
        {
          id: 4,
          label: "Marcadores removidos da lista?",
          validate: (doc) => {
            const ul = doc.querySelector('ul');
            const li = doc.querySelector('ul li');
            if (!ul || !li) return false;
            return window.getComputedStyle(ul).listStyleType === "none" ||
                   window.getComputedStyle(li).listStyleType === "none";
          }
        },
        {
          id: 5,
          label: "Espaçamento inferior (margin-bottom: 8px) nos itens li?",
          validate: (doc) => {
            const li = doc.querySelector('ul li');
            if (!li) return false;
            return window.getComputedStyle(li).marginBottom === "8px";
          }
        }
      ]
    },
    {
      id: 3,
      name: "Questão 3: Layout de Destaque com Borda 💎",
      description: "Crie uma seção (<code>&lt;section&gt;</code>) com o ID <code>destaque</code>. Dentro dela, insira um título <code>&lt;h2&gt;Aviso Urgente&lt;/h2&gt;</code> e um parágrafo <code>&lt;p&gt;Matrículas abertas.&lt;/p&gt;</code>. No CSS, estilize:<br>• A seção <code>#destaque</code> deve ter fundo amarelo claro (use cor <code>lightyellow</code> ou <code>#ffffcc</code>) e uma borda lateral esquerda sólida vermelha de <code>5px</code> (<code>border-left: 5px solid red</code>).<br>• O título <code>h2</code> dentro do destaque deve ter cor vermelha (<code>red</code>).",
      starterCode: `<style>\n  /* Estilize o ID #destaque e o h2 interno abaixo: */\n  \n</style>\n\n<!-- Crie a section #destaque com h2 e p abaixo: -->\n`,
      testCases: [
        {
          id: 1,
          label: "Existe a <section id=\"destaque\">?",
          validate: (doc) => doc.querySelector('section#destaque') !== null
        },
        {
          id: 2,
          label: "Possui h2 e p dentro da section?",
          validate: (doc) => {
            const sec = doc.querySelector('section#destaque');
            if (!sec) return false;
            return sec.querySelector('h2') !== null && sec.querySelector('p') !== null;
          }
        },
        {
          id: 3,
          label: "Fundo amarelo claro na section?",
          validate: (doc) => {
            const sec = doc.querySelector('section#destaque');
            if (!sec) return false;
            const bg = window.getComputedStyle(sec).backgroundColor;
            if (!bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)") return false;
            const rgb = bg.match(/\d+/g);
            if (!rgb || rgb.length < 3) return false;
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            return r > 200 && g > 200 && b < 240;
          }
        },
        {
          id: 4,
          label: "Borda esquerda vermelha sólida de 5px?",
          validate: (doc) => {
            const sec = doc.querySelector('section#destaque');
            if (!sec) return false;
            const style = window.getComputedStyle(sec);
            const isRed = style.borderLeftColor === "rgb(255, 0, 0)" || style.borderLeftColor === "red";
            const isSolid = style.borderLeftStyle === "solid";
            const is5px = style.borderLeftWidth === "5px";
            return isRed && isSolid && is5px;
          }
        },
        {
          id: 5,
          label: "O h2 interno possui cor vermelha?",
          validate: (doc) => {
            const h2 = doc.querySelector('section#destaque h2');
            if (!h2) return false;
            const color = window.getComputedStyle(h2).color;
            return color === "rgb(255, 0, 0)" || color === "red";
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
      description: "Declare uma constante chamada <code>nome</code> contendo o texto <code>\"Desenvolvimento\"</code> e uma variável mutável chamada <code>ano</code> contendo o número <code>2026</code>.",
      starterCode: `// Crie a constante 'nome' e a variável 'ano' abaixo:\n`,
      testCases: [
        {
          id: 1,
          label: "A constante 'nome' foi declarada?",
          validate: (scope) => scope.nome !== undefined
        },
        {
          id: 2,
          label: "A constante 'nome' é igual a 'Desenvolvimento'?",
          validate: (scope) => scope.nome === "Desenvolvimento"
        },
        {
          id: 3,
          label: "A variável 'ano' foi declarada?",
          validate: (scope) => scope.ano !== undefined
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
      description: "Declare uma variável mutável chamada <code>pontos</code> com o valor inicial de <code>10</code>. Na linha seguinte, some <code>5</code> a ela usando o operador de atribuição simplificada (<code>+=</code>).",
      starterCode: `// Crie a variável 'pontos' e adicione 5 a ela abaixo:\n`,
      testCases: [
        {
          id: 1,
          label: "A variável 'pontos' foi declarada?",
          validate: (scope) => scope.pontos !== undefined
        },
        {
          id: 2,
          label: "A variável 'pontos' foi inicializada com 10 e incrementada com += 5 (total 15)?",
          validate: (scope) => scope.pontos === 15
        }
      ]
    },
    {
      level: 4,
      moduleId: "mod-6",
      name: "Nível 4: Comparadores Rígidos ⚖️",
      description: "Escreva uma expressão de comparação rígida que compare o número <code>7</code> com a string <code>\"7\"</code> usando o operador <code>===</code> de modo que a expressão avalie e retorne <code>false</code>.",
      starterCode: `// Escreva a expressão abaixo (o resultado deve ser retornado no final do código):\n`,
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
          label: "Comparou o número 7 com a string '7'?",
          validate: (scope, returnValue, code) => code.includes('7') && (code.includes('"7"') || code.includes("'7'"))
        }
      ]
    },
    {
      level: 5,
      moduleId: "mod-6",
      name: "Nível 5: Operações Lógicas Booleanas 🧠",
      description: "Dadas as variáveis booleanas <code>temCurso</code> (com valor <code>true</code>) e <code>temTempo</code> (com valor <code>false</code>), escreva uma expressão lógica utilizando o operador <code>||</code> (OR) para verificar se o aluno pode estudar (se ele tiver o curso OU se ele tiver tempo). A expressão lógica deve ser a última linha de código para ser retornada.",
      starterCode: `let temCurso = true;\nlet temTempo = false;\n\n// Escreva a expressão lógica usando as duas variáveis e o operador || abaixo:\n`,
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
        }
      ]
    }
  ]
};
