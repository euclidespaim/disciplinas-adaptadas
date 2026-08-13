// DADOS DAS ODS DA ONU
const odsList = [
  {
    id: 1,
    title: "Erradicação da Pobreza",
    color: "#E5243B",
    desc: "Acabar com a pobreza em todas as suas formas, em todos os lugares, garantindo acesso a recursos básicos para as populações mais vulneráveis.",
    ideas: [
      "Campanhas de capacitação profissional e elaboração de currículos para jovens e adultos em situação de desemprego na comunidade.",
      "Criar um guia digital ou físico contendo informações sobre serviços sociais, abrigos, postos de saúde e apoio jurídico gratuito do município.",
      "Desenvolver um banco de doação permanente de agasalhos e materiais escolares na escola ou bairro."
    ]
  },
  {
    id: 2,
    title: "Fome Zero e Agricultura Sustentável",
    color: "#DDA63A",
    desc: "Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição, e promover a agricultura sustentável.",
    ideas: [
      "Planejar e implantar uma horta comunitária suspensa em áreas ociosas da escola ou de um centro comunitário local.",
      "Propor uma campanha de combate ao desperdício de alimentos no refeitório da escola, com pesagem diária das sobras e conscientização.",
      "Desenvolver cartilhas digitais com receitas de aproveitamento integral dos alimentos (cascas, talos e sementes)."
    ]
  },
  {
    id: 3,
    title: "Saúde e Bem-Estar",
    color: "#4C9F38",
    desc: "Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades.",
    ideas: [
      "Criar um aplicativo simulado ou site que mapeie as academias ao ar livre, quadras e parques locais, indicando horários de atividades gratuitas.",
      "Desenvolver uma campanha de conscientização sobre saúde mental e controle de ansiedade para os estudantes em época de exames.",
      "Montar um guia de plantas medicinais e chás comuns, detalhando suas indicações científicas e cuidados no uso."
    ]
  },
  {
    id: 4,
    title: "Educação de Qualidade",
    color: "#C5192D",
    desc: "Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.",
    ideas: [
      "Organizar um cronograma de monitoria escolar onde alunos do 3º ano auxiliam alunos mais jovens com dificuldades em matemática e leitura.",
      "Criar uma geladeira-biblioteca (geladeiroteca) instalada em praça pública ou pátio escolar para troca livre de livros usados.",
      "Desenvolver videoaulas ou podcasts educativos sobre temas cotidianos e disponibilizar em um canal comunitário."
    ]
  },
  {
    id: 5,
    title: "Igualdade de Gênero",
    color: "#FF3A21",
    desc: "Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.",
    ideas: [
      "Criar rodas de conversa e debates periódicos sobre a representatividade feminina nas áreas de ciências, tecnologia e engenharia (STEM).",
      "Elaborar cartazes e posts para redes sociais informando canais de denúncia de violência doméstica e redes de apoio locais.",
      "Propor um clube do livro escolar com foco exclusivo em obras escritas por autoras mulheres importantes da história."
    ]
  },
  {
    id: 6,
    title: "Água Potável e Saneamento",
    color: "#26BDE2",
    desc: "Garantir disponibilidade e manejo sustentável da água e saneamento para todos.",
    ideas: [
      "Desenvolver um protótipo de cisterna de baixo custo para captação de água da chuva para regar jardins e limpeza da escola.",
      "Criar filtros caseiros simplificados usando areia, carvão ativado e pedras para demonstrar processos de purificação didáticos.",
      "Criar um infográfico ou site de dicas para detecção rápida de vazamentos invisíveis em residências da comunidade."
    ]
  },
  {
    id: 7,
    title: "Energia Limpa e Acessível",
    color: "#FCC30B",
    desc: "Garantir acesso a fontes de energia modernas, confiáveis, sustentáveis e a preços acessíveis para todos.",
    ideas: [
      "Projetar maquetes ou modelos funcionais de pequenos geradores de energia solar ou eólica usando motores reciclados de eletrônicos.",
      "Campanha escolar sobre eficiência energética: dicas visuais para reduzir a conta de luz e o consumo de eletrodomésticos.",
      "Investigar o uso de iluminação natural na escola e sugerir mudanças na disposição de salas ou janelas para economizar lâmpadas."
    ]
  },
  {
    id: 8,
    title: "Trabalho Decente e Crescimento Econômico",
    color: "#A21942",
    desc: "Promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo, e trabalho decente para todos.",
    ideas: [
      "Criar um site-vitrine para divulgar os serviços dos microempreendedores e autônomos locais (pedreiros, costureiras, doceiros do bairro).",
      "Organizar um workshop simulado ou guia prático de introdução às finanças pessoais e economia doméstica para jovens.",
      "Desenvolver um painel físico ou digital de vagas de estágio, jovem aprendiz e cursos técnicos gratuitos da região."
    ]
  },
  {
    id: 9,
    title: "Indústria, Inovação e Infraestrutura",
    color: "#FD6925",
    desc: "Construir infraestrutura resiliente, promover a industrialização inclusiva e sustentável, e fomentar a inovação.",
    ideas: [
      "Mapear pontos críticos de acessibilidade (falta de rampas, calçadas quebradas) no entorno escolar e propor melhorias formais à prefeitura.",
      "Criar um aplicativo simulado de caronas solidárias para estudantes ou trabalhadores locais, visando otimizar a infraestrutura viária.",
      "Propor o uso de materiais de construção ecológicos (tijolo ecológico, concreto reciclado) para melhorias no pátio escolar."
    ]
  },
  {
    id: 10,
    title: "Redução das Desigualdades",
    color: "#DD1367",
    desc: "Reduzir a desigualdade dentro dos países e entre eles, promovendo a inclusão social de todas as pessoas.",
    ideas: [
      "Desenvolver materiais táteis, audiodescrições ou tradução básica de termos escolares em Libras para promover a inclusão de alunos PCD.",
      "Elaborar uma cartilha bilíngue (Português/Espanhol ou Inglês) de acolhimento para estudantes imigrantes recém-chegados na escola.",
      "Promover eventos culturais integrativos celebrando a diversidade étnico-racial, cultural e culinária do bairro."
    ]
  },
  {
    id: 11,
    title: "Cidades e Comunidades Sustentáveis",
    color: "#FD9D24",
    desc: "Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.",
    ideas: [
      "Mapear e sugerir áreas subutilizadas no bairro para transformação em pequenas praças urbanas ('pocket parks') ou jardins verticais.",
      "Desenvolver um plano de rotas seguras para ciclistas e pedestres irem de casa para a escola no bairro.",
      "Organizar mutirões comunitários para revitalização e pintura artística de muros vandalizados ou praças degradadas da vizinhança."
    ]
  },
  {
    id: 12,
    title: "Consumo e Produção Responsáveis",
    color: "#C99439",
    desc: "Assegurar padrões de produção e de consumo sustentáveis, reduzindo a pegada ecológica e o desperdício.",
    ideas: [
      "Organizar uma feira periódica de trocas ('swap meet') de brinquedos, livros, uniformes e roupas na escola.",
      "Desenvolver um coletor didático de pilhas, baterias e lixo eletrônico na escola, com divulgação sobre o descarte correto.",
      "Criar um workshop demonstrativo de compostagem doméstica com resíduos orgânicos gerados no próprio domicílio."
    ]
  },
  {
    id: 13,
    title: "Ação Contra a Mudança Global do Clima",
    color: "#3F7E44",
    desc: "Adotar medidas urgentes para combater a mudança climática e seus impactos na biosfera.",
    ideas: [
      "Realizar um cálculo da pegada de carbono média dos estudantes da escola e criar um guia com ações individuais para reduzi-la.",
      "Propor um plano de arborização para o pátio da escola ou calçadas da rua da escola para melhorar o microclima local.",
      "Desenvolver cartilhas informativas ilustradas sobre as consequências das queimadas urbanas e do acúmulo de lixo."
    ]
  },
  {
    id: 14,
    title: "Vida na Água",
    color: "#0A97D9",
    desc: "Conservação e uso sustentável dos oceanos, dos mares e dos recursos marinhos para o desenvolvimento sustentável.",
    ideas: [
      "Organizar mutirões de limpeza das margens de córregos, riachos ou praias locais, registrando o volume de plásticos recolhido.",
      "Elaborar cartazes educativos sobre o impacto do descarte de óleo de cozinha usado na pia e criar um ponto de coleta escolar.",
      "Estudar os pequenos ecossistemas aquáticos locais (como lagos de praças) e propor melhorias para a circulação de água."
    ]
  },
  {
    id: 15,
    title: "Vida Terrestre",
    color: "#56C02B",
    desc: "Proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres, gerir de forma sustentável as florestas e combater a desertificação.",
    ideas: [
      "Criar comedouros ecológicos e bebedouros seguros para aves urbanas e insetos polinizadores nos jardins da escola.",
      "Elaborar um guia fotográfico das espécies de plantas nativas e árvores que compõem o bairro ou a escola.",
      "Montar ações informativas para banir o uso de sacolas plásticas descartáveis substituindo-as por ecobags fabricadas com tecidos reciclados."
    ]
  },
  {
    id: 16,
    title: "Paz, Justiça e Instituições Eficazes",
    color: "#00689D",
    desc: "Promover sociedades pacíficas e inclusivas, proporcionar o acesso à justiça para todos e construir instituições eficazes, responsáveis e inclusivas.",
    ideas: [
      "Criar um projeto piloto de 'Mediação Escolar de Conflitos', treinando alunos para resolverem pequenos desentendimentos de forma pacífica.",
      "Organizar simulações de assembleias comunitárias na escola para ensinar aos estudantes como propor projetos de lei municipais.",
      "Desenvolver cartazes explicativos sobre os Direitos Humanos e o Estatuto da Criança e do Adolescente em linguagem infanto-juvenil."
    ]
  },
  {
    id: 17,
    title: "Parcerias e Meios de Implementação",
    color: "#19486A",
    desc: "Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável.",
    ideas: [
      "Criar um catálogo de ONGs, cooperativas de reciclagem e projetos sociais do município dispostos a fechar parcerias com a escola.",
      "Organizar um bazar beneficente em colaboração com artesãos locais para arrecadar recursos para causas comunitárias.",
      "Fomentar a criação de redes de comunicação online entre escolas vizinhas para compartilhamento de ideias de projetos integradores bem-sucedidos."
    ]
  }
];

