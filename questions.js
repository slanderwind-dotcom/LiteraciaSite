/* =====================================================================
   JOGO DAS ESCOLHAS – SUSTENTABILIDADE 360°
   FICHEIRO DE PERGUNTAS  (é o único que precisas de editar!)
   ---------------------------------------------------------------------
   COMO ADICIONAR UMA PERGUNTA
   1. Copia um bloco { ... } do array QUESTIONS (de "{" até "},").
   2. Cola-o no sítio onde queres que a pergunta apareça.
   3. Altera os campos:

      pillar         "ambiental", "economico" ou "social"
                     (aceita também "económico", com acento)
      question       A situação do quotidiano (texto da pergunta).
      options        As opções, por ordem: A, B, C.
      correctAnswer  Posição da resposta certa, a começar em 0:
                     0 = A    1 = B    2 = C
      explanation    Explicação educativa (aparece depois de confirmar).
      impact         (opcional) Impacto da decisão no pilar. Se o deixares
                     de fora, aparece uma frase geral sobre o pilar.

   COMO REMOVER UMA PERGUNTA
   Apaga o bloco { ... } completo (incluindo a vírgula no fim).

   REGRAS IMPORTANTES
   - Cada pergunta termina com uma vírgula, depois de "}".
   - Os textos ficam entre aspas "...". Se precisares de aspas dentro do
     texto, usa « » ou escreve \" (barra + aspas).
   - Podes ter quantas perguntas quiseres em cada pilar.
   - Se houver um erro numa pergunta, o site avisa no topo da página
     e ignora essa pergunta (o resto continua a funcionar).
   ===================================================================== */


/* ---------------------------------------------------------------------
   DEFINIÇÕES GERAIS (opcional – podes deixar como está)
   --------------------------------------------------------------------- */
const QUIZ_CONFIG = {
  // Pontos ganhos por cada resposta certa
  pointsPerCorrect: 10,

  // true = as perguntas de cada pilar aparecem por ordem aleatória
  shuffleQuestions: false,

  // true = as opções A, B, C aparecem misturadas (a resposta certa
  // é acompanhada automaticamente, não precisas de mudar nada)
  shuffleOptions: false,

  // Limite de perguntas por pilar em cada jogo (0 = usar todas).
  // Útil com shuffleQuestions: true para cada jogo ser diferente.
  questionsPerPillar: 0,

  // Classificação final, em percentagem de respostas certas.
  // Ordem: da mais alta para a mais baixa.
  ratings: [
    { min: 90, title: "Mestre da Sustentabilidade", message: "Excelente! Tomas decisões informadas e equilibradas nos três pilares. Partilha o que sabes com quem te rodeia." },
    { min: 70, title: "Agente de Mudança",          message: "Muito bom! Já pensas nas consequências das tuas escolhas. Com mais um pouco de atenção, chegas ao topo." },
    { min: 50, title: "Em Boa Direção",             message: "Estás no caminho certo. Revê as explicações das perguntas em que erraste e tenta outra vez." },
    { min:  0, title: "Ponto de Partida",           message: "Todos começamos por algum lado! Lê com atenção as explicações e volta a jogar para melhorares o resultado." }
  ]
};


/* ---------------------------------------------------------------------
   PERGUNTAS
   --------------------------------------------------------------------- */
