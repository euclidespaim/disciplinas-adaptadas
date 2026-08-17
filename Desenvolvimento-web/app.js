// Estado global da aplicação expandida
const STATE = {
  currentTab: 'home',
  sidebarOpen: true,
  progress: {
    theoryRead: [], // IDs dos conceitos lidos
    quizCompleted: false,
    quizScore: 0,
    quizJSCompleted: false,
    quizJSScore: 0,
    completedLevels: [], // Níveis de desafios completados (1 a 10)
    completedLevelsJS: [], // Níveis de desafios completados JS (1 a 5)
    studentName: "",
    quizAttempts: 0,
    quizJSAttempts: 0,
    challengeAttempts: {},
    challengeJSAttempts: {},
    examUnlocked: false,
    examName1: "",
    examName2: "",
    examSubmitted: false,
    examCodes: {},
    examResults: {}
  },
  quiz: {
    selectedModule: 'html-css', // 'html-css' ou 'js'
    currentQuestionIndex: 0,
    answers: [],
    hasAnsweredCurrent: false,
    filteredQuestions: []
  },
  challenges: {
    type: 'html-css', // 'html-css' ou 'js'
    currentLevel: 1,
    userCodes: {},
    userCodesJS: {}
  },
  exam: {
    currentQuestionId: 1,
    userCodes: {}
  },
  simulator: {
    defaultCode: `<!-- Escreva seu HTML e CSS abaixo -->
<style>
  .card-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F0FDF4;
    border: 2px solid #16A34A;
    border-radius: 16px;
    padding: 24px;
    max-width: 320px;
    margin: 20px auto;
    font-family: 'Outfit', sans-serif;
    box-shadow: 0 10px 15px rgba(0,0,0,0.05);
  }
  
  .card-flex h2 {
    color: #15803D;
    margin-bottom: 8px;
  }

  .btn-acao {
    background-color: #16A34A;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
  }

  .btn-acao:hover {
    background-color: #15803D;
    transform: translateY(-2px);
  }
</style>

<div class="card-flex">
  <h2>Flexbox & Estilos!</h2>
  <p>Altere as regras no editor ao lado e veja o resultado ao vivo!</p>
  <button class="btn-acao">Testar Efeito Hover</button>
</div>`,
    currentCode: ""
  }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  setupAccordionSidebar();
  setupTheoryInteractivity();
  setupSimulator();
  setupQuiz();
  setupChallenges();
  setupExam();
  updateProgressUI();
});

// --- PERSISTÊNCIA NO LOCALSTORAGE ---
function loadProgress() {
  const saved = localStorage.getItem('html_css_expanded_progress');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      STATE.progress = {
        theoryRead: parsed.theoryRead || [],
        quizCompleted: parsed.quizCompleted || false,
        quizScore: parsed.quizScore || 0,
        quizJSCompleted: parsed.quizJSCompleted || false,
        quizJSScore: parsed.quizJSScore || 0,
        completedLevels: parsed.completedLevels || [],
        completedLevelsJS: parsed.completedLevelsJS || [],
        studentName: parsed.studentName || "",
        quizAttempts: parsed.quizAttempts || 0,
        quizJSAttempts: parsed.quizJSAttempts || 0,
        challengeAttempts: parsed.challengeAttempts || {},
        challengeJSAttempts: parsed.challengeJSAttempts || {},
        examUnlocked: parsed.examUnlocked || false,
        examName1: parsed.examName1 || "",
        examName2: parsed.examName2 || "",
        examSubmitted: parsed.examSubmitted || false,
        examCodes: parsed.examCodes || {},
        examResults: parsed.examResults || {}
      };
      STATE.challenges.userCodes = parsed.userCodes || {};
      STATE.challenges.userCodesJS = parsed.userCodesJS || {};
    } catch (e) {
      console.error("Erro ao carregar o progresso", e);
    }
  }
}

function saveProgress() {
  const dataToSave = {
    ...STATE.progress,
    userCodes: STATE.challenges.userCodes,
    userCodesJS: STATE.challenges.userCodesJS
  };
  localStorage.setItem('html_css_expanded_progress', JSON.stringify(dataToSave));
  updateProgressUI();
}

function resetProgress() {
  if (confirm("Deseja recomeçar toda a trilha pedagógica? O progresso salvo será zerado.")) {
    STATE.progress = {
      theoryRead: [],
      quizCompleted: false,
      quizScore: 0,
      quizJSCompleted: false,
      quizJSScore: 0,
      completedLevels: [],
      completedLevelsJS: [],
      studentName: "",
      quizAttempts: 0,
      quizJSAttempts: 0,
      challengeAttempts: {},
      challengeJSAttempts: {},
      examUnlocked: false,
      examName1: "",
      examName2: "",
      examSubmitted: false,
      examCodes: {},
      examResults: {}
    };
    STATE.quiz.currentQuestionIndex = 0;
    STATE.quiz.answers = [];
    STATE.quiz.hasAnsweredCurrent = false;
    STATE.challenges.userCodes = {};
    STATE.challenges.userCodesJS = {};
    STATE.exam.userCodes = {};
    
    saveProgress();
    setupQuiz();
    setupChallenges();
    setupExam();
    const nameInput = document.getElementById('student-name-input');
    if (nameInput) nameInput.value = "";
    renderPerformanceReport();
    switchTab('home');
    alert("Progresso reiniciado com sucesso!");
  }
}

function updateProgressUI() {
  const totalConcepts = 9 + 2; // 9 conceitos HTML/CSS + 2 JS
  const totalChallenges = 10 + 5; // 10 HTML/CSS + 5 JS
  const totalItems = totalConcepts + 2 + totalChallenges; // 2 quizzes (HTML/CSS e JS)
  
  const completedItems = STATE.progress.theoryRead.length + 
                         (STATE.progress.quizCompleted ? 1 : 0) + 
                         (STATE.progress.quizJSCompleted ? 1 : 0) + 
                         STATE.progress.completedLevels.length + 
                         STATE.progress.completedLevelsJS.length;
  const percent = Math.round((completedItems / totalItems) * 100);
  
  document.querySelectorAll('.progress-fill').forEach(fill => {
    fill.style.width = percent + '%';
  });
  
  const percentText = document.getElementById('progress-percent-text');
  if (percentText) {
    percentText.innerText = `${percent}% concluído`;
  }
  
  // Badges da trilha HTML & CSS
  for (let lvl = 1; lvl <= 10; lvl++) {
    const badge = document.getElementById(`badge-lvl-${lvl}`);
    if (badge) {
      badge.className = 'level-badge';
      if (STATE.progress.completedLevels.includes(lvl)) {
        badge.classList.add('unlocked');
        badge.innerHTML = `🌟<br>Lvl ${lvl}`;
      } else if (lvl === 1 || STATE.progress.completedLevels.includes(lvl - 1)) {
        badge.classList.add('current');
        badge.innerHTML = `🎮<br>Lvl ${lvl}`;
      } else {
        badge.innerHTML = `🔒<br>Lvl ${lvl}`;
      }
    }
  }

  // Badges da trilha JavaScript
  for (let lvl = 1; lvl <= 5; lvl++) {
    const badge = document.getElementById(`badge-lvl-js-${lvl}`);
    if (badge) {
      badge.className = 'level-badge';
      if (STATE.progress.completedLevelsJS.includes(lvl)) {
        badge.classList.add('unlocked');
        badge.innerHTML = `🌟<br>Lvl ${lvl}`;
      } else if (lvl === 1 || STATE.progress.completedLevelsJS.includes(lvl - 1)) {
        badge.classList.add('current');
        badge.innerHTML = `🎮<br>Lvl ${lvl}`;
      } else {
        badge.innerHTML = `🔒<br>Lvl ${lvl}`;
      }
    }
  }
 
  const banner = document.getElementById('final-achievement-banner');
  if (banner) {
    banner.style.display = (completedItems === totalItems) ? 'flex' : 'none';
  }
  
  renderPerformanceReport();
}