// DADOS DETALHADOS DA METODOLOGIA DESIGN THINKING
const timelineDetails = {
  1: {
    title: "🔍 Etapa 1: Empatia (Imersão)",
    description: "O ponto de partida do projeto é enxergar o mundo pelos olhos do outro. Não inventamos soluções do nada; primeiro, entendemos a dor de quem vive o problema.",
    checklist: [
      "Definir o público-alvo (moradores do bairro, idosos, estudantes mais jovens, comerciantes, etc.).",
      "Desenvolver um roteiro com 4 a 5 perguntas abertas para entrevistas.",
      "Ir a campo e conversar com pelo menos 3 a 5 pessoas do público afetado.",
      "Registrar o ambiente com anotações de diário de campo e fotos (respeitando a privacidade).",
      "Montar o 'Mapa de Empatia' contendo o que a pessoa: Ouve, Fala/Faz, Pensa/Sente, Vê, e suas Dores e Necessidades."
    ],
    tips: "Tente não induzir as respostas. Ouça mais do que fale. Faça a pergunta 'Por quê?' várias vezes para alcançar a raiz das questões."
  },
  2: {
    title: "🎯 Etapa 2: Definição (Foco)",
    description: "Após coletar muitas informações, o grupo deve filtrar e focar em um problema bem definido. Quem quer abraçar o mundo não resolve nada.",
    checklist: [
      "Fazer o agrupamento das informações colhidas na etapa de empatia (afinidades).",
      "Escolher o problema prioritário que a equipe quer e consegue atacar.",
      "Escrever o problema usando a estrutura: 'Como poderíamos ajudar [Público] a [Desafio]?'",
      "Escolher uma ou mais das 17 ODS da ONU relacionadas diretamente a esse desafio.",
      "Apresentar o escopo do problema escolhido para validação com o professor."
    ],
    tips: "Evite incluir a solução já na definição do problema. Em vez de 'Como fazer um app de horta?', use 'Como poderíamos facilitar o acesso a alimentos frescos para os moradores do bloco B?'"
  },
  3: {
    title: "💡 Etapa 3: Ideação (Criação)",
    description: "É a hora do 'toró de ideias' (brainstorming). Estimule a criatividade sem julgamentos. Soluções baratas, sustentáveis e inteligentes nascem da diversidade de visões.",
    checklist: [
      "Fazer uma rodada rápida de ideias livres onde todas as ideias são aceitas e registradas.",
      "Combater críticas imediatas: nenhuma ideia é boba nesta fase.",
      "Agrupar as ideias em categorias (mais inovadoras, mais fáceis, mais baratas).",
      "Votar em grupo para selecionar a melhor proposta para seguir para a prototipagem.",
      "Desenhar um primeiro esboço ('esboço em guardanapo') de como a solução funcionaria na prática."
    ],
    tips: "Construa sobre a ideia dos colegas usando a expressão 'Sim, e além disso...' em vez de cortar com 'Não, mas...'."
  },
  4: {
    title: "🔨 Etapa 4: Prototipação",
    description: "Colocar a mão na massa. O objetivo do protótipo não é estar perfeito, mas sim materializar a ideia de forma que as pessoas consigam entender e interagir.",
    checklist: [
      "Escolher o formato do protótipo (maquete de papelão, fluxograma de telas, roteiro de serviço teatralizado, mock-up digital no Canva ou Figma, página HTML estática).",
      "Montar a lista de materiais necessários (preferir recicláveis ou softwares livres).",
      "Construir a primeira versão de testes (versão MVP - Mínimo Produto Viável).",
      "Simular o percurso do usuário ao interagir com o protótipo."
    ],
    tips: "Faça rápido e gaste pouco. Errar cedo e barato é o segredo para construir soluções campeãs."
  },
  5: {
    title: "🧪 Etapa 5: Validação (Testes)",
    description: "Levar o protótipo de volta para os usuários da etapa de Empatia. Eles testarão o protótipo e darão o feedback sincero se a solução resolve a dor deles.",
    checklist: [
      "Mostrar o protótipo funcionando para pessoas que se encaixam no público-alvo.",
      "Criar uma grade de feedback dividida em: O que funcionou bem? Críticas construtivas? Dúvidas? Novas ideias sugeridas?",
      "Tabular os feedbacks recebidos pela equipe.",
      "Ajustar o protótipo refinando o projeto original com base no que foi aprendido."
    ],
    tips: "Não defenda o seu projeto se o usuário disser que não gostou. Ouça as falhas apontadas, pois são elas que farão seu projeto dar certo no final."
  },
  6: {
    title: "📢 Etapa 6: Entrega (Pitch)",
    description: "É hora de vender a ideia. O Pitch é uma apresentação rápida e impactante que mostra o problema, a ODS focada, o protótipo construído e a validação.",
    checklist: [
      "Preparar a estrutura do Pitch: Gancho/Apresentação (30s) -> Problema & ODS (1min) -> Protótipo & Solução (1min30s) -> Validação e Próximos passos (1min) -> Conclusão (30s).",
      "Criar um slide de apoio visual limpo, com poucas palavras e muitas imagens do protótipo.",
      "Ensaiar a fala com cronômetro para respeitar rigorosamente o tempo determinado (geralmente 3 a 5 minutos).",
      "Subir a apresentação e os materiais finais na pasta compartilhada da Turma no Drive."
    ],
    tips: "Fale com entusiasmo. Demonstre com clareza o impacto real que a solução trouxe ou trará para a vida dos moradores."
  }
};

