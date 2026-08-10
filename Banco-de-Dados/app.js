// Controller principal da SPA de Banco de Dados 101
let studentName = "";
let viewedConcepts = new Set();
let completedChallenges = new Set(); // Níveis concluídos: 1 a 5

// Quiz State
let quizAnswers = {}; // { questionId: selectedOptionIndex }
let quizSubmitted = false;

// Challenge State
let activeChallengeLevel = 1;
let challengeUserAnswers = {}; // Respostas atuais do desafio ativo

// Exam State
let examUnlocked = false;
let examSubmitted = false;
let activeExamQuestion = 1;
let examUserAnswers = {}; // { questionId: selectedOptionIndex }

// Inicialização do site
document.addEventListener("DOMContentLoaded", () => {
  carregarProgressoLocal();
  switchTab("home");
  inicializarSidebarAccordion();
  inicializarQuiz();
  selectTheoryConcept("data-info");
  setSimulatorMode("sql");
  atualizarTabelasSQLVisuais();
  selectChallenge(1);
  setupExamQuestionsList();
  
  // Sincroniza rolagem do editor SQL do sandbox
  const textarea = document.getElementById("sim-sql-editor");
  if (textarea) {
    textarea.value = "-- Escreva seu comando SQL aqui. Exemplo:\nSELECT * FROM alunos WHERE Idade >= 16;";
    onSQLInput(textarea.value);
  }
});

// ==========================================
// NAVEGAÇÃO E GLOBAL CONTROLS
// ==========================================

function switchTab(tabId) {
  // Oculta todas as abas
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });
  // Mostra a aba ativa
  const activeTab = document.getElementById(`${tabId}-tab`);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Atualiza estado ativo nos links do menu
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-tab") === tabId) {
      link.classList.add("active");
    }
  });

  // Fecha sidebar no mobile ao trocar de aba
  const sidebar = document.getElementById("main-sidebar");
  if (sidebar && window.innerWidth <= 900) {
    sidebar.classList.remove("open");
  }

  atualizarMetricasReport();
  atualizarBoletimTexto();
  atualizarPainelProgressoHome();
}

function toggleSidebar() {
  const sidebar = document.getElementById("main-sidebar");
  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}

function inicializarSidebarAccordion() {
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const group = header.parentElement;
      group.classList.toggle("open");
    });
  });
}

// ==========================================
// TEORIA E VISUALIZADORES DINÂMICOS
// ==========================================

function selectTheoryConcept(conceptId) {
  // Marca conceito como visualizado
  viewedConcepts.add(conceptId);
  salvarProgressoLocal();
  atualizarMetricasReport();
  atualizarBoletimTexto();

  // Acha o conceito no data.js
  let foundConcept = null;
  let foundModule = null;
  
  for (let mod of SITE_DATA.modules) {
    let c = mod.concepts.find(item => item.id === conceptId);
    if (c) {
      foundConcept = c;
      foundModule = mod;
      break;
    }
  }

  if (!foundConcept) return;

  // Atualiza botões ativos na sub-navegação da teoria
  document.querySelectorAll(".theory-tab-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-concept") === conceptId) {
      btn.classList.add("active");
    }
  });

  // Injeta conteúdo do conceito
  const bodyArea = document.getElementById("theory-concept-body");
  bodyArea.innerHTML = `
    <h3 style="color: var(--primary-navy); font-family: var(--font-title); font-size: 1.5rem; margin-bottom: 0.5rem;">
      ${foundConcept.title}
    </h3>
    <div style="font-size: 1rem; color: #334155; margin-bottom: 1rem;">
      ${foundConcept.description}
    </div>
    <div class="code-snippet">
      <pre><code>${foundConcept.example}</code></pre>
    </div>
    <div style="background-color: var(--accent-teal-light); border-left: 4px solid var(--accent-teal); padding: 0.8rem 1.2rem; border-radius: 4px; font-size: 0.9rem; margin-top: 1rem; color: var(--accent-teal-hover);">
      ${foundConcept.analogy}
    </div>
  `;

  // Renderiza gráfico ilustrativo na coluna direita do visualizador
  renderTheoryVisualizer(conceptId);
}