// --- BARRA LATERAL SANFONA (ACCORDION SIDEBAR HARMONIZADA) ---
function setupAccordionSidebar() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const group = header.parentElement;
      group.classList.toggle('open');
    });
  });
  
  // Links de navegação na sidebar
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetTab = link.getAttribute('data-tab');
      const targetConcept = link.getAttribute('data-concept');
      const targetLevel = link.getAttribute('data-level');
      const quizType = link.getAttribute('data-quiz-type');
      const challengeType = link.getAttribute('data-challenge-type');
      
      if (quizType) {
        STATE.quiz.selectedModule = quizType;
        setupQuiz();
      }
      if (challengeType) {
        STATE.challenges.type = challengeType;
        setupChallenges();
      }
      
      switchTab(targetTab);
      
      if (targetConcept) {
        switchTheoryConcept(targetConcept);
      }
      if (targetLevel) {
        selectChallenge(parseInt(targetLevel));
      }
    });
  });
}

window.setChallengeType = function(type) {
  STATE.challenges.type = type;
  setupChallenges();
};

window.toggleSidebar = function() {
  const sidebar = document.getElementById('main-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
    STATE.sidebarOpen = !sidebar.classList.contains('collapsed');
  }
};

function switchTab(tabId) {
  if (STATE.progress.examSubmitted && tabId !== 'exam') {
    alert("Avaliação finalizada. A navegação foi travada!");
    switchTab('exam');
    return;
  }

  STATE.currentTab = tabId;
  
  // Atualiza destaque na barra lateral
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-tab') === tabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Painéis de conteúdo
  document.querySelectorAll('.tab-content').forEach(content => {
    if (content.id === `${tabId}-tab`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  if (tabId === 'challenges') {
    loadChallenge(STATE.challenges.currentLevel);
  } else if (tabId === 'report') {
    renderPerformanceReport();
  } else if (tabId === 'exam') {
    refreshExamUI();
  }
}

// --- TEORIA & INSPETORES INTERATIVOS ---
function setupTheoryInteractivity() {
  const theoryTabs = document.querySelectorAll('.theory-tab-btn');
  theoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const conceptId = tab.getAttribute('data-concept');
      switchTheoryConcept(conceptId);
    });
  });
  
  renderAllTheorySnippetsHighlight();
  switchTheoryConcept('html-basics');
}

function renderAllTheorySnippetsHighlight() {
  // Preenche todos os blocos de código teóricos com highlight VS Code
  const snippets = {
    'code-hl-html-basics': `<h1>Meu Primeiro Título</h1>\n<p>Este é um parágrafo contendo um <a href="https://google.com">link externo</a>.</p>`,
    'code-hl-css-basics': `h1 {\n  color: #1E3A8A;\n  font-family: sans-serif;\n}\n\n.destaque {\n  color: #0D9488;\n  font-weight: bold;\n}`,
    'code-hl-box-model': `.caixa {\n  width: 250px;\n  padding: 20px;\n  border: 2px solid #1E3A8A;\n  margin: 15px;\n}`,
    'code-hl-flexbox': `.painel-centralizado {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}`,
    'code-hl-forms': `<form>\n  <label for="usuario">Usuário:</label>\n  <input type="text" id="usuario" placeholder="Digite seu login">\n  \n  <button type="submit">Entrar</button>\n</form>`,
    'code-hl-responsive': `/* Regra Responsiva para Celulares */\n@media (max-width: 768px) {\n  .grid-cards {\n    flex-direction: column; /* Transforma linha em coluna */\n  }\n}`,
    'code-hl-js-basics': `// Declaração de Variáveis e Primitivos\nlet nome = "João";      // String\nconst ano = 2026;       // Number\nlet ativo = true;       // Boolean\nlet nulo = null;        // null\nlet indefinido;         // undefined`,
    'code-hl-js-operators': `// Uso de Operadores no JS\nlet pontos = 10;\npontos += 5;                // pontos agora vale 15\nlet comparar = (15 === 15); // true (mesmo valor e tipo)\nlet verificar = (10 > 5) && (2 === "2"); // true && false -> false`
  };

  Object.keys(snippets).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id.startsWith('code-hl-js')) {
        el.innerHTML = highlightJS(snippets[id]);
      } else {
        el.innerHTML = highlightHTMLandCSS(snippets[id]);
      }
    }
  });
}

function switchTheoryConcept(conceptId) {
  document.querySelectorAll('.theory-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-concept') === conceptId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  document.querySelectorAll('.theory-body-content').forEach(body => {
    if (body.id === `theory-content-${conceptId}`) {
      body.classList.add('active');
    } else {
      body.classList.remove('active');
    }
  });

  renderTheoryInteractiveArea(conceptId);
  
  if (!STATE.progress.theoryRead.includes(conceptId)) {
    STATE.progress.theoryRead.push(conceptId);
    saveProgress();
  }
}