// ESTADO GLOBAL DO APLICATIVO
let currentGroups = [];
let selectedOdsIdForProposal = null;

// PROJETOS REAIS DA TURMA 301 EXTRAÍDOS DO DRIVE
const galleryProjects = [
  {
    title: "SmartReps",
    members: "Rebeca, Eduarda, Amanda",
    problem: "Esquecimento de ingestão de remédios por idosos ou pacientes crônicos da comunidade, além da dificuldade de familiares monitorarem a dosagem correta à distância.",
    solution: "Um porta-comprimidos automatizado e inteligente que avisa o horário correto de cada medicação por meio de alertas sonoros/luminosos e notifica os cuidadores.",
    odsId: 3
  },
  {
    title: "SafeFlood - Sistema de Alerta de Enchentes",
    members: "Nicolas, Vinicius, Thiago",
    problem: "Inundações repentinas em áreas ribeirinhas vulneráveis de Itajaí que pegam os moradores de surpresa e causam graves perdas materiais e riscos de vida.",
    solution: "Sensores de nível de água instalados próximos ao rio que transmitem dados em tempo real para um microcontrolador, acionando alarmes sonoros e enviando mensagens de alerta para os celulares dos moradores.",
    odsId: 11
  },
  {
    title: "Aquecedor de Água Solar por Convecção",
    members: "Yasmin, Sofia",
    problem: "Falta de água quente e custos elevados de energia elétrica para famílias de baixa renda na comunidade, gerando desconforto e gastos excessivos.",
    solution: "Construção de um aquecedor solar alternativo utilizando garrafas PET, embalagens de caixas de leite (Tetra Pak) e canos de PVC, aproveitando a radiação solar para aquecer a água por convecção.",
    odsId: 7
  },
  {
    title: "Gipsy - Guia de Turismo Comunitário",
    members: "Matheus, Gabriel",
    problem: "Dificuldade de turistas em descobrirem atrativos culturais, gastronômicos e históricos gerados por microempreendedores locais na comunidade.",
    solution: "Plataforma web/aplicativo interativo mapeando negócios locais, pontos de interesse comunitários e rotas históricas alternativas para fomentar a economia do bairro.",
    odsId: 8
  },
  {
    title: "Trash Collector of Ocean (TCO)",
    members: "Lucas, Pedro, Guilherme",
    problem: "Poluição plástica crônica nos canais de drenagem e praias locais que prejudica a vida marinha e entope tubulações urbanas.",
    solution: "Uma barreira ecológica flutuante acoplada a um sistema de coleta semiautomático que retém os resíduos superficiais trazidos pelas correntes antes de irem para o oceano.",
    odsId: 14
  },
  {
    title: "Horta Escolar Automatizada",
    members: "Arthur, Davi",
    problem: "Dificuldade de manutenção diária e rega de hortas escolares nos fins de semana e férias, gerando perda constante de plantas e vegetais cultivados.",
    solution: "Sistema automático de irrigação utilizando sensores de umidade do solo ligados a um Arduino que aciona uma mini bomba d'água apenas quando necessário.",
    odsId: 2
  },
  {
    title: "EcoCompost",
    members: "Luana, Beatriz",
    problem: "Grande descarte inadequado de resíduos orgânicos residenciais e escolares que acabam em aterros sanitários saturados, produzindo gases de efeito estufa.",
    solution: "Implementação de um sistema prático de compostagem escolar e residencial de baixo custo, junto com cartilhas de educação ambiental sobre a destinação correta de matéria orgânica.",
    odsId: 12
  },
  {
    title: "Lixeira Inteligente Separadora",
    members: "João Marcos, Maria Gabrieli, Victor Gabriel",
    problem: "Dificuldade de triagem de lixo reciclável na escola, com mistura inadequada de materiais orgânicos e secos nos coletores comuns.",
    solution: "Lixeira inteligente equipada com sensores que detectam e separam automaticamente os resíduos secos/reciclados dos orgânicos, incentivando a separação correta.",
    odsId: 12
  },
  {
    title: "DeskEyes",
    members: "Anelise Isabeli, Samuel Fabiano",
    problem: "Alunos com severas deficiências motoras enfrentam exclusão no uso de computadores e ferramentas de estudo na rotina escolar cotidiana.",
    solution: "Software de rastreamento ocular de baixo custo que utiliza a webcam comum para capturar o movimento dos olhos e convertê-lo no cursor do mouse, dando autonomia digital para alunos com limitações físicas.",
    odsId: 4
  }
];