function renderTheoryVisualizer(conceptId) {
  const area = document.getElementById("theory-visualizer-area");
  if (!area) return;

  if (conceptId === "data-info") {
    area.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%;">
        <div class="visual-step-card" style="border-left: 4px solid var(--text-light);">
          <strong>Dado (Bruto)</strong>
          <div style="font-family: var(--font-code); font-size: 1.1rem; color: var(--text-light); margin-top: 0.25rem;">"38"</div>
        </div>
        <div class="arrow-down">⬇️ (Organizar e Contextualizar)</div>
        <div class="visual-step-card" style="border-left: 4px solid var(--accent-teal);">
          <strong>Informação (Significado)</strong>
          <div style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.25rem;">"A temperatura corporal do paciente é de 38 °C."</div>
        </div>
        <div class="arrow-down">⬇️ (Experiência + Ação)</div>
        <div class="visual-step-card" style="border-left: 4px solid var(--color-success);">
          <strong>Conhecimento (Decisão)</strong>
          <div style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.25rem;">"Dar remédio para febre, pois 38 °C está acima do normal."</div>
        </div>
      </div>
    `;
  } 
  
  else if (conceptId === "sgbd-intro") {
    area.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 100%;">
        <div style="background-color: var(--primary-navy); color: white; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.85rem; font-weight: bold; width:100%; text-align:center;">
          Usuários (Nós / Aplicações Web)
        </div>
        <div style="font-size: 1rem;">↕️ (Requisições SQL)</div>
        <div style="background-color: var(--accent-teal); color: white; padding: 0.8rem 1rem; border-radius: 8px; font-size: 0.95rem; font-weight: bold; width:100%; text-align:center; box-shadow: var(--shadow-md);">
          SGBD (PostgreSQL / MySQL)
          <div style="font-size: 0.7rem; font-weight: normal; margin-top: 0.2rem;">Segurança, Índices e Controle de Transações</div>
        </div>
        <div style="font-size: 1rem;">↕️ (Leitura/Escrita Física)</div>
        <div style="background-color: #E2E8F0; color: var(--primary-navy); padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.85rem; font-weight: bold; width:100%; text-align:center;">
          Hardware (Servidor de Arquivos / SSD)
        </div>
      </div>
    `;
  } 
  
  else if (conceptId === "mer-elements") {
    area.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%;">
        <div style="border: 2px solid var(--primary-navy); padding: 0.5rem 1rem; font-family: var(--font-title); font-weight: bold; font-size: 0.9rem; background: white;">
          [Entidade: Aluno] (Retângulo)
        </div>
        <div style="font-size: 0.9rem; color: var(--text-light);">has attribute ⬇️</div>
        <div style="border: 2px solid var(--accent-teal); border-radius: 20px; padding: 0.3rem 1rem; font-size: 0.85rem; background: white;">
          (Atributo: Nome) (Elipse)
        </div>
        <div style="border: 2px dashed var(--accent-teal); border-radius: 20px; padding: 0.3rem 1rem; font-size: 0.85rem; background: white; text-decoration: underline; font-weight: 600;">
          <u>(Identificador: RA)</u> (Sublinhado)
        </div>
        <div style="font-size: 0.9rem; color: var(--text-light);">interacts via ⬇️</div>
        <div style="border: 2px solid var(--color-warning); transform: rotate(0deg); border-radius: 8px; padding: 0.4rem 1rem; font-size: 0.85rem; background: #FEF3C7; font-weight: bold;">
          &lt;Relacionamento: Matricula&gt; (Losango)
        </div>
      </div>
    `;
  } 
  
  else if (conceptId === "transformation-rules") {
    area.innerHTML = `
      <div class="visual-table-grid" style="width: 100%;">
        <table class="sim-table">
          <thead>
            <tr>
              <th>No Desenho (Conceitual)</th>
              <th>No Banco (Tabelas)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Entidade</strong> (Retângulo)</td>
              <td>Tabela (Planilha)</td>
            </tr>
            <tr>
              <td><strong>Atributo</strong> (Elipse)</td>
              <td>Coluna (Campo)</td>
            </tr>
            <tr>
              <td><strong>Identificador</strong> (Sublinhado)</td>
              <td>Chave Primária (PK)</td>
            </tr>
            <tr>
              <td><strong>Relacionamento 1:N</strong></td>
              <td>Chave Estrangeira (FK) no lado N</td>
            </tr>
            <tr>
              <td><strong>Relacionamento N:N</strong></td>
              <td>Tabela Intermediária Nova</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } 
  
  else if (conceptId === "normalization-intro") {
    area.innerHTML = `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 0.5rem;">
        <span style="font-size: 0.75rem; font-weight: bold; color: var(--color-error);">VIOLAÇÃO 1FN (Lista de Telefones numa célula):</span>
        <table class="sim-table" style="font-size: 0.7rem;">
          <tr style="background:#FFF1F2;">
            <th>Cod</th>
            <th>Nome</th>
            <th>Telefones</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Pedro</td>
            <td>(47) 9911, (47) 9888</td>
          </tr>
        </table>
        <div class="arrow-down" style="font-size: 1rem;">⬇️ Normalizando para a 1FN 🧼</div>
        <span style="font-size: 0.75rem; font-weight: bold; color: var(--color-success);">FORMATO 1FN (Valores Atômicos e Indivisíveis):</span>
        <table class="sim-table" style="font-size: 0.7rem;">
          <tr style="background:#ECFDF5;">
            <th>Cod</th>
            <th>Nome</th>
            <th>Telefone</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Pedro</td>
            <td>(47) 9911</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Pedro</td>
            <td>(47) 9888</td>
          </tr>
        </table>
      </div>
    `;
  }
}

// ==========================================
// SIMULADOR LIVE SANDBOX & MODELAGEM
// ==========================================

function setSimulatorMode(mode) {
  const sqlBtn = document.getElementById("sim-btn-sql");
  const modBtn = document.getElementById("sim-btn-modeling");
  const sqlView = document.getElementById("simulator-sql-view");
  const modView = document.getElementById("simulator-modeling-view");

  if (mode === "sql") {
    sqlBtn.classList.add("active");
    modBtn.classList.remove("active");
    sqlView.style.display = "grid";
    modView.style.display = "none";
  } else {
    sqlBtn.classList.remove("active");
    modBtn.classList.add("active");
    sqlView.style.display = "none";
    modView.style.display = "block";
    triggerModelingDemo("mer");
  }
}

// Editor SQL do Sandbox
function onSQLInput(val) {
  const highlightCode = document.getElementById("sim-sql-highlight").querySelector("code");
  if (highlightCode) {
    highlightCode.innerHTML = highlightSQL(val);
  }
}

function syncPreScroll(textarea) {
  const pre = textarea.nextElementSibling;
  if (pre) {
    pre.scrollTop = textarea.scrollTop;
    pre.scrollLeft = textarea.scrollLeft;
  }
}

function resetSQLSandbox() {
  // Restaura dados iniciais
  sandboxDB = {
    tabelas: {
      alunos: {
        colunas: ["RA", "Nome", "Idade", "CodTurma"],
        linhas: [
          { RA: 101, Nome: "Ana Silva", Idade: 16, CodTurma: "T1" },
          { RA: 102, Nome: "Bruno Souza", Idade: 15, CodTurma: "T1" },
          { RA: 103, Nome: "Carlos Lima", Idade: 17, CodTurma: "T2" }
        ]
      },
      turmas: {
        colunas: ["CodTurma", "NomeTurma", "Sala"],
        linhas: [
          { CodTurma: "T1", NomeTurma: "Desenvolvimento Web", Sala: "Laboratório 1" },
          { CodTurma: "T2", NomeTurma: "Lógica de Programação", Sala: "Laboratório 2" }
        ]
      }
    }
  };
  atualizarTabelasSQLVisuais();
  const consolePanel = document.getElementById("sim-sql-console");
  consolePanel.innerHTML = '<div class="console-msg">Banco de dados restaurado ao estado padrão inicial.</div>';
}