function renderTheoryInteractiveArea(conceptId) {
  const container = document.getElementById('theory-flowchart-area');
  if (!container) return;
  
  if (conceptId === 'html-basics') {
    container.innerHTML = `
      <div class="interactive-theory-card">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.75rem;">Visão Anatômica de uma Tag HTML</h4>
        <div style="background-color: #1E293B; padding: 1.25rem; border-radius: var(--border-radius-sm); font-family: var(--font-code); color: white; text-align: center; width: 100%; font-size: 0.9rem;">
          <span style="color: #F43F5E;">&lt;p</span> <span style="color: #F59E0B;">class</span>=<span style="color: #10B981;">"destaque"</span><span style="color: #F43F5E;">&gt;</span>Olá, Aluno!<span style="color: #F43F5E;">&lt;/p&gt;</span>
        </div>
        <div style="width: 100%; margin-top: 1rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8rem; color: var(--text-light);">
          <div>👉 <strong style="color: #F43F5E;">&lt;p&gt; e &lt;/p&gt;</strong>: Tag de Abertura e Fechamento.</div>
          <div>👉 <strong style="color: #F59E0B;">class</strong>: Nome do Atributo.</div>
          <div>👉 <strong style="color: #10B981;">"destaque"</strong>: Valor do Atributo de classe.</div>
        </div>
      </div>
    `;
  } else if (conceptId === 'css-basics') {
    container.innerHTML = `
      <div class="interactive-theory-card">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.75rem;">Anatomia de Regras CSS</h4>
        <div style="background-color: #1E293B; padding: 1.25rem; border-radius: var(--border-radius-sm); font-family: var(--font-code); color: white; width: 100%; font-size: 0.9rem;">
          <span style="color: #38BDF8;">h1</span> {<br>
          &nbsp;&nbsp;<span style="color: #F59E0B;">color</span>: <span style="color: #10B981;">#1E3A8A</span>;<br>
          &nbsp;&nbsp;<span style="color: #F59E0B;">font-size</span>: <span style="color: #10B981;">24px</span>;<br>
          }
        </div>
      </div>
    `;
  } else if (conceptId === 'box-model') {
    container.innerHTML = `
      <div class="interactive-theory-card">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.5rem;">Inspetor Visual do Box Model</h4>
        <div class="box-model-container">
          <div class="box-model-visual" id="bm-margin">
            <div class="box-model-border" id="bm-border">
              <div class="box-model-padding" id="bm-padding">
                <div class="box-model-content">CONTEÚDO</div>
              </div>
            </div>
          </div>
          
          <div class="box-model-sliders">
            <div>
              <label>Padding: <span id="lbl-bm-padding">20px</span></label>
              <input type="range" id="slider-bm-padding" min="5" max="35" value="20" oninput="updateBoxModelDemo()">
            </div>
            <div>
              <label>Borda: <span id="lbl-bm-border">3px</span></label>
              <input type="range" id="slider-bm-border" min="0" max="10" value="3" oninput="updateBoxModelDemo()">
            </div>
            <div>
              <label>Margin: <span id="lbl-bm-margin">20px</span></label>
              <input type="range" id="slider-bm-margin" min="5" max="40" value="20" oninput="updateBoxModelDemo()">
            </div>
          </div>
        </div>
      </div>
    `;
    updateBoxModelDemo();
  } else if (conceptId === 'flexbox-alignment' || conceptId === 'flexbox-intro') {
    container.innerHTML = `
      <div class="interactive-theory-card">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.75rem;">Flexbox Playground Inspector</h4>
        <div class="flexbox-demo-container">
          <div class="flexbox-controls">
            <label>justify-content:</label>
            <select id="sel-flex-justify" onchange="updateFlexboxDemo()">
              <option value="flex-start">flex-start (Início)</option>
              <option value="center">center (Centralizado)</option>
              <option value="flex-end">flex-end (Fim)</option>
              <option value="space-between" selected>space-between (Espaçado)</option>
              <option value="space-around">space-around (Distribuído)</option>
            </select>
          </div>
          <div class="flexbox-demo-box" id="flexbox-demo-box" style="justify-content: space-between;">
            <div class="flexbox-demo-item">Item 1</div>
            <div class="flexbox-demo-item">Item 2</div>
            <div class="flexbox-demo-item">Item 3</div>
          </div>
        </div>
      </div>
    `;
  } else if (conceptId === 'forms-basics' || conceptId === 'css-pseudo-classes') {
    container.innerHTML = `
      <div class="interactive-theory-card">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.75rem;">Form Inspector &amp; Interatividade</h4>
        <div class="form-inspector-container">
          <div class="form-demo-card">
            <div class="form-demo-field">
              <label>Teste o Foco (:focus):</label>
              <input type="text" placeholder="Clique aqui para ver o brilho de foco">
            </div>
            <div class="form-demo-field">
              <label>Teste o Efeito Hover (:hover):</label>
              <button class="btn-hover-demo">Passe o mouse por aqui 🖱️</button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (conceptId === 'media-queries' || conceptId === 'media-images') {
    container.innerHTML = `
      <div class="interactive-theory-card">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.75rem;">Simulador Responsivo (@media)</h4>
        <div class="responsive-inspector-container">
          <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 0.5rem;">
            <button onclick="setViewportSize('360px')" class="btn-secondary" style="font-size: 0.75rem; padding: 4px 8px;">📱 Mobile (360px)</button>
            <button onclick="setViewportSize('100%')" class="btn-secondary" style="font-size: 0.75rem; padding: 4px 8px;">💻 Desktop (100%)</button>
          </div>
          <div class="viewport-frame" id="sim-viewport-frame" style="width: 100%;">
            <div class="viewport-content-card">
              <img src="https://picsum.photos/100" alt="Exemplo">
              <div>
                <h5 style="color: var(--primary-navy);">Card Adaptável</h5>
                <p style="font-size: 0.75rem; color: var(--text-light);">Adapta de linha para coluna ao encolher a tela!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (conceptId === 'js-basics') {
    container.innerHTML = `
      <div class="interactive-theory-card" style="width:100%;">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.75rem;">Inspetor de Primitivos JS</h4>
        <div style="width:100%; display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <button onclick="inspectPrimitive('string')" class="btn-secondary" style="font-size:0.75rem; padding:6px 10px;">let nome = "João"</button>
            <button onclick="inspectPrimitive('number')" class="btn-secondary" style="font-size:0.75rem; padding:6px 10px;">let idade = 16</button>
            <button onclick="inspectPrimitive('boolean')" class="btn-secondary" style="font-size:0.75rem; padding:6px 10px;">let aprovado = true</button>
            <button onclick="inspectPrimitive('null')" class="btn-secondary" style="font-size:0.75rem; padding:6px 10px;">let email = null</button>
            <button onclick="inspectPrimitive('undefined')" class="btn-secondary" style="font-size:0.75rem; padding:6px 10px;">let telefone</button>
          </div>
          <div id="primitive-inspector-output" style="background:#1E293B; border-radius:6px; padding:1rem; font-family:var(--font-code); font-size:0.85rem; color:#E2E8F0; min-height:80px; display:flex; flex-direction:column; justify-content:center;">
            Clique em uma declaração acima para ver a análise de tipo e escopo...
          </div>
        </div>
      </div>
    `;
  } else if (conceptId === 'js-operators') {
    container.innerHTML = `
      <div class="interactive-theory-card" style="width:100%;">
        <h4 style="font-family: var(--font-title); color: var(--primary-navy); margin-bottom: 0.75rem;">Calculadora de Expressões Lógicas & Aritméticas</h4>
        <div style="width:100%; display:flex; flex-direction:column; gap:0.8rem; background:#F8FAFC; border:1px solid var(--border-color); padding:1rem; border-radius:8px;">
          <div style="display:grid; grid-template-columns:1fr auto 1fr; gap:0.5rem; align-items:center;">
            <div>
              <label style="font-size:0.75rem; font-weight:bold; color:var(--text-light);">Valor A (x):</label>
              <select id="expr-val-a" onchange="runInteractiveExpression()" style="width:100%; padding:4px; font-family:var(--font-code); border-radius:4px; border:1px solid var(--border-color);">
                <option value="10">10 (Number)</option>
                <option value="&quot;10&quot;">"10" (String)</option>
                <option value="true">true (Boolean)</option>
                <option value="5">5 (Number)</option>
              </select>
            </div>
            <div style="margin-top:14px; font-weight:bold; color:var(--primary-navy);">Operador:</div>
            <div>
              <label style="font-size:0.75rem; font-weight:bold; color:var(--text-light);">Valor B (y):</label>
              <select id="expr-val-b" onchange="runInteractiveExpression()" style="width:100%; padding:4px; font-family:var(--font-code); border-radius:4px; border:1px solid var(--border-color);">
                <option value="10">10 (Number)</option>
                <option value="&quot;10&quot;">"10" (String)</option>
                <option value="false">false (Boolean)</option>
                <option value="3">3 (Number)</option>
              </select>
            </div>
          </div>
          <div>
            <label style="font-size:0.75rem; font-weight:bold; color:var(--text-light);">Operação:</label>
            <select id="expr-operator" onchange="runInteractiveExpression()" style="width:100%; padding:6px; font-family:var(--font-code); border-radius:4px; border:1px solid var(--border-color);">
              <option value="===">=== (Igualdade Estrita)</option>
              <option value="==">== (Igualdade Simples)</option>
              <option value="+">+ (Adição / Concatenação)</option>
              <option value="%">% (Módulo / Resto)</option>
              <option value="&&">&& (E Lógico)</option>
              <option value="||">|| (OU Lógico)</option>
            </select>
          </div>
          <div style="background:#1E293B; border-radius:6px; padding:0.8rem; font-family:var(--font-code); font-size:0.85rem; color:#E2E8F0; text-align:center; min-height:50px; display:flex; flex-direction:column; justify-content:center;">
            Expressão: <span id="expr-text-preview" style="color:#38BDF8; font-weight:bold;">10 === 10</span><br>
            Resultado: <span id="expr-result-preview" style="color:#10B981; font-weight:bold;">true</span>
          </div>
        </div>
      </div>
    `;
    runInteractiveExpression();
  }
}

window.setViewportSize = function(size) {
  const frame = document.getElementById('sim-viewport-frame');
  if (frame) frame.style.width = size;
};

window.inspectPrimitive = function(type) {
  const output = document.getElementById('primitive-inspector-output');
  if (!output) return;
  
  let html = "";
  if (type === 'string') {
    html = `<strong>Declaração:</strong> <code>let nome = "João";</code><br>
            <strong>Tipo de Dado:</strong> <code style="color:#10B981;">string</code> (texto)<br>
            <strong>Explicação:</strong> Representa dados textuais. Sempre escrito entre aspas simples, duplas ou crases.`;
  } else if (type === 'number') {
    html = `<strong>Declaração:</strong> <code>const ano = 2026;</code><br>
            <strong>Tipo de Dado:</strong> <code style="color:#F59E0B;">number</code> (número)<br>
            <strong>Explicação:</strong> Representa valores numéricos (inteiros ou decimais). Não usa aspas!`;
  } else if (type === 'boolean') {
    html = `<strong>Declaração:</strong> <code>let aprovado = true;</code><br>
            <strong>Tipo de Dado:</strong> <code style="color:#F43F5E;">boolean</code> (booleano)<br>
            <strong>Explicação:</strong> Só pode ter dois valores: <code>true</code> (verdadeiro) ou <code>false</code> (falso). Usado para tomadas de decisão.`;
  } else if (type === 'null') {
    html = `<strong>Declaração:</strong> <code>let email = null;</code><br>
            <strong>Tipo de Dado:</strong> <code style="color:#38BDF8;">object</code> (valor especial <code style="color:#38BDF8;">null</code>)<br>
            <strong>Explicação:</strong> Indica a ausência intencional de qualquer valor de objeto. É um "vazio" programado.`;
  } else if (type === 'undefined') {
    html = `<strong>Declaração:</strong> <code>let telefone;</code><br>
            <strong>Tipo de Dado:</strong> <code style="color:#64748B;">undefined</code> (indefinido)<br>
            <strong>Explicação:</strong> Retornado para variáveis que foram declaradas mas ainda não tiveram nenhum valor atribuído.`;
  }
  output.innerHTML = html;
};

window.runInteractiveExpression = function() {
  const valASelect = document.getElementById('expr-val-a');
  const valBSelect = document.getElementById('expr-val-b');
  const opSelect = document.getElementById('expr-operator');
  const textPreview = document.getElementById('expr-text-preview');
  const resultPreview = document.getElementById('expr-result-preview');
  
  if (!valASelect || !valBSelect || !opSelect || !textPreview || !resultPreview) return;
  
  let valAStr = valASelect.value;
  let valBStr = valBSelect.value;
  let op = opSelect.value;
  
  textPreview.innerText = `${valAStr} ${op} ${valBStr}`;
  
  try {
    let result;
    let parsedA = eval(valAStr);
    let parsedB = eval(valBStr);
    
    if (op === '===') result = parsedA === parsedB;
    else if (op === '==') result = parsedA == parsedB;
    else if (op === '+') result = parsedA + parsedB;
    else if (op === '%') result = parsedA % parsedB;
    else if (op === '&&') result = parsedA && parsedB;
    else if (op === '||') result = parsedA || parsedB;
    
    resultPreview.innerText = String(result);
    if (typeof result === 'boolean') {
      resultPreview.style.color = result ? '#10B981' : '#F43F5E';
    } else {
      resultPreview.style.color = '#38BDF8';
    }
  } catch (err) {
    resultPreview.innerText = "Erro na expressão";
    resultPreview.style.color = '#F43F5E';
  }
};

window.updateBoxModelDemo = function() {
  const padVal = document.getElementById('slider-bm-padding')?.value || 20;
  const bordVal = document.getElementById('slider-bm-border')?.value || 3;
  const margVal = document.getElementById('slider-bm-margin')?.value || 20;
  
  const lblPad = document.getElementById('lbl-bm-padding');
  const lblBord = document.getElementById('lbl-bm-border');
  const lblMarg = document.getElementById('lbl-bm-margin');
  
  if (lblPad) lblPad.innerText = padVal + "px";
  if (lblBord) lblBord.innerText = bordVal + "px";
  if (lblMarg) lblMarg.innerText = margVal + "px";
  
  const elMargin = document.getElementById('bm-margin');
  const elBorder = document.getElementById('bm-border');
  const elPadding = document.getElementById('bm-padding');
  
  if (elMargin) elMargin.style.padding = margVal + "px";
  if (elBorder) {
    elBorder.style.borderWidth = bordVal + "px";
    elBorder.style.padding = "6px";
  }
  if (elPadding) elPadding.style.padding = padVal + "px";
};

window.updateFlexboxDemo = function() {
  const justify = document.getElementById('sel-flex-justify')?.value || 'space-between';
  const box = document.getElementById('flexbox-demo-box');
  if (box) {
    box.style.justifyContent = justify;
  }
};

// --- SIMULADOR SANDBOX ---
function setupSimulator() {
  const textarea = document.getElementById('sim-code-editor-textarea');
  const iframe = document.getElementById('sim-live-preview-iframe');
  if (!textarea || !iframe) return;

  if (!STATE.simulator.currentCode) {
    STATE.simulator.currentCode = STATE.simulator.defaultCode;
  }
  textarea.value = STATE.simulator.currentCode;

  const pre = textarea.nextElementSibling;
  if (pre) updateEditorHighlight(textarea, pre);

  renderIframePreview(iframe, textarea.value);

  textarea.addEventListener('input', (e) => {
    STATE.simulator.currentCode = e.target.value;
    updateEditorHighlight(textarea, pre);
    renderIframePreview(iframe, e.target.value);
  });

  textarea.addEventListener('scroll', () => {
    syncEditorScroll(textarea, pre);
  });

  enableTabKeyPress('sim-code-editor-textarea', (val) => {
    STATE.simulator.currentCode = val;
    renderIframePreview(iframe, val);
  });
}

function renderIframePreview(iframe, code) {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
  } catch (e) {
    console.error("Erro no preview live", e);
  }
}