// ELEMENTOS DOM IMPORTANTES
document.addEventListener("DOMContentLoaded", () => {
  initApp();
  renderOdsGrid();
  renderGroups();
  renderGallery();
  populateOdsSelects();
  setupProposalListeners();
  setupAccordions();

  // Exibir detalhamento da etapa 1 da metodologia por padrão
  showTimelineDetail(1);
});

// EXPANDIR/RECOLHER GRUPOS DO MENU LATERAL
function setupAccordions() {
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("open");
    });
  });
}

// INICIALIZADOR DO APP (LOAD LOCALSTORAGE)
function initApp() {
  // Carrega Equipes
  const savedGroups = localStorage.getItem("pi_301_groups");
  if (savedGroups) {
    try {
      currentGroups = JSON.parse(savedGroups);
    } catch (e) {
      currentGroups = [];
    }
  } else {
    // Carrega Equipes baseadas nos projetos reais da turma como padrão
    currentGroups = galleryProjects.map((proj, idx) => ({
      name: `Equipe ${idx + 1}`,
      members: proj.members,
      projectTitle: proj.title,
      odsId: proj.odsId,
      stage: 3
    }));
    localStorage.setItem("pi_301_groups", JSON.stringify(currentGroups));
  }
}

// ALTERNA ABAS
function switchTab(tabId) {
  // Fecha a barra lateral em telas pequenas se estiver aberta
  const sidebar = document.getElementById("main-sidebar");
  sidebar.classList.remove("active");

  // Esconde todas as abas e desativa botões de navegação
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.classList.remove("active");
  });

  // Mostra a aba ativa
  const activeTab = document.getElementById(`${tabId}-tab`);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Ativa o botão correspondente na barra lateral
  const activeBtn = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  // Rola para o topo do workspace
  document.querySelector(".main-workspace").scrollTop = 0;
}

