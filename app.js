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
        start: "开始问卷",
        backToInfo: "返回信息页",
        saveDraft: "保存草稿",
        generateResult: "生成结果",
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
        referenceLabel: "原图"
      },
      result: {
        heading: "评估结果",
        moduleScores: "模块得分",
        trackScores: "分轨拟合分",
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
        start: "Start Questionnaire",
        backToInfo: "Back to Info",
        saveDraft: "Save Draft",
        generateResult: "Generate Result",
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
        referenceLabel: "Original"
      },
      result: {
        heading: "Assessment Result",
        moduleScores: "Module Scores",
        trackScores: "Track Fit Scores",
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

  const SCALE_OPTIONS = [
    {
      value: 1,
      label: {
        zh: "1 明显困难",
        en: "1 Significant difficulty"
      }
    },
    {
      value: 2,
      label: {
        zh: "2 需要较多支持",
        en: "2 Needs substantial support"
      }
    },
    {
      value: 3,
      label: {
        zh: "3 在提示下可完成",
        en: "3 Completes with prompts"
      }
    },
    {
      value: 4,
      label: {
        zh: "4 基本稳定",
        en: "4 Mostly consistent"
      }
    },
    {
      value: 5,
      label: {
        zh: "5 稳定独立",
        en: "5 Consistently independent"
      }
    }
  ];

  const MODULES = {
    cognitive: {
      name: {
        zh: "认知学习能力",
        en: "Cognitive Ability & Learning Potential"
      },
      lowScoreAdvice: {
        zh: "建议使用分步骤指令、短时任务和视觉提示卡，降低单次信息负荷。",
        en: "Use stepwise instructions, short tasks, and visual cues to reduce cognitive load."
      }
    },
    communication: {
      name: {
        zh: "沟通与社交互动",
        en: "Communication & Social Interaction"
      },
      lowScoreAdvice: {
        zh: "建议增加角色扮演与同伴互动练习，优先训练表达需求与轮流规则。",
        en: "Increase role-play and peer interaction practice, prioritizing need expression and turn-taking."
      }
    },
    life: {
      name: {
        zh: "生活技能",
        en: "Practical Life Skills"
      },
      lowScoreAdvice: {
        zh: "建议采用情境化生活任务与重复演练，逐步提升自理和任务完成能力。",
        en: "Adopt contextual daily tasks with repeated practice to build self-care and task completion skills."
      }
    },
    sensory: {
      name: {
        zh: "感觉与行为调节",
        en: "Sensory Processing & Behavioral Patterns"
      },
      lowScoreAdvice: {
        zh: "建议提供可预期的课堂节奏、感官调节角和过渡提醒，降低触发风险。",
        en: "Provide predictable routines, sensory regulation corners, and transition cues to reduce triggers."
      }
    }
  };

  const TRACKS = {
    employment: {
      name: {
        zh: "就业准备路径",
        en: "Employment Readiness Track"
      },
      recommendations: [
        {
          zh: "可加强任务连续性、时间意识与岗位沟通训练，逐步贴近真实工作流程。",
          en: "Strengthen task continuity, time awareness, and job communication to mirror real workflows."
        },
        {
          zh: "建议引入模拟岗位任务，训练在低提示条件下的稳定表现。",
          en: "Introduce simulated workplace tasks to build consistent performance with fewer prompts."
        }
      ]
    },
    independent: {
      name: {
        zh: "独立生活路径",
        en: "Independent Living Skills Track"
      },
      recommendations: [
        {
          zh: "建议重点发展购物、金钱管理、家庭事务等生活场景技能。",
          en: "Prioritize skills for shopping, money handling, and household routines."
        },
        {
          zh: "可将课程组织为“示范-跟做-独立完成”三步，逐步减少教师介入。",
          en: "Use a model-follow-independent sequence to gradually reduce teacher intervention."
        }
      ]
    },
    basic: {
      name: {
        zh: "基础行为支持路径",
        en: "Basic Behavioral Management Track"
      },
      recommendations: [
        {
          zh: "建议先聚焦行为稳定、基础沟通和课堂参与度，再逐步增加任务复杂度。",
          en: "Prioritize behavioral stability, basic communication, and classroom participation before increasing task complexity."
        },
        {
          zh: "采用高频短时练习与正向强化，建立可持续的学习节奏。",
          en: "Use frequent short practices and positive reinforcement to establish sustainable learning routines."
        }
      ]
    }
  };

  const QUESTIONS = [
    {
      id: "Q1",
      moduleKey: "cognitive",
      prompt: {
        zh: "学生在 10 分钟任务中保持注意力的稳定性。",
        en: "The student can maintain attention during a 10-minute task."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q2",
      moduleKey: "cognitive",
      prompt: {
        zh: "学生能理解并执行两步指令（例如“先拿本子，再坐回座位”）。",
        en: "The student can understand and follow two-step instructions."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q3",
      moduleKey: "cognitive",
      prompt: {
        zh: "学生能记住并在短时间后复现新学过的课堂流程。",
        en: "The student can recall and reproduce newly learned classroom procedures after a short delay."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q4",
      moduleKey: "cognitive",
      prompt: {
        zh: "遇到简单问题时，学生能尝试使用已学方法解决。",
        en: "When facing simple problems, the student attempts to apply learned strategies."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "support"
    },
    {
      id: "Q5",
      moduleKey: "communication",
      prompt: {
        zh: "学生会主动表达需求（口语、手势或替代沟通方式）。",
        en: "The student initiates communication of needs (speech, gestures, or alternative communication)."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q6",
      moduleKey: "communication",
      prompt: {
        zh: "学生能在对话中遵守轮流规则并等待回应。",
        en: "The student follows turn-taking rules and waits for responses in conversations."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q7",
      moduleKey: "communication",
      prompt: {
        zh: "学生能理解常见社交情境（如打招呼、道谢、请求帮助）。",
        en: "The student understands common social scenarios such as greeting, thanking, and asking for help."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "support"
    },
    {
      id: "Q8",
      moduleKey: "communication",
      prompt: {
        zh: "在角色扮演任务中，学生能根据情境作出合适回应。",
        en: "In role-play tasks, the student can provide context-appropriate responses."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q9",
      moduleKey: "life",
      prompt: {
        zh: "学生可独立或在少量提示下完成基本自理（穿衣、洗手、整理）。",
        en: "The student completes basic self-care (dressing, handwashing, organizing) independently or with minimal prompts."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q10",
      moduleKey: "life",
      prompt: {
        zh: "学生能够完成简单家务或教室值日任务。",
        en: "The student can complete simple household or classroom duty tasks."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "support"
    },
    {
      id: "Q11",
      moduleKey: "life",
      prompt: {
        zh: "在模拟购物/金钱活动中，学生能识别物品与基本金额。",
        en: "In simulated shopping or money activities, the student identifies items and basic amounts."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q12",
      moduleKey: "life",
      prompt: {
        zh: "学生能按步骤完成类岗位任务（领取任务、执行、反馈）。",
        en: "The student follows a work-like sequence (receive task, execute, report)."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q13",
      moduleKey: "sensory",
      prompt: {
        zh: "学生对常见课堂声音、光线和触觉刺激的耐受程度。",
        en: "The student tolerates common classroom sound, light, and tactile stimuli."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q14",
      moduleKey: "sensory",
      prompt: {
        zh: "出现不适时，学生能在提示下使用调节策略（深呼吸、短暂离席等）。",
        en: "When discomfort appears, the student can use regulation strategies with prompts (e.g., deep breathing, short break)."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "support"
    },
    {
      id: "Q15",
      moduleKey: "sensory",
      prompt: {
        zh: "学生在课堂转换环节（开始/结束/换活动）能保持行为稳定。",
        en: "The student maintains behavioral stability during transitions (start/end/activity change)."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q16",
      moduleKey: "sensory",
      prompt: {
        zh: "课堂日程发生小变动时，学生可在支持下接受调整。",
        en: "The student can accept small routine changes with support."
      },
      optionLabels: SCALE_OPTIONS,
      weightTag: "core"
    },
    {
      id: "Q17",
      moduleKey: "cognitive",
      type: "image-compare",
      prompt: {
        zh: "圈出比原图更大的图片。",
        en: "Circle the picture that is bigger than the original one."
      },
      referenceImage: "resources/images/Bug/BugOrigin.png",
      options: [
        {
          value: 5,
          image: "resources/images/Bug/BugLarger.png",
          label: { zh: "图片 A", en: "Image A" }
        },
        {
          value: 1,
          image: "resources/images/Bug/BugSmaller.png",
          label: { zh: "图片 B", en: "Image B" }
        }
      ],
      weightTag: "core"
    }
  ];

  const dom = {
    docTitle: document.getElementById("doc-title"),
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
    resultBox: document.getElementById("result-box"),
    moduleBars: document.getElementById("module-bars"),
    trackBars: document.getElementById("track-bars"),
    recommendationList: document.getElementById("recommendation-list"),
    historyList: document.getElementById("history-list"),
    backMeta: document.getElementById("back-meta"),
    saveDraft: document.getElementById("save-draft"),
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
    result: null,
    configValid: true
  };

  function init() {
    const errors = validateConfig();

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
    applyStateToForm();
    updateProgress();
    renderHistory();

    if (Object.keys(state.answers).length > 0 && isMetaComplete(readMetaFromInputs())) {
      showStep("questionnaire");
    } else {
      showStep("meta");
    }
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

  function validateConfig() {
    const errors = [];

    Object.entries(MODULES).forEach(([key, module]) => {
      assertBilingual(module.name, `MODULES.${key}.name`, errors);
      assertBilingual(module.lowScoreAdvice, `MODULES.${key}.lowScoreAdvice`, errors);
    });

    Object.entries(TRACKS).forEach(([key, track]) => {
      assertBilingual(track.name, `TRACKS.${key}.name`, errors);
      if (!Array.isArray(track.recommendations) || track.recommendations.length === 0) {
        errors.push(`TRACKS.${key}.recommendations must be a non-empty array`);
      } else {
        track.recommendations.forEach((rec, index) => {
          assertBilingual(rec, `TRACKS.${key}.recommendations[${index}]`, errors);
        });
      }
    });

    QUESTIONS.forEach((question, index) => {
      if (!question.id || !question.moduleKey || !question.weightTag) {
        errors.push(`QUESTIONS[${index}] missing id/moduleKey/weightTag`);
      }
      if (!MODULES[question.moduleKey]) {
        errors.push(`QUESTIONS[${index}] has invalid moduleKey: ${question.moduleKey}`);
      }
      assertBilingual(question.prompt, `QUESTIONS[${index}].prompt`, errors);
      if (question.type === "image-compare") {
        if (!question.referenceImage || typeof question.referenceImage !== "string") {
          errors.push(`QUESTIONS[${index}] missing referenceImage`);
        }
        if (!Array.isArray(question.options) || question.options.length < 2) {
          errors.push(`QUESTIONS[${index}].options must contain at least 2 options`);
        } else {
          question.options.forEach((option, optionIndex) => {
            if (typeof option.value !== "number") {
              errors.push(`QUESTIONS[${index}].options[${optionIndex}].value missing`);
            }
            if (!option.image || typeof option.image !== "string") {
              errors.push(`QUESTIONS[${index}].options[${optionIndex}].image missing`);
            }
            assertBilingual(option.label, `QUESTIONS[${index}].options[${optionIndex}].label`, errors);
          });
        }
      } else if (!Array.isArray(question.optionLabels) || question.optionLabels.length !== 5) {
        errors.push(`QUESTIONS[${index}].optionLabels must contain 5 options`);
      } else {
        question.optionLabels.forEach((option, optionIndex) => {
          if (typeof option.value !== "number") {
            errors.push(`QUESTIONS[${index}].optionLabels[${optionIndex}].value missing`);
          }
          assertBilingual(option.label, `QUESTIONS[${index}].optionLabels[${optionIndex}].label`, errors);
        });
      }
    });

    if (QUESTIONS.length !== 17) {
      errors.push(`Expected 17 questions, got ${QUESTIONS.length}`);
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
    const grouped = groupQuestionsByModule();

    Object.keys(grouped).forEach((moduleKey) => {
      const moduleQuestions = grouped[moduleKey];

      const moduleWrap = document.createElement("section");
      moduleWrap.className = "module";

      const moduleTitle = document.createElement("h3");
      moduleTitle.className = "module-title";
      moduleTitle.textContent = localize(MODULES[moduleKey].name);
      moduleWrap.appendChild(moduleTitle);

      moduleQuestions.forEach((question) => {
        const fieldset = document.createElement("fieldset");
        fieldset.className = "question";

        const legend = document.createElement("legend");
        legend.className = "question-title";
        legend.textContent = `${question.id}. ${localize(question.prompt)}`;
        fieldset.appendChild(legend);

        if (question.type === "image-compare") {
          const refWrap = document.createElement("div");
          refWrap.className = "image-reference";

          const refLabel = document.createElement("p");
          refLabel.className = "image-reference-label";
          refLabel.textContent = t("questionnaire.referenceLabel");

          const refImg = document.createElement("img");
          refImg.src = question.referenceImage;
          refImg.alt = t("questionnaire.referenceLabel");
          refImg.className = "reference-img";

          refWrap.appendChild(refLabel);
          refWrap.appendChild(refImg);
          fieldset.appendChild(refWrap);

          const optGrid = document.createElement("div");
          optGrid.className = "image-options";

          question.options.forEach((option) => {
            const optLabel = document.createElement("label");
            optLabel.className = "image-option";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = question.id;
            input.value = String(option.value);
            input.setAttribute("aria-label", `${question.id} ${localize(option.label)}`);

            const img = document.createElement("img");
            img.src = option.image;
            img.alt = localize(option.label);
            img.className = "option-img";

            const caption = document.createElement("span");
            caption.className = "image-option-caption";
            caption.textContent = localize(option.label);

            optLabel.appendChild(input);
            optLabel.appendChild(img);
            optLabel.appendChild(caption);
            optGrid.appendChild(optLabel);
          });

          fieldset.appendChild(optGrid);
        } else {
          const options = document.createElement("div");
          options.className = "scale-options";

          question.optionLabels.forEach((option) => {
            const label = document.createElement("label");
            label.className = "choice";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = question.id;
            input.value = String(option.value);
            input.setAttribute("aria-label", `${question.id} ${localize(option.label)}`);

            const text = document.createElement("span");
            text.textContent = localize(option.label);

            label.appendChild(input);
            label.appendChild(text);
            options.appendChild(label);
          });

          fieldset.appendChild(options);
        }

        moduleWrap.appendChild(fieldset);
      });

      dom.questionnaireForm.appendChild(moduleWrap);
    });
  }

  function groupQuestionsByModule() {
    return QUESTIONS.reduce((acc, question) => {
      if (!acc[question.moduleKey]) {
        acc[question.moduleKey] = [];
      }
      acc[question.moduleKey].push(question);
      return acc;
    }, {});
  }

  function attachEvents() {
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
      persistDraft();
      showStep("questionnaire");
    });

    dom.questionnaireForm.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.type !== "radio") {
        return;
      }
      state.answers[target.name] = Number(target.value);
      updateProgress();
      hideError(dom.questionnaireError);
      persistDraft();
    });

    dom.backMeta.addEventListener("click", () => {
      showStep("meta");
    });

    dom.saveDraft.addEventListener("click", () => {
      state.meta = readMetaFromInputs();
      persistDraft();
      flashButton(dom.saveDraft, t("messages.draftSaved"));
    });

    dom.generateResult.addEventListener("click", () => {
      generateAndRenderResult();
    });

    dom.editAnswers.addEventListener("click", () => {
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
    if (state.lang === "zh") {
      return `${t("messages.unansweredPrefix")} ${count} ${t("messages.unansweredSuffix")}`;
    }
    return `${t("messages.unansweredPrefix")} ${count} ${t("messages.unansweredSuffix")}`;
  }

  function computeResult(answers) {
    const moduleRaw = {
      cognitive: 0,
      communication: 0,
      life: 0,
      sensory: 0
    };

    const moduleCount = {
      cognitive: 0,
      communication: 0,
      life: 0,
      sensory: 0
    };

    QUESTIONS.forEach((question) => {
      const score = Number(answers[question.id]);
      moduleRaw[question.moduleKey] += score;
      moduleCount[question.moduleKey] += 1;
    });

    const moduleScores = {};
    Object.keys(moduleRaw).forEach((moduleKey) => {
      const max = moduleCount[moduleKey] * 5;
      moduleScores[moduleKey] = round1((moduleRaw[moduleKey] / max) * 100);
    });

    const cog = moduleScores.cognitive;
    const comm = moduleScores.communication;
    const life = moduleScores.life;
    const sensory = moduleScores.sensory;

    const trackScores = {
      employment: round1(0.35 * cog + 0.35 * comm + 0.2 * life + 0.1 * sensory),
      independent: round1(0.2 * cog + 0.2 * comm + 0.45 * life + 0.15 * sensory),
      basic: round1(0.4 * (100 - cog) + 0.3 * (100 - comm) + 0.2 * (100 - life) + 0.1 * (100 - sensory))
    };

    const sortedTracks = Object.entries(trackScores).sort((a, b) => b[1] - a[1]);
    const finalTrack = sortedTracks[0][0];
    const scoreGap = round1(sortedTracks[0][1] - sortedTracks[1][1]);
    const reassessmentRecommended = scoreGap < 8;

    const recommendations = TRACKS[finalTrack].recommendations.map((item) => ({
      zh: item.zh,
      en: item.en
    }));

    Object.keys(moduleScores).forEach((moduleKey) => {
      if (moduleScores[moduleKey] < 60) {
        recommendations.push({
          zh: `【${MODULES[moduleKey].name.zh}】${MODULES[moduleKey].lowScoreAdvice.zh}`,
          en: `[${MODULES[moduleKey].name.en}] ${MODULES[moduleKey].lowScoreAdvice.en}`
        });
      }
    });

    if (recommendations.length === 0) {
      recommendations.push({
        zh: UI_TEXT.zh.result.noExtraAdvice,
        en: UI_TEXT.en.result.noExtraAdvice
      });
    }

    return {
      moduleScores,
      trackScores,
      finalTrack,
      scoreGap,
      reassessmentRecommended,
      recommendations
    };
  }

  function renderResult(result) {
    const finalTrackName = TRACKS[result.finalTrack].name;

    dom.resultBox.innerHTML = "";

    const title = document.createElement("h3");
    title.className = "result-title";
    title.textContent = `${t("result.recommendedTrack")}: ${localize(finalTrackName)}`;

    const meta = document.createElement("p");
    meta.className = "result-meta";
    meta.textContent = formatResultMeta(state.meta);

    dom.resultBox.appendChild(title);
    dom.resultBox.appendChild(meta);

    if (result.reassessmentRecommended) {
      const warn = document.createElement("p");
      warn.className = "warning";
      warn.textContent = `${t("result.reassessment")} (${t("labels.topTwoGap")}: ${result.scoreGap})`;
      dom.resultBox.appendChild(warn);
    }

    renderBars(dom.moduleBars, Object.keys(result.moduleScores), (key) => ({
      label: localize(MODULES[key].name),
      value: result.moduleScores[key]
    }));

    renderBars(dom.trackBars, Object.keys(result.trackScores), (key) => ({
      label: localize(TRACKS[key].name),
      value: result.trackScores[key]
    }));

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

  function renderBars(container, keys, mapFn) {
    container.innerHTML = "";
    keys.forEach((key) => {
      const item = mapFn(key);
      const row = document.createElement("div");
      row.className = "bar";

      const label = document.createElement("div");
      label.className = "bar-label";
      label.textContent = `${item.label}: ${item.value}`;

      const track = document.createElement("div");
      track.className = "bar-track";

      const fill = document.createElement("div");
      fill.className = "bar-fill";
      fill.style.width = `${clamp(item.value, 0, 100)}%`;

      track.appendChild(fill);
      row.appendChild(label);
      row.appendChild(track);
      container.appendChild(row);
    });
  }

  function buildRecord({ meta, answers, result }) {
    const answerItems = QUESTIONS.map((question) => ({
      questionId: question.id,
      score: Number(answers[question.id]),
      weightTag: question.weightTag,
      questionText: {
        zh: question.prompt.zh,
        en: question.prompt.en
      },
      moduleKey: question.moduleKey,
      moduleName: {
        zh: MODULES[question.moduleKey].name.zh,
        en: MODULES[question.moduleKey].name.en
      }
    }));

    const moduleScores = {};
    Object.keys(result.moduleScores).forEach((moduleKey) => {
      moduleScores[moduleKey] = {
        score: result.moduleScores[moduleKey],
        moduleName: {
          zh: MODULES[moduleKey].name.zh,
          en: MODULES[moduleKey].name.en
        }
      };
    });

    const trackScores = {};
    Object.keys(result.trackScores).forEach((trackKey) => {
      trackScores[trackKey] = {
        score: result.trackScores[trackKey],
        trackName: {
          zh: TRACKS[trackKey].name.zh,
          en: TRACKS[trackKey].name.en
        }
      };
    });

    return {
      id: `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      meta: {
        studentId: meta.studentId,
        teacherName: meta.teacherName,
        assessmentDate: meta.assessmentDate
      },
      answers: answerItems,
      moduleScores,
      trackScores,
      finalTrack: {
        key: result.finalTrack,
        trackName: {
          zh: TRACKS[result.finalTrack].name.zh,
          en: TRACKS[result.finalTrack].name.en
        },
        score: result.trackScores[result.finalTrack],
        reassessmentRecommended: result.reassessmentRecommended,
        topTwoGap: result.scoreGap
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
    state.result = computeResult(state.answers);

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
    if (draft.result && isResultLike(draft.result)) {
      state.result = draft.result;
    }
  }

  function applyStateToForm() {
    dom.studentId.value = state.meta.studentId || "";
    dom.teacherName.value = state.meta.teacherName || "";
    dom.assessmentDate.value = state.meta.assessmentDate || todayISO();

    QUESTIONS.forEach((question) => {
      const selected = state.answers[question.id];
      const radios = dom.questionnaireForm.querySelectorAll(`input[name="${question.id}"]`);
      radios.forEach((radio) => {
        radio.checked = Number(radio.value) === Number(selected);
      });
    });

    if (state.result) {
      renderResult(state.result);
    }
  }

  function updateProgress() {
    const answered = QUESTIONS.reduce((count, question) => {
      return count + (Number.isFinite(Number(state.answers[question.id])) ? 1 : 0);
    }, 0);

    dom.progressBar.max = QUESTIONS.length;
    dom.progressBar.value = answered;

    if (state.lang === "zh") {
      dom.progressText.textContent = `${answered} / ${QUESTIONS.length}`;
    } else {
      dom.progressText.textContent = `${answered} / ${QUESTIONS.length}`;
    }
  }

  function persistDraft() {
    const draft = {
      meta: readMetaFromInputs(),
      answers: state.answers,
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
      const trackText = localize(record.finalTrack?.trackName) || t("messages.unknownTrack");
      title.textContent = `${record.meta?.studentId || "N/A"} · ${trackText}`;

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
      result.moduleScores &&
      result.trackScores &&
      typeof result.finalTrack === "string"
    );
  }

  function showStep(step) {
    dom.stepMeta.hidden = step !== "meta";
    dom.stepQuestionnaire.hidden = step !== "questionnaire";
    dom.stepResult.hidden = step !== "result";
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
