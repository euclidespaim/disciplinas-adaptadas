/**
 * Validador e Tokenizer de HTML & CSS
 * Responsável por tokenizar e realçar a sintaxe do código sem corromper tags internas
 * e executar validações DOM em iframe sandboxed oculto.
 */

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightHTMLandCSS(code) {
  let html = escapeHtml(code);

  // Tokenizer Regex: divide comentários, tags HTML, propriedades/atributos CSS, classes, IDs, strings e números
  const tokenizer = /(&lt;!--[\s\S]*?--&gt;|\/\*[\s\S]*?\*\/|&lt;\/?[a-zA-Z0-9_-]+.*?&gt;|[a-zA-Z0-9_-]+\s*(?=:)|&quot;.*?&quot;|&#039;.*?&#039;|\.[a-zA-Z0-9_-]+|#[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+|[^\s\w]+|\s+)/g;
  
  const tokens = html.match(tokenizer) || [];
  
  const output = tokens.map(token => {
    // 1. Comentários HTML ou CSS
    if (token.startsWith('&lt;!--') || token.startsWith('/*')) {
      return `<span class="hl-comment">${token}</span>`;
    }
    // 2. Tags HTML (Usa a técnica de placeholders temporários para evitar recursão de substituições em spans)
    if (token.startsWith('&lt;')) {
      let inner = token;
      inner = inner.replace(/(&lt;\/?[a-zA-Z0-9_-]+)/g, '__TAG_OPEN__$1__TAG_CLOSE__');
      inner = inner.replace(/(\s[a-zA-Z0-9_-]+)(?=\s*=)/g, '__ATTR_OPEN__$1__ATTR_CLOSE__');
      inner = inner.replace(/(=(&quot;.*?&quot;|&#039;.*?&#039;|[a-zA-Z0-9_-]+))/g, '=__VAL_OPEN__$2__VAL_CLOSE__');
      inner = inner.replace(/(&gt;)/g, '__TAG_OPEN__$1__TAG_CLOSE__');
      
      // Substituição final dos placeholders por marcações span
      inner = inner
        .replace(/__TAG_OPEN__/g, '<span class="hl-tag">')
        .replace(/__TAG_CLOSE__/g, '</span>')
        .replace(/__ATTR_OPEN__/g, '<span class="hl-attr">')
        .replace(/__ATTR_CLOSE__/g, '</span>')
        .replace(/__VAL_OPEN__/g, '<span class="hl-val">')
        .replace(/__VAL_CLOSE__/g, '</span>');
      return inner;
    }
    // 3. Seletores CSS (Classe ou ID)
    if (token.startsWith('.') || token.startsWith('#')) {
      return `<span class="hl-selector">${token}</span>`;
    }
    // 4. Propriedades CSS (palavra seguida de dois pontos)
    if (token.endsWith(':') && token.length > 1) {
      return `<span class="hl-attr">${token.slice(0, -1)}</span>:`;
    }
    
    return token;
  });

  return output.join('');
}

/**
 * Executa as validações DOM injetando o código em um iframe sandboxed oculto.
 */
function runHTMLCSSValidation(code, testCases) {
  const iframe = document.createElement('iframe');
  // Um iframe com display:none nao gera layout, e as medidas de estilo
  // (padding, borda, largura) podem sair erradas mesmo com o codigo correto.
  // Por isso ele fica fora da tela, mas com dimensoes reais.
  iframe.style.cssText =
    'position:absolute; left:-10000px; top:0; width:800px; height:600px; border:0; visibility:hidden;';
  iframe.setAttribute('sandbox', 'allow-same-origin');
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();

  // Obriga o navegador a aplicar o CSS e calcular o layout antes de medir.
  const forcarLayout = () => {
    try {
      void doc.documentElement.offsetHeight;
      void doc.body.offsetHeight;
    } catch (e) { /* documento sem body: nada a fazer */ }
  };
  forcarLayout();

  const executar = () => {
    const saida = [];
    let tudoOk = true;
    testCases.forEach(test => {
      try {
        const pass = test.validate(doc);
        if (!pass) tudoOk = false;
        saida.push({ label: test.label, pass });
      } catch (e) {
        tudoOk = false;
        saida.push({ label: test.label, pass: false, error: e.message });
      }
    });
    return { success: tudoOk, results: saida };
  };

  let resultado = executar();

  // Rede de seguranca: se algo reprovou, refaz a medicao uma vez apos novo
  // layout. Assim uma falha momentanea do navegador nunca reprova o aluno
  // que escreveu o codigo certo.
  if (!resultado.success) {
    forcarLayout();
    const segunda = executar();
    if (segunda.success) {
      resultado = segunda;
    } else {
      // Mantem o melhor resultado de cada criterio entre as duas medicoes.
      resultado = {
        success: false,
        results: resultado.results.map((r, i) => {
          const outro = segunda.results[i];
          return (outro && outro.pass) ? outro : r;
        })
      };
      resultado.success = resultado.results.every(r => r.pass);
    }
  }

  document.body.removeChild(iframe);
  return resultado;
}

/**
 * Executa as validações de JavaScript Puro em ambiente controlado.
 */
function runJSValidation(code, testCases) {
  let returnValue;
  let scope = {};
  let error = null;
  let success = true;
  const results = [];

  try {
    // 1. Executa para pegar o valor de retorno da última linha
    returnValue = eval(code);

    // 2. Executa para pegar o escopo das variáveis de interesse
    const variablesToInspect = ['nome', 'ano', 'resto', 'pontos', 'temCurso', 'temTempo'];
    let inspectStr = "\n; ({ ";
    variablesToInspect.forEach(v => {
      inspectStr += `"${v}": (typeof ${v} !== 'undefined' ? ${v} : undefined), `;
    });
    inspectStr += "})";

    scope = eval(code + inspectStr);
  } catch (e) {
    success = false;
    error = e.message;
  }

  testCases.forEach(test => {
    try {
      if (error) {
        results.push({ label: test.label, pass: false, error });
        success = false;
      } else {
        const pass = test.validate(scope, returnValue, code);
        results.push({ label: test.label, pass });
        if (!pass) success = false;
      }
    } catch (e) {
      results.push({ label: test.label, pass: false, error: e.message });
      success = false;
    }
  });

  return { success, results };
}

/**
 * Realça sintaxe do JavaScript Puro
 */
function highlightJS(code) {
  let html = escapeHtml(code);
  
  // Tokenizer para JS: comentários, strings, palavras-chave, operadores, números
  const tokenizer = /(\/\/.*|\/\*[\s\S]*?\*\/|&quot;.*?&quot;|&#039;.*?&#039;|[0-9]+(?:\.[0-9]+)?|\b(?:let|const|var|if|else|true|false|null|undefined|return)\b|[a-zA-Z_$][a-zA-Z0-9_$]*|[^\s\w]+|\s+)/g;
  
  const tokens = html.match(tokenizer) || [];
  
  const output = tokens.map(token => {
    if (token.startsWith('//') || token.startsWith('/*')) {
      return `<span class="hl-comment">${token}</span>`;
    }
    if (token.startsWith('&quot;') || token.startsWith('&#039;')) {
      return `<span class="hl-val">${token}</span>`;
    }
    if (['let', 'const', 'var', 'if', 'else', 'true', 'false', 'null', 'undefined', 'return'].includes(token)) {
      return `<span class="hl-keyword">${token}</span>`;
    }
    if (/^[0-9]+(?:\.[0-9]+)?$/.test(token)) {
      return `<span class="hl-number">${token}</span>`;
    }
    if (['+', '-', '*', '/', '%', '=', '==', '===', '!=', '!==', '>', '<', '>=', '<=', '&&', '||', '!'].includes(token)) {
      return `<span class="hl-operator">${token}</span>`;
    }
    return token;
  });
  
  return output.join('');
}