// TOGGLE SIDEBAR MOBILE
function toggleSidebar() {
  const sidebar = document.getElementById("main-sidebar");
  sidebar.classList.toggle("active");
}

// EXIBE DETALHES DA METODOLOGIA DESIGN THINKING
function showTimelineDetail(step) {
  const detailPanel = document.getElementById("timeline-detail-panel");
  const data = timelineDetails[step];
  if (!data) return;

  // Atualiza bordas dos itens da linha do tempo
  document.querySelectorAll(".timeline-item").forEach((item, idx) => {
    if (idx + 1 === step) {
      item.style.borderColor = "var(--primary-indigo)";
      item.style.backgroundColor = "var(--accent-mint)";
    } else {
      item.style.borderColor = "var(--border-color)";
      item.style.backgroundColor = "white";
    }
  });

  let checklistHtml = data.checklist.map(item => `<li>${item}</li>`).join("");

  detailPanel.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.description}</p>
    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
      <h4 style="color: var(--primary-indigo); font-family: var(--font-title); font-size: 0.95rem; margin-bottom: 0.5rem;">📋 Checklist de Entregáveis da Etapa:</h4>
      <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem;">
        ${checklistHtml}
      </ul>
    </div>
    <div style="margin-top: 1.25rem; background-color: #FFFBEB; border-left: 4px solid #F59E0B; padding: 0.8rem; border-radius: 4px; font-size: 0.85rem; color: #B45309;">
      <strong>💡 Dica de Ouro:</strong> ${data.tips}
    </div>
  `;
}

// RENDERIZA GRID DAS ODS
function renderOdsGrid() {
  const container = document.getElementById("ods-grid-container");
  if (!container) return;

  container.innerHTML = "";

  odsList.forEach(ods => {
    const card = document.createElement("div");
    card.className = "ods-card";
    card.style.backgroundColor = ods.color;
    card.onclick = () => openOdsModal(ods.id);

    card.innerHTML = `
      <div class="ods-num">${String(ods.id).padStart(2, "0")}</div>
      <div class="ods-title">${ods.title}</div>
    `;
    container.appendChild(card);
  });
}

// MODAL ODS DETALHES
function openOdsModal(id) {
  const ods = odsList.find(o => o.id === id);
  if (!ods) return;

  selectedOdsIdForProposal = id;

  document.getElementById("ods-modal-num").innerText = String(ods.id).padStart(2, "0");
  document.getElementById("ods-modal-title").innerText = ods.title;
  document.getElementById("ods-modal-desc").innerText = ods.desc;
  document.getElementById("ods-modal-header").style.backgroundColor = ods.color;

  const listContainer = document.getElementById("ods-modal-ideas");
  listContainer.innerHTML = ods.ideas.map(idea => `<li>${idea}</li>`).join("");

  document.getElementById("ods-modal").style.display = "flex";
}

function closeOdsModal() {
  document.getElementById("ods-modal").style.display = "none";
}

// ASSOCIA ODS DO MODAL COM FORMULARIO DE PROPOSTA
function useOdsInProposal() {
  if (selectedOdsIdForProposal !== null) {
    const select = document.getElementById("prop-ods");
    if (select) {
      select.value = selectedOdsIdForProposal;
    }
    closeOdsModal();
    switchTab("proposta");
    updateProposalPreview();
  }
}

// RENDERIZA EQUIPES NA TURMA 301
function renderGroups() {
  const container = document.getElementById("groups-list-container");
  if (!container) return;

  if (currentGroups.length === 0) {
    container.innerHTML = `<div class="no-groups">Nenhuma equipe cadastrada ainda. Clique em "+ Nova Equipe" acima para criar.</div>`;
    return;
  }

  container.innerHTML = "";

  currentGroups.forEach((group, index) => {
    const ods = odsList.find(o => o.id === group.odsId);
    const odsName = ods ? `ODS ${ods.id} - ${ods.title}` : "Não relacionada";
    const stageNames = {
      1: "1. Empatia (Imersão)",
      2: "2. Definição (Foco)",
      3: "3. Ideação (Criação)",
      4: "4. Prototipação (MVP)",
      5: "5. Validação (Testes)",
      6: "6. Entrega (Pitch)"
    };

    const card = document.createElement("div");
    card.className = "group-card";

    card.innerHTML = `
      <div class="group-card-header">
        <div class="group-title-row">
          <span class="group-badge-num">${index + 1}</span>
          <span class="group-name-title">${group.name}</span>
        </div>
        <div class="group-actions">
          <button class="action-icon-btn" onclick="openEditGroupModal(${index})" title="Editar Equipe">✏️</button>
          <button class="action-icon-btn" onclick="deleteGroup(${index})" title="Excluir Equipe" style="color: #EF4444;">🗑️</button>
        </div>
      </div>
      <div class="group-meta">
        <strong>Membros:</strong> ${group.members}
      </div>
      <div class="group-project">
        <strong>Projeto:</strong> ${group.projectTitle}
      </div>
      <div class="group-meta" style="color: #6B7280;">
        <strong>Foco:</strong> ${odsName}
      </div>
      <div class="group-progress-row">
        <span>Fase Atual:</span>
        <span class="stage-badge">${stageNames[group.stage] || "Não iniciada"}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// POPULAR SELECTS DE ODS NOS FORMULÁRIOS