// --- EDITOR & HIGHLIGHT DE SINTAXE ---
function updateEditorHighlight(textarea, pre) {
  if (!textarea || !pre) return;
  const codeElement = pre.querySelector('code');
  if (codeElement) {
    if (STATE.currentTab === 'challenges' && STATE.challenges.type === 'js') {
      codeElement.innerHTML = highlightJS(textarea.value) + "\n";
    } else {
      codeElement.innerHTML = highlightHTMLandCSS(textarea.value) + "\n";
    }
  }
  syncEditorScroll(textarea, pre);
}

function syncEditorScroll(textarea, pre) {
  if (!textarea || !pre) return;
  pre.scrollTop = textarea.scrollTop;
  pre.scrollLeft = textarea.scrollLeft;
}

function enableTabKeyPress(textareaId, onInputCallback) {
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;

  textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      const spaces = "  ";
      this.value = this.value.substring(0, start) + spaces + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + spaces.length;

      if (onInputCallback) onInputCallback(this.value);
      
      const pre = this.nextElementSibling;
      if (pre) updateEditorHighlight(this, pre);
    }
  });
}

// --- QUIZZES ---
function setupQuiz() {
  STATE.quiz.currentQuestionIndex = 0;
  STATE.quiz.answers = [];
  STATE.quiz.hasAnsweredCurrent = false;
  
  if (STATE.quiz.selectedModule === 'js') {
    STATE.quiz.filteredQuestions = SITE_DATA.quiz.filter(q => q.moduleId === 'mod-5' || q.moduleId === 'mod-6');
  } else {
    STATE.quiz.filteredQuestions = SITE_DATA.quiz.filter(q => q.moduleId !== 'mod-5' && q.moduleId !== 'mod-6');
  }
  
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  
  const questions = STATE.quiz.filteredQuestions;
  if (questions.length === 0) {
    container.innerHTML = `<p>Nenhuma pergunta encontrada neste módulo.</p>`;
    return;
  }
  
  const question = questions[STATE.quiz.currentQuestionIndex];
  const total = questions.length;
  
  let optionsHtml = question.options.map((option, idx) => {
    const isCode = option.includes('<') || option.includes('.') || option.includes('#') || option.includes('{') || option.includes('===') || option.includes('let') || option.includes('const');
    const codeClass = isCode ? 'code-font' : '';
    return `<button class="quiz-option ${codeClass}" data-idx="${idx}">${escapeHtml(option)}</button>`;
  }).join('');
  
  // Set title based on current quiz
  const quizTitle = STATE.quiz.selectedModule === 'js' ? 'Quiz JavaScript Básico' : 'Quiz HTML &amp; CSS Geral';
  
  container.innerHTML = `
    <h3 style="margin-bottom:0.75rem; color:var(--primary-navy);">${quizTitle}</h3>
    <div class="quiz-progress-text">Pergunta ${STATE.quiz.currentQuestionIndex + 1} de ${total}</div>
    <p class="quiz-question">${question.question}</p>
    <div class="quiz-options">
      ${optionsHtml}
    </div>
    <div id="quiz-feedback-box" class="quiz-feedback"></div>
    <div class="quiz-actions">
      <button id="quiz-next-btn" class="primary-btn" style="display: none;">
        ${STATE.quiz.currentQuestionIndex === total - 1 ? 'Finalizar Quiz 🏁' : 'Próxima Pergunta ➔'}
      </button>
    </div>
  `;
  
  container.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      if (STATE.quiz.hasAnsweredCurrent) return;
      const selectedIdx = parseInt(opt.getAttribute('data-idx'));
      selectQuizOption(selectedIdx, opt);
    });
  });
  
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', advanceQuiz);
  }
}

