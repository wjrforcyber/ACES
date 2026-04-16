(() => {
  const STORAGE_KEYS = {
    draft: "aces_assessment_draft",
    records: "aces_assessment_records",
    language: "aces_language"
  };

  const SUPPORTED_LANGS = ["zh", "en"];

  const UI_TEXT = {
    zh: {
      docTitle: "ACES 入学评估问卷",
      brand: {
        title: "自适应认知评估系统"
      },
      a11y: {
        skip: "跳到主要内容",
        languageSwitch: "语言切换"
      },
      hero: {
        eyebrow: "教学分层支持原型",
        title: "入学评估问卷",
        subtitle: "教师观察填写，用于教学分组建议，不用于医学诊断。"
      },
      meta: {
        heading: "基本信息",
        lead: "请先填写基本信息，再进入问卷模块。",
        studentId: "学生编号",
        teacherName: "教师姓名",
        assessmentDate: "评估日期",
        hint: "必填字段不能为空。"
      },
      buttons: {
        home: "Home",
        start: "开始问卷",
        backToInfo: "返回信息页",
        saveDraft: "保存草稿",
        previousQuestion: "上一题",
        nextQuestion: "下一题",
        generateResult: "提交问卷",
        editAnswers: "修改答案",
        saveRecord: "保存记录",
        exportJson: "导出 JSON",
        load: "载入",
        export: "导出",
        delete: "删除"
      },
      questionnaire: {
        heading: "评估问卷",
        progressLabel: "完成进度",
        jumpHint: "点击题号可跳转到对应问题。",
        exampleLabel: "示例（无需作答）",
        answerPoolLabel: "答案（多选题）",
        questionPosition: "第 {current} / {total} 题",
        questionJump: "问题导航",
        moduleLabel: "所属模块",
        submitHint: "答完全部题目后可提交问卷。"
      },
      result: {
        heading: "评估结果",
        moduleScores: "Part 1 得分",
        trackScores: "Part 2 得分",
        totalScore: "总分",
        recommendations: "建议",
        recommendedTrack: "推荐路径",
        reassessment: "建议复评",
        noExtraAdvice: "当前表现整体稳定，可在真实情境中逐步提高任务复杂度。"
      },
      history: {
        heading: "本机历史记录",
        lead: "记录仅保存在当前浏览器中，可用于试运行复盘。",
        empty: "暂无记录。"
      },
      footer: {
        text: "ACES 原型系统 · 仅用于课程试运行 · 非医疗用途"
      },
      messages: {
        configPrefix: "配置错误：",
        metaRequired: "请完整填写基本信息。",
        fillMetaFirst: "请先填写完整基本信息。",
        unansweredPrefix: "仍有",
        unansweredSuffix: "题未作答。",
        draftSaved: "草稿已保存",
        recordSaved: "记录已保存",
        unknownTrack: "未知路径"
      },
      labels: {
        studentId: "学生编号",
        teacher: "教师",
        date: "日期",
        savedAt: "保存于",
        topTwoGap: "前两路径分差"
      }
    },
    en: {
      docTitle: "ACES Initial Assessment Questionnaire",
      brand: {
        title: "Adaptive Cognitive Evaluation System"
      },
      a11y: {
        skip: "Skip to main content",
        languageSwitch: "Language switch"
      },
      hero: {
        eyebrow: "Instructional Differentiation Prototype",
        title: "Initial Assessment Questionnaire",
        subtitle: "Completed by teachers for instructional grouping guidance, not medical diagnosis."
      },
      meta: {
        heading: "Basic Information",
        lead: "Complete basic information before starting the questionnaire modules.",
        studentId: "Student ID",
        teacherName: "Teacher Name",
        assessmentDate: "Assessment Date",
        hint: "All required fields must be filled."
      },
      buttons: {
        home: "Home",
        start: "Start Questionnaire",
        backToInfo: "Back to Info",
        saveDraft: "Save Draft",
        previousQuestion: "Previous Question",
        nextQuestion: "Next Question",
        generateResult: "Submit Questionnaire",
        editAnswers: "Edit Answers",
        saveRecord: "Save Record",
        exportJson: "Export JSON",
        load: "Load",
        export: "Export",
        delete: "Delete"
      },
      questionnaire: {
        heading: "Assessment Questionnaire",
        progressLabel: "Progress",
        jumpHint: "Click a question number to jump to it.",
        exampleLabel: "Example (no answer needed)",
        answerPoolLabel: "Answers (Select all that apply)",
        questionPosition: "Question {current} of {total}",
        questionJump: "Question navigation",
        moduleLabel: "Module",
        submitHint: "The submit button is enabled after all questions are answered."
      },
      result: {
        heading: "Assessment Result",
        moduleScores: "Part 1 Score",
        trackScores: "Part 2 Score",
        totalScore: "Total Score",
        recommendations: "Recommendations",
        recommendedTrack: "Recommended Track",
        reassessment: "Reassessment Recommended",
        noExtraAdvice: "Overall performance is stable; gradually increase task complexity in authentic contexts."
      },
      history: {
        heading: "Local History",
        lead: "Records are stored in this browser only for pilot review.",
        empty: "No records yet."
      },
      footer: {
        text: "ACES Prototype · Session Use Only · Non-medical Use"
      },
      messages: {
        configPrefix: "Configuration error: ",
        metaRequired: "Please complete all required basic information.",
        fillMetaFirst: "Please complete the basic information first.",
        unansweredPrefix: "You still have",
        unansweredSuffix: "unanswered question(s).",
        draftSaved: "Draft saved",
        recordSaved: "Record saved",
        unknownTrack: "Unknown Track"
      },
      labels: {
        studentId: "Student ID",
        teacher: "Teacher",
        date: "Date",
        savedAt: "Saved",
        topTwoGap: "Top-two gap"
      }
    }
  };

  const QUESTIONS = [
    {
      id: "Q1",
      moduleKey: "cognitive",
      type: "image-pair-grid",
      prompt: {
        zh: "Select the group that is greater.",
        en: "Select the group that is greater."
      },
      stemImage: "resources/images/Q9/question.png",
      rows: [
        {
          options: [
            { image: "resources/images/Q9/Q9-1.png", isCorrect: true },
            { image: "resources/images/Q9/Q9-2.png", isCorrect: false }
          ]
        },
        {
          options: [
            { image: "resources/images/Q9/Q9-3.png", isCorrect: false },
            { image: "resources/images/Q9/Q9-4.png", isCorrect: true }
          ]
        },
        {
          options: [
            { image: "resources/images/Q9/Q9-5.png", isCorrect: false },
            { image: "resources/images/Q9/Q9-6.png", isCorrect: true }
          ]
        }
      ],
      weightTag: "support"
    },
    {
      id: "Q2",
      moduleKey: "cognitive",
      type: "image-pair-grid",
      prompt: {
        zh: "Select the group that is less.",
        en: "Select the group that is less."
      },
      stemImage: "resources/images/Q10/question.png",
      rows: [
        {
          options: [
            { image: "resources/images/Q10/Q10-1.png", isCorrect: true },
            { image: "resources/images/Q10/Q10-2.png", isCorrect: false }
          ]
        },
        {
          options: [
            { image: "resources/images/Q10/Q10-3.png", isCorrect: true },
            { image: "resources/images/Q10/Q10-4.png", isCorrect: false }
          ]
        },
        {
          options: [
            { image: "resources/images/Q10/Q10-5.png", isCorrect: false },
            { image: "resources/images/Q10/Q10-6.png", isCorrect: true }
          ]
        }
      ],
      weightTag: "support"
    },
    {
      id: "Q3",
      moduleKey: "cognitive",
      type: "image-select-pool",
      prompt: {
        zh: "Select what you would wear.",
        en: "Select what you would wear."
      },
      sceneImage: "resources/images/Q4/Q4-1.png",
      options: [
        { image: "resources/images/Q4/Q4-2.png", isCorrect: false },
        { image: "resources/images/Q4/Q4-3.png", isCorrect: true },
        { image: "resources/images/Q4/Q4-4.png", isCorrect: false },
        { image: "resources/images/Q4/Q4-5.png", isCorrect: true },
        { image: "resources/images/Q4/Q4-6.png", isCorrect: true },
        { image: "resources/images/Q4/Q4-7.png", isCorrect: false }
      ],
      weightTag: "support"
    },
    {
      id: "Q4",
      moduleKey: "cognitive",
      type: "image-select-pool",
      prompt: {
        zh: "Select what you would wear.",
        en: "Select what you would wear."
      },
      sceneImage: "resources/images/Q5/Q5-1.png",
      options: [
        { image: "resources/images/Q5/Q5-2.png", isCorrect: false },
        { image: "resources/images/Q5/Q5-3.png", isCorrect: true },
        { image: "resources/images/Q5/Q5-4.png", isCorrect: true },
        { image: "resources/images/Q5/Q5-5.png", isCorrect: true },
        { image: "resources/images/Q5/Q5-6.png", isCorrect: false },
        { image: "resources/images/Q5/Q5-7.png", isCorrect: false }
      ],
      weightTag: "support"
    },
    {
      id: "Q5",
      moduleKey: "cognitive",
      type: "emotion-grid",
      prompt: {
        zh: "How would you feel?",
        en: "How would you feel?"
      },
      stemImage: "resources/images/Q6/question.png",
      rows: [
        {
          promptImage: "resources/images/Q6/6.1/1.png",
          options: [
            { image: "resources/images/Q6/6.1/happy.png", isCorrect: false },
            { image: "resources/images/Q6/6.1/sad.png", isCorrect: true }
          ]
        },
        {
          promptImage: "resources/images/Q6/6.2/2.png",
          options: [
            { image: "resources/images/Q6/6.2/happy.png", isCorrect: true },
            { image: "resources/images/Q6/6.2/sad.png", isCorrect: false }
          ]
        },
        {
          promptImage: "resources/images/Q6/6.3/3.png",
          options: [
            { image: "resources/images/Q6/6.3/happy.png", isCorrect: true },
            { image: "resources/images/Q6/6.3/sad.png", isCorrect: false }
          ]
        },
        {
          promptImage: "resources/images/Q6/6.4/4.png",
          options: [
            { image: "resources/images/Q6/6.4/happy.png", isCorrect: false },
            { image: "resources/images/Q6/6.4/sad.png", isCorrect: true }
          ]
        }
      ],
      weightTag: "support"
    },
    {
      id: "Q6",
      moduleKey: "cognitive",
      type: "image-match-grid",
      prompt: {
        zh: "Find the Opposite: Select the picture that shows the opposite of the first one.",
        en: "Find the Opposite: Select the picture that shows the opposite of the first one."
      },
      stemImage: "resources/images/Q7/question.png",
      rows: [
        {
          promptImage: "resources/images/Q7/Q7-1.png",
          options: [
            { image: "resources/images/Q7/Q7-2.png", isCorrect: false },
            { image: "resources/images/Q7/Q7-3.png", isCorrect: true }
          ]
        },
        {
          promptImage: "resources/images/Q7/Q7-4.png",
          options: [
            { image: "resources/images/Q7/Q7-5.png", isCorrect: true },
            { image: "resources/images/Q7/Q7-6.png", isCorrect: false }
          ]
        },
        {
          promptImage: "resources/images/Q7/Q7-7.png",
          options: [
            { image: "resources/images/Q7/Q7-8.png", isCorrect: true },
            { image: "resources/images/Q7/Q7-9.png", isCorrect: false }
          ]
        }
      ],
      weightTag: "support"
    },
    {
      id: "Q7",
      moduleKey: "cognitive",
      type: "image-match-grid-noexample",
      prompt: {
        zh: "Find the Opposite: Select the picture that shows the opposite of the first one.",
        en: "Find the Opposite: Select the picture that shows the opposite of the first one."
      },
      rows: [
        {
          promptImage: "resources/images/Q8/Q8-1.png",
          options: [
            { image: "resources/images/Q8/Q8-2.png", isCorrect: false },
            { image: "resources/images/Q8/Q8-3.png", isCorrect: true }
          ]
        },
        {
          promptImage: "resources/images/Q8/Q8-4.png",
          options: [
            { image: "resources/images/Q8/Q8-5.png", isCorrect: true },
            { image: "resources/images/Q8/Q8-6.png", isCorrect: false }
          ]
        },
        {
          promptImage: "resources/images/Q8/Q8-7.png",
          options: [
            { image: "resources/images/Q8/Q8-8.png", isCorrect: false },
            { image: "resources/images/Q8/Q8-9.png", isCorrect: true }
          ]
        }
      ],
      weightTag: "support"
    },
    {
      id: "Q8",
      moduleKey: "cognitive",
      type: "image-match-grid",
      prompt: {
        zh: "Select the picture that belongs with the first one.",
        en: "Select the picture that belongs with the first one."
      },
      stemImage: "resources/images/Q3/Q3-1.png",
      rows: [
        {
          promptImage: "resources/images/Q3/Q3-2.png",
          options: [
            { image: "resources/images/Q3/Q3-3.png", isCorrect: true },
            { image: "resources/images/Q3/Q3-4.png", isCorrect: false }
          ]
        },
        {
          promptImage: "resources/images/Q3/Q3-5.png",
          options: [
            { image: "resources/images/Q3/Q3-6.png", isCorrect: false },
            { image: "resources/images/Q3/Q3-7.png", isCorrect: true }
          ]
        },
        {
          promptImage: "resources/images/Q3/Q3-8.png",
          options: [
            { image: "resources/images/Q3/Q3-9.png", isCorrect: false },
            { image: "resources/images/Q3/Q3-10.png", isCorrect: true }
          ]
        }
      ],
      weightTag: "core"
    },
    {
      id: "S1",
      moduleKey: "cognitive",
      type: "image-multi-pair-grid",
      prompt: {
        zh: "选出与参考图相同的图片。",
        en: "Select the image that matches the reference."
      },
      stemImage: "resources/images/Q1Example/Screenshot 2026-04-15 at 15.58.38.png",
      rows: [
        {
          options: [
            { image: "resources/images/Q1.1/Screenshot 2026-04-15 at 15.59.30.png", isCorrect: false },
            { image: "resources/images/Q1.1/Screenshot 2026-04-15 at 15.59.56.png", isCorrect: true },
            { image: "resources/images/Q1.1/Screenshot 2026-04-15 at 16.00.14.png", isCorrect: false },
            { image: "resources/images/Q1.1/Screenshot 2026-04-15 at 16.00.22.png", isCorrect: true }
          ]
        },
        {
          options: [
            { image: "resources/images/Q1.2/Screenshot 2026-04-15 at 16.03.20.png", isCorrect: false },
            { image: "resources/images/Q1.2/Screenshot 2026-04-15 at 16.03.33.png", isCorrect: true },
            { image: "resources/images/Q1.2/Screenshot 2026-04-15 at 16.03.38.png", isCorrect: true },
            { image: "resources/images/Q1.2/Screenshot 2026-04-15 at 16.03.46.png", isCorrect: false }
          ]
        },
        {
          options: [
            { image: "resources/images/Q1.3/Screenshot 2026-04-15 at 16.04.14.png", isCorrect: true },
            { image: "resources/images/Q1.3/Screenshot 2026-04-15 at 16.04.19.png", isCorrect: false },
            { image: "resources/images/Q1.3/Screenshot 2026-04-15 at 16.04.23.png", isCorrect: false },
            { image: "resources/images/Q1.3/Screenshot 2026-04-15 at 16.04.27.png", isCorrect: true }
          ]
        }
      ],
      weightTag: "core"
    },
    {
      id: "S2",
      moduleKey: "cognitive",
      type: "image-pair-grid",
      prompt: {
        zh: "选出与其他不同的图片。",
        en: "Select the image that is different from the others."
      },
      stemImage: "resources/images/Q2Example/Screenshot 2026-04-15 at 16.06.09.png",
      rows: [
        {
          options: [
            { image: "resources/images/Q2.1/Screenshot 2026-04-15 at 16.06.44.png", isCorrect: false },
            { image: "resources/images/Q2.1/Screenshot 2026-04-15 at 16.06.50.png", isCorrect: false },
            { image: "resources/images/Q2.1/Screenshot 2026-04-15 at 16.06.55.png", isCorrect: true },
            { image: "resources/images/Q2.1/Screenshot 2026-04-15 at 16.07.01.png", isCorrect: false }
          ]
        },
        {
          options: [
            { image: "resources/images/Q2.2/Screenshot 2026-04-15 at 16.07.14.png", isCorrect: true },
            { image: "resources/images/Q2.2/Screenshot 2026-04-15 at 16.07.20.png", isCorrect: false },
            { image: "resources/images/Q2.2/Screenshot 2026-04-15 at 16.07.27.png", isCorrect: false },
            { image: "resources/images/Q2.2/Screenshot 2026-04-15 at 16.07.32.png", isCorrect: false }
          ]
        },
        {
          options: [
            { image: "resources/images/Q2.3/Screenshot 2026-04-15 at 16.07.42.png", isCorrect: false },
            { image: "resources/images/Q2.3/Screenshot 2026-04-15 at 16.07.46.png", isCorrect: true },
            { image: "resources/images/Q2.3/Screenshot 2026-04-15 at 16.07.50.png", isCorrect: false },
            { image: "resources/images/Q2.3/Screenshot 2026-04-15 at 16.07.55.png", isCorrect: false }
          ]
        }
      ],
      weightTag: "core"
    },
    {
      id: "Q11",
      moduleKey: "barrier",
      type: "teacher-scale",
      prompt: {
        zh: "图片任务中的提示依赖程度",
        en: "Prompt dependence during picture tasks"
      },
      description: {
        zh: "观察学生在作答时是否需要反复提示、手势引导或示范才能回应。",
        en: "Observe whether the child waits for hints, repeated directions, pointing cues, or models before responding."
      },
      options: [
        { value: 2, label: { zh: "2 — 通常一次指令即可回应，几乎不需额外提示", en: "2 — Usually responds after the first direction, with little or no prompting" } },
        { value: 1, label: { zh: "1 — 常需要重复指令、手势引导或缩小选择范围", en: "1 — Often needs repetition, gesture cue, or choice narrowing" } },
        { value: 0, label: { zh: "0 — 大多数题目都严重依赖提示", en: "0 — Depends heavily on prompts on most items" } }
      ],
      weightTag: "barrier"
    },
    {
      id: "Q12",
      moduleKey: "barrier",
      type: "teacher-scale",
      prompt: {
        zh: "测评过程中的工作行为与转换准备度",
        en: "Work behavior and transition readiness during test"
      },
      description: {
        zh: "观察学生是否能安坐、在任务间转换、并在不出现严重拒绝或情绪失控的情况下完成简短评估。",
        en: "Observe whether the child can stay seated, shift between tasks, and finish the short assessment without major refusal or dysregulation."
      },
      options: [
        { value: 2, label: { zh: "2 — 能保持参与并在任务间顺利转换，几乎不需支持", en: "2 — Stays engaged and transitions between tasks with minimal support" } },
        { value: 1, label: { zh: "1 — 有轻微困难，但在支持下能完成", en: "1 — Mild difficulty but finishes with support" } },
        { value: 0, label: { zh: "0 — 频繁拒绝、逃避或无法完成简短评估", en: "0 — Frequent refusal, escape, or inability to complete the short assessment" } }
      ],
      weightTag: "barrier"
    }
  ];

  const dom = {
    docTitle: document.getElementById("doc-title"),
    brandHome: document.getElementById("brand-home"),
    homeButton: document.getElementById("home-button"),
    langSwitch: document.getElementById("lang-switch"),
    langButtons: Array.from(document.querySelectorAll(".lang-btn")),
    stepMeta: document.getElementById("step-meta"),
    stepQuestionnaire: document.getElementById("step-questionnaire"),
    stepResult: document.getElementById("step-result"),
    metaForm: document.getElementById("meta-form"),
    questionnaireForm: document.getElementById("questionnaire-form"),
    studentId: document.getElementById("student-id"),
    teacherName: document.getElementById("teacher-name"),
    assessmentDate: document.getElementById("assessment-date"),
    metaError: document.getElementById("meta-error"),
    configError: document.getElementById("config-error"),
    questionnaireError: document.getElementById("questionnaire-error"),
    progressBar: document.getElementById("progress-bar"),
    progressText: document.getElementById("progress-text"),
    questionCounter: document.getElementById("question-counter"),
    questionJumpList: document.getElementById("question-jump-list"),
    resultBox: document.getElementById("result-box"),
    moduleBars: document.getElementById("module-bars"),
    trackBars: document.getElementById("track-bars"),
    recommendationList: document.getElementById("recommendation-list"),
    historyList: document.getElementById("history-list"),
    backMeta: document.getElementById("back-meta"),
    saveDraft: document.getElementById("save-draft"),
    previousQuestion: document.getElementById("previous-question"),
    nextQuestion: document.getElementById("next-question"),
    generateResult: document.getElementById("generate-result"),
    editAnswers: document.getElementById("edit-answers"),
    saveRecord: document.getElementById("save-record"),
    exportRecord: document.getElementById("export-record")
  };

  const state = {
    lang: readLanguage(),
    meta: {
      studentId: "",
      teacherName: "",
      assessmentDate: ""
    },
    answers: {},
    compositeSelections: {},
    poolSelections: {},
    result: null,
    configValid: true,
    currentQuestionIndex: 0
  };

  function init() {
    const errors = validateConfig();

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    applyStaticI18n();
    updateLangButtons();

    if (errors.length > 0) {
      state.configValid = false;
      showError(dom.configError, `${t("messages.configPrefix")}${errors[0]}`);
      dom.questionnaireForm.hidden = true;
      dom.generateResult.disabled = true;
    } else {
      renderQuestionnaire();
    }

    if (!dom.assessmentDate.value) {
      dom.assessmentDate.value = todayISO();
    }

    attachEvents();
    loadDraftIntoState();
    state.currentQuestionIndex = getInitialQuestionIndex();
    applyStateToForm();
    updateProgress();
    renderHistory();

    showStep("meta");
    scrollToStep(dom.stepMeta);
  }

  function readLanguage() {
    const stored = localStorage.getItem(STORAGE_KEYS.language);
    return SUPPORTED_LANGS.includes(stored) ? stored : "zh";
  }

  function applyStaticI18n() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";

    if (dom.docTitle) {
      dom.docTitle.textContent = t("docTitle");
    }

    dom.langSwitch.setAttribute("aria-label", t("a11y.languageSwitch"));

    const items = document.querySelectorAll("[data-i18n]");
    items.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key);
      if (typeof value === "string") {
        el.textContent = value;
      }
    });
  }

  function updateLangButtons() {
    dom.langButtons.forEach((btn) => {
      const active = btn.dataset.lang === state.lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang) || lang === state.lang) {
      return;
    }

    state.lang = lang;
    localStorage.setItem(STORAGE_KEYS.language, lang);

    applyStaticI18n();
    updateLangButtons();

    if (state.configValid) {
      renderQuestionnaire();
      applyStateToForm();
    }

    if (state.result) {
      renderResult(state.result);
    }

    updateProgress();
    renderHistory();
  }

  function t(path) {
    const value = path
      .split(".")
      .reduce((acc, key) => (acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : null), UI_TEXT[state.lang]);
    return value == null ? path : value;
  }

  function localize(value) {
    if (value && typeof value === "object" && (value.zh || value.en)) {
      return String(value[state.lang] || value.zh || value.en || "");
    }
    return String(value || "");
  }

  function isCompositeType(type) {
    return type === "image-match-grid" || type === "emotion-grid" || type === "image-match-grid-noexample" || type === "image-pair-grid" || type === "image-multi-pair-grid";
  }

  function isMultiSelectComposite(type) {
    return type === "image-multi-pair-grid";
  }

  function validateConfig() {
    const errors = [];

    QUESTIONS.forEach((question, index) => {
      if (!question.id || !question.moduleKey || !question.weightTag) {
        errors.push(`QUESTIONS[${index}] missing id/moduleKey/weightTag`);
      }
      assertBilingual(question.prompt, `QUESTIONS[${index}].prompt`, errors);

      if (isCompositeType(question.type)) {
        if (
          question.type !== "image-match-grid-noexample" &&
          question.type !== "image-pair-grid" &&
          question.type !== "image-multi-pair-grid" &&
          (!question.stemImage || typeof question.stemImage !== "string")
        ) {
          errors.push(`QUESTIONS[${index}] missing stemImage`);
        }
        if (!Array.isArray(question.rows) || question.rows.length === 0) {
          errors.push(`QUESTIONS[${index}].rows must contain at least 1 row`);
        } else {
          question.rows.forEach((row, rowIndex) => {
            if (
              question.type !== "image-pair-grid" &&
              question.type !== "image-multi-pair-grid" &&
              (!row.promptImage || typeof row.promptImage !== "string")
            ) {
              errors.push(`QUESTIONS[${index}].rows[${rowIndex}].promptImage missing`);
            }
            if (!Array.isArray(row.options) || row.options.length < 2) {
              errors.push(`QUESTIONS[${index}].rows[${rowIndex}].options must contain at least 2 options`);
            } else {
              row.options.forEach((option, optionIndex) => {
                if (!option.image || typeof option.image !== "string") {
                  errors.push(`QUESTIONS[${index}].rows[${rowIndex}].options[${optionIndex}].image missing`);
                }
                if (typeof option.isCorrect !== "boolean") {
                  errors.push(`QUESTIONS[${index}].rows[${rowIndex}].options[${optionIndex}].isCorrect missing`);
                }
              });
            }
          });
        }
      } else if (question.type === "image-select-pool") {
        if (!question.sceneImage || typeof question.sceneImage !== "string") {
          errors.push(`QUESTIONS[${index}] missing sceneImage`);
        }
        if (!Array.isArray(question.options) || question.options.length === 0) {
          errors.push(`QUESTIONS[${index}].options must contain at least 1 option`);
        } else {
          question.options.forEach((option, optionIndex) => {
            if (!option.image || typeof option.image !== "string") {
              errors.push(`QUESTIONS[${index}].options[${optionIndex}].image missing`);
            }
            if (typeof option.isCorrect !== "boolean") {
              errors.push(`QUESTIONS[${index}].options[${optionIndex}].isCorrect missing`);
            }
          });
        }
      } else if (question.type === "teacher-scale") {
        if (!Array.isArray(question.options) || question.options.length === 0) {
          errors.push(`QUESTIONS[${index}].options must contain at least 1 option`);
        } else {
          question.options.forEach((option, optionIndex) => {
            if (typeof option.value !== "number") {
              errors.push(`QUESTIONS[${index}].options[${optionIndex}].value must be a number`);
            }
            assertBilingual(option.label, `QUESTIONS[${index}].options[${optionIndex}].label`, errors);
          });
        }
        if (question.description) {
          assertBilingual(question.description, `QUESTIONS[${index}].description`, errors);
        }
      }
    });

    if (QUESTIONS.length !== 12) {
      errors.push(`Expected 12 questions, got ${QUESTIONS.length}`);
    }

    return errors;
  }

  function assertBilingual(value, path, errors) {
    if (!value || typeof value !== "object") {
      errors.push(`${path} must be an object with zh/en`);
      return;
    }
    if (typeof value.zh !== "string" || value.zh.trim() === "") {
      errors.push(`${path}.zh must be non-empty string`);
    }
    if (typeof value.en !== "string" || value.en.trim() === "") {
      errors.push(`${path}.en must be non-empty string`);
    }
  }

  function renderQuestionnaire() {
    dom.questionnaireForm.innerHTML = "";
    dom.questionJumpList.innerHTML = "";
    dom.questionJumpList.setAttribute("aria-label", t("questionnaire.questionJump"));

    QUESTIONS.forEach((question, index) => {
      const jumpButton = document.createElement("button");
      jumpButton.className = "question-jump-btn";
      jumpButton.type = "button";
      jumpButton.dataset.questionIndex = String(index);
      jumpButton.textContent = String(index + 1);
      jumpButton.setAttribute("aria-label", formatQuestionPosition(index));
      dom.questionJumpList.appendChild(jumpButton);

      const fieldset = document.createElement("fieldset");
      fieldset.className = "question-card";
      fieldset.dataset.questionIndex = String(index);

      const legend = document.createElement("legend");
      legend.className = "question-title";
      legend.textContent = `${question.id}. ${localize(question.prompt)}`;
      fieldset.appendChild(legend);

      if (isCompositeType(question.type)) {
        fieldset.classList.add("image-match-question");
        if (question.type === "emotion-grid") {
          fieldset.classList.add("emotion-grid-question");
        }
        if (question.type === "image-pair-grid" || question.type === "image-multi-pair-grid") {
          fieldset.classList.add("image-pair-question");
        }

        if (question.stemImage) {
          const stemWrap = document.createElement("div");
          stemWrap.className = "match-stem";

          if (question.type === "image-match-grid" || question.type === "image-pair-grid") {
            const stemLabel = document.createElement("span");
            stemLabel.className = "match-stem-label";
            stemLabel.textContent = t("questionnaire.exampleLabel");
            stemWrap.appendChild(stemLabel);
          }

          const stemImg = document.createElement("img");
          stemImg.src = question.stemImage;
          stemImg.alt = `${question.id} stem`;
          stemImg.className = "match-stem-img";

          stemWrap.appendChild(stemImg);
          fieldset.appendChild(stemWrap);
        }

        const grid = document.createElement("div");
        grid.className = "match-grid";

        question.rows.forEach((rowItem, rowIndex) => {
          const row = document.createElement("div");
          row.className = "match-row";

          const rowLabel = document.createElement("div");
          rowLabel.className = "match-row-label";
          rowLabel.textContent = `${String.fromCharCode(65 + rowIndex)}.`;
          row.appendChild(rowLabel);

          if (question.type !== "image-pair-grid" && question.type !== "image-multi-pair-grid") {
            const promptWrap = document.createElement("div");
            promptWrap.className = "match-prompt";

            const promptImg = document.createElement("img");
            promptImg.src = rowItem.promptImage;
            promptImg.alt = `${question.id} row ${rowIndex + 1} prompt`;
            promptImg.className = "match-prompt-img";

            promptWrap.appendChild(promptImg);
            row.appendChild(promptWrap);
          }

          const options = document.createElement("div");
          options.className = "match-options";

          rowItem.options.forEach((option, optionIndex) => {
            const button = document.createElement("button");
            button.className = question.type === "emotion-grid" ? "match-option emotion-option" : "match-option";
            button.type = "button";
            button.dataset.compositeQuestionId = question.id;
            button.dataset.compositeRowIndex = String(rowIndex);
            button.dataset.compositeOptionIndex = String(optionIndex);
            button.setAttribute("aria-pressed", "false");
            button.setAttribute("aria-label", `${question.id} row ${rowIndex + 1} option ${optionIndex + 1}`);

            const img = document.createElement("img");
            img.src = option.image;
            img.alt = `${question.id} row ${rowIndex + 1} option ${optionIndex + 1}`;
            img.className = "match-option-img";
            if (question.type === "emotion-grid") {
              img.classList.add(option.image.includes("/sad.png") ? "emotion-face--sad" : "emotion-face--happy");
            }

            button.appendChild(img);
            options.appendChild(button);
          });

          row.appendChild(options);
          grid.appendChild(row);
        });

        fieldset.appendChild(grid);
      } else if (question.type === "image-select-pool") {
        fieldset.classList.add("image-pool-question");

        const sceneWrap = document.createElement("div");
        sceneWrap.className = "pool-scene";

        const sceneImg = document.createElement("img");
        sceneImg.src = question.sceneImage;
        sceneImg.alt = `${question.id} scene`;
        sceneImg.className = "pool-scene-img";

        sceneWrap.appendChild(sceneImg);
        fieldset.appendChild(sceneWrap);

        const pool = document.createElement("div");
        pool.className = "answer-pool";

        const poolLabel = document.createElement("p");
        poolLabel.className = "answer-pool-label";
        poolLabel.textContent = t("questionnaire.answerPoolLabel");
        pool.appendChild(poolLabel);

        const poolGrid = document.createElement("div");
        poolGrid.className = "answer-pool-grid";

        question.options.forEach((option, optionIndex) => {
          const button = document.createElement("button");
          button.className = "pool-option";
          button.type = "button";
          button.dataset.poolQuestionId = question.id;
          button.dataset.poolOptionIndex = String(optionIndex);
          button.setAttribute("aria-pressed", "false");
          button.setAttribute("aria-label", `${question.id} option ${optionIndex + 1}`);

          const img = document.createElement("img");
          img.src = option.image;
          img.alt = `${question.id} option ${optionIndex + 1}`;
          img.className = "pool-option-img";

          button.appendChild(img);
          poolGrid.appendChild(button);
        });

        pool.appendChild(poolGrid);
        fieldset.appendChild(pool);
      } else if (question.type === "teacher-scale") {
        fieldset.classList.add("teacher-scale-question");

        if (question.description) {
          const descP = document.createElement("p");
          descP.className = "question-description";
          descP.textContent = localize(question.description);
          fieldset.appendChild(descP);
        }

        const scaleDiv = document.createElement("div");
        scaleDiv.className = "scale-options";

        question.options.forEach((option) => {
          const label = document.createElement("label");
          label.className = "choice";

          const input = document.createElement("input");
          input.type = "radio";
          input.name = question.id;
          input.value = String(option.value);

          const span = document.createElement("span");
          span.textContent = localize(option.label);

          label.appendChild(input);
          label.appendChild(span);
          scaleDiv.appendChild(label);
        });

        fieldset.appendChild(scaleDiv);
      }

      dom.questionnaireForm.appendChild(fieldset);
    });

    updateQuestionNavigation();
  }

  function findQuestion(questionId) {
    return QUESTIONS.find((question) => question.id === questionId) || null;
  }

  function getCompositeScore(questionId) {
    const question = findQuestion(questionId);
    if (!question || !isCompositeType(question.type)) {
      return null;
    }

    const selections = state.compositeSelections[questionId];
    if (!Array.isArray(selections) || selections.length !== question.rows.length) {
      return null;
    }

    if (isMultiSelectComposite(question.type)) {
      const hasAnySelection = selections.some((row) => Array.isArray(row) && row.length > 0);
      if (!hasAnySelection) {
        return null;
      }

      let correctRows = 0;
      let anyCorrectOption = false;
      question.rows.forEach((row, rowIndex) => {
        const rowSelections = selections[rowIndex];
        if (!Array.isArray(rowSelections) || rowSelections.length === 0) {
          return;
        }
        const allCorrectSelected = row.options.every((option, optIdx) => {
          if (option.isCorrect) {
            return rowSelections.includes(optIdx);
          }
          return !rowSelections.includes(optIdx);
        });
        if (allCorrectSelected) {
          correctRows++;
        }
        rowSelections.forEach((optIdx) => {
          if (row.options[optIdx] && row.options[optIdx].isCorrect) {
            anyCorrectOption = true;
          }
        });
      });

      if (correctRows === question.rows.length) {
        return 2;
      }
      if (anyCorrectOption) {
        return 1;
      }
      return 0;
    }

    const hasAnySelection = selections.some((value) => Number.isInteger(value));
    if (!hasAnySelection) {
      return null;
    }

    const correctCount = question.rows.reduce((count, row, rowIndex) => {
      const optionIndex = selections[rowIndex];
      return count + (Number.isInteger(optionIndex) && row.options[optionIndex] && row.options[optionIndex].isCorrect ? 1 : 0);
    }, 0);

    if (correctCount === question.rows.length) {
      return 2;
    }
    if (correctCount > 0) {
      return 1;
    }
    return 0;
  }

  function syncCompositeQuestionAnswer(questionId) {
    const score = getCompositeScore(questionId);
    if (score == null) {
      delete state.answers[questionId];
      return;
    }
    state.answers[questionId] = score;
  }

  function applyCompositeSelections(questionId) {
    const question = findQuestion(questionId);
    const selections = state.compositeSelections[questionId] || [];
    const buttons = dom.questionnaireForm.querySelectorAll(`[data-composite-question-id="${questionId}"]`);

    const multi = question && isMultiSelectComposite(question.type);

    buttons.forEach((button) => {
      const rowIndex = Number(button.dataset.compositeRowIndex);
      const optionIndex = Number(button.dataset.compositeOptionIndex);
      const selected = multi
        ? Array.isArray(selections[rowIndex]) && selections[rowIndex].includes(optionIndex)
        : selections[rowIndex] === optionIndex;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function getPoolScore(questionId) {
    const question = findQuestion(questionId);
    if (!question || question.type !== "image-select-pool") {
      return null;
    }

    const selections = state.poolSelections[questionId];
    if (!Array.isArray(selections) || selections.length !== question.options.length) {
      return null;
    }

    const hasAnySelection = selections.some((selected) => selected === true);
    if (!hasAnySelection) {
      return null;
    }

    const allMatch = question.options.every((option, index) => {
      return Boolean(selections[index]) === option.isCorrect;
    });
    if (allMatch) {
      return 2;
    }

    const hasCorrectSelected = question.options.some((option, index) => {
      return option.isCorrect && Boolean(selections[index]);
    });
    if (hasCorrectSelected) {
      return 1;
    }

    return 0;
  }

  function syncPoolQuestionAnswer(questionId) {
    const score = getPoolScore(questionId);
    if (score == null) {
      delete state.answers[questionId];
      return;
    }
    state.answers[questionId] = score;
  }

  function applyPoolSelections(questionId) {
    const selections = state.poolSelections[questionId] || [];
    const buttons = dom.questionnaireForm.querySelectorAll(`[data-pool-question-id="${questionId}"]`);

    buttons.forEach((button) => {
      const optionIndex = Number(button.dataset.poolOptionIndex);
      const selected = selections[optionIndex] === true;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function getAnsweredCount() {
    return QUESTIONS.reduce((count, question) => {
      return count + (Number.isFinite(Number(state.answers[question.id])) ? 1 : 0);
    }, 0);
  }

  function getAnswerableCount() {
    return QUESTIONS.length;
  }

  function getInitialQuestionIndex() {
    const firstUnanswered = QUESTIONS.findIndex((question) => {
      return !Number.isFinite(Number(state.answers[question.id]));
    });
    return firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered;
  }

  function formatQuestionPosition(index) {
    return t("questionnaire.questionPosition")
      .replace("{current}", String(index + 1))
      .replace("{total}", String(QUESTIONS.length));
  }

  function goToQuestion(index) {
    const nextIndex = clamp(index, 0, QUESTIONS.length - 1);
    if (nextIndex === state.currentQuestionIndex) {
      return;
    }
    state.currentQuestionIndex = nextIndex;
    updateQuestionNavigation();
    hideError(dom.questionnaireError);
  }

  function syncAnswerState() {
    state.result = null;
    updateProgress();
    updateQuestionNavigation();
    hideError(dom.questionnaireError);
    persistDraft();
  }

  function updateQuestionNavigation() {
    const answeredCount = getAnsweredCount();
    const questionCards = Array.from(dom.questionnaireForm.querySelectorAll(".question-card"));
    const jumpButtons = Array.from(dom.questionJumpList.querySelectorAll(".question-jump-btn"));

    questionCards.forEach((card, index) => {
      const active = index === state.currentQuestionIndex;
      card.hidden = !active;
      card.classList.toggle("is-active", active);
    });

    jumpButtons.forEach((button, index) => {
      const question = QUESTIONS[index];
      const answered = Number.isFinite(Number(state.answers[question.id]));
      const active = index === state.currentQuestionIndex;

      button.classList.toggle("is-current", active);
      button.classList.toggle("is-answered", answered);
      button.setAttribute("aria-pressed", active ? "true" : "false");
      if (active) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
      button.setAttribute("aria-label", formatQuestionPosition(index));
    });

    dom.questionCounter.textContent = formatQuestionPosition(state.currentQuestionIndex);
    dom.previousQuestion.disabled = state.currentQuestionIndex === 0;
    dom.nextQuestion.hidden = state.currentQuestionIndex === QUESTIONS.length - 1;
    dom.generateResult.hidden = state.currentQuestionIndex !== QUESTIONS.length - 1;
    dom.generateResult.disabled = answeredCount !== getAnswerableCount();
    dom.generateResult.title = answeredCount === getAnswerableCount() ? "" : t("questionnaire.submitHint");
  }

  function attachEvents() {
    dom.brandHome.addEventListener("click", () => {
      resetAssessment();
    });

    dom.homeButton.addEventListener("click", () => {
      resetAssessment();
    });

    dom.langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
      });
    });

    dom.metaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const meta = readMetaFromInputs();

      if (!isMetaComplete(meta)) {
        showError(dom.metaError, t("messages.metaRequired"));
        return;
      }

      hideError(dom.metaError);
      state.meta = meta;
      state.currentQuestionIndex = 0;
      updateQuestionNavigation();
      persistDraft();
      showStep("questionnaire");
    });

    dom.questionnaireForm.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const poolButton = target.closest(".pool-option");
      if (poolButton instanceof HTMLButtonElement) {
        const questionId = poolButton.dataset.poolQuestionId;
        const optionIndex = Number(poolButton.dataset.poolOptionIndex);
        const question = questionId ? findQuestion(questionId) : null;

        if (!questionId || !question || question.type !== "image-select-pool" || !Number.isInteger(optionIndex)) {
          return;
        }

        const currentSelections = Array.isArray(state.poolSelections[questionId])
          ? [...state.poolSelections[questionId]]
          : new Array(question.options.length).fill(false);

        currentSelections[optionIndex] = !currentSelections[optionIndex];
        state.poolSelections[questionId] = currentSelections;
        syncPoolQuestionAnswer(questionId);
        applyPoolSelections(questionId);
        syncAnswerState();
        return;
      }

      const button = target.closest(".match-option");
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      const questionId = button.dataset.compositeQuestionId;
      const rowIndex = Number(button.dataset.compositeRowIndex);
      const optionIndex = Number(button.dataset.compositeOptionIndex);
      const question = questionId ? findQuestion(questionId) : null;

      if (
        !questionId ||
        !question ||
        !isCompositeType(question.type) ||
        !Number.isInteger(rowIndex) ||
        !Number.isInteger(optionIndex)
      ) {
        return;
      }

      if (isMultiSelectComposite(question.type)) {
        const currentSelections = Array.isArray(state.compositeSelections[questionId])
          ? state.compositeSelections[questionId].map((row) => (Array.isArray(row) ? [...row] : []))
          : new Array(question.rows.length).fill(null).map(() => []);

        const rowSelections = currentSelections[rowIndex];
        const idx = rowSelections.indexOf(optionIndex);
        if (idx >= 0) {
          rowSelections.splice(idx, 1);
        } else {
          rowSelections.push(optionIndex);
        }
        state.compositeSelections[questionId] = currentSelections;
        syncCompositeQuestionAnswer(questionId);
        applyCompositeSelections(questionId);
        syncAnswerState();
        return;
      }

      const currentSelections = Array.isArray(state.compositeSelections[questionId])
        ? [...state.compositeSelections[questionId]]
        : new Array(question.rows.length).fill(null);

      currentSelections[rowIndex] = currentSelections[rowIndex] === optionIndex ? null : optionIndex;
      state.compositeSelections[questionId] = currentSelections;
      syncCompositeQuestionAnswer(questionId);
      applyCompositeSelections(questionId);
      syncAnswerState();
    });

    dom.questionnaireForm.addEventListener("change", (event) => {
      if (event.target instanceof HTMLInputElement && event.target.type === "radio") {
        const questionId = event.target.name;
        const value = Number(event.target.value);
        if (questionId && Number.isFinite(value)) {
          state.answers[questionId] = value;
          syncAnswerState();
        }
      }
    });

    dom.questionnaireForm.addEventListener("pointerdown", (event) => {
      if (!(event.target instanceof HTMLSpanElement)) {
        return;
      }
      const label = event.target.closest("label.choice");
      if (!label) {
        return;
      }
      const input = label.querySelector("input[type=\"radio\"]");
      if (!input || !input.checked) {
        return;
      }
      event.preventDefault();
      input.checked = false;
      const questionId = input.name;
      delete state.answers[questionId];
      syncAnswerState();
    });

    dom.questionJumpList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) {
        return;
      }
      goToQuestion(Number(target.dataset.questionIndex));
    });

    dom.backMeta.addEventListener("click", () => {
      showStep("meta");
    });

    dom.saveDraft.addEventListener("click", () => {
      state.meta = readMetaFromInputs();
      persistDraft();
      flashButton(dom.saveDraft, t("messages.draftSaved"));
    });

    dom.previousQuestion.addEventListener("click", () => {
      goToQuestion(state.currentQuestionIndex - 1);
    });

    dom.nextQuestion.addEventListener("click", () => {
      goToQuestion(state.currentQuestionIndex + 1);
    });

    dom.generateResult.addEventListener("click", () => {
      generateAndRenderResult();
    });

    dom.editAnswers.addEventListener("click", () => {
      state.currentQuestionIndex = getInitialQuestionIndex();
      updateQuestionNavigation();
      showStep("questionnaire");
    });

    dom.saveRecord.addEventListener("click", () => {
      if (!state.result) {
        generateAndRenderResult();
        if (!state.result) {
          return;
        }
      }

      const record = buildRecord({
        meta: state.meta,
        answers: state.answers,
        result: state.result
      });

      const records = readRecords();
      records.unshift(record);
      writeRecords(records);
      localStorage.removeItem(STORAGE_KEYS.draft);
      renderHistory();
      flashButton(dom.saveRecord, t("messages.recordSaved"));
    });

    dom.exportRecord.addEventListener("click", () => {
      if (!state.result) {
        generateAndRenderResult();
        if (!state.result) {
          return;
        }
      }

      const record = buildRecord({
        meta: state.meta,
        answers: state.answers,
        result: state.result
      });
      exportRecord(record);
    });

    dom.historyList.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) {
        return;
      }

      const recordId = target.dataset.recordId;
      const action = target.dataset.action;
      if (!recordId || !action) {
        return;
      }

      const records = readRecords();
      const record = records.find((item) => item.id === recordId);
      if (!record) {
        return;
      }

      if (action === "load") {
        loadRecord(record);
      }
      if (action === "delete") {
        const remain = records.filter((item) => item.id !== recordId);
        writeRecords(remain);
        renderHistory();
      }
      if (action === "export") {
        exportRecord(record);
      }
    });
  }

  function generateAndRenderResult() {
    const meta = readMetaFromInputs();

    if (!isMetaComplete(meta)) {
      showStep("meta");
      showError(dom.metaError, t("messages.fillMetaFirst"));
      return;
    }

    const missing = QUESTIONS.filter((question) => !Number.isFinite(state.answers[question.id]));
    if (missing.length > 0) {
      showError(dom.questionnaireError, formatUnansweredText(missing.length));
      const firstMissingIndex = QUESTIONS.findIndex((question) => !Number.isFinite(state.answers[question.id]));
      if (firstMissingIndex >= 0) {
        state.currentQuestionIndex = firstMissingIndex;
        updateQuestionNavigation();
      }
      showStep("questionnaire");
      return;
    }

    hideError(dom.questionnaireError);
    state.meta = meta;
    state.result = computeResult(state.answers);
    persistDraft();
    renderResult(state.result);
    showStep("result");
  }

  function formatUnansweredText(count) {
    return `${t("messages.unansweredPrefix")} ${count} ${t("messages.unansweredSuffix")}`;
  }

  function computeResult(answers) {
    const LEVEL_DESCRIPTIONS = {
      1: { zh: "第一级（0-8分）：高度支持", en: "Level 1 (0-8 points): High Support" },
      2: { zh: "第二级（9-16分）：小组支持", en: "Level 2 (9-16 points): Small Group Support" },
      3: { zh: "第三级（17-24分）：大班/低限制", en: "Level 3 (17-24 points): Large Group / Less Restrictive" }
    };

    const RECOMMENDATIONS = {
      1: [
        { zh: "学生可能仍处于基础视觉辨别、简单配对、简单听者反应、早期分类和极早期学业准备阶段。", en: "The student is likely still working on basic visual discrimination, simple matching, simple listener responding, early categorization, and very early academic readiness." },
        { zh: "建议以1对1或极小组形式进行高强度、结构化教学，重点建立基础能力如要求、命名、听者技能、模仿和视觉感知/配对技能。", en: "Recommend intensive and specialized 1:1 or very small-group instruction, with major emphasis on building foundational repertoires such as mands, tacts, listener responding, imitation, and visual perceptual/matching skills." }
      ],
      2: [
        { zh: "学生表现出一定的准备技能，但表现仍不够稳定或均衡。", en: "The student shows some usable readiness skills, but performance is still inconsistent or uneven." },
        { zh: "建议在小小组教学中提供支持，仍需频繁提示、重复和支架式教学，可逐步增加自然环境教学和与语言能力更强的同伴互动。", en: "Recommend small group instruction with support, still needing frequent cues, repetition, and scaffolded teaching. Can gradually increase natural environment teaching and exposure to more verbal peers." }
      ],
      3: [
        { zh: "学生在视觉、语言和学前学术任务方面展现出更广泛的准备度。", en: "The student is showing broader readiness across visual, language, and pre-academic tasks." },
        { zh: "建议更多独立完成图片任务、更强的分类和关联推理、更准确的早期识字任务、更强的数量比较，以及较少提示下的课堂独立性。可参与较大班级或限制较少的课堂。", en: "Recommend more independent task completion, stronger reasoning, early literacy, quantitative comparison, and classroom independence with less prompting. Ready for larger-group or less restrictive classroom participation." }
      ]
    };

    let totalScore = 0;
    let part1Score = 0;
    let part2Score = 0;

    QUESTIONS.forEach((question) => {
      const score = Number(answers[question.id]);
      if (Number.isFinite(score)) {
        totalScore += score;
        if (question.moduleKey === "cognitive") {
          part1Score += score;
        }
        if (question.moduleKey === "barrier") {
          part2Score += score;
        }
      }
    });

    let level;
    if (totalScore <= 8) {
      level = 1;
    } else if (totalScore <= 16) {
      level = 2;
    } else {
      level = 3;
    }

    return {
      totalScore,
      part1Score,
      part2Score,
      level,
      levelDescription: LEVEL_DESCRIPTIONS[level],
      recommendations: RECOMMENDATIONS[level]
    };
  }

  function renderResult(result) {
    dom.resultBox.innerHTML = "";

    const title = document.createElement("h3");
    title.className = "result-title";
    title.textContent = localize(result.levelDescription);

    const meta = document.createElement("p");
    meta.className = "result-meta";
    meta.textContent = formatResultMeta(state.meta);

    const totalP = document.createElement("p");
    totalP.style.margin = "0.45rem 0 0";
    totalP.style.fontWeight = "700";
    totalP.textContent = `${t("result.totalScore")}: ${result.totalScore} / 24`;

    dom.resultBox.appendChild(title);
    dom.resultBox.appendChild(meta);
    dom.resultBox.appendChild(totalP);

    dom.moduleBars.innerHTML = "";
    const part1Row = document.createElement("div");
    part1Row.className = "bar";
    const part1Label = document.createElement("div");
    part1Label.className = "bar-label";
    part1Label.textContent = `${t("result.moduleScores")}: ${result.part1Score} / 20`;
    const part1Track = document.createElement("div");
    part1Track.className = "bar-track";
    const part1Fill = document.createElement("div");
    part1Fill.className = "bar-fill";
    part1Fill.style.width = `${clamp((result.part1Score / 20) * 100, 0, 100)}%`;
    part1Track.appendChild(part1Fill);
    part1Row.appendChild(part1Label);
    part1Row.appendChild(part1Track);
    dom.moduleBars.appendChild(part1Row);

    dom.trackBars.innerHTML = "";
    const part2Row = document.createElement("div");
    part2Row.className = "bar";
    const part2Label = document.createElement("div");
    part2Label.className = "bar-label";
    part2Label.textContent = `${t("result.trackScores")}: ${result.part2Score} / 4`;
    const part2Track = document.createElement("div");
    part2Track.className = "bar-track";
    const part2Fill = document.createElement("div");
    part2Fill.className = "bar-fill";
    part2Fill.style.width = `${clamp((result.part2Score / 4) * 100, 0, 100)}%`;
    part2Track.appendChild(part2Fill);
    part2Row.appendChild(part2Label);
    part2Row.appendChild(part2Track);
    dom.trackBars.appendChild(part2Row);

    dom.recommendationList.innerHTML = "";
    result.recommendations.forEach((rec) => {
      const li = document.createElement("li");
      li.textContent = localize(rec);
      dom.recommendationList.appendChild(li);
    });
  }

  function formatResultMeta(meta) {
    if (state.lang === "zh") {
      return `${t("labels.studentId")} ${meta.studentId} · ${t("labels.teacher")} ${meta.teacherName} · ${t("labels.date")} ${meta.assessmentDate}`;
    }
    return `${t("labels.studentId")}: ${meta.studentId} · ${t("labels.teacher")}: ${meta.teacherName} · ${t("labels.date")}: ${meta.assessmentDate}`;
  }

  function buildRecord({ meta, answers, result }) {
    const answerItems = QUESTIONS.map((question) => ({
      questionId: question.id,
      score: Number(answers[question.id]),
      compositeSelections: Array.isArray(state.compositeSelections[question.id])
        ? state.compositeSelections[question.id]
        : undefined,
      poolSelections: Array.isArray(state.poolSelections[question.id]) ? state.poolSelections[question.id] : undefined,
      weightTag: question.weightTag,
      questionText: {
        zh: question.prompt.zh,
        en: question.prompt.en
      },
      moduleKey: question.moduleKey
    }));

    return {
      id: `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      meta: {
        studentId: meta.studentId,
        teacherName: meta.teacherName,
        assessmentDate: meta.assessmentDate
      },
      answers: answerItems,
      totalScore: result.totalScore,
      part1Score: result.part1Score,
      part2Score: result.part2Score,
      level: result.level,
      levelDescription: {
        zh: result.levelDescription.zh,
        en: result.levelDescription.en
      },
      recommendations: result.recommendations
    };
  }

  function loadRecord(record) {
    const meta = record.meta || {};
    state.meta = {
      studentId: String(meta.studentId || ""),
      teacherName: String(meta.teacherName || ""),
      assessmentDate: String(meta.assessmentDate || todayISO())
    };

    state.answers = toAnswerMap(record.answers || []);
    state.compositeSelections = extractCompositeSelections(record.answers || []);
    state.poolSelections = extractPoolSelections(record.answers || []);
    state.result = computeResult(state.answers);
    state.currentQuestionIndex = getInitialQuestionIndex();

    applyStateToForm();
    updateProgress();
    renderResult(state.result);
    showStep("result");
    persistDraft();
  }

  function toAnswerMap(answerList) {
    if (Array.isArray(answerList)) {
      return answerList.reduce((acc, answer) => {
        const id = answer.questionId;
        const score = Number(answer.score);
        if (id && Number.isFinite(score)) {
          acc[id] = score;
        }
        return acc;
      }, {});
    }

    if (answerList && typeof answerList === "object") {
      return Object.entries(answerList).reduce((acc, [key, value]) => {
        const score = Number(value);
        if (Number.isFinite(score)) {
          acc[key] = score;
        }
        return acc;
      }, {});
    }

    return {};
  }

  function extractCompositeSelections(answerList) {
    if (!Array.isArray(answerList)) {
      return {};
    }

    return answerList.reduce((acc, answer) => {
      if (answer && answer.questionId && Array.isArray(answer.compositeSelections)) {
        acc[answer.questionId] = answer.compositeSelections.map((value) => {
          if (Array.isArray(value)) {
            return value.filter((v) => Number.isInteger(v));
          }
          return Number.isInteger(value) ? value : null;
        });
      }
      return acc;
    }, {});
  }

  function extractPoolSelections(answerList) {
    if (!Array.isArray(answerList)) {
      return {};
    }

    return answerList.reduce((acc, answer) => {
      if (answer && answer.questionId && Array.isArray(answer.poolSelections)) {
        acc[answer.questionId] = answer.poolSelections.map((value) => value === true);
      }
      return acc;
    }, {});
  }

  function exportRecord(record) {
    const stamp = (record.timestamp || new Date().toISOString()).slice(0, 19).replace(/[:T]/g, "-");
    const safeStudent = (record.meta?.studentId || "student").replace(/[^\w\u4e00-\u9fa5-]+/g, "_");
    const filename = `aces-assessment-${safeStudent}-${stamp}.json`;

    const payload = JSON.stringify(record, null, 2);
    const blob = new Blob([payload], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function loadDraftIntoState() {
    const draft = readDraft();
    if (!draft) {
      return;
    }

    const meta = draft.meta || {};
    state.meta = {
      studentId: String(meta.studentId || ""),
      teacherName: String(meta.teacherName || ""),
      assessmentDate: String(meta.assessmentDate || todayISO())
    };

    state.answers = toAnswerMap(draft.answers || {});
    state.compositeSelections =
      draft.compositeSelections && typeof draft.compositeSelections === "object" ? draft.compositeSelections : {};
    state.poolSelections = draft.poolSelections && typeof draft.poolSelections === "object" ? draft.poolSelections : {};
    if (draft.result && isResultLike(draft.result)) {
      state.result = draft.result;
    }
  }

  function applyStateToForm() {
    dom.studentId.value = state.meta.studentId || "";
    dom.teacherName.value = state.meta.teacherName || "";
    dom.assessmentDate.value = state.meta.assessmentDate || todayISO();

    QUESTIONS.forEach((question) => {
      if (isCompositeType(question.type)) {
        applyCompositeSelections(question.id);
      }

      if (question.type === "image-select-pool") {
        applyPoolSelections(question.id);
      }
    });

    const radios = dom.questionnaireForm.querySelectorAll("input[type=\"radio\"]");
    radios.forEach((input) => {
      input.checked = Number(input.value) === state.answers[input.name];
    });

    updateQuestionNavigation();

    if (state.result) {
      renderResult(state.result);
    }
  }

  function updateProgress() {
    const answered = getAnsweredCount();
    const total = getAnswerableCount();

    dom.progressBar.max = total;
    dom.progressBar.value = answered;

    dom.progressText.textContent = `${answered} / ${total}`;
  }

  function persistDraft() {
    const draft = {
      meta: readMetaFromInputs(),
      answers: state.answers,
      compositeSelections: state.compositeSelections,
      poolSelections: state.poolSelections,
      result: state.result,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(draft));
  }

  function readDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.draft);
      return raw ? JSON.parse(raw) : null;
    } catch (_error) {
      return null;
    }
  }

  function readRecords() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.records);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function writeRecords(records) {
    localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records));
  }

  function renderHistory() {
    const records = readRecords();
    dom.historyList.innerHTML = "";

    if (records.length === 0) {
      const empty = document.createElement("li");
      empty.className = "history-item";
      empty.textContent = t("history.empty");
      dom.historyList.appendChild(empty);
      return;
    }

    records.forEach((record) => {
      const li = document.createElement("li");
      li.className = "history-item";

      const title = document.createElement("p");
      title.className = "history-title";
      const displayText = record.levelDescription
        ? localize(record.levelDescription)
        : (record.finalTrack ? localize(record.finalTrack.trackName) : t("messages.unknownTrack"));
      title.textContent = `${record.meta?.studentId || "N/A"} · ${displayText}`;

      const meta = document.createElement("p");
      meta.className = "history-meta";
      meta.textContent = formatHistoryMeta(record);

      const actions = document.createElement("div");
      actions.className = "history-actions";

      const loadBtn = makeHistoryButton("load", record.id, t("buttons.load"));
      const exportBtn = makeHistoryButton("export", record.id, t("buttons.export"));
      const deleteBtn = makeHistoryButton("delete", record.id, t("buttons.delete"));

      actions.appendChild(loadBtn);
      actions.appendChild(exportBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(title);
      li.appendChild(meta);
      li.appendChild(actions);
      dom.historyList.appendChild(li);
    });
  }

  function makeHistoryButton(action, recordId, text) {
    const button = document.createElement("button");
    button.className = "btn btn--outlined";
    button.type = "button";
    button.dataset.action = action;
    button.dataset.recordId = recordId;
    button.textContent = text;
    return button;
  }

  function formatHistoryMeta(record) {
    const teacher = record.meta?.teacherName || "-";
    const date = record.meta?.assessmentDate || "-";
    const locale = state.lang === "zh" ? "zh-CN" : "en-US";
    const savedAt = record.timestamp ? new Date(record.timestamp).toLocaleString(locale) : "-";

    if (state.lang === "zh") {
      return `${t("labels.teacher")} ${teacher} · ${t("labels.date")} ${date} · ${t("labels.savedAt")} ${savedAt}`;
    }

    return `${t("labels.teacher")}: ${teacher} · ${t("labels.date")}: ${date} · ${t("labels.savedAt")}: ${savedAt}`;
  }

  function readMetaFromInputs() {
    return {
      studentId: dom.studentId.value.trim(),
      teacherName: dom.teacherName.value.trim(),
      assessmentDate: dom.assessmentDate.value
    };
  }

  function isMetaComplete(meta) {
    return Boolean(meta.studentId && meta.teacherName && meta.assessmentDate);
  }

  function isResultLike(result) {
    return (
      result &&
      typeof result === "object" &&
      typeof result.totalScore === "number" &&
      typeof result.level === "number"
    );
  }

  function showStep(step) {
    dom.stepMeta.hidden = step !== "meta";
    dom.stepQuestionnaire.hidden = step !== "questionnaire";
    dom.stepResult.hidden = step !== "result";
  }

  function resetAssessment() {
    state.meta = {
      studentId: "",
      teacherName: "",
      assessmentDate: todayISO()
    };
    state.answers = {};
    state.compositeSelections = {};
    state.poolSelections = {};
    state.result = null;
    state.currentQuestionIndex = 0;

    localStorage.removeItem(STORAGE_KEYS.draft);

    hideError(dom.metaError);
    hideError(dom.questionnaireError);
    hideError(dom.configError);

    applyStateToForm();
    updateProgress();
    showStep("meta");
    scrollToStep(dom.stepMeta);
  }

  function scrollToStep(element) {
    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }

  function showError(el, text) {
    el.hidden = false;
    el.textContent = text;
  }

  function hideError(el) {
    el.hidden = true;
    el.textContent = "";
  }

  function flashButton(button, text) {
    const originalKey = button.dataset.i18n;
    const originalText = button.textContent;
    button.textContent = text;

    window.setTimeout(() => {
      if (originalKey) {
        button.textContent = t(originalKey);
      } else {
        button.textContent = originalText;
      }
    }, 1200);
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function round1(value) {
    return Math.round(value * 10) / 10;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  init();
})();