function populateOdsSelects() {
  const groupOdsSelect = document.getElementById("group-ods");
  const propOdsSelect = document.getElementById("prop-ods");

  if (groupOdsSelect) {
    odsList.forEach(ods => {
      const opt = document.createElement("option");
      opt.value = ods.id;
      opt.text = `ODS ${ods.id}: ${ods.title}`;
      groupOdsSelect.appendChild(opt);
    });
  }

  if (propOdsSelect) {
    odsList.forEach(ods => {
      const opt = document.createElement("option");
      opt.value = ods.id;
      opt.text = `ODS ${ods.id}: ${ods.title}`;
      propOdsSelect.appendChild(opt);
    });
  }
}

// MODAL CONTROLE DE GRUPOS
function openAddGroupModal() {
  document.getElementById("group-modal-title").innerText = "Nova Equipe";
  document.getElementById("edit-group-index").value = "";
  document.getElementById("group-name").value = "";
  document.getElementById("group-members").value = "";
  document.getElementById("group-project-title").value = "";
  document.getElementById("group-ods").value = "";
  document.getElementById("group-stage").value = "1";

  document.getElementById("group-modal").style.display = "flex";
}

function openEditGroupModal(index) {
  const group = currentGroups[index];
  if (!group) return;

  document.getElementById("group-modal-title").innerText = "Editar Equipe";
  document.getElementById("edit-group-index").value = index;
  document.getElementById("group-name").value = group.name;
  document.getElementById("group-members").value = group.members;
  document.getElementById("group-project-title").value = group.projectTitle;
  document.getElementById("group-ods").value = group.odsId;
  document.getElementById("group-stage").value = group.stage;

  document.getElementById("group-modal").style.display = "flex";
}