function runSQLSandboxQuery() {
  const code = document.getElementById("sim-sql-editor").value;
  const consolePanel = document.getElementById("sim-sql-console");
  
  if (!code.trim()) {
    consolePanel.innerHTML = '<div class="console-error">Por favor, escreva uma instrução SQL primeiro!</div>';
    return;
  }

  const res = executarSQLSimulado(code);
  
  if (res.success) {
    let outputHtml = `<div class="console-msg">${res.message}</div>`;
    
    // Constrói tabela de resultados do SELECT / comando
    if (res.colunas && res.rows) {
      outputHtml += `
        <table class="sim-table" style="margin-top: 0.5rem; color: #FFFFFF; border-color: #334155;">
          <thead>
            <tr style="background-color: #1E293B;">
              ${res.colunas.map(col => `<th style="border-color: #334155; color: #38BDF8;">${col}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${res.rows.map(row => `
              <tr>
                ${row.map(val => `<td style="border-color: #334155;">${val !== null ? val : "<em>NULL</em>"}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }
    
    consolePanel.innerHTML = outputHtml;
    atualizarTabelasSQLVisuais();
  } else {
    consolePanel.innerHTML = `<div class="console-error">${res.error}</div>`;
  }
}

function atualizarTabelasSQLVisuais() {
  const area = document.getElementById("sim-db-tables-list");
  if (!area) return;

  let html = "";
  
  Object.keys(sandboxDB.tabelas).forEach(tblName => {
    const tbl = sandboxDB.tabelas[tblName];
    html += `
      <div style="margin-bottom: 1rem;">
        <span style="font-family: var(--font-title); font-weight: 600; font-size: 0.85rem; color: var(--primary-navy); text-transform: uppercase;">
          Tabela: ${tblName}
        </span>
        <table class="sim-table" style="margin-top: 0.25rem;">
          <thead>
            <tr>
              ${tbl.colunas.map(col => `<th>${col}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${tbl.linhas.length === 0 ? `<tr><td colspan="${tbl.colunas.length}" style="text-align:center; color:var(--text-light);">Vazia</td></tr>` : ""}
            ${tbl.linhas.map(row => `
              <tr>
                ${tbl.colunas.map(col => `<td>${row[col] !== undefined && row[col] !== null ? row[col] : "<em>NULL</em>"}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  });
  
  area.innerHTML = html;
}

// Simulador de Modelagem e Normalização
function triggerModelingDemo(step) {
  const screen = document.getElementById("modeling-visual-screen");
  if (!screen) return;

  if (step === "mer") {
    screen.innerHTML = `
      <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem; text-align: center;">Mapeamento MER ➔ Relacional</h4>
      <div style="background-color: white; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); padding: 1rem; font-size: 0.8rem; line-height:1.4;">
        <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #CCC; padding: 0.5rem; background:#F8FAFC;">
          <strong>[Aluno] (Retângulo)</strong>
          <span>RA (PK), Nome, CodTurma (FK)</span>
        </div>
        <div style="text-align:center; margin: 0.5rem 0;">⬇️ se transforma em tabela ⬇️</div>
        <table class="sim-table" style="font-size: 0.75rem;">
          <thead>
            <tr style="background-color: var(--accent-teal-light);">
              <th>RA (PK)</th>
              <th>Nome</th>
              <th>CodTurma (FK)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>201</td>
              <td>Ana Paula</td>
              <td>T101</td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.5rem; text-align:center;">
          <em>A chave 'CodTurma' aponta para a tabela Turmas, criando o relacionamento.</em>
        </p>
      </div>
    `;
  }
  
  else if (step === "1fn") {
    screen.innerHTML = `
      <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem; text-align: center;">Primeira Forma Normal (1FN)</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.75rem;">
        <div style="border: 1px solid #FECDD3; background:#FFF1F2; padding: 0.5rem; border-radius: 4px;">
          <strong>Antes da 1FN:</strong> Múltiplos telefones na mesma linha:
          <table class="sim-table" style="margin-top: 0.25rem;">
            <tr><th>Cod</th><th>Nome</th><th>Telefones</th></tr>
            <tr><td>10</td><td>Maria</td><td>(47) 9922, (47) 9811</td></tr>
          </table>
        </div>
        <div style="text-align:center; font-size: 1rem; color: var(--accent-teal);">⬇️ Aplicando Valores Atômicos ⬇️</div>
        <div style="border: 1px solid #A7F3D0; background:#ECFDF5; padding: 0.5rem; border-radius: 4px;">
          <strong>Depois da 1FN:</strong> Linhas separadas para cada valor indivisível:
          <table class="sim-table" style="margin-top: 0.25rem;">
            <tr><th>Cod</th><th>Nome</th><th>Telefone</th></tr>
            <tr><td>10</td><td>Maria</td><td>(47) 9922</td></tr>
            <tr><td>10</td><td>Maria</td><td>(47) 9811</td></tr>
          </table>
        </div>
      </div>
    `;
  }
  
  else if (step === "2fn") {
    screen.innerHTML = `
      <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem; text-align: center;">Segunda Forma Normal (2FN)</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.72rem;">
        <div style="border: 1px solid #FECDD3; background:#FFF1F2; padding: 0.4rem; border-radius: 4px;">
          <strong>Antes (Dependência Parcial):</strong> A chave primária é composta por (CodAluno, CodDisciplina). Porém, o <em>Nome_Aluno</em> depende apenas de CodAluno!
          <table class="sim-table" style="margin-top: 0.25rem;">
            <tr><th>CodAluno (PK)</th><th>CodDisc (PK)</th><th>Nota</th><th>Nome_Aluno</th></tr>
            <tr><td>1</td><td>D1</td><td>9.5</td><td>Ana Silva</td></tr>
          </table>
        </div>
        <div style="text-align:center; font-size: 1rem; color: var(--accent-teal);">⬇️ Separando em Tabelas Distintas ⬇️</div>
        <div style="border: 1px solid #A7F3D0; background:#ECFDF5; padding: 0.4rem; border-radius: 4px;">
          <strong>Depois:</strong>
          Tabela Alunos:
          <table class="sim-table" style="margin-top: 0.25rem; margin-bottom: 0.4rem;">
            <tr><th>CodAluno (PK)</th><th>Nome_Aluno</th></tr>
            <tr><td>1</td><td>Ana Silva</td></tr>
          </table>
          Tabela Notas:
          <table class="sim-table" style="margin-top: 0.25rem;">
            <tr><th>CodAluno (FK)</th><th>CodDisc (FK)</th><th>Nota</th></tr>
            <tr><td>1</td><td>D1</td><td>9.5</td></tr>
          </table>
        </div>
      </div>
    `;
  }
  
  else if (step === "3fn") {
    screen.innerHTML = `
      <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem; text-align: center;">Terceira Forma Normal (3FN)</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.72rem;">
        <div style="border: 1px solid #FECDD3; background:#FFF1F2; padding: 0.4rem; border-radius: 4px;">
          <strong>Antes (Dependência Transitiva):</strong> <em>Nome_Departamento</em> depende de CodDep, que não é chave primária na tabela Funcionário.
          <table class="sim-table" style="margin-top: 0.25rem;">
            <tr><th>RA (PK)</th><th>Nome_Func</th><th>CodDep</th><th>Nome_Dep</th></tr>
            <tr><td>77</td><td>Carlos</td><td>D4</td><td>Financeiro</td></tr>
          </table>
        </div>
        <div style="text-align:center; font-size: 1rem; color: var(--accent-teal);">⬇️ Removendo a Dependência Transitiva ⬇️</div>
        <div style="border: 1px solid #A7F3D0; background:#ECFDF5; padding: 0.4rem; border-radius: 4px;">
          <strong>Depois:</strong>
          Tabela Funcionários:
          <table class="sim-table" style="margin-top: 0.25rem; margin-bottom: 0.4rem;">
            <tr><th>RA (PK)</th><th>Nome_Func</th><th>CodDep (FK)</th></tr>
            <tr><td>77</td><td>Carlos</td><td>D4</td></tr>
          </table>
          Tabela Departamentos:
          <table class="sim-table" style="margin-top: 0.25rem;">
            <tr><th>CodDep (PK)</th><th>Nome_Dep</th></tr>
            <tr><td>D4</td><td>Financeiro</td></tr>
          </table>
        </div>
      </div>
    `;
  }
}

// ==========================================
// QUIZ INTERATIVO
// ==========================================

function inicializarQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  let html = "";
  
  SITE_DATA.quiz.forEach((q, idx) => {
    html += `
      <div class="quiz-question-card" id="quiz-q-${q.id}" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
        <div class="quiz-progress-text">Questão ${idx + 1} de ${SITE_DATA.quiz.length}</div>
        <div class="quiz-question">${q.question.replace(/\n/g, "<br>")}</div>
        <div class="quiz-options">
          ${q.options.map((opt, oIdx) => `
            <button class="quiz-option" id="quiz-opt-${q.id}-${oIdx}" onclick="selecionarOpcaoQuiz(${q.id}, ${oIdx})">
              ${opt.replace(/\n/g, "<br>")}
            </button>
          `).join("")}
        </div>
        <div class="quiz-feedback" id="quiz-fb-${q.id}"></div>
      </div>
    `;
  });

  html += `
    <div style="margin-top: 2rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <button onclick="finalizarEVerificarQuiz()" class="primary-btn" id="btn-submit-quiz" style="font-size: 1.1rem; padding: 0.8rem 2rem;">
        Finalizar e Calcular Nota 📊
      </button>
      <div id="quiz-result-score-card" style="display: none; background-color: var(--accent-teal-light); border: 2px solid var(--accent-teal); border-radius: var(--border-radius-md); padding: 1.5rem; text-align: center; width: 100%; max-width: 500px;">
        <h3 style="color: var(--primary-navy); font-family: var(--font-title);">Seu Resultado no Quiz</h3>
        <p style="font-size: 1.5rem; font-weight: bold; color: var(--accent-teal-hover); margin: 0.5rem 0;" id="quiz-score-display">Nota: 0 / 10.0</p>
        <p style="font-size: 0.85rem; color: var(--text-light);" id="quiz-score-detail">Você acertou 0 de 15 questões.</p>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function selecionarOpcaoQuiz(questionId, optionIdx) {
  if (quizSubmitted) return;

  // Atualiza as respostas do quiz localmente
  quizAnswers[questionId] = optionIdx;

  // Remove classe de seleção de todas as opções daquela pergunta
  const q = SITE_DATA.quiz.find(item => item.id === questionId);
  q.options.forEach((_, idx) => {
    const btn = document.getElementById(`quiz-opt-${questionId}-${idx}`);
    if (btn) btn.style.borderColor = "var(--border-color)";
  });

  // Destaca a selecionada
  const selectedBtn = document.getElementById(`quiz-opt-${questionId}-${optionIdx}`);
  if (selectedBtn) {
    selectedBtn.style.borderColor = "var(--primary-navy)";
  }
}

function finalizarEVerificarQuiz() {
  if (quizSubmitted) return;

  // Valida se respondeu tudo
  const totalQuestions = SITE_DATA.quiz.length;
  const answeredCount = Object.keys(quizAnswers).length;
  
  if (answeredCount < totalQuestions) {
    alert(`Por favor, responda a todas as ${totalQuestions} questões antes de finalizar! Faltam ${totalQuestions - answeredCount}.`);
    return;
  }

  quizSubmitted = true;
  let correctCount = 0;

  SITE_DATA.quiz.forEach(q => {
    const userAns = quizAnswers[q.id];
    const correctAns = q.correctAnswer;
    const fbBox = document.getElementById(`quiz-fb-${q.id}`);

    q.options.forEach((_, idx) => {
      const btn = document.getElementById(`quiz-opt-${q.id}-${idx}`);
      if (btn) {
        btn.disabled = true;
        if (idx === correctAns) {
          btn.classList.add("correct");
        } else if (idx === userAns) {
          btn.classList.add("incorrect");
        }
      }
    });

    if (userAns === correctAns) {
      correctCount++;
      fbBox.className = "quiz-feedback success";
      fbBox.innerHTML = `<strong>Acertou!</strong> ${q.explanation}`;
    } else {
      fbBox.className = "quiz-feedback error";
      fbBox.innerHTML = `<strong>Incorreto.</strong> Resposta correta: <em>${q.options[correctAns]}</em>.<br>${q.explanation}`;
    }
  });

  // Salva score e nota
  const score = ((correctCount / totalQuestions) * 10).toFixed(1);
  
  const scoreCard = document.getElementById("quiz-result-score-card");
  const scoreDisplay = document.getElementById("quiz-score-display");
  const scoreDetail = document.getElementById("quiz-score-detail");
  const submitBtn = document.getElementById("btn-submit-quiz");

  scoreDisplay.innerText = `Nota: ${score} / 10.0`;
  scoreDetail.innerText = `Você acertou ${correctCount} de ${totalQuestions} questões.`;
  scoreCard.style.display = "block";
  submitBtn.style.display = "none";

  salvarProgressoLocal();
  atualizarMetricasReport();
  atualizarBoletimTexto();
  atualizarPainelProgressoHome();
}

// ==========================================
// DESAFIOS CONCEITUAIS (TRILHA PEDAGÓGICA)
// ==========================================

function selectChallenge(level) {
  activeChallengeLevel = level;
  challengeUserAnswers = {};
  
  // Oculta painel de resultados anterior
  const resPanel = document.getElementById("chal-results-panel");
  resPanel.style.display = "none";

  // Carrega e desenha botões da lista lateral de níveis
  renderChallengeList();

  const challenge = SITE_DATA.challenges.find(c => c.level === level);
  if (!challenge) return;

  // Injeta título e descrição
  document.getElementById("chal-title").innerText = challenge.name;
  document.getElementById("chal-description").innerHTML = challenge.description;

  // Constrói a área de trabalho interativa dependendo do nível
  const activeArea = document.getElementById("challenge-interactive-area");
  
  if (level === 1 || level === 2 || level === 3) {
    // Desafios de Classificação Drag & Drop
    let targetsHtml = challenge.targets.map(tgt => `
      <div class="drag-target-column">
        <h4>${tgt.toUpperCase().replace("-", " ")}</h4>
        <div class="drop-zone" id="drop-${tgt}" ondragover="allowDrop(event)" ondrop="handleDrop(event, '${tgt}')">
          <!-- Elementos soltos ficam aqui -->
        </div>
      </div>
    `).join("");

    activeArea.innerHTML = `
      <div class="drag-challenge-container">
        <p style="font-size:0.85rem; color:var(--text-light); margin-bottom:0.5rem; text-align:center;">
          💡 <strong>Como Jogar:</strong> Clique em um cartão da piscina de itens para selecioná-lo e, em seguida, clique na coluna de destino correta. Ou arraste e solte o cartão!
        </p>
        <div class="drag-pool" id="items-pool">
          ${challenge.items.map((item, idx) => `
            <div class="drag-item" id="item-${idx}" draggable="true" ondragstart="handleDragStart(event, ${idx})" onclick="selectCardToMove(${idx})">
              <span>📄</span> ${item.text}
            </div>
          `).join("")}
        </div>
        <div class="drag-targets-grid">
          ${targetsHtml}
        </div>
      </div>
    `;
  } 
  
  else if (level === 4 || level === 5) {
    // Desafios de Seleção Conceitual
    activeArea.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <div style="font-weight: 600; color: var(--primary-navy); font-size:1.05rem;">
          ${challenge.questionText || "Selecione a resposta correta de acordo com as regras:"}
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${challenge.options.map((opt, idx) => `
            <label style="border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--border-radius-sm); cursor:pointer; display:flex; gap:0.75rem; align-items:center; font-size:0.95rem; background:#FAFDFE;" class="interactive-option-label" id="label-opt-${idx}">
              <input type="radio" name="challenge-opt" value="${idx}" onclick="selectConceptOption(${idx})" style="accent-color:var(--accent-teal); width: 18px; height: 18px;">
              <span>${opt}</span>
            </label>
          `).join("")}
        </div>
      </div>
    `;
  }
}

function renderChallengeList() {
  const container = document.getElementById("challenge-list-container");
  if (!container) return;

  container.innerHTML = SITE_DATA.challenges.map(c => {
    let statusClass = completedChallenges.has(c.level) ? "completed" : "";
    if (c.level === activeChallengeLevel) {
      statusClass += " active";
    }
    return `
      <button class="challenge-item ${statusClass}" onclick="selectChallenge(${c.level})">
        <span>Nível ${c.level}</span>
      </button>
    `;
  }).join("");
}

// Drag & Drop / Click to Move Lógica
let selectedDragCardIndex = null;

function handleDragStart(event, idx) {
  event.dataTransfer.setData("text/plain", idx);
  selectedDragCardIndex = idx;
}

function allowDrop(event) {
  event.preventDefault();
}

function handleDrop(event, targetType) {
  event.preventDefault();
  const idx = event.dataTransfer.getData("text/plain") || selectedDragCardIndex;
  moveItemToTarget(parseInt(idx), targetType);
}

function selectCardToMove(idx) {
  // Remove seleção visual dos outros
  document.querySelectorAll(".drag-item").forEach(item => {
    item.classList.remove("selected");
  });
  
  selectedDragCardIndex = idx;
  const card = document.getElementById(`item-${idx}`);
  if (card) card.classList.add("selected");
}

// Suporta clicar na coluna para mover o cartão selecionado
document.addEventListener("click", (e) => {
  if (selectedDragCardIndex === null) return;
  
  const col = e.target.closest(".drag-target-column");
  if (col) {
    const targetType = col.querySelector("h4").innerText.toLowerCase().replace(" ", "-");
    moveItemToTarget(selectedDragCardIndex, targetType);
  }
});

function moveItemToTarget(idx, targetType) {
  const challenge = SITE_DATA.challenges.find(c => c.level === activeChallengeLevel);
  if (!challenge || idx === null) return;

  const itemData = challenge.items[idx];
  challengeUserAnswers[itemData.text] = targetType;

  // Move o elemento fisicamente na árvore DOM
  const card = document.getElementById(`item-${idx}`);
  const destZone = document.getElementById(`drop-${targetType}`);
  
  if (card && destZone) {
    card.classList.remove("selected");
    destZone.appendChild(card);
    selectedDragCardIndex = null;
  }
}

function selectConceptOption(idx) {
  const challenge = SITE_DATA.challenges.find(c => c.level === activeChallengeLevel);
  if (!challenge) return;
  
  challengeUserAnswers = challenge.options[idx];
  
  // Estilo visual
  challenge.options.forEach((_, oIdx) => {
    const lbl = document.getElementById(`label-opt-${oIdx}`);
    if (lbl) lbl.style.borderColor = "var(--border-color)";
  });
  
  const selectedLbl = document.getElementById(`label-opt-${idx}`);
  if (selectedLbl) selectedLbl.style.borderColor = "var(--accent-teal)";
}

function resetChallengeActivity() {
  selectChallenge(activeChallengeLevel);
}

function validateChallengeSelection() {
  const resPanel = document.getElementById("chal-results-panel");
  resPanel.style.display = "block";

  const challenge = SITE_DATA.challenges.find(c => c.level === activeChallengeLevel);
  if (!challenge) return;

  // Valida se respondeu tudo
  if (activeChallengeLevel <= 3) {
    const totalItems = challenge.items.length;
    const answered = Object.keys(challengeUserAnswers).length;
    if (answered < totalItems) {
      resPanel.innerHTML = `<div class="console-error">Por favor, classifique todos os ${totalItems} itens antes de enviar!</div>`;
      return;
    }
  } else {
    if (challengeUserAnswers === undefined || Object.keys(challengeUserAnswers).length === 0) {
      resPanel.innerHTML = '<div class="console-error">Por favor, selecione uma opção antes de validar!</div>';
      return;
    }
  }

  const check = runConceptualValidation(activeChallengeLevel, challengeUserAnswers);

  if (check.success) {
    completedChallenges.add(activeChallengeLevel);
    salvarProgressoLocal();
    atualizarMetricasReport();
    atualizarBoletimTexto();
    atualizarPainelProgressoHome();

    let feedbackHtml = `
      <div class="console-msg" style="color:var(--color-success); font-weight:bold; font-size:1.1rem; margin-bottom:0.5rem;">
        🎉 Nível ${activeChallengeLevel} Concluído com Sucesso!
      </div>
      <div style="font-size:0.85rem; color:#A8A29E; line-height:1.4;">
        ${challenge.explanation || "Você compreendeu perfeitamente as regras conceituais desta lição. Excelente trabalho!"}
      </div>
    `;
    
    // Mostra se o aluno desbloqueou novas lições
    if (activeChallengeLevel < 5) {
      feedbackHtml += `<button onclick="selectChallenge(${activeChallengeLevel + 1})" class="primary-btn" style="margin-top:1rem; font-size:0.85rem;">Avançar para o Nível ${activeChallengeLevel + 1} ➔</button>`;
    }
    
    resPanel.innerHTML = feedbackHtml;
    renderChallengeList();
  } else {
    let failHtml = `<div class="console-error">❌ Alguns itens não estão corretos. Tente reorganizá-los!</div>`;
    check.results.forEach(r => {
      failHtml += `<div style="font-size:0.8rem; color:${r.pass ? 'var(--color-success)' : 'var(--color-error)'}; margin-top:2px;">
        ${r.pass ? '✓' : '✗'} ${r.label}
      </div>`;
    });
    resPanel.innerHTML = failHtml;
  }
}

// ==========================================
// AVALIAÇÃO 1 (PROTEGIDA)
// ==========================================

function unlockExam() {
  const pwdInput = document.getElementById("exam-password-input");
  const errorMsg = document.getElementById("exam-auth-error");
  const authCard = document.getElementById("exam-auth-card");
  const contentCard = document.getElementById("exam-content-card");
  const questionsArea = document.getElementById("exam-questions-area");

  const pwd = pwdInput.value.trim();

  if (pwd === "ecs101" || pwd === "aula101") {
    examUnlocked = true;
    errorMsg.style.display = "none";
    authCard.style.display = "none";
    contentCard.style.display = "block";
    
    // Tenta ler local se a prova já foi enviada
    checkExamSubmittedState();
  } else {
    errorMsg.style.display = "block";
  }
}

function checkExamSubmittedState() {
  const isSub = localStorage.getItem("bd101_exam_submitted");
  const questionsArea = document.getElementById("exam-questions-area");
  const successCard = document.getElementById("exam-success-card");

  if (isSub === "true") {
    examSubmitted = true;
    questionsArea.style.display = "none";
    successCard.style.display = "block";
    
    // Carrega o texto salvo do relatório no textarea
    const savedRep = localStorage.getItem("bd101_exam_report_text");
    const copyArea = document.getElementById("exam-report-text-copy");
    if (copyArea && savedRep) {
      copyArea.value = savedRep;
    }
  } else {
    questionsArea.style.display = "block";
    selectExamQuestion(1);
  }
}

function setupExamQuestionsList() {
  const list = document.getElementById("exam-list-container");
  if (!list) return;

  list.innerHTML = SITE_DATA.exam.map(q => `
    <button class="challenge-item" id="exam-q-btn-${q.id}" onclick="selectExamQuestion(${q.id})">
      Questão ${q.id}
    </button>
  `).join("");
}

function selectExamQuestion(qId) {
  activeExamQuestion = qId;

  // Atualiza botões ativos na barra lateral
  SITE_DATA.exam.forEach(q => {
    const btn = document.getElementById(`exam-q-btn-${q.id}`);
    if (btn) btn.classList.remove("active");
  });
  
  const activeBtn = document.getElementById(`exam-q-btn-${qId}`);
  if (activeBtn) activeBtn.classList.add("active");

  const q = SITE_DATA.exam.find(item => item.id === qId);
  if (!q) return;

  // Injeta enunciado
  document.getElementById("exam-q-title").innerText = q.name;
  document.getElementById("exam-q-description").innerHTML = q.description;

  const activeArea = document.getElementById("exam-interactive-area");
  
  // Resposta atual do aluno
  const selectedIdx = examUserAnswers[qId];

  activeArea.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:0.5rem;">
      ${q.options.map((opt, idx) => `
        <label style="border: 1px solid ${selectedIdx === idx ? 'var(--primary-navy)' : 'var(--border-color)'}; padding: 0.8rem; border-radius: var(--border-radius-sm); cursor:pointer; display:flex; gap:0.6rem; align-items:center; font-size:0.9rem;" id="exam-label-opt-${idx}">
          <input type="radio" name="exam-opt" value="${idx}" ${selectedIdx === idx ? 'checked' : ''} onclick="selectExamOption(${qId}, ${idx})" style="accent-color:var(--accent-teal);">
          <span>${opt}</span>
        </label>
      `).join("")}
    </div>
  `;

  // Oculta painel de validação ao alternar de questão
  const resPanel = document.getElementById("exam-results-panel");
  resPanel.style.display = "none";
}

function selectExamOption(qId, oIdx) {
  examUserAnswers[qId] = oIdx;

  // Estilo visual
  const q = SITE_DATA.exam.find(item => item.id === qId);
  q.options.forEach((_, idx) => {
    const lbl = document.getElementById(`exam-label-opt-${idx}`);
    if (lbl) lbl.style.borderColor = "var(--border-color)";
  });

  const selectedLbl = document.getElementById(`exam-label-opt-${oIdx}`);
  if (selectedLbl) selectedLbl.style.borderColor = "var(--primary-navy)";
}

function onExamNameChange() {
  const n1 = document.getElementById("exam-student-name-1").value.trim();
  const n2 = document.getElementById("exam-student-name-2").value.trim();
  localStorage.setItem("bd101_exam_names", JSON.stringify({ n1, n2 }));
}

function runAndValidateExamCode() {
  const qId = activeExamQuestion;
  const ans = examUserAnswers[qId];
  const resPanel = document.getElementById("exam-results-panel");

  if (ans === undefined) {
    resPanel.style.display = "block";
    resPanel.innerHTML = '<div class="console-error">Por favor, selecione uma opção antes de confirmar!</div>';
    return;
  }

  // Apenas salva a resposta localmente de forma visual (a prova só revela erros/acertos após a entrega final do professor)
  resPanel.style.display = "block";
  resPanel.innerHTML = '<div class="console-msg" style="color:var(--color-success);">✓ Resposta gravada temporariamente. Lembre-se de revisar antes do envio.</div>';
}

function openExamReview() {
  const n1Input = document.getElementById("exam-student-name-1").value.trim();
  const n2Input = document.getElementById("exam-student-name-2").value.trim();

  if (!n1Input) {
    alert("Por favor, preencha o nome do Integrante 1 antes de revisar!");
    return;
  }

  // Valida se respondeu às 3 questões
  const unanswered = [];
  SITE_DATA.exam.forEach(q => {
    if (examUserAnswers[q.id] === undefined) unanswered.push(q.id);
  });

  if (unanswered.length > 0) {
    alert(`Por favor, responda a todas as questões da prova. Faltam responder: Questão(ões) ${unanswered.join(", ")}`);
    return;
  }

  // Preenche modal de revisão
  const infoArea = document.getElementById("exam-review-student-info");
  infoArea.innerHTML = `
    <strong>Equipe/Dupla:</strong> ${n1Input} ${n2Input ? `&amp; ${n2Input}` : ""}<br>
    <strong>Avaliação:</strong> Avaliação 1 (Banco de Dados 101)<br>
    <strong>Data/Hora:</strong> ${new Date().toLocaleString()}
  `;

  const qList = document.getElementById("exam-review-questions-list");
  qList.innerHTML = SITE_DATA.exam.map(q => {
    const userAnsIdx = examUserAnswers[q.id];
    const optionText = q.options[userAnsIdx];
    return `
      <div style="background-color:#F8FAFC; border:1px solid var(--border-color); padding:0.8rem; border-radius:4px;">
        <strong>Questão ${q.id}:</strong> ${q.name}<br>
        <span style="font-size:0.85rem; color:var(--text-light);">Opção Selecionada:</span> <code style="font-family:var(--font-code); color:var(--primary-navy);">${optionText}</code>
      </div>
    `;
  }).join("");

  document.getElementById("exam-review-modal").style.display = "flex";
}

function closeExamReview() {
  document.getElementById("exam-review-modal").style.display = "none";
}

function submitExamFinal() {
  closeExamReview();

  const n1 = document.getElementById("exam-student-name-1").value.trim();
  const n2 = document.getElementById("exam-student-name-2").value.trim();
  const studentNames = n2 ? `${n1} e ${n2}` : n1;

  // Calcula acertos
  let correctCount = 0;
  let reportText = `RELATÓRIO DE AVALIAÇÃO - BANCO DE DADOS 101\n`;
  reportText += `==========================================\n`;
  reportText += `Dupla/Aluno: ${studentNames}\n`;
  reportText += `Data de Envio: ${new Date().toLocaleString()}\n`;
  reportText += `==========================================\n\n`;

  SITE_DATA.exam.forEach(q => {
    const userAns = examUserAnswers[q.id];
    const correctAns = q.correctAnswer;
    const isCorrect = userAns === correctAns;
    if (isCorrect) correctCount++;
    
    reportText += `Questão ${q.id}: ${q.name}\n`;
    reportText += `-> Opção respondida: ${q.options[userAns]}\n`;
    reportText += `-> Resultado: ${isCorrect ? "CORRETO" : "INCORRETO"} (Resposta correta: ${q.options[correctAns]})\n\n`;
  });

  const finalScore = ((correctCount / SITE_DATA.exam.length) * 10).toFixed(1);
  reportText += `==========================================\n`;
  reportText += `NOTA FINAL DA PROVA: ${finalScore} / 10.0\n`;
  reportText += `Acertos: ${correctCount} de ${SITE_DATA.exam.length} questões.\n`;
  reportText += `==========================================\n`;

  // Salva no localStorage
  localStorage.setItem("bd101_exam_submitted", "true");
  localStorage.setItem("bd101_exam_report_text", reportText);

  // Injeta no text area da tela final de sucesso
  document.getElementById("exam-report-text-copy").value = reportText;

  // Oculta área de prova e exibe tela de sucesso
  document.getElementById("exam-questions-area").style.display = "none";
  document.getElementById("exam-success-card").style.display = "block";

  // Envia email via EmailJS (API REST do blueprint da skill)
  const serviceId = "service_9u2sac8";
  const templateId = "template_yew74so";
  const publicKey = "krM3uc38ucTfqux-q";

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      subject: `[BD101] Prova de ${studentNames}`,
      from_name: studentNames,
      message: reportText,
      // Target fallbacks recomendados pela Skill:
      to_email: "euclidespaim@gmail.com",
      email: "euclidespaim@gmail.com",
      from_email: "euclidespaim@gmail.com",
      reply_to: "euclidespaim@gmail.com",
      name: studentNames,
      title: `Avaliação 1 - Banco de Dados`
    }
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (res.ok) {
      alert("Avaliação transmitida ao professor via EmailJS! 🎉");
    } else {
      throw new Error("Falha no servidor EmailJS");
    }
  })
  .catch(() => {
    alert("Falha no envio online (EmailJS). Abrindo fallback de e-mail local (mailto)...");
    triggerMailtoFallback(studentNames, reportText);
  });
}

function triggerMailtoFallback(studentNames, body) {
  const subject = `[BD101] Avaliação de ${studentNames}`;
  window.open(`mailto:euclidespaim@gmail.com?subject=${encodeURIComponent(subject)}&amp;body=${encodeURIComponent(body)}`, "_blank");
}

function copyExamReportToClipboard() {
  const copyText = document.getElementById("exam-report-text-copy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  
  const btn = document.getElementById("exam-copy-btn");
  btn.innerText = "Copiado! ✓";
  setTimeout(() => { btn.innerText = "Copiar Relatório 📋"; }, 2000);
}

function downloadExamReportAsTxt() {
  const text = document.getElementById("exam-report-text-copy").value;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const anchor = document.createElement("a");
  anchor.download = "avaliacao_banco_de_dados.txt";
  anchor.href = window.URL.createObjectURL(blob);
  anchor.click();
}

function resetSubmittedExam() {
  const pwd = prompt("Digite a senha do professor para liberar um novo envio da prova:");
  if (pwd === "ecs101" || pwd === "aula101") {
    localStorage.removeItem("bd101_exam_submitted");
    localStorage.removeItem("bd101_exam_report_text");
    examSubmitted = false;
    document.getElementById("exam-success-card").style.display = "none";
    document.getElementById("exam-questions-area").style.display = "block";
    selectExamQuestion(1);
    alert("Envio liberado com sucesso!");
  } else if (pwd !== null) {
    alert("Senha incorreta!");
  }
}

function resetEntireExam() {
  const pwd = prompt("Digite a senha do professor para RESETAR COMPLETAMENTE a prova da dupla:");
  if (pwd === "ecs101" || pwd === "aula101") {
    localStorage.removeItem("bd101_exam_submitted");
    localStorage.removeItem("bd101_exam_report_text");
    localStorage.removeItem("bd101_exam_names");
    examUserAnswers = {};
    examSubmitted = false;
    
    // Reseta inputs
    document.getElementById("exam-student-name-1").value = "";
    document.getElementById("exam-student-name-2").value = "";
    document.getElementById("exam-password-input").value = "";
    
    document.getElementById("exam-success-card").style.display = "none";
    document.getElementById("exam-questions-area").style.display = "none";
    document.getElementById("exam-auth-card").style.display = "block";
    
    alert("Prova completamente resetada!");
  } else if (pwd !== null) {
    alert("Senha incorreta!");
  }
}

// ==========================================
// RELATÓRIOS E BOLETIM ESCOLAR
// ==========================================

function onStudentNameChange(val) {
  studentName = val.trim();
  atualizarBoletimTexto();
}

function atualizarMetricasReport() {
  const viewedCount = viewedConcepts.size;
  const challengesCount = completedChallenges.size;
  
  // Calcula score do quiz
  let correctCount = 0;
  if (quizSubmitted) {
    SITE_DATA.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) correctCount++;
    });
  }

  document.getElementById("report-viewed-concepts").innerText = `${viewedCount}/5`;
  document.getElementById("report-quiz-score").innerText = `${correctCount}/15`;
  document.getElementById("report-challenges-completed").innerText = `${challengesCount}/5`;
}

function atualizarBoletimTexto() {
  const box = document.getElementById("report-text-display");
  if (!box) return;

  if (!studentName) {
    box.innerText = "Digite o nome do aluno à esquerda para visualizar seu boletim escolar estruturado.";
    return;
  }

  const viewedCount = viewedConcepts.size;
  const challengesCount = completedChallenges.size;
  
  let correctCount = 0;
  let quizStatusText = "Não Concluído";
  if (quizSubmitted) {
    SITE_DATA.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) correctCount++;
    });
    quizStatusText = `${((correctCount / 15) * 10).toFixed(1)} / 10.0 (${correctCount} acertos)`;
  }

  // Diagnóstico Rápido
  let pontosFortes = [];
  let pontosFracos = [];

  if (viewedConcepts.has("data-info")) pontosFortes.push("Dado vs Informação");
  else pontosFracos.push("Dado vs Informação");

  if (completedChallenges.has(3)) pontosFortes.push("Simbologia DER");
  else pontosFracos.push("Simbologia DER");

  if (completedChallenges.has(5)) pontosFortes.push("Normalização 1FN");
  else pontosFracos.push("Normalização 1FN");

  let diagnostico = `Pontos Fortes: ${pontosFortes.length > 0 ? pontosFortes.join(", ") : "Nenhum no momento"}\n`;
  diagnostico += `Pontos a Melhorar: ${pontosFracos.length > 0 ? pontosFracos.join(", ") : "Nenhum no momento"}`;

  let txt = `RELATÓRIO DE DESEMPENHO PEDAGÓGICO - BANCO DE DADOS 101\n`;
  txt += `======================================================\n`;
  txt += `Aluno: ${studentName}\n`;
  txt += `Data do Relatório: ${new Date().toLocaleDateString()}\n`;
  txt += `======================================================\n\n`;
  txt += `1. Trilha de Teoria Lida: ${viewedCount} de 5 conceitos (${((viewedCount/5)*100).toFixed(0)}%)\n`;
  txt += `2. Nota no Quiz: ${quizStatusText}\n`;
  txt += `3. Desafios Concluídos: Níveis [${Array.from(completedChallenges).sort().join(", ")}] (${challengesCount} de 5 concluídos)\n\n`;
  txt += `DIAGNÓSTICO PEDAGÓGICO:\n`;
  txt += `----------------------\n`;
  txt += `${diagnostico}\n\n`;
  txt += `Assinatura do Responsável: _______________________________\n`;

  box.innerText = txt;
}

function copyReportText() {
  if (!studentName) {
    alert("Digite o nome do aluno antes de copiar!");
    return;
  }
  const txt = document.getElementById("report-text-display").innerText;
  navigator.clipboard.writeText(txt);
  alert("Relatório copiado para a área de transferência! 📋");
}

function downloadReportFile() {
  if (!studentName) {
    alert("Digite o nome do aluno antes de baixar!");
    return;
  }
  const txt = document.getElementById("report-text-display").innerText;
  const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
  const anchor = document.createElement("a");
  anchor.download = `boletim_${studentName.toLowerCase().replace(/ /g, "_")}.txt`;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.click();
}

// ==========================================
// PERSISTÊNCIA E CONFIGURAÇÕES LOCAIS
// ==========================================

function salvarProgressoLocal() {
  const progress = {
    viewed: Array.from(viewedConcepts),
    completed: Array.from(completedChallenges),
    quizSubmitted,
    quizAnswers
  };
  localStorage.setItem("bd101_progress", JSON.stringify(progress));
}

function carregarProgressoLocal() {
  const local = localStorage.getItem("bd101_progress");
  if (local) {
    try {
      const data = JSON.parse(local);
      if (data.viewed) viewedConcepts = new Set(data.viewed);
      if (data.completed) completedChallenges = new Set(data.completed);
      if (data.quizAnswers) quizAnswers = data.quizAnswers;
      if (data.quizSubmitted) {
        quizSubmitted = data.quizSubmitted;
        // Hidrata o quiz visual
        setTimeout(() => {
          let correctCount = 0;
          SITE_DATA.quiz.forEach(q => {
            const userAns = quizAnswers[q.id];
            const correctAns = q.correctAnswer;
            const fbBox = document.getElementById(`quiz-fb-${q.id}`);

            q.options.forEach((_, idx) => {
              const btn = document.getElementById(`quiz-opt-${q.id}-${idx}`);
              if (btn) {
                btn.disabled = true;
                if (idx === correctAns) btn.classList.add("correct");
                else if (idx === userAns) btn.classList.add("incorrect");
              }
            });

            if (fbBox) {
              if (userAns === correctAns) {
                correctCount++;
                fbBox.className = "quiz-feedback success";
                fbBox.innerHTML = `<strong>Acertou!</strong> ${q.explanation}`;
              } else {
                fbBox.className = "quiz-feedback error";
                fbBox.innerHTML = `<strong>Incorreto.</strong> Resposta correta: <em>${q.options[correctAns]}</em>.<br>${q.explanation}`;
              }
            }
          });

          const score = ((correctCount / SITE_DATA.quiz.length) * 10).toFixed(1);
          const scoreCard = document.getElementById("quiz-result-score-card");
          const scoreDisplay = document.getElementById("quiz-score-display");
          const scoreDetail = document.getElementById("quiz-score-detail");
          const submitBtn = document.getElementById("btn-submit-quiz");

          if (scoreDisplay) scoreDisplay.innerText = `Nota: ${score} / 10.0`;
          if (scoreDetail) scoreDetail.innerText = `Você acertou ${correctCount} de ${SITE_DATA.quiz.length} questões.`;
          if (scoreCard) scoreCard.style.display = "block";
          if (submitBtn) submitBtn.style.display = "none";
        }, 100);
      }
    } catch (e) {
      console.error("Erro ao ler localStorage:", e);
    }
  }

  // Lê nomes da prova
  const savedNames = localStorage.getItem("bd101_exam_names");
  if (savedNames) {
    try {
      const { n1, n2 } = JSON.parse(savedNames);
      setTimeout(() => {
        const inp1 = document.getElementById("exam-student-name-1");
        const inp2 = document.getElementById("exam-student-name-2");
        if (inp1) inp1.value = n1 || "";
        if (inp2) inp2.value = n2 || "";
      }, 100);
    } catch (e) {}
  }
}

function atualizarPainelProgressoHome() {
  const viewedCount = viewedConcepts.size;
  const challengesCount = completedChallenges.size;
  const quizDone = quizSubmitted ? 1 : 0;
  
  // Total itens da trilha: 5 conceitos lidos + 5 níveis concluídos + 1 quiz feito = 11 itens
  const totalItems = 11;
  const progressCount = viewedCount + challengesCount + quizDone;
  const percent = Math.min(100, Math.round((progressCount / totalItems) * 100));

  const percentText = document.getElementById("progress-percent-text");
  if (percentText) percentText.innerText = `${percent}% concluído`;

  const fill = document.getElementById("total-progress-fill");
  if (fill) fill.style.width = `${percent}%`;

  // Medalhas de níveis na home
  for (let i = 1; i <= 5; i++) {
    const badge = document.getElementById(`badge-lvl-${i}`);
    if (badge) {
      badge.className = "level-badge";
      if (completedChallenges.has(i)) {
        badge.classList.add("completed");
      } else if (i === activeChallengeLevel) {
        badge.classList.add("current");
      } else {
        badge.classList.add("unlocked");
      }
    }
  }

  // Exibe banner final de formatura
  const banner = document.getElementById("final-achievement-banner");
  if (banner) {
    banner.style.display = percent === 100 ? "flex" : "none";
  }
}

function resetProgress() {
  if (confirm("Deseja realmente limpar todo o seu progresso de estudos (quiz e trilha)?")) {
    localStorage.removeItem("bd101_progress");
    viewedConcepts.clear();
    completedChallenges.clear();
    quizAnswers = {};
    quizSubmitted = false;
    alert("Dados excluídos!");
    location.reload();
  }
}