const QUESTIONS = [

  /* =================================================================
     PILAR AMBIENTAL 🌱
     ================================================================= */

  {
    pillar: "ambiental",
    question: "O Tiago vive a 2 km da escola. A mãe oferece-se para o levar de carro, mas teria de fazer um desvio de 4 km só para isso. Qual é a escolha mais sustentável?",
    options: [
      "Aceitar a boleia, porque o carro vai circular na mesma",
      "Ir a pé ou de bicicleta, se o percurso for seguro",
      "Pedir boleia, e pedir aos amigos que vivem perto para virem cada um no seu carro"
    ],
    correctAnswer: 1,
    explanation: "O desvio obriga o carro a percorrer quilómetros extra só para esta viagem. Ir a pé ou de bicicleta não emite CO₂ e ainda faz bem à saúde.",
    impact: "No pilar ambiental, cada viagem de carro evitada reduz as emissões de gases com efeito de estufa e a poluição do ar junto à escola."
  },

  {
    pillar: "ambiental",
    question: "A Marta acabou de comer um iogurte e tem o copo de plástico na mão. Qual é a melhor forma de o reciclar?",
    options: [
      "Colocá-lo no ecoponto azul, porque a embalagem esteve em contacto com um alimento",
      "Lavá-lo muito bem com água quente antes de o colocar no ecoponto amarelo",
      "Esvaziá-lo bem e colocá-lo no ecoponto amarelo, sem gastar água a lavar"
    ],
    correctAnswer: 2,
    explanation: "As embalagens de plástico vão para o ecoponto amarelo. Basta estarem vazias: lavar com muita água desperdiça um recurso precioso e não é necessário para a reciclagem.",
    impact: "Reciclar bem poupa matérias-primas e energia; evitar o desperdício de água na lavagem protege também esse recurso."
  },

  {
    pillar: "ambiental",
    question: "O Rui demora 3 minutos a lavar os dentes com a torneira sempre aberta. O que pode fazer para reduzir o consumo de água?",
    options: [
      "Fechar a torneira enquanto escova e abri-la só para enxaguar",
      "Escovar os dentes mais depressa, mantendo a torneira aberta",
      "Usar menos pasta de dentes"
    ],
    correctAnswer: 0,
    explanation: "Uma torneira aberta gasta vários litros por minuto. Fechá-la enquanto escovas evita deitar fora água limpa. A quantidade de pasta não muda o consumo de água.",
    impact: "A água potável é limitada. Poupá-la ajuda a proteger rios, aquíferos e os ecossistemas que dependem deles, sobretudo em períodos de seca."
  },

  {
    pillar: "ambiental",
    question: "Ao sair da sala para o intervalo de 20 minutos, a turma repara que as luzes e o projetor ficam ligados. A Ana diz que é melhor deixar tudo ligado, porque ligar de novo gasta mais energia. Qual é a decisão correta?",
    options: [
      "Deixar tudo ligado, como diz a Ana",
      "Desligar as luzes e o projetor: a energia gasta ao ligar é muito menor do que a gasta em 20 minutos ligados",
      "Desligar só as luzes, porque o projetor em espera não consome nada"
    ],
    correctAnswer: 1,
    explanation: "A ideia da Ana é um mito comum. Para ausências de vários minutos, desligar compensa sempre. E um aparelho em espera continua a consumir energia.",
    impact: "Menos energia consumida significa menos emissões de CO₂ nas centrais elétricas e menos pressão sobre os recursos naturais."
  },

  {
    pillar: "ambiental",
    question: "Num piquenique na praia sobram embalagens e restos de comida, e não há caixotes por perto. O que deves fazer?",
    options: [
      "Enterrar o lixo na areia, para ninguém o ver",
      "Deixar o lixo junto às rochas, porque a maré o leva embora",
      "Levar o lixo contigo e separá-lo no ecoponto ou caixote mais próximo"
    ],
    correctAnswer: 2,
    explanation: "Enterrado ou levado pela maré, o lixo acaba por poluir a praia e o oceano, onde pode ferir ou matar animais marinhos. Levá-lo contigo é a única forma de o tratar corretamente.",
    impact: "Evitar lixo no mar protege a vida marinha e reduz a poluição por plásticos e microplásticos, que entram na cadeia alimentar."
  },

  {
    pillar: "ambiental",
    question: "A turma quer plantar árvores no recreio. Que escolha ajuda mais a biodiversidade local?",
    options: [
      "Espécies autóctones, adaptadas ao clima e que servem de abrigo e alimento à fauna local",
      "Espécies exóticas de crescimento rápido, para dar sombra mais cedo",
      "Plantas artificiais, que não precisam de rega"
    ],
    correctAnswer: 0,
    explanation: "As espécies autóctones precisam de menos água e cuidados, e muitas aves e insetos dependem delas. Algumas espécies exóticas tornam-se invasoras e prejudicam as plantas locais.",
    impact: "Proteger a biodiversidade mantém os ecossistemas equilibrados, com benefícios como a polinização, o ar mais limpo e os solos saudáveis."
  },

  {
    pillar: "ambiental",
    question: "A família vai fazer uma viagem de 300 km. Em média, que opção emite menos CO₂ por pessoa?",
    options: [
      "Cada pessoa no seu carro, para ir mais confortável",
      "O comboio, que transporta muitos passageiros de uma só vez",
      "O avião, porque a viagem é mais rápida"
    ],
    correctAnswer: 1,
    explanation: "Quantas mais pessoas partilham o mesmo veículo, menor é a emissão por passageiro. O comboio, sobretudo elétrico, é dos meios com menores emissões por pessoa.",
    impact: "Escolher transportes coletivos reduz as emissões de gases com efeito de estufa, responsáveis pelas alterações climáticas."
  },

  {
    pillar: "ambiental",
    question: "A escola tem uma horta e quer regá-la com o mínimo de desperdício durante o verão. Qual é a melhor prática?",
    options: [
      "Regar com muita água todos os dias, para as plantas nunca terem sede",
      "Regar ao meio-dia, quando o sol está mais forte",
      "Regar ao início da manhã ou ao fim da tarde, para reduzir a evaporação"
    ],
    correctAnswer: 2,
    explanation: "Com menos calor, evapora menos água e chega mais às raízes. Regar em excesso também pode prejudicar as plantas e desperdiça água.",
    impact: "Usar a água com eficiência protege as reservas, sobretudo em regiões onde a seca é cada vez mais frequente."
  },


  /* =================================================================
     PILAR ECONÓMICO 💰
     ================================================================= */

  {
    pillar: "economico",
    question: "A Inês recebeu 30 € de prenda e quer comprar um telemóvel que custa 150 €. Qual é a decisão com melhor gestão do dinheiro?",
    options: [
      "Gastar já os 30 € noutro objeto, para não os perder",
      "Definir uma meta, guardar uma parte do dinheiro todas as semanas e comprar quando juntar o valor",
      "Pedir dinheiro emprestado a um colega e comprar já, pagando depois"
    ],
    correctAnswer: 1,
    explanation: "Planear e poupar com regularidade permite alcançar objetivos maiores sem dívidas. Pedir emprestado cria um compromisso que pode ser difícil de cumprir.",
    impact: "No pilar económico, poupar e planear dá estabilidade financeira às famílias e ajuda a evitar dívidas."
  },

  {
    pillar: "economico",
    question: "As sapatilhas do Leo têm a sola gasta, mas o resto está em bom estado. Qual é a decisão mais responsável?",
    options: [
      "Perguntar num sapateiro se podem ser arranjadas",
      "Comprar umas novas, porque estão na moda",
      "Continuar a usá-las até partirem, mesmo com a sola gasta"
    ],
    correctAnswer: 0,
    explanation: "Arranjar prolonga a vida do produto, custa menos do que comprar novo e dá trabalho a profissionais locais. Consumo responsável é comprar só quando é mesmo necessário.",
    impact: "Reparar em vez de substituir poupa dinheiro e reduz a quantidade de recursos gastos numa economia baseada em usar e deitar fora."
  },

  {
    pillar: "economico",
    question: "A Beatriz vai comprar fruta e legumes. Qual é a escolha que mais beneficia a economia local?",
    options: [
      "Uma loja online internacional, por ter muita variedade",
      "Um supermercado que vende sobretudo produtos importados",
      "O mercado da zona, com produtores da região"
    ],
    correctAnswer: 2,
    explanation: "Comprar a produtores locais mantém o dinheiro na região, apoia pequenos negócios e empregos e costuma reduzir o transporte dos alimentos.",
    impact: "O comércio local reforça a economia da comunidade e ajuda a manter vivas as profissões e as tradições da região."
  },

  {
    pillar: "economico",
    question: "A turma quer organizar uma feira de trocas de livros, roupa e jogos. Qual é a principal vantagem económica da ideia?",
    options: [
      "Dá lucro à escola, mesmo que os alunos gastem mais dinheiro",
      "Dá uma segunda vida aos objetos e permite que todos poupem sem comprar novos",
      "Não tem vantagem, serve só para arrumar o que já não é preciso"
    ],
    correctAnswer: 1,
    explanation: "Trocar e reutilizar dá novo uso a objetos que ficariam parados, poupa dinheiro e evita compras desnecessárias.",
    impact: "A reutilização é um pilar da economia circular: faz os recursos durar mais e reduz custos para as famílias."
  },

  {
    pillar: "economico",
    question: "Em casa sobrou arroz e frango do jantar. Qual é a melhor decisão para evitar desperdício, com segurança?",
    options: [
      "Guardar num recipiente fechado no frigorífico e reaproveitar no dia seguinte",
      "Deixar na panela, fora do frigorífico, durante a noite",
      "Deitar tudo fora, para não correr riscos"
    ],
    correctAnswer: 0,
    explanation: "Arrefecer e refrigerar depressa permite comer as sobras com segurança no dia seguinte. Deixar a comida muito tempo fora do frio faz crescer bactérias, e deitar tudo fora é desperdício.",
    impact: "Cada refeição aproveitada poupa dinheiro e evita desperdiçar alimentos que custaram tempo, água e energia a produzir."
  },

  {
    pillar: "economico",
    question: "A Sofia tem 20 € por mês e quer comprar um livro de 10 €. O que é mais sensato?",
    options: [
      "Gastar os 20 € em lanches e extras, e ver no fim do mês se sobra alguma coisa",
      "Pedir um adiantamento da semanada do mês seguinte",
      "Identificar pequenos gastos que consegue reduzir e juntar os 10 € em algumas semanas"
    ],
    correctAnswer: 2,
    explanation: "Perceber para onde vai o dinheiro e ajustar pequenos gastos permite alcançar objetivos sem ficar sem dinheiro mais tarde. Um adiantamento só empurra o problema para o mês seguinte.",
    impact: "Gerir o orçamento pessoal é a base da independência financeira e evita decisões por impulso."
  },

  {
    pillar: "economico",
    question: "O João precisa de uma mochila. A de 10 € costuma durar um ano; a de 25 € tem cinco anos de garantia. Qual é a escolha mais económica a longo prazo?",
    options: [
      "A de 10 €, porque custa menos hoje",
      "A de 25 €, porque custa 5 € por ano, contra 10 € por ano",
      "Nenhuma: usar sacos de plástico em vez de mochila"
    ],
    correctAnswer: 1,
    explanation: "Em cinco anos, a mochila barata custaria 50 € (cinco compras) e a de qualidade 25 €. Comprar melhor e mais durável costuma compensar, e gera menos lixo.",
    impact: "Escolher produtos duráveis poupa dinheiro e reduz o consumo de recursos e o desperdício."
  },

  {
    pillar: "economico",
    question: "No supermercado há iogurtes em promoção, «leva 3, paga 2», mas terminam a validade daqui a 2 dias e a família consome um por dia. O que fazer?",
    options: [
      "Levar três, porque uma promoção compensa sempre",
      "Deixar de comprar iogurtes para sempre",
      "Levar só os que a família consegue consumir antes de terminar a validade"
    ],
    correctAnswer: 2,
    explanation: "Uma promoção só poupa dinheiro se usares aquilo que compras. O que se estraga é dinheiro deitado fora.",
    impact: "Consumo responsável é comprar o que é preciso. Evitar desperdício protege as poupanças da família."
  },


  /* =================================================================
     PILAR SOCIAL 🤝
     ================================================================= */

  {
    pillar: "social",
    question: "Na formação das equipas de futebol da turma, um colega diz que «as raparigas não jogam bem» e devem ficar de fora. Qual é a atitude mais justa?",
    options: [
      "Aceitar, para evitar discussões",
      "Formar equipas mistas e garantir que todos têm as mesmas oportunidades de jogar",
      "Deixar as raparigas apenas como suplentes"
    ],
    correctAnswer: 1,
    explanation: "Igualdade significa dar as mesmas oportunidades a todos, sem preconceitos baseados no género. Equipas mistas promovem ainda o respeito e a colaboração.",
    impact: "No pilar social, a igualdade de género constrói comunidades mais justas, onde todos podem participar e mostrar o seu valor."
  },

  {
    pillar: "social",
    question: "Chegou um colega novo à turma que ainda tem dificuldade em falar português. Qual é a melhor forma de o incluir?",
    options: [
      "Pedir à professora que o mude para outra turma, onde haja mais alunos da sua língua",
      "Falar com ele apenas quando for estritamente necessário",
      "Convidá-lo para os grupos e para os intervalos, usando gestos, imagens e ajudando-o com a língua"
    ],
    correctAnswer: 2,
    explanation: "A inclusão faz-se com iniciativa: convidar, ajudar e ter paciência. Afastar ou ignorar aumenta o isolamento e dificulta a aprendizagem.",
    impact: "Incluir reforça o sentimento de pertença e o bem-estar de todos, e enriquece a turma com diferentes culturas e línguas."
  },

  {
    pillar: "social",
    question: "A escola organiza uma recolha de alimentos para famílias que precisam de apoio. Qual é a participação mais solidária?",
    options: [
      "Doar alimentos não perecíveis em bom estado ou ajudar na organização da recolha",
      "Doar só os alimentos que já passaram do prazo, para não os desperdiçar",
      "Não participar, porque é um assunto dos adultos"
    ],
    correctAnswer: 0,
    explanation: "Solidariedade é dar o que gostarias de receber: alimentos em boas condições e o teu tempo. Doar produtos fora de prazo desrespeita quem os recebe.",
    impact: "A solidariedade reduz desigualdades e fortalece a rede de apoio da comunidade."
  },

  {
    pillar: "social",
    question: "No grupo de mensagens da turma circula uma foto de um colega, a gozar com ele, sem ele saber. O que deves fazer?",
    options: [
      "Partilhar também, para não seres posto de lado pelo grupo",
      "Não partilhar, dizer que não é correto e, se continuar, falar com um adulto de confiança",
      "Ignorar, porque é só uma brincadeira"
    ],
    correctAnswer: 1,
    explanation: "Partilhar ou ignorar contribui para o ciberbullying. Respeitar a imagem e a dignidade dos outros é fundamental, e pedir ajuda a um adulto é uma atitude corajosa.",
    impact: "O respeito protege a saúde mental e a segurança de cada pessoa e cria um ambiente onde todos se sentem bem."
  },

  {
    pillar: "social",
    question: "A Declaração Universal dos Direitos Humanos afirma que todas as pessoas têm direito à educação. Qual das situações respeita melhor esse direito?",
    options: [
      "Só os alunos com melhores notas podem continuar na escola",
      "Uma criança deixa a escola para trabalhar, porque a família não tem dinheiro",
      "Uma escola oferece manuais e apoio a alunos de famílias com poucos recursos"
    ],
    correctAnswer: 2,
    explanation: "O direito à educação é de todos, independentemente do dinheiro ou das notas. Apoios como manuais gratuitos ajudam a garantir esse direito.",
    impact: "O acesso à educação reduz a pobreza e dá a todos oportunidades iguais de construir o seu futuro."
  },

  {
    pillar: "social",
    question: "Numa t-shirt muito barata, lês que foi produzida num país onde os trabalhadores ganham muito pouco e trabalham muitas horas. Qual é a atitude mais consciente?",
    options: [
      "Pesquisar marcas com práticas justas e comprar menos, mas melhor",
      "Comprar na mesma: o preço baixo é o que importa",
      "Comprar muitas, porque assim há mais trabalho nessa fábrica"
    ],
    correctAnswer: 0,
    explanation: "Preços muito baixos podem esconder salários injustos e más condições. Informar-se e comprar com consciência pressiona as marcas a respeitar os trabalhadores. Comprar mais não resolve o problema.",
    impact: "Condições de trabalho dignas, com salário justo, horários razoáveis e segurança, são um direito humano e a base de uma sociedade mais justa."
  },

  {
    pillar: "social",
    question: "A turma planeia uma visita de estudo a um museu, mas um colega que usa cadeira de rodas não consegue entrar por causa das escadas. O que é mais inclusivo?",
    options: [
      "Deixar o colega na escola e levar o resto da turma",
      "Levar o colega ao colo pelas escadas",
      "Verificar a acessibilidade e escolher um local onde todos possam participar"
    ],
    correctAnswer: 2,
    explanation: "Inclusão significa adaptar as atividades para que ninguém fique de fora. Levar ao colo pode ser inseguro e pouco digno.",
    impact: "A acessibilidade garante igualdade de oportunidades e a participação plena de pessoas com mobilidade reduzida."
  },

  {
    pillar: "social",
    question: "Um jovem de 16 anos trabalha 12 horas seguidas, sem pausas, num café. O patrão diz que é «normal» e que assim aprende. Qual é a leitura correta?",
    options: [
      "É normal, porque trabalhar muito ensina a ter responsabilidade",
      "Não é aceitável: existem regras sobre horários, pausas e descanso, que protegem especialmente os jovens",
      "É aceitável se o patrão for simpático"
    ],
    correctAnswer: 1,
    explanation: "As leis do trabalho limitam o horário e exigem pausas e descanso, sobretudo para os mais jovens. Os direitos laborais não dependem da simpatia do patrão.",
    impact: "Condições de trabalho justas protegem a saúde, a educação e a dignidade de quem trabalha."
  }

];