function closeGroupModal() {
  document.getElementById("group-modal").style.display = "none";
}

function saveGroup() {
  const indexStr = document.getElementById("edit-group-index").value;
  const name = document.getElementById("group-name").value.trim();
  const members = document.getElementById("group-members").value.trim();
  const projectTitle = document.getElementById("group-project-title").value.trim();
  const odsId = parseInt(document.getElementById("group-ods").value);
  const stage = parseInt(document.getElementById("group-stage").value);

  if (!name || !members || !projectTitle || !odsId || isNaN(odsId)) {
    alert("Por favor, preencha todos os campos obrigatórios marcados com (*)!");
    return;
  }

  const groupData = {
    name,
    members,
    projectTitle,
    odsId,
    stage
  };

  if (indexStr === "") {
    // Adicionar Novo
    currentGroups.push(groupData);
  } else {
    // Editar Existente
    const index = parseInt(indexStr);
    currentGroups[index] = groupData;
  }

  localStorage.setItem("pi_301_groups", JSON.stringify(currentGroups));
  renderGroups();
  closeGroupModal();
}

function deleteGroup(index) {
  if (confirm(`Deseja realmente excluir a equipe "${currentGroups[index].name}"?`)) {
    currentGroups.splice(index, 1);
    localStorage.setItem("pi_301_groups", JSON.stringify(currentGroups));
    renderGroups();
  }
}

