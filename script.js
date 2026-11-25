/* =====================================================================
   JOGO DAS ESCOLHAS – SUSTENTABILIDADE 360°
   script.js – funcionamento do teste, pontuação e navegação

   Este ficheiro NÃO precisa de ser editado para mudar perguntas.
   As perguntas e as definições estão em questions.js.
   ===================================================================== */

(function () {
  "use strict";

  /* -------------------------------------------------------------------
     1. DEFINIÇÕES DOS PILARES (textos fixos de cada secção)
     ------------------------------------------------------------------- */
  const PILLARS = [
    {
      key: "ambiental",
      emoji: "🌱",
      label: "Pilar ambiental",
      title: "SECÇÃO 1 – PILAR AMBIENTAL 🌱",
      resultName: "Resultado ambiental",
      shortName: "ambiental",
      nextLabel: "PILAR AMBIENTAL",
      description: "Neste pilar vais decidir como proteger o ambiente e os recursos naturais no dia a dia.",
      topics: ["Reciclagem", "Poluição", "Transportes", "Consumo de água", "Consumo de energia", "Proteção da natureza"],
      defaultImpact: "No pilar ambiental, as nossas escolhas influenciam a qualidade do ar, da água e dos ecossistemas."
    },
    {
      key: "economico",
      emoji: "💰",
      label: "Pilar económico",
      title: "SECÇÃO 2 – PILAR ECONÓMICO 💰",
      resultName: "Resultado económico",
      shortName: "económico",
      nextLabel: "PILAR ECONÓMICO",
      description: "Neste pilar vais decidir como usar o dinheiro e os recursos de forma inteligente e responsável.",
      topics: ["Poupança", "Consumo responsável", "Comércio local", "Reutilização", "Desperdício alimentar", "Gestão de dinheiro"],
      defaultImpact: "No pilar económico, as nossas escolhas influenciam as finanças das famílias e a economia da comunidade."
    },
    {
      key: "social",
      emoji: "🤝",
      label: "Pilar social",
      title: "SECÇÃO 3 – PILAR SOCIAL 🤝",
      resultName: "Resultado social",
      shortName: "social",
      nextLabel: "PILAR SOCIAL",
      description: "Neste pilar vais decidir como promover o respeito, a igualdade e o bem-estar de todas as pessoas.",
      topics: ["Igualdade", "Inclusão", "Solidariedade", "Respeito", "Direitos humanos", "Condições de trabalho"],
      defaultImpact: "No pilar social, as nossas escolhas influenciam a justiça, a inclusão e a qualidade de vida das pessoas."
    }
  ];

  const LETTERS = ["A", "B", "C", "D", "E", "F"];
  const RING_LENGTH = 2 * Math.PI * 60; // perímetro do círculo do resultado (r = 60)
  const REDUCED_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const DEFAULT_RATINGS = [
    { min: 90, title: "Mestre da Sustentabilidade", message: "Excelente trabalho!" },
    { min: 70, title: "Agente de Mudança", message: "Muito bom!" },
    { min: 50, title: "Em Boa Direção", message: "Estás no caminho certo." },
    { min: 0,  title: "Ponto de Partida", message: "Volta a jogar para melhorares." }
  ];

  /* -------------------------------------------------------------------
     2. FUNÇÕES AUXILIARES
     ------------------------------------------------------------------- */
  const $ = (id) => document.getElementById(id);

  /** Remove acentos e maiúsculas: "Económico" -> "economico" */
  function normalizeKey(text) {
    return String(text == null ? "" : text)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().trim();
  }

  /** Mistura uma lista (algoritmo Fisher-Yates) */
  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Anima um número de 0 até ao valor final */
  function countUp(el, to, duration) {
    if (REDUCED_MOTION || to === 0) { el.textContent = to; return; }
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /** Cria um elemento com classe e texto */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* -------------------------------------------------------------------
     3. LEITURA E VALIDAÇÃO DAS PERGUNTAS (questions.js)
     ------------------------------------------------------------------- */
  const CFG = Object.assign(
    { pointsPerCorrect: 10, shuffleQuestions: false, shuffleOptions: false, questionsPerPillar: 0, ratings: DEFAULT_RATINGS },
    (typeof QUIZ_CONFIG !== "undefined" && QUIZ_CONFIG) || {}
  );
  if (!Array.isArray(CFG.ratings) || CFG.ratings.length === 0) CFG.ratings = DEFAULT_RATINGS;
  CFG.ratings = CFG.ratings.slice().sort((a, b) => b.min - a.min);

  const pillarByKey = {};
  PILLARS.forEach((p) => { pillarByKey[p.key] = p; });

  /**
   * Verifica cada pergunta. Devolve as válidas e uma lista de erros
   * (que é mostrada no topo da página para ajudar a corrigir).
   */
  function loadQuestions() {
    const errors = [];
    const valid = [];

    if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS)) {
      errors.push("Não foi possível ler a lista QUESTIONS. Confirma se o ficheiro questions.js existe e está na mesma pasta que o index.html.");
      return { valid, errors };
    }

    QUESTIONS.forEach((q, i) => {
      const problems = [];
      const label = "Pergunta nº " + (i + 1) +
        (q && typeof q.question === "string" ? " («" + q.question.slice(0, 38) + "…»)" : "");

      if (!q || typeof q !== "object") {
        errors.push(label + ": não é um bloco válido.");
        return;
      }

      const key = normalizeKey(q.pillar);
      if (!pillarByKey[key]) problems.push('pilar inválido ("' + q.pillar + '") – usa "ambiental", "economico" ou "social"');

      if (typeof q.question !== "string" || !q.question.trim()) problems.push("falta o texto da pergunta");

      const hasOptions = Array.isArray(q.options) && q.options.length >= 2 && q.options.length <= LETTERS.length;
      if (!hasOptions) {
        problems.push("é preciso uma lista de opções (normalmente três: A, B e C)");
      } else if (q.options.some((o) => typeof o !== "string" || !o.trim())) {
        problems.push("há opções vazias");
      }

      if (hasOptions && (!Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
        problems.push("correctAnswer deve ser 0 (A), 1 (B) ou 2 (C)");
      }

      if (problems.length) {
        errors.push(label + ": " + problems.join("; ") + ".");
      } else {
        valid.push({
          key: key,
          question: q.question.trim(),
          options: q.options.map((o) => o.trim()),
          correctAnswer: q.correctAnswer,
          explanation: typeof q.explanation === "string" ? q.explanation : "",
          impact: typeof q.impact === "string" ? q.impact : ""
        });
      }
    });

    if (valid.length === 0 && errors.length === 0) errors.push("O ficheiro questions.js não tem perguntas.");
    return { valid, errors };
  }

  const loaded = loadQuestions();

  function showConfigErrors(errors) {
    if (!errors.length) return;
    const box = $("config-alert");
    box.innerHTML = "";
    box.appendChild(el("strong", null, "Há problemas no ficheiro questions.js (as perguntas com erro foram ignoradas):"));
    const list = el("ul");
    errors.forEach((msg) => list.appendChild(el("li", null, msg)));
    box.appendChild(list);
    box.hidden = false;
    errors.forEach((msg) => console.warn("[questions.js] " + msg));
  }

  /* -------------------------------------------------------------------
     4. ESTADO DO JOGO
     ------------------------------------------------------------------- */
  let sections = [];          // [{ pillar, questions: [...] }]
  let state = null;           // progresso atual

  /** Prepara uma pergunta (mistura as opções, se estiver ativo) */
  function prepareQuestion(q) {
    let options = q.options.map((text, i) => ({ text: text, correct: i === q.correctAnswer }));
    if (CFG.shuffleOptions) options = shuffle(options);
    return {
      key: q.key,
      question: q.question,
      options: options,
      correctIndex: options.findIndex((o) => o.correct),
      explanation: q.explanation,
      impact: q.impact
    };
  }

  /** Organiza as perguntas válidas em secções, por pilar */
  function buildSections() {
    return PILLARS.map((pillar) => {
      let list = loaded.valid.filter((q) => q.key === pillar.key);
      if (CFG.shuffleQuestions) list = shuffle(list);
      if (CFG.questionsPerPillar > 0) list = list.slice(0, CFG.questionsPerPillar);
      return { pillar: pillar, questions: list.map(prepareQuestion) };
    }).filter((s) => s.questions.length > 0);
  }

  function resetState() {
    sections = buildSections();
    state = {
      sectionIndex: 0,
      questionIndex: 0,
      selected: null,
      locked: false,
      answered: 0,
      total: sections.reduce((sum, s) => sum + s.questions.length, 0),
      scores: {}
    };
    sections.forEach((s) => { state.scores[s.pillar.key] = { correct: 0, wrong: 0 }; });
  }

  const currentSection = () => sections[state.sectionIndex];
  const currentQuestion = () => currentSection().questions[state.questionIndex];
  const totalCorrect = () => Object.values(state.scores).reduce((n, s) => n + s.correct, 0);
  const totalWrong = () => Object.values(state.scores).reduce((n, s) => n + s.wrong, 0);
  const totalPoints = () => totalCorrect() * CFG.pointsPerCorrect;

  /* -------------------------------------------------------------------
     5. NAVEGAÇÃO ENTRE ECRÃS E BARRA SUPERIOR
     ------------------------------------------------------------------- */
  function showScreen(id, focusId) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
    const screen = $(id);
    screen.classList.add("is-active");

    const dark = screen.classList.contains("screen--dark");
    document.body.dataset.theme = dark ? "dark" : "light";
    $("topbar").hidden = dark;

    window.scrollTo(0, 0);
    if (focusId) $(focusId).focus({ preventScroll: true });
  }

  function updateTopbar(label) {
    const pct = state.total ? Math.round((state.answered / state.total) * 100) : 0;
    $("progress-fill").style.width = pct + "%";
    $("progress").setAttribute("aria-valuenow", String(pct));
    $("progress-label").textContent = label;
    $("topbar-points").textContent = totalPoints();
  }

  /* -------------------------------------------------------------------
     6. ÁUDIO DE INTRODUÇÃO
     Para trocar o áudio, substitui o ficheiro audio/introducao.mp3
     (mantém o mesmo nome). Não é preciso mexer no código.
     ------------------------------------------------------------------- */
  const audio = $("intro-audio");
  const audioUi = {
    startBlock: $("home-start-block"),
    stage: $("audio-stage"),
    status: $("audio-status"),
    equalizer: $("equalizer"),
    barFill: $("audio-bar-fill"),
    soundBtn: $("btn-sound"),
    skipBtn: $("btn-skip-audio"),
    beginBtn: $("btn-begin-test")
  };
  let audioFinished = false;

  function startExperience() {
    audioFinished = false;
    audioUi.startBlock.hidden = true;
    audioUi.stage.hidden = false;
    audioUi.beginBtn.hidden = true;
    audioUi.skipBtn.hidden = false;
    audioUi.status.textContent = "A reproduzir a introdução…";

    // O clique do utilizador permite iniciar o áudio nos browsers
    try {
      const attempt = audio.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(onAudioProblem);
    } catch (err) {
      onAudioProblem();
    }
  }

  /** Mostra o botão COMEÇAR TESTE (quando o áudio termina) */
  function revealBeginButton(message) {
    audioUi.equalizer.classList.remove("is-playing");
    audioUi.status.textContent = message;
    audioUi.skipBtn.hidden = true;
    audioUi.beginBtn.hidden = false;
    audioUi.beginBtn.focus({ preventScroll: false });
  }

  function onAudioEnded() {
    if (audioFinished) return;
    audioFinished = true;
    audioUi.barFill.style.width = "100%";
    revealBeginButton("Introdução concluída. Quando estiveres pronto, começa o teste.");
  }

  function onAudioProblem() {
    if (audioFinished) return;
    audioFinished = true;
    revealBeginButton("Não foi possível reproduzir o áudio (confirma se existe audio/introducao.mp3). Podes continuar na mesma.");
  }

  function skipAudio() {
    audio.pause();
    onAudioEnded();
  }

  function toggleSound() {
    audio.muted = !audio.muted;
    audioUi.soundBtn.setAttribute("aria-pressed", String(audio.muted));
    audioUi.soundBtn.title = audio.muted ? "Ativar o som" : "Desativar o som";
  }

  function resetAudioUi() {
    audio.pause();
    try { audio.currentTime = 0; } catch (err) { /* ignorar */ }
    audioFinished = false;
    audioUi.stage.hidden = true;
    audioUi.startBlock.hidden = false;
    audioUi.beginBtn.hidden = true;
    audioUi.barFill.style.width = "0";
    audioUi.equalizer.classList.remove("is-playing");
  }

  audio.addEventListener("playing", () => audioUi.equalizer.classList.add("is-playing"));
  audio.addEventListener("pause", () => audioUi.equalizer.classList.remove("is-playing"));
  audio.addEventListener("ended", onAudioEnded);
  audio.addEventListener("error", () => { if (!audioUi.stage.hidden) onAudioProblem(); });
  audio.addEventListener("timeupdate", () => {
    if (audio.duration > 0) audioUi.barFill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  });

  /* -------------------------------------------------------------------
     7. SECÇÕES
     ------------------------------------------------------------------- */
  function beginTest() {
    audio.pause();
    resetState();
    showSectionIntro();
  }

  function showSectionIntro() {
    const section = currentSection();
    const pillar = section.pillar;

    $("si-badge").textContent = pillar.emoji;
    $("si-step").textContent = "Secção " + (state.sectionIndex + 1) + " de " + sections.length;
    $("si-title").textContent = pillar.title;
    $("si-desc").textContent = pillar.description;

    const topics = $("si-topics");
    topics.innerHTML = "";
    pillar.topics.forEach((t) => topics.appendChild(el("li", null, t)));

    const n = section.questions.length;
    $("si-meta").textContent = n + (n === 1 ? " pergunta" : " perguntas") + " · " + CFG.pointsPerCorrect + " pontos por resposta certa";

    state.questionIndex = 0;
    updateTopbar("Secção " + (state.sectionIndex + 1) + " de " + sections.length);
    showScreen("screen-section-intro", "si-title");
  }

  function showSectionEnd() {
    const section = currentSection();
    const pillar = section.pillar;
    const score = state.scores[pillar.key];
    const n = section.questions.length;
    const pct = Math.round((score.correct / n) * 100);
    const isLast = state.sectionIndex === sections.length - 1;

    $("se-kicker").textContent = "Secção " + (state.sectionIndex + 1) + " · " + pillar.label;
    $("se-score").textContent = score.correct * CFG.pointsPerCorrect + " pontos";
    $("se-score-label").textContent = score.correct + (score.correct === 1 ? " certa" : " certas") + " · " +
      score.wrong + (score.wrong === 1 ? " errada" : " erradas") + " em " + n + (n === 1 ? " pergunta" : " perguntas");

    let msg;
    if (pct >= 80) msg = "Excelente decisão neste pilar! Percebes bem o impacto das tuas escolhas.";
    else if (pct >= 50) msg = "Bom trabalho! Já percebes muita coisa, mas ainda há situações onde podes pensar melhor.";
    else msg = "Este pilar ainda te desafia. Não faz mal: no fim podes jogar outra vez e melhorar.";
    $("se-msg").textContent = msg;

    const next = sections[state.sectionIndex + 1];
    $("btn-section-next").textContent = isLast ? "VER RESULTADO FINAL" : "SEGUIR PARA O " + next.pillar.nextLabel + " " + next.pillar.emoji;

    const bar = $("se-bar");
    bar.style.width = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = pct + "%"; }));

    updateTopbar("Secção " + (state.sectionIndex + 1) + " concluída");
    showScreen("screen-section-end", "se-title");
  }

  function goToNextSection() {
    if (state.sectionIndex >= sections.length - 1) {
      showResults();
    } else {
      state.sectionIndex++;
      showSectionIntro();
    }
  }

  /* -------------------------------------------------------------------
     8. PERGUNTAS
     ------------------------------------------------------------------- */
  function renderQuestion() {
    const section = currentSection();
    const q = currentQuestion();

    state.selected = null;
    state.locked = false;

    $("q-pillar-tag").textContent = section.pillar.emoji + " " + section.pillar.label;

    const globalNumber = sections.slice(0, state.sectionIndex).reduce((n, s) => n + s.questions.length, 0) + state.questionIndex + 1;
    $("q-count").textContent = "Pergunta " + (state.questionIndex + 1) + " de " + section.questions.length;
    $("q-text").textContent = q.question;

    const fieldset = $("q-options");
    fieldset.classList.remove("is-locked");
    // mantém a <legend> e remove as opções anteriores
    Array.from(fieldset.querySelectorAll(".option")).forEach((o) => o.remove());

    q.options.forEach((opt, i) => {
      const label = el("label", "option");
      const input = el("input");
      input.type = "radio";
      input.name = "answer";
      input.value = String(i);
      input.addEventListener("change", () => selectOption(i));

      label.appendChild(input);
      label.appendChild(el("span", "option__letter", LETTERS[i]));
      label.appendChild(el("span", "option__text", opt.text));
      const status = el("span", "option__status");
      status.setAttribute("aria-hidden", "true");
      label.appendChild(status);
      fieldset.appendChild(label);
    });

    const confirmBtn = $("btn-confirm");
    confirmBtn.hidden = false;
    confirmBtn.disabled = true;
    $("q-feedback").hidden = true;

    updateTopbar("Pergunta " + globalNumber + " de " + state.total);
    showScreen("screen-question", "q-text");
  }

  function selectOption(index) {
    if (state.locked) return;
    state.selected = index;
    $("q-options").querySelectorAll(".option").forEach((label, i) => {
      label.classList.toggle("is-selected", i === index);
      label.querySelector("input").checked = i === index;
    });
    $("btn-confirm").disabled = false;
  }

  function confirmAnswer() {
    if (state.locked || state.selected === null) return;
    state.locked = true;

    const section = currentSection();
    const pillar = section.pillar;
    const q = currentQuestion();
    const isCorrect = state.selected === q.correctIndex;

    // Pontuação
    if (isCorrect) state.scores[pillar.key].correct++;
    else state.scores[pillar.key].wrong++;
    state.answered++;

    // Bloqueia as opções e mostra o resultado de cada uma
    const fieldset = $("q-options");
    fieldset.classList.add("is-locked");
    fieldset.querySelectorAll(".option").forEach((label, i) => {
      const input = label.querySelector("input");
      input.disabled = true;
      label.classList.remove("is-selected");
      const status = label.querySelector(".option__status");
      if (i === q.correctIndex) {
        label.classList.add("is-correct");
        status.textContent = "✓";
      } else if (i === state.selected) {
        label.classList.add("is-wrong");
        status.textContent = "✕";
      }
    });

    $("btn-confirm").hidden = true;

    // Feedback educativo
    const feedback = $("q-feedback");
    feedback.classList.toggle("is-bad", !isCorrect);
    $("fb-icon").textContent = isCorrect ? "✓" : "✕";
    $("fb-title").textContent = isCorrect ? "Resposta correta!" : "Resposta incorreta";
    $("fb-sub").textContent = isCorrect
      ? "+" + CFG.pointsPerCorrect + " pontos"
      : "A resposta certa era a opção " + LETTERS[q.correctIndex] + ": " + q.options[q.correctIndex].text;
    $("fb-explain").textContent = q.explanation;
    $("fb-explain").hidden = !q.explanation;
    $("fb-impact-title").textContent = "Impacto no pilar " + pillar.shortName;
    $("fb-impact-text").textContent = q.impact || pillar.defaultImpact;

    const isLastInSection = state.questionIndex === section.questions.length - 1;
    $("btn-next").textContent = isLastInSection ? "CONCLUIR SECÇÃO" : "PRÓXIMA PERGUNTA";

    feedback.hidden = false;
    // reinicia a animação de entrada
    feedback.style.animation = "none";
    void feedback.offsetWidth;
    feedback.style.animation = "";

    updateTopbar("Pergunta respondida");
    $("topbar-points").textContent = totalPoints();
    $("btn-next").focus({ preventScroll: true });
    feedback.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "nearest" });
  }

  function nextQuestion() {
    if (!state.locked) return;
    const section = currentSection();
    if (state.questionIndex < section.questions.length - 1) {
      state.questionIndex++;
      renderQuestion();
    } else {
      showSectionEnd();
    }
  }

  /* -------------------------------------------------------------------
     9. RESULTADOS
     ------------------------------------------------------------------- */
  function pillarLevel(pct) {
    if (pct >= 85) return "Excelente";
    if (pct >= 60) return "Bom";
    if (pct >= 40) return "Em progresso";
    return "Precisa de atenção";
  }

  function showResults() {
    const correct = totalCorrect();
    const wrong = totalWrong();
    const points = totalPoints();
    const maxPoints = state.total * CFG.pointsPerCorrect;
    const pct = state.total ? Math.round((correct / state.total) * 100) : 0;
    const rating = CFG.ratings.find((r) => pct >= r.min) || CFG.ratings[CFG.ratings.length - 1];

    $("r-title").textContent = rating.title;
    $("r-message").textContent = rating.message || "";
    $("r-max").textContent = maxPoints;
    $("r-correct").textContent = correct;
    $("r-wrong").textContent = wrong;

    // Resultado por pilar
    const wrap = $("r-pillars");
    wrap.innerHTML = "";
    sections.forEach((s) => {
      const sc = state.scores[s.pillar.key];
      const n = s.questions.length;
      const p = Math.round((sc.correct / n) * 100);
      const card = el("article", "pillar-card");

      const head = el("div", "pillar-card__head");
      head.appendChild(el("div", "pillar-card__emoji", s.pillar.emoji));
      const titles = el("div");
      titles.appendChild(el("h4", "pillar-card__name", s.pillar.resultName));
      titles.appendChild(el("p", "pillar-card__level", pillarLevel(p)));
      head.appendChild(titles);
      card.appendChild(head);

      const score = el("p", "pillar-card__score", String(sc.correct * CFG.pointsPerCorrect));
      score.appendChild(el("small", null, "/ " + n * CFG.pointsPerCorrect + " pontos"));
      card.appendChild(score);

      const bar = el("div", "mini-bar");
      const fill = el("div", "mini-bar__fill");
      bar.appendChild(fill);
      card.appendChild(bar);
      requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = p + "%"; }));

      const stats = el("p", "pillar-card__stats");
      stats.appendChild(el("span", null, "✓ " + sc.correct + (sc.correct === 1 ? " certa" : " certas")));
      stats.appendChild(el("span", null, "✕ " + sc.wrong + (sc.wrong === 1 ? " errada" : " erradas")));
      card.appendChild(stats);

      card.appendChild(el("p", "pillar-card__tip", p >= 85
        ? "Dominas este pilar. Continua assim!"
        : "Para melhorar, revê situações sobre: " + s.pillar.topics.slice(0, 3).join(", ").toLowerCase() + "."));

      wrap.appendChild(card);
    });

    updateTopbar("Teste concluído");
    showScreen("screen-results", "r-title");

    // Animações do resultado
    const ring = $("r-ring");
    ring.style.strokeDashoffset = RING_LENGTH;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ring.style.strokeDashoffset = RING_LENGTH * (1 - pct / 100);
    }));
    countUp($("r-percent"), pct, 1400);
    countUp($("r-points"), points, 1400);
  }

  /* -------------------------------------------------------------------
     10. REINICIAR E VOLTAR AO INÍCIO
     ------------------------------------------------------------------- */
  function restartTest() {
    resetState();
    showSectionIntro();
  }

  function restartFromTopbar() {
    const inProgress = state && state.answered > 0 && state.answered < state.total;
    if (inProgress && !window.confirm("Queres mesmo reiniciar o teste? Vais perder a pontuação atual.")) return;
    restartTest();
  }

  function goHome() {
    resetAudioUi();
    showScreen("screen-home", "home-title");
  }

  /* -------------------------------------------------------------------
     11. LIGAÇÃO DOS BOTÕES E TECLADO
     ------------------------------------------------------------------- */
  $("btn-start").addEventListener("click", startExperience);
  $("btn-sound").addEventListener("click", toggleSound);
  $("btn-skip-audio").addEventListener("click", skipAudio);
  $("btn-begin-test").addEventListener("click", beginTest);
  $("btn-section-start").addEventListener("click", renderQuestion);
  $("btn-confirm").addEventListener("click", confirmAnswer);
  $("btn-next").addEventListener("click", nextQuestion);
  $("btn-section-next").addEventListener("click", goToNextSection);
  $("btn-restart").addEventListener("click", restartTest);
  $("btn-restart-top").addEventListener("click", restartFromTopbar);
  $("btn-home").addEventListener("click", goHome);

  // Atalhos: letras A/B/C (ou 1/2/3) escolhem; Enter confirma
  document.addEventListener("keydown", (event) => {
    if (!$("screen-question").classList.contains("is-active") || state.locked) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const key = event.key.toLowerCase();
    const index = LETTERS.map((l) => l.toLowerCase()).indexOf(key) >= 0
      ? LETTERS.map((l) => l.toLowerCase()).indexOf(key)
      : (/^[1-6]$/.test(key) ? Number(key) - 1 : -1);

    if (index >= 0 && index < currentQuestion().options.length) {
      selectOption(index);
      const input = $("q-options").querySelectorAll(".option input")[index];
      if (input) input.focus({ preventScroll: true });
      return;
    }
    if (event.key === "Enter" && state.selected !== null && event.target.tagName !== "BUTTON") {
      event.preventDefault();
      confirmAnswer();
    }
  });

  /* -------------------------------------------------------------------
     12. ARRANQUE
     ------------------------------------------------------------------- */
  showConfigErrors(loaded.errors);
  resetState();

  if (sections.length === 0) {
    // Sem perguntas válidas não há teste possível
    $("btn-start").disabled = true;
  }
})();
