#!/usr/bin/env python3
"""Gera o PDF de uma Prática em Laboratório a partir da aba dela no site.

O site é a fonte: este script recorta a <section> da prática no index.html da disciplina,
adapta para papel (sem botões, saídas abertas, caixas para marcar à mão, terminal claro,
anexo com o script) e imprime em A4 com o Chrome sem janela.

Uso:
  python3 ferramentas/pdf-pratica.py              # Prática 1 de Banco de Dados (padrão)
  python3 ferramentas/pdf-pratica.py --abrir      # gera e abre o PDF

Depois de mudar a aba no index.html, rode de novo e confira o PDF antes de publicar.
"""
import html
import re
import subprocess
import sys
import tempfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PASTA = RAIZ / "Banco-de-Dados"
SECAO = "lab1-tab"
SCRIPT_SQL = PASTA / "jogos.sql"
SAIDA = PASTA / "[101]8-Prática no Laboratório 1 - SQL no terminal.pdf"
SITE = "euclidespaim.github.io/disciplinas-adaptadas/Banco-de-Dados"
CABECALHO = "EEB Elfrida Cristino da Silva · Banco de Dados · Turma 101 · Prof. Euclides Paim"
RODAPE = "Prática no Laboratório 1"

CSS_PAPEL = """
@page {
  size: A4;
  margin: 13mm 13mm 15mm;
  @bottom-left { content: "euclidespaim.github.io/disciplinas-adaptadas"; font: 8pt Inter, sans-serif; color: #64748B; }
  @bottom-right { content: "%RODAPE% · página " counter(page) " de " counter(pages); font: 8pt Inter, sans-serif; color: #64748B; }
}
html, body { background: #FFFFFF; }
body { font-size: 10.5pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.tab-content { animation: none; }
.card { box-shadow: none; padding: 14px 16px; margin-bottom: 10px; break-inside: auto; }
.lab-hero { padding: 16px 18px; }
.lab-hero h2 { font-size: 22pt; }
.pdf-escola { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 8.5pt;
  color: #C7D2FE; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px; margin-bottom: 10px; }
.lab-part-head { break-after: avoid; margin-bottom: 8px; }
.lab-part-head h3 { font-size: 14pt; }
.lab-steps { gap: 9px; }
.lab-step, .lab-note, .lab-question, .lab-quest, .lab-out, .lab-file, .lab-cols { break-inside: avoid; }
.lab-intro, .lab-step-body > p { break-after: avoid; }
.lab-term { background: #F1F5F9; border-left-color: #0891B2; break-inside: avoid; }
.lab-term-bar { background: #E2E8F0; color: #475569; }
.lab-term code, .lab-step-body .lab-term code { color: #0F172A; font-size: 9.5pt; }
.lab-out { background: #FFFFFF; }
.lab-out summary { list-style: none; cursor: default; }
.lab-out summary::-webkit-details-marker { display: none; }
.lab-out pre { font-size: 9pt; }
.lab-quest { padding: 6px 10px; }
.lab-quest input { appearance: none; -webkit-appearance: none; width: 16px; height: 16px;
  border: 2px solid #CBD5E1; border-radius: 4px; background: #FFFFFF; }
.lab-question { padding: 10px 12px; }
.lab-anexo { break-before: page; }
.lab-anexo .lab-term code { font-size: 8.8pt; }
"""


def recortar_secao(pagina: str, ident: str) -> str:
    inicio = pagina.index(f'<section id="{ident}"')
    fim = pagina.index("</section>", inicio) + len("</section>")
    return pagina[inicio:fim]


def para_papel(secao: str) -> str:
    s = secao.replace('class="tab-content"', 'class="tab-content active"', 1)
    # sem interação no papel
    s = s.replace('<button type="button" class="lab-copy">Copiar</button>', "")
    s = re.sub(r'<div class="lab-progress">.*?</button></div>', "", s, flags=re.S)
    s = re.sub(r'<nav class="lab-toc">.*?</nav>', "", s, flags=re.S)
    # arquivo jogos.sql: endereço do site em vez dos botões, e o script vai para o anexo
    s = re.sub(r'<div class="lab-file">.*?</div></div>\s*<details class="lab-out"><summary>Ver o script</summary>.*?</details>',
               f'<div class="lab-file"><div><b>jogos.sql</b><span>Baixe ou copie em <b>{SITE}</b> (aba Prática 1), '
               'ou copie do Anexo no fim deste roteiro.</span></div></div>', s, flags=re.S)
    s = s.replace("clique em <b>Copiar o script</b> aqui embaixo", "copie o script do site (ou do Anexo)")
    # "Deve aparecer" sempre aberto
    s = s.replace('<details class="lab-out">', '<details class="lab-out" open>')
    # cabeçalho da escola com nome e data
    s = s.replace('<div class="card lab-hero">',
                  f'<div class="card lab-hero"><div class="pdf-escola"><span>{CABECALHO}</span>'
                  '<span>Aluno(a): ______________________________ Data: ____/____</span></div>', 1)
    script = html.escape(SCRIPT_SQL.read_text(encoding="utf-8").rstrip("\n"), quote=False)
    anexo = ('<div class="card lab-part lab-anexo"><div class="lab-part-head"><span class="lab-part-num">A</span>'
             '<h3>Anexo: arquivo jogos.sql</h3></div><p class="lab-intro">Copie tudo, da linha DROP TABLE até o último '
             'ponto e vírgula, e salve como jogos.sql na pasta sql.</p><div class="lab-term"><div class="lab-term-bar">'
             f'<span>jogos.sql</span></div><pre><code>{script}</code></pre></div></div>')
    return s.replace("</section>", anexo + "\n</section>")


def main():
    pagina = (PASTA / "index.html").read_text(encoding="utf-8")
    secao = para_papel(recortar_secao(pagina, SECAO))
    css = CSS_PAPEL.replace("%RODAPE%", RODAPE)
    documento = (f'<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>{RODAPE}</title>'
                 f'<link rel="stylesheet" href="{(PASTA / "style.css").as_uri()}"><style>{css}</style></head>'
                 f'<body><main>{secao}</main></body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        fonte = Path(tmp) / "pratica.html"
        fonte.write_text(documento, encoding="utf-8")
        subprocess.run(["google-chrome", "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                        "--virtual-time-budget=8000", f"--print-to-pdf={SAIDA}", fonte.as_uri()],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"PDF gerado: {SAIDA}")
    if "--abrir" in sys.argv:
        subprocess.run(["xdg-open", str(SAIDA)], check=False)


if __name__ == "__main__":
    main()