function selectQuizOption(selectedIdx, element) {
  STATE.quiz.hasAnsweredCurrent = true;
  const questions = STATE.quiz.filteredQuestions;
  const question = questions[STATE.quiz.currentQuestionIndex];
  const correctIdx = question.correctAnswer;
  
  STATE.quiz.answers.push(selectedIdx);
  
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const nextBtn = document.getElementById('quiz-next-btn');
  const allOptions = document.querySelectorAll('.quiz-option');
  
  if (selectedIdx === correctIdx) {
    element.classList.add('correct');
    feedbackBox.className = 'quiz-feedback success';
    feedbackBox.innerHTML = `<strong>✨ Resposta Correta!</strong><br>${question.explanation}`;
  } else {
    element.classList.add('incorrect');
    allOptions[correctIdx].classList.add('correct');
    feedbackBox.className = 'quiz-feedback error';
    feedbackBox.innerHTML = `<strong>❌ Resposta Incorreta.</strong><br>${question.explanation}`;
  }
  
  nextBtn.style.display = 'inline-flex';
}

function advanceQuiz() {
  const total = STATE.quiz.filteredQuestions.length;
  if (STATE.quiz.currentQuestionIndex < total - 1) {
    STATE.quiz.currentQuestionIndex++;
    STATE.quiz.hasAnsweredCurrent = false;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  
  let correctCount = 0;
  STATE.quiz.filteredQuestions.forEach((q, idx) => {
    if (STATE.quiz.answers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });
  
  const isJS = STATE.quiz.selectedModule === 'js';
  if (isJS) {
    STATE.progress.quizJSAttempts = (STATE.progress.quizJSAttempts || 0) + 1;
    STATE.progress.quizJSCompleted = true;
    STATE.progress.quizJSScore = correctCount;
  } else {
    STATE.progress.quizAttempts = (STATE.progress.quizAttempts || 0) + 1;
    STATE.progress.quizCompleted = true;
    STATE.progress.quizScore = correctCount;
  }
  
  saveProgress();
  
  const nextTrackType = isJS ? 'js' : 'html-css';
  const labelDesafios = isJS ? 'Desafios JavaScript' : 'Desafios HTML &amp; CSS';
  
  container.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <h2 style="color: var(--primary-navy); margin-bottom: 1rem;">Quiz Concluído!</h2>
      <p style="font-size: 1.1rem; color: var(--text-light); margin-bottom: 1.5rem;">
        Você acertou <strong>${correctCount}</strong> de <strong>${STATE.quiz.filteredQuestions.length}</strong> perguntas.
      </p>
      <button id="quiz-retry-btn" class="btn-secondary">Refazer Quiz</button>
      <button onclick="switchTab('challenges'); setChallengeType('${nextTrackType}'); selectChallenge(1);" class="primary-btn">Ir para os ${labelDesafios} ➔</button>
    </div>
  `;
  
  document.getElementById('quiz-retry-btn')?.addEventListener('click', setupQuiz);
}

// --- DESAFIOS DE CÓDIGO (NÍVEIS 1 A 10) ---
function setupChallenges() {
  const listContainer = document.getElementById('challenge-list-container');
  if (!listContainer) return;
  
  const isJS = STATE.challenges.type === 'js';
  const exercises = isJS ? SITE_DATA.exercisesJS : SITE_DATA.exercises;
  
  // Garantir que a seleção de nível está dentro dos limites da trilha
  if (STATE.challenges.currentLevel > exercises.length) {
    STATE.challenges.currentLevel = 1;
  }
  
  let html = "";
  exercises.forEach(ex => {
    const isCompleted = isJS 
      ? STATE.progress.completedLevelsJS.includes(ex.level)
      : STATE.progress.completedLevels.includes(ex.level);
    const completedClass = isCompleted ? 'completed' : '';
    const activeClass = ex.level === STATE.challenges.currentLevel ? 'active' : '';
    
    html += `
      <button class="challenge-item ${activeClass} ${completedClass}" id="chal-item-${ex.level}" onclick="selectChallenge(${ex.level})">
        Nível ${ex.level}: ${ex.name.split(':')[1].trim()}
      </button>
    `;
  });
  listContainer.innerHTML = html;
  
  loadChallenge(STATE.challenges.currentLevel);
  enableTabKeyPress('chal-code-editor', onCodeEditorInput);
}

window.selectChallenge = function(level) {
  const isJS = STATE.challenges.type === 'js';
  const completedList = isJS ? STATE.progress.completedLevelsJS : STATE.progress.completedLevels;
  
  if (level > 1 && !completedList.includes(level - 1) && !completedList.includes(level)) {
    alert("🔒 Desafio Bloqueado! Conclua o nível anterior para desbloquear.");
    return;
  }
  
  STATE.challenges.currentLevel = level;
  
  document.querySelectorAll('.challenge-item').forEach(btn => {
    const btnLvl = parseInt(btn.id.replace('chal-item-', ''));
    btn.classList.remove('active');
    if (btnLvl === level) btn.classList.add('active');
  });
  
  loadChallenge(level);
};

function loadChallenge(level) {
  const isJS = STATE.challenges.type === 'js';
  const exercises = isJS ? SITE_DATA.exercisesJS : SITE_DATA.exercises;
  const ex = exercises.find(e => e.level === level);
  if (!ex) return;
  
  const descTitle = document.getElementById('chal-title');
  const descText = document.getElementById('chal-description');
  const editor = document.getElementById('chal-code-editor');
  const resultsPanel = document.getElementById('chal-results-panel');
  const editorLang = document.querySelector('.workspace-card .editor-header span.lang');
  
  if (descTitle && descText && editor) {
    descTitle.innerHTML = ex.name;
    descText.innerHTML = ex.description;
    
    const userCodes = isJS ? STATE.challenges.userCodesJS : STATE.challenges.userCodes;
    editor.value = userCodes[level] || ex.starterCode;
    
    if (editorLang) {
      editorLang.innerText = isJS ? 'javascript' : 'html';
    }
    
    const pre = editor.nextElementSibling;
    if (pre) updateEditorHighlight(editor, pre);
  }
  
  if (resultsPanel) resultsPanel.classList.remove('visible');
}

function onCodeEditorInput(value) {
  const isJS = STATE.challenges.type === 'js';
  if (isJS) {
    STATE.challenges.userCodesJS[STATE.challenges.currentLevel] = value;
  } else {
    STATE.challenges.userCodes[STATE.challenges.currentLevel] = value;
  }
}

window.resetChallengeCode = function() {
  const level = STATE.challenges.currentLevel;
  const isJS = STATE.challenges.type === 'js';
  const exercises = isJS ? SITE_DATA.exercisesJS : SITE_DATA.exercises;
  const ex = exercises.find(e => e.level === level);
  
  if (ex && confirm("Voltar ao código inicial?")) {
    const editor = document.getElementById('chal-code-editor');
    editor.value = ex.starterCode;
    
    if (isJS) {
      STATE.challenges.userCodesJS[level] = ex.starterCode;
    } else {
      STATE.challenges.userCodes[level] = ex.starterCode;
    }
    
    const pre = editor.nextElementSibling;
    if (pre) updateEditorHighlight(editor, pre);
    document.getElementById('chal-results-panel').classList.remove('visible');
  }
};

window.runAndValidateCode = function() {
  const level = STATE.challenges.currentLevel;
  const isJS = STATE.challenges.type === 'js';
  const exercises = isJS ? SITE_DATA.exercisesJS : SITE_DATA.exercises;
  const ex = exercises.find(e => e.level === level);
  const code = document.getElementById('chal-code-editor').value;
  
  if (isJS) {
    STATE.challenges.userCodesJS[level] = code;
  } else {
    STATE.challenges.userCodes[level] = code;
  }
  
  const resultsPanel = document.getElementById('chal-results-panel');
  if (!resultsPanel) return;
  
  let valResult;
  if (isJS) {
    valResult = runJSValidation(code, ex.testCases);
  } else {
    valResult = runHTMLCSSValidation(code, ex.testCases);
  }
  
  let headerHtml = "";
  if (valResult.success) {
    headerHtml = `<div class="results-header" style="color: var(--color-success)">🎉 Todos os testes passaram com sucesso!</div>`;
    const completedList = isJS ? STATE.progress.completedLevelsJS : STATE.progress.completedLevels;
    if (!completedList.includes(level)) {
      completedList.push(level);
    }
    saveProgress();
    setupChallenges();
  } else {
    headerHtml = `<div class="results-header" style="color: var(--color-error)">❌ Falha em alguns testes. Corrija o código!</div>`;
  }
  
  let casesHtml = valResult.results.map(res => {
    const statusClass = res.pass ? 'pass' : 'fail';
    const statusTxt = res.pass ? 'PASSOU' : 'FALHOU';
    const errText = res.error ? `<div style="font-size:0.8rem; color:#EF4444; margin-top:4px;">Erro: ${res.error}</div>` : '';
    
    return `
      <div class="test-case-row ${statusClass}" style="flex-direction:column; align-items:flex-start; gap:4px;">
        <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
          <span>${res.pass ? '✅' : '❌'} <strong>${escapeHtml(res.label)}</strong></span>
          <span class="status-indicator ${statusClass}">${statusTxt}</span>
        </div>
        ${errText}
      </div>
    `;
  }).join('');
  
  resultsPanel.innerHTML = `${headerHtml}<div class="test-cases-summary">${casesHtml}</div>`;
  resultsPanel.classList.add('visible');
};

// --- RELATÓRIO ESCOLAR DINÂMICO ---
window.updateStudentName = function(val) {
  STATE.progress.studentName = val;
  saveProgress();
};

function renderPerformanceReport() {
  const outputArea = document.getElementById('report-output-area');
  if (!outputArea) return;
  
  const name = STATE.progress.studentName || "";
  if (name.trim() === "") {
    outputArea.innerHTML = `<p style="text-align: center; color: var(--text-light); padding: 2rem;">⚠️ Digite o nome do aluno acima para gerar o relatório escolar completo.</p>`;
    return;
  }
  
  const theoryHTMLCSS = STATE.progress.theoryRead.filter(id => id !== 'js-basics' && id !== 'js-operators').length;
  const theoryJS = STATE.progress.theoryRead.filter(id => id === 'js-basics' || id === 'js-operators').length;
  
  const quizHTMLCSS = STATE.progress.quizCompleted ? STATE.progress.quizScore : 0;
  const quizJS = STATE.progress.quizJSCompleted ? STATE.progress.quizJSScore : 0;
  
  const challengesHTMLCSS = STATE.progress.completedLevels.length;
  const challengesJS = STATE.progress.completedLevelsJS.length;
  
  // Total de itens avaliados: 11 teoria + 2 quizzes + 15 desafios = 28
  const totalItems = 11 + 2 + 15;
  const completedItems = STATE.progress.theoryRead.length + 
                         (STATE.progress.quizCompleted ? 1 : 0) + 
                         (STATE.progress.quizJSCompleted ? 1 : 0) + 
                         challengesHTMLCSS + 
                         challengesJS;
  const percentage = Math.round((completedItems / totalItems) * 100);
  
  outputArea.innerHTML = `
    <div style="border: 2px solid var(--primary-navy); padding: 2rem; border-radius: 12px; background: white;">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--primary-navy); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div>
          <h3 style="color: var(--primary-navy); font-size: 1.5rem;">Relatório de Desempenho em Desenvolvimento Web</h3>
          <p style="color: var(--text-light); font-size: 0.85rem;">Disciplina: Lógica de Programação &amp; Front-End 101</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.25rem; font-weight: bold; color: var(--accent-teal);">${percentage}% Progresso</div>
          <span style="font-size: 0.8rem; color: var(--text-light);">${new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
      <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Estudante: <strong style="color: var(--primary-navy);">${escapeHtml(name)}</strong></p>
      
      <!-- Seção HTML & CSS -->
      <h4 style="color: var(--primary-navy); border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">🎨 Módulos HTML &amp; CSS</h4>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold;">${theoryHTMLCSS}/6</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">Teoria Concluída</div>
        </div>
        <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold;">${quizHTMLCSS}/15</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">Acertos Quiz</div>
        </div>
        <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold;">${challengesHTMLCSS}/10</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">Desafios Feitos</div>
        </div>
      </div>

      <!-- Seção JavaScript -->
      <h4 style="color: var(--primary-navy); border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem; margin-bottom: 0.75rem;">⚡ Módulo JavaScript (JS Puro)</h4>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold;">${theoryJS}/2</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">Teoria Concluída</div>
        </div>
        <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold;">${quizJS}/5</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">Acertos Quiz</div>
        </div>
        <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold;">${challengesJS}/5</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">Desafios Feitos</div>
        </div>
      </div>

      <button onclick="window.print()" class="primary-btn" style="float: right;">Imprimir Relatório 🖨️</button>
    </div>
  `;
}

// --- AVALIAÇÃO 1 ---
function setupExam() {
  enableTabKeyPress('exam-code-editor', onExamCodeInput);
}

window.unlockExam = function() {
  const pwdInput = document.getElementById('exam-password-input');
  const errorMsg = document.getElementById('exam-auth-error');
  if (!pwdInput) return;
  
  const pwd = pwdInput.value.trim();
  if (pwd === 'ecs101' || pwd === 'aula101') {
    STATE.progress.examUnlocked = true;
    errorMsg.style.display = 'none';
    saveProgress();
    refreshExamUI();
  } else {
    errorMsg.style.display = 'block';
    pwdInput.value = "";
  }
};

function refreshExamUI() {
  const authCard = document.getElementById('exam-auth-card');
  const contentCard = document.getElementById('exam-content-card');
  const successCard = document.getElementById('exam-success-card');
  const questionsArea = document.getElementById('exam-questions-area');
  
  if (!authCard || !contentCard || !successCard) return;

  if (STATE.progress.examSubmitted) {
    authCard.style.display = 'none';
    contentCard.style.display = 'none';
    successCard.style.display = 'block';
    return;
  }
  
  if (STATE.progress.examUnlocked) {
    authCard.style.display = 'none';
    contentCard.style.display = 'block';
    successCard.style.display = 'none';
    
    document.getElementById('exam-student-name-1').value = STATE.progress.examName1 || "";
    document.getElementById('exam-student-name-2').value = STATE.progress.examName2 || "";
    
    if ((STATE.progress.examName1 || "").trim() !== "") {
      questionsArea.style.display = 'block';
      renderExamList();
      loadExamQuestion(STATE.exam.currentQuestionId);
    } else {
      questionsArea.style.display = 'none';
    }
  } else {
    authCard.style.display = 'block';
    contentCard.style.display = 'none';
    successCard.style.display = 'none';
  }
}

window.onExamNameChange = function() {
  STATE.progress.examName1 = document.getElementById('exam-student-name-1').value;
  STATE.progress.examName2 = document.getElementById('exam-student-name-2').value;
  saveProgress();
  refreshExamUI();
};

function renderExamList() {
  const listContainer = document.getElementById('exam-list-container');
  if (!listContainer) return;
  
  let html = "";
  SITE_DATA.exam.forEach(q => {
    const isPass = STATE.progress.examResults[q.id] === true;
    const completedClass = isPass ? 'completed' : '';
    const activeClass = q.id === STATE.exam.currentQuestionId ? 'active' : '';
    
    html += `
      <button class="challenge-item ${activeClass} ${completedClass}" id="exam-item-${q.id}" onclick="selectExamQuestion(${q.id})">
        Questão ${q.id}: ${q.name.split(':')[1].trim()}
      </button>
    `;
  });
  listContainer.innerHTML = html;
}

window.selectExamQuestion = function(id) {
  STATE.exam.currentQuestionId = id;
  renderExamList();
  loadExamQuestion(id);
};

function loadExamQuestion(id) {
  const q = SITE_DATA.exam.find(item => item.id === id);
  if (!q) return;
  
  const descTitle = document.getElementById('exam-q-title');
  const descText = document.getElementById('exam-q-description');
  const editor = document.getElementById('exam-code-editor');
  
  if (descTitle && descText && editor) {
    descTitle.innerHTML = q.name;
    descText.innerHTML = q.description;
    editor.value = STATE.progress.examCodes[id] || q.starterCode;
    
    const pre = editor.nextElementSibling;
    if (pre) updateEditorHighlight(editor, pre);
  }
}

function onExamCodeInput(val) {
  STATE.progress.examCodes[STATE.exam.currentQuestionId] = val;
  saveProgress();
}

window.runAndValidateExamCode = function() {
  const id = STATE.exam.currentQuestionId;
  const q = SITE_DATA.exam.find(item => item.id === id);
  const code = document.getElementById('exam-code-editor').value;
  
  STATE.progress.examCodes[id] = code;
  const resultsPanel = document.getElementById('exam-results-panel');
  
  const valResult = runHTMLCSSValidation(code, q.testCases);
  STATE.progress.examResults[id] = valResult.success;
  saveProgress();
  renderExamList();
  
  if (resultsPanel) {
    // Mostra o resultado item a item para que o aluno saiba exatamente o que falta ajustar.
    const feitos = valResult.results.filter(r => r.pass).length;
    const total = valResult.results.length;

    const headerHtml = valResult.success
      ? `<div class="results-header" style="color: var(--color-success)">✅ Questão Aprovada! (${feitos} de ${total})</div>`
      : `<div class="results-header" style="color: var(--color-error)">Faltam ajustes: ${feitos} de ${total} itens prontos.</div>`;

    const listHtml = valResult.results.map(r => `
      <li style="display: flex; gap: 0.5rem; align-items: flex-start; padding: 0.35rem 0;">
        <span aria-hidden="true">${r.pass ? '✅' : '⬜'}</span>
        <span style="color: ${r.pass ? 'var(--color-success)' : 'var(--text-light)'}">
          ${r.label}${r.error ? ` <em style="opacity:.75">(${r.error})</em>` : ''}
        </span>
      </li>`).join('');

    resultsPanel.innerHTML = `
      ${headerHtml}
      <ul style="list-style: none; margin: 0.75rem 0 0; padding: 0;">${listHtml}</ul>`;
    resultsPanel.classList.add('visible');
  }
};

// ==========================================================
// ENTREGA DA AVALIAÇÃO (EmailJS)
// ==========================================================
const EMAILJS_CONFIG = {
  serviceId: 'service_9u2sac8',
  templateId: 'COLE_AQUI_O_TEMPLATE_ID',
  publicKey: 'COLE_AQUI_A_PUBLIC_KEY'
};

function emailJsConfigurado() {
  return typeof emailjs !== 'undefined' &&
         !EMAILJS_CONFIG.templateId.startsWith('COLE_AQUI') &&
         !EMAILJS_CONFIG.publicKey.startsWith('COLE_AQUI');
}

// Monta o relatório que o professor recebe por e-mail.
function montarRelatorioExame() {
  const nome1 = (STATE.progress.examName1 || "").trim() || "(não informado)";
  const nome2 = (STATE.progress.examName2 || "").trim() || "(sem dupla)";
  const aprovadas = SITE_DATA.exam.filter(q => STATE.progress.examResults[q.id]).length;

  const blocos = SITE_DATA.exam.map(q => {
    const ok = STATE.progress.examResults[q.id];
    const codigo = (STATE.progress.examCodes[q.id] || "").trim() || "(nenhum código enviado)";
    return [
      `--------------------------------------------------`,
      `${q.name}`,
      `Resultado: ${ok ? 'APROVADA' : 'NAO APROVADA'}`,
      ``,
      `Código enviado:`,
      codigo
    ].join('\n');
  }).join('\n\n');

  return {
    aluno_1: nome1,
    aluno_2: nome2,
    data_envio: new Date().toLocaleString('pt-BR'),
    resumo: `${aprovadas} de ${SITE_DATA.exam.length} questões aprovadas`,
    detalhes: blocos
  };
}

function mostrarStatusEnvio(texto, tipo) {
  const el = document.getElementById('exam-send-status');
  if (!el) return;
  const cores = {
    enviando: ['#EFF6FF', '#1D4ED8'],
    erro:     ['#FEF2F2', '#B91C1C'],
    ok:       ['#F0FDF4', '#166534']
  };
  const [bg, fg] = cores[tipo] || cores.enviando;
  el.style.display = 'block';
  el.style.backgroundColor = bg;
  el.style.color = fg;
  el.textContent = texto;
}

// Fallback: se o e-mail falhar, o aluno baixa o relatório e entrega por outro meio.
function baixarRelatorioExame() {
  const r = montarRelatorioExame();
  const texto = [
    `AVALIACAO 1 - DESENVOLVIMENTO WEB`,
    `Aluno(a) 1: ${r.aluno_1}`,
    `Aluno(a) 2: ${r.aluno_2}`,
    `Data: ${r.data_envio}`,
    `Resultado: ${r.resumo}`,
    ``,
    r.detalhes
  ].join('\n');

  const nomeArquivo = `avaliacao_devweb_${r.aluno_1.toLowerCase().replace(/\s+/g, '_')}.txt`;
  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
window.baixarRelatorioExame = baixarRelatorioExame;

window.openExamReview = function() {
  const modal = document.getElementById('exam-review-modal');
  const resumo = document.getElementById('exam-review-summary');
  const status = document.getElementById('exam-send-status');

  if (status) status.style.display = 'none';

  if (resumo) {
    const nome1 = (STATE.progress.examName1 || "").trim() || "(não informado)";
    const nome2 = (STATE.progress.examName2 || "").trim() || "(sem dupla)";
    const linhas = SITE_DATA.exam.map(q => {
      const ok = STATE.progress.examResults[q.id];
      return `<li style="padding: 0.3rem 0;">${ok ? '✅' : '⬜'} ${q.name}</li>`;
    }).join('');

    resumo.innerHTML = `
      <p style="margin-bottom: 0.75rem;"><strong>Aluno(a) 1:</strong> ${nome1}<br><strong>Aluno(a) 2:</strong> ${nome2}</p>
      <p style="margin-bottom: 0.35rem;">Situação das questões:</p>
      <ul style="list-style: none; margin: 0 0 1rem; padding: 0;">${linhas}</ul>
      <p style="font-size: 0.9rem; color: var(--text-light);">Ao confirmar, a sua prova será enviada por e-mail para o professor. Depois disso não é possível alterar as respostas.</p>`;
  }

  if (modal) modal.style.display = 'flex';
};

window.closeExamReview = function() {
  const modal = document.getElementById('exam-review-modal');
  if (modal) modal.style.display = 'none';
};

window.submitExamFinal = async function() {
  const btn = document.getElementById('exam-submit-btn');
  const btnVoltar = document.getElementById('exam-review-back');

  if (!emailJsConfigurado()) {
    mostrarStatusEnvio('O envio por e-mail ainda não está configurado. Avise o professor e baixe o relatório para entregar.', 'erro');
    if (btn) btn.textContent = 'Baixar relatório ⬇️';
    if (btn) btn.onclick = baixarRelatorioExame;
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
  if (btnVoltar) btnVoltar.disabled = true;
  mostrarStatusEnvio('Enviando a sua prova. Aguarde um momento.', 'enviando');

  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      montarRelatorioExame(),
      { publicKey: EMAILJS_CONFIG.publicKey }
    );

    // Só marca como entregue depois que o envio foi confirmado.
    STATE.progress.examSubmitted = true;
    saveProgress();
    mostrarStatusEnvio('Prova enviada com sucesso!', 'ok');
    setTimeout(() => { closeExamReview(); refreshExamUI(); }, 1200);
  } catch (err) {
    console.error('Falha no envio da avaliação:', err);
    mostrarStatusEnvio('Não foi possível enviar agora. As suas respostas continuam salvas. Baixe o relatório e entregue ao professor, ou tente novamente.', 'erro');
    if (btn) { btn.disabled = false; btn.textContent = 'Tentar novamente ✉️'; }
    if (btnVoltar) btnVoltar.disabled = false;

    // Oferece o download como saída garantida.
    const status = document.getElementById('exam-send-status');
    if (status && !document.getElementById('exam-download-fallback')) {
      const b = document.createElement('button');
      b.id = 'exam-download-fallback';
      b.className = 'btn-secondary';
      b.style.marginTop = '0.75rem';
      b.textContent = 'Baixar relatório ⬇️';
      b.onclick = baixarRelatorioExame;
      status.after(b);
    }
  }
};
