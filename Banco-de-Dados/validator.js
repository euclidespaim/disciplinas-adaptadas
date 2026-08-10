/**
 * Validador e Motor de SQL Simulado para Banco de Dados 101
 * Permite simular comandos SQL no Live Sandbox e validar respostas conceituais nos Desafios.
 */

// Banco de dados em memória para o Simulador Live Sandbox
let sandboxDB = {
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

/**
 * Motor SQL em JavaScript super simplificado para fins educativos
 */
function executarSQLSimulado(query) {
  query = query.trim().replace(/\s+/g, " ");
  const queryLower = query.toLowerCase();
  
  if (queryLower.startsWith("create table")) {
    // Exemplo: CREATE TABLE clientes (id, nome, telefone)
    const match = query.match(/create table\s+([a-zA-Z0-9_]+)\s*\((.*)\)/i);
    if (!match) {
      return { success: false, error: "Erro de Sintaxe: Use CREATE TABLE nome_tabela (coluna1, coluna2, ...)" };
    }
    const nomeTabela = match[1].toLowerCase();
    const colunasRaw = match[2].split(",");
    const colunas = colunasRaw.map(c => c.trim().split(" ")[0].replace(/['"`]/g, ""));
    
    if (sandboxDB.tabelas[nomeTabela]) {
      return { success: false, error: `Erro: A tabela '${nomeTabela}' já existe no banco de dados.` };
    }
    
    sandboxDB.tabelas[nomeTabela] = { colunas, linhas: [] };
    return { 
      success: true, 
      message: `Tabela '${nomeTabela}' criada com sucesso!`,
      colunas: ["Tabela Criada"],
      rows: [[nomeTabela]]
    };
  }
  
  if (queryLower.startsWith("insert into")) {
    // Exemplo: INSERT INTO alunos (RA, Nome, Idade, CodTurma) VALUES (104, 'Daniela', 16, 'T1')
    // Aceita também formato curto: INSERT INTO alunos VALUES (104, 'Daniela', 16, 'T1')
    const matchCompleto = query.match(/insert into\s+([a-zA-Z0-9_]+)\s*\((.*)\)\s*values\s*\((.*)\)/i);
    const matchCurto = query.match(/insert into\s+([a-zA-Z0-9_]+)\s*values\s*\((.*)\)/i);
    
    if (!matchCompleto && !matchCurto) {
      return { success: false, error: "Erro de Sintaxe: Use INSERT INTO nome_tabela VALUES (valor1, valor2, ...)" };
    }
    
    const nomeTabela = (matchCompleto ? matchCompleto[1] : matchCurto[1]).toLowerCase();
    const tabela = sandboxDB.tabelas[nomeTabela];
    if (!tabela) {
      return { success: false, error: `Erro: A tabela '${nomeTabela}' não existe no banco.` };
    }
    
    let valoresRaw = (matchCompleto ? matchCompleto[3] : matchCurto[2]).split(",");
    let valores = valoresRaw.map(v => v.trim().replace(/^['"]|['"]$/g, ""));
    
    let novaLinha = {};
    if (matchCompleto) {
      let colunasInserir = matchCompleto[2].split(",").map(c => c.trim());
      tabela.colunas.forEach(col => {
        const idx = colunasInserir.findIndex(c => c.toLowerCase() === col.toLowerCase());
        novaLinha[col] = idx !== -1 ? valores[idx] : null;
      });
    } else {
      if (valores.length !== tabela.colunas.length) {
        return { success: false, error: `Erro: Quantidade de valores (${valores.length}) não bate com o número de colunas (${tabela.colunas.length}) da tabela.` };
      }
      tabela.colunas.forEach((col, idx) => {
        novaLinha[col] = valores[idx];
      });
    }
    
    tabela.linhas.push(novaLinha);
    return {
      success: true,
      message: "1 registro inserido com sucesso!",
      colunas: tabela.colunas,
      rows: tabela.linhas.map(row => tabela.colunas.map(col => row[col]))
    };
  }
  
  if (queryLower.startsWith("select")) {
    // Exemplo: SELECT RA, Nome FROM alunos WHERE CodTurma = 'T1'
    const match = query.match(/select\s+(.+)\s+from\s+([a-zA-Z0-9_]+)(?:\s+where\s+(.+))?/i);
    if (!match) {
      return { success: false, error: "Erro de Sintaxe: Use SELECT colunas FROM tabela [WHERE coluna = valor]" };
    }
    
    const colunasSelectStr = match[1].trim();
    const nomeTabela = match[2].trim().toLowerCase();
    const condicaoStr = match[3] ? match[3].trim() : null;
    
    const tabela = sandboxDB.tabelas[nomeTabela];
    if (!tabela) {
      return { success: false, error: `Erro: A tabela '${nomeTabela}' não existe no banco.` };
    }
    
    let colunasSelect = [];
    if (colunasSelectStr === "*") {
      colunasSelect = [...tabela.colunas];
    } else {
      colunasSelect = colunasSelectStr.split(",").map(c => c.trim());
      // Valida se as colunas existem
      for (let col of colunasSelect) {
        if (!tabela.colunas.includes(col)) {
          return { success: false, error: `Erro: A coluna '${col}' não existe na tabela '${nomeTabela}'.` };
        }
      }
    }
    
    let linhasFiltradas = [...tabela.linhas];
    
    if (condicaoStr) {
      // Suporta filtro básico de igualdade: WHERE coluna = 'valor' ou coluna = valor
      const condMatch = condicaoStr.match(/([a-zA-Z0-9_]+)\s*(=|!=|>|<)\s*(.+)/);
      if (!condMatch) {
        return { success: false, error: "Erro de Filtro: O simulador suporta filtros do tipo 'coluna = valor'" };
      }
      const colFiltro = condMatch[1].trim();
      const op = condMatch[2].trim();
      const valFiltro = condMatch[3].trim().replace(/^['"]|['"]$/g, "");
      
      if (!tabela.colunas.includes(colFiltro)) {
        return { success: false, error: `Erro: A coluna de filtro '${colFiltro}' não existe.` };
      }
      
      linhasFiltradas = linhasFiltradas.filter(row => {
        let valRow = String(row[colFiltro]);
        if (op === "=") return valRow === valFiltro;
        if (op === "!=") return valRow !== valFiltro;
        if (op === ">") return Number(valRow) > Number(valFiltro);
        if (op === "<") return Number(valRow) < Number(valFiltro);
        return false;
      });
    }
    
    return {
      success: true,
      message: `Consulta retornou ${linhasFiltradas.length} linhas.`,
      colunas: colunasSelect,
      rows: linhasFiltradas.map(row => colunasSelect.map(col => row[col]))
    };
  }
  
  if (queryLower.startsWith("update")) {
    // Exemplo: UPDATE alunos SET Nome = 'Bruno Souza' WHERE RA = 102
    const match = query.match(/update\s+([a-zA-Z0-9_]+)\s+set\s+(.+)\s+where\s+(.+)/i);
    if (!match) {
      return { success: false, error: "Erro de Sintaxe: Use UPDATE tabela SET coluna = valor WHERE coluna_filtro = valor" };
    }
    
    const nomeTabela = match[1].toLowerCase();
    const setStr = match[2].trim();
    const whereStr = match[3].trim();
    
    const tabela = sandboxDB.tabelas[nomeTabela];
    if (!tabela) {
      return { success: false, error: `Erro: A tabela '${nomeTabela}' não existe.` };
    }
    
    // Parse SET
    const setMatch = setStr.match(/([a-zA-Z0-9_]+)\s*=\s*(.+)/);
    if (!setMatch) return { success: false, error: "Erro no SET: Use coluna = valor" };
    const colSet = setMatch[1].trim();
    const valSet = setMatch[2].trim().replace(/^['"]|['"]$/g, "");
    
    if (!tabela.colunas.includes(colSet)) {
      return { success: false, error: `Erro: Coluna '${colSet}' não encontrada.` };
    }
    
    // Parse WHERE
    const whereMatch = whereStr.match(/([a-zA-Z0-9_]+)\s*=\s*(.+)/);
    if (!whereMatch) return { success: false, error: "Erro no WHERE: Use coluna = valor" };
    const colWhere = whereMatch[1].trim();
    const valWhere = whereMatch[2].trim().replace(/^['"]|['"]$/g, "");
    
    let count = 0;
    tabela.linhas.forEach(row => {
      if (String(row[colWhere]) === valWhere) {
        row[colSet] = valSet;
        count++;
      }
    });
    
    return {
      success: true,
      message: `${count} registros atualizados!`,
      colunas: tabela.colunas,
      rows: tabela.linhas.map(row => tabela.colunas.map(col => row[col]))
    };
  }
  
  if (queryLower.startsWith("delete")) {
    // Exemplo: DELETE FROM alunos WHERE RA = 103
    const match = query.match(/delete\s+from\s+([a-zA-Z0-9_]+)\s+where\s+(.+)/i);
    if (!match) {
      return { success: false, error: "Erro de Sintaxe: Use DELETE FROM tabela WHERE coluna = valor" };
    }
    
    const nomeTabela = match[1].toLowerCase();
    const whereStr = match[2].trim();
    
    const tabela = sandboxDB.tabelas[nomeTabela];
    if (!tabela) {
      return { success: false, error: `Erro: Tabela '${nomeTabela}' não existe.` };
    }
    
    const whereMatch = whereStr.match(/([a-zA-Z0-9_]+)\s*=\s*(.+)/);
    if (!whereMatch) return { success: false, error: "Erro no WHERE: Use coluna = valor" };
    const colWhere = whereMatch[1].trim();
    const valWhere = whereMatch[2].trim().replace(/^['"]|['"]$/g, "");
    
    const tamInicial = tabela.linhas.length;
    tabela.linhas = tabela.linhas.filter(row => String(row[colWhere]) !== valWhere);
    const deletados = tamInicial - tabela.linhas.length;
    
    return {
      success: true,
      message: `${deletados} registros removidos!`,
      colunas: tabela.colunas,
      rows: tabela.linhas.map(row => tabela.colunas.map(col => row[col]))
    };
  }
  
  return { success: false, error: "Comando SQL não reconhecido. Suportados: CREATE TABLE, INSERT INTO, SELECT, UPDATE, DELETE." };
}

/**
 * Validação dos desafios conceituais da trilha (Nível 1 ao 5)
 */
function runConceptualValidation(level, userAnswers) {
  let allPass = true;
  let results = [];
  
  if (level === 1) {
    // Nível 1: Dado, Informação ou Conhecimento?
    // userAnswers deve ser um objeto mapeando cada texto para sua classificação: { "38 °C": "dado", ... }
    const gabarito = {
      "38 °C": "dado",
      "A febre do paciente atingiu 38 °C": "informacao",
      "Ministrar antitérmico porque 38 °C indica febre": "conhecimento",
      "R$ 1.500,00": "dado",
      "O aluguel do apartamento custa R$ 1.500,00": "informacao"
    };
    
    Object.keys(gabarito).forEach((key, idx) => {
      const resp = userAnswers[key];
      const pass = resp && resp.toLowerCase() === gabarito[key];
      if (!pass) allPass = false;
      results.push({
        label: `Item ${idx + 1}: "${key.substring(0, 20)}..." classificado como ${gabarito[key]}?`,
        pass
      });
    });
  }
  
  else if (level === 2) {
    // Nível 2: Estruturado ou Não Estruturado?
    const gabarito = {
      "Boletim escolar com notas e faltas": "estruturado",
      "Vídeo MP4 postado na rede social": "nao-estruturado",
      "Mensagem de voz enviada por aplicativo": "nao-estruturado",
      "Planilha de estoque com código de barras e preço": "estruturado",
      "Foto tirada de uma câmera fotográfica": "nao-estruturado"
    };
    
    Object.keys(gabarito).forEach((key, idx) => {
      const resp = userAnswers[key];
      const pass = resp && resp.toLowerCase() === gabarito[key];
      if (!pass) allPass = false;
      results.push({
        label: `Item ${idx + 1}: "${key.substring(0, 20)}..." classificado como ${gabarito[key]}?`,
        pass
      });
    });
  }
  
  else if (level === 3) {
    // Nível 3: Símbolos DER
    const gabarito = {
      "Entidade (ex: Aluno)": "retangulo",
      "Atributo Comum (ex: Nome)": "elipse",
      "Atributo Identificador / Chave (ex: CPF)": "elipse-sublinhada",
      "Relacionamento / Verbo (ex: Estuda)": "losango"
    };
    
    Object.keys(gabarito).forEach((key, idx) => {
      const resp = userAnswers[key];
      const pass = resp && resp.toLowerCase() === gabarito[key];
      if (!pass) allPass = false;
      results.push({
        label: `Símbolo ${idx + 1}: "${key.split(" ")[0]}" mapeado para ${gabarito[key]}?`,
        pass
      });
    });
  }
  
  else if (level === 4) {
    // Nível 4: Mapeamento de Relacionamento (1:N)
    // Resposta esperada: Opção "Na tabela Funcionário" (índice 1 no data.js, ou valor correspondente)
    const pass = userAnswers === "Na tabela Funcionário" || userAnswers === 1;
    if (!pass) allPass = false;
    results.push({
      label: "Chave estrangeira posicionada na tabela correta (lado N)?",
      pass
    });
  }
  
  else if (level === 5) {
    // Nível 5: Primeira Forma Normal
    // Resposta esperada: Opção 1 (índice 1 no data.js: separar os registros em linhas separadas)
    const pass = userAnswers === "Dividir os telefones em linhas separadas: uma linha com o primeiro telefone e outra linha repetindo o cliente Carlos com o segundo telefone." || userAnswers === 1;
    if (!pass) allPass = false;
    results.push({
      label: "Satisfação da Primeira Forma Normal aplicada com sucesso?",
      pass
    });
  }
  
  return { success: allPass, results };
}

/**
 * Realçador de sintaxe SQL Simples
 */
function highlightSQL(code) {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  // Tokenizer para SQL
  const keywords = /\b(select|from|where|insert\s+into|values|update|set|delete\s+from|create\s+table|primary\s+key|foreign\s+key|references|and|or|not|int|varchar|text|null)\b/gi;
  
  html = html.replace(keywords, '<span class="hl-keyword">$1</span>');
  
  // Colorir strings
  html = html.replace(/('[^']*')/g, '<span class="hl-val">$1</span>');
  html = html.replace(/("[^"]*")/g, '<span class="hl-val">$1</span>');
  
  // Colorir números
  html = html.replace(/\b([0-9]+)\b/g, '<span class="hl-number">$1</span>');
  
  return html;
}