// LOGICA GERADOR DE PROPOSTAS
function setupProposalListeners() {
  const inputs = ["prop-team-name", "prop-members", "prop-title", "prop-ods", "prop-problem", "prop-solution", "prop-resources"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateProposalPreview);
    }
  });
  updateProposalPreview();
}

function generateProposalText() {
  const teamName = document.getElementById("prop-team-name").value.trim() || "[Nome da Equipe]";
  const members = document.getElementById("prop-members").value.trim() || "[Membros]";
  const title = document.getElementById("prop-title").value.trim() || "[Título do Projeto]";
  const odsId = parseInt(document.getElementById("prop-ods").value);
  const problem = document.getElementById("prop-problem").value.trim() || "[Descreva aqui a necessidade da comunidade]";
  const solution = document.getElementById("prop-solution").value.trim() || "[Descreva aqui qual a solução proposta]";
  const resources = document.getElementById("prop-resources").value.trim() || "[Materiais e infraestrutura]";

  const ods = odsList.find(o => o.id === odsId);
  const odsText = ods ? `ODS ${ods.id} - ${ods.title}` : "[Selecione uma ODS correlacionada]";

  const timestamp = new Date().toLocaleString("pt-BR");

  return `==================================================
        PROPOSTA DE PROJETO INTEGRADOR (PI)
==================================================
Data de Geração: ${timestamp}
Classe: Turma 301
Instituição: Ensino Médio/Técnico Adaptado

--------------------------------------------------
1. DADOS DA EQUIPE
--------------------------------------------------
Equipe: ${teamName}
Membros: ${members}

--------------------------------------------------
2. DADOS DO PROJETO
--------------------------------------------------
Título do Projeto: ${title}
Objetivo ONU Focado: ${odsText}

--------------------------------------------------
3. CONTEXTO E JUSTIFICATIVA
--------------------------------------------------
Problema Comunitário Identificado:
${problem}

--------------------------------------------------
4. PROPOSTA DE SOLUÇÃO E DETALHAMENTO
--------------------------------------------------
Solução Desenvolvida/Proposta:
${solution}

Recursos e Materiais Necessários:
${resources}

--------------------------------------------------
Status do Relatório: Rascunho Inicial Aprovado
--------------------------------------------------`;
}

function updateProposalPreview() {
  const display = document.getElementById("proposal-text-display");
  if (display) {
    display.innerText = generateProposalText();
  }
}

function copyProposalText() {
  const text = generateProposalText();
  navigator.clipboard.writeText(text).then(() => {
    alert("Texto da proposta copiado para a área de transferência! Você pode colá-lo no Drive ou em um e-mail.");
  }).catch(err => {
    alert("Erro ao copiar o texto. Por favor, selecione e copie manualmente a pré-visualização.");
  });
}

function downloadProposalFile() {
  const text = generateProposalText();
  const teamName = document.getElementById("prop-team-name").value.trim() || "equipe";
  const filename = `proposta_pi_301_${teamName.toLowerCase().replace(/\s+/g, "_")}.txt`;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// RENDERIZA A GALERIA DE PROJETOS ESTÁTICOS DA TURMA 301
function renderGallery() {
  const container = document.getElementById("gallery-grid-container");
  if (!container) return;

  container.innerHTML = "";

  galleryProjects.forEach(proj => {
    const ods = odsList.find(o => o.id === proj.odsId);
    const odsName = ods ? `ODS ${ods.id}: ${ods.title}` : `ODS ${proj.odsId}`;
    const odsColor = ods ? ods.color : "#4B5563";

    const card = document.createElement("div");
    card.className = "gallery-card";
    card.style.borderLeftColor = odsColor;

    card.innerHTML = `
      <div>
        <div class="gallery-card-header">
          <h3 class="gallery-project-title">${proj.title}</h3>
          <span class="gallery-ods-badge" style="background-color: ${odsColor};" title="${odsName}">
            ODS ${proj.odsId}
          </span>
        </div>
        <div class="gallery-members">
          👤 <strong>Equipe:</strong> ${proj.members}
        </div>
        <div class="gallery-section-title">⚠️ Problema Identificado</div>
        <p class="gallery-text">${proj.problem}</p>
        <div class="gallery-section-title">💡 Solução Proposta</div>
        <p class="gallery-text">${proj.solution}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
