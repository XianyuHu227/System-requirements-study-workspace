'use strict';
// Original practice variants; sources indicate topic/style provenance, never official worked answers.
const PRACTICE_BANK={
  "1": [
    {
      "title": "Needs, analysis and specification",
      "zh": "学院发现学生预约后到场才知道房间关闭。分别说明需求、需求分析、规格说明在解决此问题时做什么；再区分分析与设计。",
      "task": "Students discover that booked rooms are closed only after arriving. Explain requirements, requirements analysis and specification in this situation. Distinguish analysis from design.",
      "answerZh": "需求表达学生需要找到确实可用的房间。分析调查关闭信息来源、冲突及用户流程；规格说明记录明确的可用性规则和测试条件。分析决定需要什么，设计决定如何实现，例如选择同步机制。",
      "answer": "Requirements express the need to find genuinely available rooms. Analysis investigates closure information, conflicting needs and current workflows. Specification records agreed availability behaviour and test conditions precisely. Analysis determines what is needed; design determines how to realise it, such as selecting a synchronisation mechanism.",
      "checks": [
        {
          "zh": "区分三个概念并结合例子",
          "en": "Distinguish the three concepts with examples"
        },
        {
          "zh": "区分需要什么与如何实现",
          "en": "Distinguish what is needed from how to implement it"
        }
      ],
      "section": 1,
      "style": "sample",
      "sources": [
        "W1",
        "SAMPLE"
      ]
    },
    {
      "title": "User-centred development",
      "zh": "系统完全满足规格，但学生仍用群聊找房间。说明为什么满足规格不等于满足用户需要，并提出两项用户参与活动及各自发现的问题。",
      "task": "A booking app meets its specification, but students still use group chats to find rooms. Explain why specification compliance is insufficient. Propose two user-involvement activities and what each could reveal.",
      "answerZh": "规格可能错误表达真实需求。观察学生找房间可发现跨楼移动和临时可用性问题；用原型进行用户走查可检验筛选和确认流程是否匹配需要。根据发现修订需求，而不只改善外观。",
      "answer": "The specification may misrepresent actual needs. Observe students finding rooms to reveal travel constraints and workarounds. Walk through a booking prototype with users to test whether filtering and confirmation support their goals. Revise requirements from the evidence instead of assuming that compliance or attractive screens establishes usefulness.",
      "checks": [
        {
          "zh": "解释规格合规与真实价值的区别",
          "en": "Explain compliance versus actual user value"
        },
        {
          "zh": "两项活动分别对应可发现的信息",
          "en": "Link two activities to the information each reveals"
        }
      ],
      "section": 0,
      "style": "coverage",
      "sources": [
        "W1"
      ]
    },
    {
      "title": "Stakeholders with interests",
      "zh": "预约服务的学生会查看空位；图书馆员会用预约表安排协助；项目赞助人控制预算。识别两类系统相关者和一类项目相关者并说明利益；解释同一人能否同时属于两类。",
      "task": "Students check availability, librarians use booking schedules to arrange assistance, and a sponsor controls the project budget. Identify two system stakeholder groups and one project stakeholder, with an interest for each. Can a person belong to both categories?",
      "answerZh": "学生需要准确空位；图书馆员需要可靠预约表，二者均与系统运行及输出有关。赞助人关心资金和交付，属于项目相关者。同一人若既使用系统又参与交付决策，可以兼属两类。",
      "answer": "Students need accurate availability and librarians need reliable schedules: both relate to system operation or outputs. The sponsor has an interest in funding and delivery, making them a project stakeholder. A person can belong to both groups when their system-use and delivery responsibilities overlap.",
      "checks": [
        {
          "zh": "系统相关者与输出使用者识别正确",
          "en": "Identify system users and output users"
        },
        {
          "zh": "项目相关者的利益具体",
          "en": "Give a concrete project stakeholder interest"
        },
        {
          "zh": "说明两种类别可以重叠",
          "en": "Explain that the categories can overlap"
        }
      ],
      "section": 2,
      "style": "scenario",
      "sources": [
        "W1",
        "EXAM"
      ]
    },
    {
      "title": "SDLC and changing requirements",
      "zh": "团队完成设计后才发现预约流程频繁变化。解释瀑布的一项弱点及其后果；说明迭代反馈如何帮助处理变化；为分析、设计、实现各举一个活动。",
      "task": "A team discovers frequent booking-workflow changes after completing design. Explain one Waterfall weakness and its consequence, describe how iterative feedback helps, and give one activity each for analysis, design and implementation.",
      "answerZh": "顺序推进会让早期错误进入后续阶段，晚期修改导致返工。迭代反馈可较早发现误解，但仍需计划和文档。分析澄清取消规则；设计确定交互及数据方案；实现构建并测试取消功能。",
      "answer": "Sequential progression can carry early misunderstandings into later artefacts, making late changes expensive. Iterative user feedback can expose misunderstandings earlier; it does not remove the need for planning or documentation. Analysis clarifies cancellation rules, design selects interactions and data arrangements, and implementation builds and tests cancellation.",
      "checks": [
        {
          "zh": "弱点与返工后果有因果关系",
          "en": "Link the weakness to rework"
        },
        {
          "zh": "合理解释迭代而非宣称无需文档",
          "en": "Explain iteration without claiming documentation is unnecessary"
        },
        {
          "zh": "三个阶段活动区分正确",
          "en": "Distinguish activities in the three phases"
        }
      ],
      "section": 1,
      "style": "sample",
      "sources": [
        "W1",
        "SAMPLE"
      ]
    }
  ],
  "2": [
    {
      "title": "Leading interview questions",
      "zh": "评价“你不觉得糟糕的预约界面浪费了你很多时间吗？”指出两种问题，改成一项中立开放题，再写一个用于确认规模的封闭追问。",
      "task": "Evaluate: “Don’t you agree that the terrible booking interface wastes a lot of your time?” Identify two defects, rewrite it as a neutral open question, and add a closed follow-up to establish frequency.",
      "answerZh": "问题预设界面糟糕并诱导同意，也把对界面的评价与耗时合在一起。开放题：请描述最近一次预约的过程。封闭追问：过去七天，你有几次未能完成预约？先探索，再核实频率。",
      "answer": "The wording assumes a negative evaluation and invites agreement; it also bundles interface quality with time spent. Open: “Walk me through your most recent booking.” Closed follow-up: “How many bookings could you not complete in the past seven days?” Explore experience before confirming frequency.",
      "checks": [
        {
          "zh": "指出引导性和混合多个问题",
          "en": "Identify leading wording and bundled questions"
        },
        {
          "zh": "改写允许中立展开",
          "en": "Write a neutral open question"
        },
        {
          "zh": "封闭追问有明确时间或选项范围",
          "en": "Give a closed follow-up with a clear response scope"
        }
      ],
      "section": 1,
      "style": "sample",
      "sources": [
        "W2",
        "SAMPLE"
      ]
    },
    {
      "title": "Problem statement and scope",
      "zh": "前台反复抄录纸质预约，造成重复登记和排队。写一段问题陈述，说明受影响者、问题、影响；再列出本次预约项目各一项范围内和范围外工作，不预设特定技术。",
      "task": "Receptionists repeatedly copy paper bookings, causing duplicate records and queues. Write a problem statement identifying affected people, the issue and impact. Specify one in-scope and one out-of-scope activity without assuming a particular technology.",
      "answerZh": "前台人员与预约者受到重复登记和排队影响，现有记录流程导致返工并降低可靠性。范围内：登记和修改房间预约；范围外：替换学校整个财务系统。不要未经调查就把购买某种产品当作问题本身。",
      "answer": "Receptionists and customers experience rework and queues because booking records are repeatedly copied and can be duplicated. In scope: recording and amending room bookings. Out of scope: replacing the university finance system. Describe the problem and boundary before selecting a technology.",
      "checks": [
        {
          "zh": "问题包含人、问题及后果",
          "en": "Include affected people, issue and impact"
        },
        {
          "zh": "范围内外界限明确且合理",
          "en": "Give a clear, plausible scope boundary"
        },
        {
          "zh": "不把技术方案冒充问题",
          "en": "Do not substitute a technology choice for the problem"
        }
      ],
      "section": 0,
      "style": "scenario",
      "sources": [
        "W2",
        "EXAM"
      ]
    },
    {
      "title": "Choose complementary techniques",
      "zh": "管理员说所有问题都是学生不会使用，但现场仍有重复预约。选择两种互补获取技术，分别说明对象、要收集的信息以及一项局限和缓解办法。",
      "task": "A manager claims booking failures are caused entirely by students, yet duplicate bookings continue. Choose two complementary elicitation techniques. For each, state whom or what to study, the information sought, and one limitation with a mitigation.",
      "answerZh": "可观察学生和前台实际流程，发现绕行和重复录入；局限是观察者效应，可跨时段重复观察。随后中立访谈双方以了解原因；局限是回忆偏差，可用具体最近案例和记录核对。不能仅接受管理员归因。",
      "answer": "Observe students and receptionists performing bookings to identify workarounds and duplicate entry. Observation may alter behaviour, so repeat it across appropriate sessions. Follow with neutral interviews to understand reasons; counter recall bias with recent concrete incidents and available records. Do not treat the manager’s attribution as established fact.",
      "checks": [
        {
          "zh": "方法组合互补且结合情境",
          "en": "Choose complementary methods grounded in the scenario"
        },
        {
          "zh": "每种方法说明信息目标",
          "en": "Explain the information each method provides"
        },
        {
          "zh": "局限与缓解办法对应",
          "en": "Match limitations to mitigations"
        }
      ],
      "section": 2,
      "style": "scenario",
      "sources": [
        "W2",
        "EXAM"
      ]
    },
    {
      "title": "Open questions, closed questions and workshops",
      "zh": "解释为什么早期访谈常先用开放问题，再用封闭问题；各写一个例子。若三类相关者对优先需求意见冲突，说明如何用 JAD 或 NGT 进一步澄清。",
      "task": "Explain why early interviews often begin with open questions and use closed questions later. Give one example of each. Explain how JAD or NGT could help when three stakeholder groups disagree about priorities.",
      "answerZh": "开放题发现经验和意外需要，如“预约失败时你怎么处理？”封闭题确认事实，如“上周是否出现重复预约？”JAD 可由主持人协调共同澄清冲突；NGT 用结构化想法生成和排序促进参与。说明方法如何产生信息，不只写缩写。",
      "answer": "Open questions uncover experiences and unexpected needs: “What do you do when a booking fails?” Closed questions confirm bounded facts: “Did you encounter a duplicate booking last week?” A facilitated JAD session can clarify conflicting needs, while NGT structures idea generation and ranking to support participation.",
      "checks": [
        {
          "zh": "解释探索与确认的不同目的",
          "en": "Distinguish exploration from confirmation"
        },
        {
          "zh": "开放与封闭例子正确",
          "en": "Provide correct open and closed examples"
        },
        {
          "zh": "说明工作坊或结构化排序的作用",
          "en": "Explain the role of facilitation or structured ranking"
        }
      ],
      "section": 2,
      "style": "sample",
      "sources": [
        "W2",
        "SAMPLE"
      ]
    }
  ],
  "3": [
    {
      "title": "Evidence-based persona",
      "zh": "博物馆志愿者每周用共享平板登记捐赠，常因重复录入而无法及时接待下一位来访者。构建画像：目标、行为、痛点、动机、对应需要。另加一项明确标为待验证的假设。",
      "task": "A museum volunteer uses a shared tablet each week to register donations. Duplicate entry often delays helping the next visitor. Create a persona with a goal, behaviour, pain point, motivation and resulting need. Add one explicitly labelled assumption to validate.",
      "answerZh": "用虚构名字代表此类志愿者：目标是及时、准确完成捐赠登记；行为是每周使用共享平板；痛点是重复录入延误接待；动机是帮助来访者；需要是减少重复输入的登记流程。假设待验证：不同志愿者的平板操作经验可能不同，不要当作已证实事实。",
      "answer": "Use a fictional representative of the volunteer pattern. Goal: complete accurate donation records promptly. Behaviour: registers donations weekly on a shared tablet. Pain: duplicate entry delays helping visitors. Motivation: assist visitors effectively. Need: a registration workflow with less duplicate entry. Assumption to validate: volunteers may have varied tablet experience; do not present this as an observed fact.",
      "checks": [
        {
          "zh": "五个画像要素与题面证据对应",
          "en": "Ground all five persona elements in scenario evidence"
        },
        {
          "zh": "需求能回应目标或痛点",
          "en": "Derive the need from a goal or pain point"
        },
        {
          "zh": "额外假设明确标注",
          "en": "Label any added assumption"
        }
      ],
      "section": 1,
      "style": "scenario",
      "sources": [
        "W3",
        "EXAM"
      ]
    },
    {
      "title": "Role, persona and psychographics",
      "zh": "有人把画像写成“Student，20 岁，喜欢蓝色”。解释角色与画像的区别；指出此画像为何缺乏设计价值；补充两项有价值的信息，并区分人口背景与心理特征。",
      "task": "A proposed persona reads “Student, aged 20, likes blue.” Distinguish a role from a persona, explain why this profile has little design value, propose two useful additions, and distinguish demographics from psychographics.",
      "answerZh": "Student 是系统关系类别；画像代表有研究依据的目标与行为模式。年龄和颜色没有解释预约需要。补充任务目标、预约行为或痛点。人口背景如通勤情况；心理特征如看重自主性或对隐私的态度，但都应有证据或标为假设。",
      "answer": "A role categorises a relationship to the system; a persona represents a research-grounded pattern of users. Age and colour preference alone do not explain booking needs. Add relevant goals and behaviours or pain points. Demographics concern background; psychographics concern values, attitudes, interests and lifestyle. Do not invent these as observed facts.",
      "checks": [
        {
          "zh": "准确区分角色与画像",
          "en": "Distinguish role and persona"
        },
        {
          "zh": "指出缺少目标行为痛点",
          "en": "Identify missing goals, behaviours or pain points"
        },
        {
          "zh": "区分两类信息且不编造事实",
          "en": "Distinguish information types without fabricating facts"
        }
      ],
      "section": 0,
      "style": "scenario",
      "sources": [
        "W3",
        "EXAM"
      ]
    },
    {
      "title": "Inclusive research",
      "zh": "团队只采访熟练英语且使用新手机的学生。说明两种可能遗漏的使用需要，为每种需要提出一项招募或测试措施，并说明如何获得同意和保护隐私。",
      "task": "The team interviews only fluent-English students with recent phones. Explain two needs this sample might overlook, propose a recruitment or testing action for each, and describe consent and privacy safeguards.",
      "answerZh": "可能遗漏不同语言背景用户的理解问题、旧设备或辅助技术的使用需要。应招募相应用户完成真实任务，而不是根据族群推断能力。告知研究用途、取得同意、减少收集身份资料并限制访问。具体需要必须通过研究验证。",
      "answer": "The sample may overlook comprehension needs among users with varied language experience and interaction constraints on older devices or assistive technology. Recruit relevant users for realistic task testing instead of inferring ability from ethnicity. Explain the study purpose, obtain consent, minimise identifying data and restrict access. Validate needs rather than treating possibilities as established facts.",
      "checks": [
        {
          "zh": "指出抽样遗漏而非刻板推断",
          "en": "Identify sampling gaps without stereotypes"
        },
        {
          "zh": "两项措施对应潜在需要",
          "en": "Match two research actions to potential needs"
        },
        {
          "zh": "说明同意与隐私保护",
          "en": "Explain consent and privacy safeguards"
        }
      ],
      "section": 2,
      "style": "coverage",
      "sources": [
        "W3"
      ]
    },
    {
      "title": "Persona to requirements",
      "zh": "根据“通勤学生课间用手机找房间，过时信息造成白跑”的情境，说明一张画像如何支持两条不同需求；解释为什么仅比较竞品外观不足以确认这些需求。",
      "task": "Using the commuting-student scenario, derive two distinct requirements from persona evidence and explain their traceability. Explain why comparing competitors’ visual appearance alone cannot validate the needs.",
      "answerZh": "可提出按时间段查找房间的功能需求，以及待确认的可用性信息更新质量目标；二者分别追溯到短暂空档和过时信息的痛点。指标若新增需标为拟议。竞品比较应关注任务成功、错误和时间等，仍需与实际用户确认。",
      "answer": "A time-interval search feature addresses the short break, while a proposed freshness requirement addresses wasted trips from stale information. Trace each requirement to the relevant persona evidence and validate any added metric. Competitor analysis should consider task success, errors or completion time, and cannot replace research with the actual users.",
      "checks": [
        {
          "zh": "两项需要不同且可追溯",
          "en": "Derive two distinct traceable needs"
        },
        {
          "zh": "新增指标标为拟议并需验证",
          "en": "Label added metrics as proposed"
        },
        {
          "zh": "解释竞品分析与用户验证的边界",
          "en": "Explain the limits of competitor analysis"
        }
      ],
      "section": 2,
      "style": "scenario",
      "sources": [
        "W3",
        "EXAM"
      ]
    }
  ],
  "4": [
    {
      "title": "Story from a scenario",
      "zh": "学生因取消预约后房间仍显示被占用而无法重新利用空位。写一条包含角色、目标、收益的故事；说明它对应哪个痛点，并解释故事为何不是数据库设计。",
      "task": "After a cancellation, a room still appears occupied and other students cannot reuse the slot. Write one user story with role, goal and benefit. Link it to the pain point and explain why the story is not a database design.",
      "answerZh": "作为学生，我希望取消后空档重新显示可用，以便其他人预约。它回应已释放空位无法利用的痛点。故事强调用户价值，可进一步讨论规则与验收，不指定表结构或实现细节。",
      "answer": "As a student, I want a cancelled slot to become available again so that others can book it. This addresses unusable released capacity. The story expresses user value and invites discussion about rules and acceptance; it does not prescribe tables or implementation details.",
      "checks": [
        {
          "zh": "角色目标收益完整",
          "en": "Include role, goal and benefit"
        },
        {
          "zh": "故事回应情境痛点",
          "en": "Connect the story to the scenario pain point"
        },
        {
          "zh": "区分需求对话与技术设计",
          "en": "Distinguish requirements conversation from technical design"
        }
      ],
      "section": 0,
      "style": "scenario",
      "sources": [
        "W4",
        "EXAM"
      ]
    },
    {
      "title": "INVEST diagnosis",
      "zh": "评价故事：“作为用户，我希望一次实现整个大学管理平台，以便所有人都满意。”解释至少三项 INVEST 风险；按用户目标拆成两条较小故事，不把技术任务当用户收益。",
      "task": "Evaluate: “As a user, I want the entire university management platform in one release so that everyone is happy.” Explain at least three INVEST risks. Split it into two smaller user-goal stories without treating implementation tasks as user benefits.",
      "answerZh": "故事过大，不易估算，“所有人满意”无法检验，价值与角色也不清楚。可拆为学生按时间查询房间以找到学习空间，以及学生取消自己的预约以释放空位。两条仍需澄清依赖和验收条件。",
      "answer": "The story is not Small, lacks information for Estimable work, and is not Testable because “everyone is happy” has no pass/fail condition. The role and value are also vague. Split it into a student finding rooms by interval to locate study space, and a student cancelling an owned booking to release its slot. Clarify dependencies and acceptance for each.",
      "checks": [
        {
          "zh": "至少三项 INVEST 问题解释具体",
          "en": "Explain at least three specific INVEST risks"
        },
        {
          "zh": "拆分为两个有价值的用户目标",
          "en": "Split into two valuable user goals"
        },
        {
          "zh": "不把独立性理解为绝无依赖",
          "en": "Do not assume independence means no dependencies"
        }
      ],
      "section": 1,
      "style": "coverage",
      "sources": [
        "W4"
      ]
    },
    {
      "title": "Testable acceptance conditions",
      "zh": "为“学生按时间段筛选可用房间”写三项可判断通过或失败的验收条件，分别覆盖正常结果、无可用结果和无效时间。题面未给出的规则标为拟议。",
      "task": "Write three pass/fail acceptance criteria for filtering rooms by an interval: normal results, no available rooms, and an invalid interval. Label any rule not supplied by the scenario as proposed.",
      "answerZh": "拟议条件：给定 A 空闲、B 被占用，搜索该时段只返回 A；若没有空位，显示无结果而不虚构可订房间；若结束早于开始，提示修正且不执行有效查询。条件要写清输入与预期，不用“工作良好”。",
      "answer": "Proposed criteria: given A is free and B occupied, searching the interval returns A and excludes B; when no room is available, display a no-results state without presenting occupied rooms as bookable; when the end precedes the start, request correction rather than treating it as a valid search. State inputs and observable outcomes.",
      "checks": [
        {
          "zh": "正常结果包含与排除明确",
          "en": "Specify included and excluded results"
        },
        {
          "zh": "空结果和无效输入结果可检验",
          "en": "Make empty and invalid-input outcomes testable"
        },
        {
          "zh": "未给规则标为拟议",
          "en": "Label unsupplied rules as proposed"
        }
      ],
      "section": 2,
      "style": "scenario",
      "sources": [
        "W4",
        "EXAM"
      ]
    },
    {
      "title": "Persona–story consistency",
      "zh": "一位学生画像强调短时间内用手机找空位，但故事只写“作为管理员，我希望导出年度预算”。指出不一致；写一条匹配画像的故事和一项验收条件；解释画像与故事是否必须一一对应。",
      "task": "A persona focuses on finding space by phone during a short break, but the linked story concerns an administrator exporting an annual budget. Explain the mismatch. Write a matching story and one acceptance criterion. Must personas and stories have a one-to-one relationship?",
      "answerZh": "预算故事可能服务别的角色，不能直接证明解决该学生的痛点。可写按空档筛选房间以便及时找到学习空间。验收用已知空闲与占用房间检查结果。画像与故事可以多对多，而非固定一一对应。",
      "answer": "The budget story may serve another stakeholder but does not address this student’s stated goal. A matching story is filtering rooms by the break interval to find study space. An acceptance criterion can check results against known free and occupied rooms. Personas and stories may have many-to-many relationships.",
      "checks": [
        {
          "zh": "说明错配不等于故事永远无价值",
          "en": "Explain the mismatch without dismissing other stakeholder value"
        },
        {
          "zh": "新故事及验收条件相互一致",
          "en": "Align the new story with its acceptance condition"
        },
        {
          "zh": "正确解释多对多关系",
          "en": "Explain the many-to-many relationship"
        }
      ],
      "section": 0,
      "style": "scenario",
      "sources": [
        "W4",
        "EXAM"
      ]
    }
  ],
  "5": [
    {
      "title": "SMART in this course",
      "zh": "需求写成“系统在所有情况下永远达到 100% 可用性”。在 Specific、Measurable、Attainable、Realisable、Traceable 中选择最直接需要质疑的一项并解释；再说明 Attainable 与 Realisable 的区别。",
      "task": "A requirement promises “100% availability forever under all circumstances.” Which course SMART criterion is most directly questionable: Specific, Measurable, Attainable, Realisable or Traceable? Explain your choice and distinguish Attainable from Realisable.",
      "answerZh": "最直接质疑 Attainable：无条件的绝对持续可用性无法合理保证；有百分比并不证明可达到。Attainable 问技术或物理上能否做到，Realisable 问本项目时间预算和资源内能否实现。本课 T 是 Traceable。",
      "answer": "Attainable is the most direct concern: an unconditional absolute guarantee of continuous availability cannot reasonably be assured. A numeric percentage does not prove achievability. Attainable concerns technical or physical possibility; Realisable concerns the project’s time, budget, environment and resources. The course T is Traceable.",
      "checks": [
        {
          "zh": "优先讨论可达到性并给出理由",
          "en": "Identify attainability and explain why"
        },
        {
          "zh": "区分 A 与 R",
          "en": "Distinguish Attainable and Realisable"
        },
        {
          "zh": "使用本课 SMART 定义",
          "en": "Use the course SMART definitions"
        }
      ],
      "section": 1,
      "style": "sample",
      "sources": [
        "W5",
        "SAMPLE"
      ]
    },
    {
      "title": "FURPS+ with reasons",
      "zh": "对以下拟议需求分类并说明依据：(a)每月可用性 99.9%；(b)在 300 并发用户时 95% 查询两秒内返回；(c)提供中英文内容；(d)必须支持指定浏览器。说明有歧义时你采用的理解。",
      "task": "Classify and justify these proposed requirements using FURPS+: (a) 99.9% monthly availability; (b) 95% of searches return within two seconds at 300 concurrent users; (c) Chinese and English content; (d) support for a specified browser. State your interpretation where classification is ambiguous.",
      "answerZh": "可用性归 Reliability；响应时间归 Performance；提供语言内容可理解为 Functionality，也可能与 Usability 目标相关，需解释实际措辞；指定浏览器可作为设计或环境约束讨论。分类看需求内容，不能把所有字母都当非功能需求。",
      "answer": "Availability concerns Reliability and response time concerns Performance. Providing content in two languages can be interpreted as Functionality, with a Usability benefit; justify the actual reading rather than claiming an official unique answer. A specified-browser requirement can be discussed as an environment or design constraint under +. Classify the meaning, not just the modal verb.",
      "checks": [
        {
          "zh": "可靠性与性能分类正确",
          "en": "Classify reliability and performance correctly"
        },
        {
          "zh": "多语言分类有明确理由",
          "en": "Justify the interpretation of multilingual support"
        },
        {
          "zh": "约束与功能质量区分合理",
          "en": "Distinguish constraints from features and quality attributes"
        }
      ],
      "section": 0,
      "style": "sample",
      "sources": [
        "W5",
        "SAMPLE"
      ]
    },
    {
      "title": "Rewrite an easy-to-use requirement",
      "zh": "“预约应用应该容易使用并且很快。”指出至少三处缺陷，重写为两项独立、可测量的非功能需求；包括用户或负载、指标和测试条件，并标出自定数值。",
      "task": "“The booking app should be easy to use and fast.” Identify at least three defects and rewrite it as two independent measurable nonfunctional requirements. Include a user group or load, metric and test conditions. Label invented numbers.",
      "answerZh": "容易和快含糊，两项目标混写，缺测试条件。拟议性能需求：300 并发时 95% 查询在两秒内返回；拟议易用性需求：90% 首次测试用户无需协助在两分钟内完成预约。用 must；数值与测试方案需和相关者确认。",
      "answer": "The quality words are vague, two goals are bundled, and measurement conditions are missing. Proposed NFR1: the system must return search results within two seconds for 95% of requests at 300 concurrent users. Proposed NFR2: at least 90% of first-time test participants must complete a booking within two minutes without assistance. Validate these proposed targets and the test setup.",
      "checks": [
        {
          "zh": "指出含糊、混写和条件缺失",
          "en": "Identify ambiguity, bundling and missing conditions"
        },
        {
          "zh": "两项独立且采用 must",
          "en": "Write two independent must requirements"
        },
        {
          "zh": "指标与条件可检验",
          "en": "Provide testable metrics and conditions"
        },
        {
          "zh": "新增数值明确标为拟议",
          "en": "Label invented numbers as proposed"
        }
      ],
      "section": 2,
      "style": "sample",
      "sources": [
        "W5",
        "SAMPLE"
      ]
    },
    {
      "title": "Business need to traceable requirements",
      "zh": "学校希望减少空置预约。把这一业务目标转成一项用户需要、一项功能需求和一项质量需求，并解释如何追溯到测试；没有给出的规则或数字需标为假设。",
      "task": "The university wants fewer unused bookings. Derive a user need, a functional requirement and a quality requirement. Explain how to trace them to a test. Label any unsupplied rule or number as an assumption.",
      "answerZh": "用户需要方便取消不再使用的预约。拟议 FR：系统 shall 在所有者确认后取消选中预约；拟议质量目标：在约定负载下以待确认时间内更新空位。将目标、需求 ID、相关故事/用例和测试关联；测试检查取消及空位变化。不能直接声称已减少多少空置。",
      "answer": "A user need is cancelling an unwanted booking conveniently. Proposed FR: the system shall cancel the selected booking after its owner confirms. A proposed quality requirement specifies a validated availability-update target under agreed load. Link the business goal, requirement IDs, story/use case and tests. Test cancellation and slot release; do not invent an observed reduction in unused bookings.",
      "checks": [
        {
          "zh": "区分业务目标、用户需要及系统要求",
          "en": "Distinguish goal, user need and system requirements"
        },
        {
          "zh": "FR 使用 shall，质量要求可测量或说明待确认",
          "en": "Use shall for the FR and clarify the quality measure"
        },
        {
          "zh": "追溯到可执行测试而非仅列术语",
          "en": "Link to a concrete test"
        },
        {
          "zh": "区分拟议规则与已知事实",
          "en": "Distinguish proposed rules from known facts"
        }
      ],
      "section": 2,
      "style": "scenario",
      "sources": [
        "W5",
        "EXAM"
      ]
    }
  ],
  "6": [
    {
      "title": "MoSCoW and release scope",
      "zh": "首版必须支持查询和确认预约；提醒有价值但可暂用现有邮件流程；个性化外观无核心任务依赖。用 MoSCoW 排序，说明理由，并解释 Won’t 是否表示永远不做。",
      "task": "The first release must support availability search and booking confirmation. Reminders are valuable but an existing email process can temporarily substitute. Decorative themes have no core-task dependency. Assign MoSCoW priorities with reasons and explain whether Won’t means never.",
      "answerZh": "查询和确认属于 Must；提醒可为 Should，因为重要但有临时替代；外观可为 Could 或本次 Won’t，取决于资源。Won’t 指当前交付范围，不等于永久拒绝。必须依据情境和依赖说明排序。",
      "answer": "Search and confirmation are Must because they enable the core task. Reminders can be Should because they matter but have a temporary substitute. Themes can be Could or Won’t for this release, depending on capacity. Won’t concerns the current release, not permanent rejection. Explain priorities using scenario value and dependencies.",
      "checks": [
        {
          "zh": "优先级与情境理由一致",
          "en": "Match priorities to scenario reasons"
        },
        {
          "zh": "正确理解当前发布范围",
          "en": "Interpret current-release scope correctly"
        },
        {
          "zh": "考虑替代办法或依赖",
          "en": "Consider workarounds or dependencies"
        }
      ],
      "section": 1,
      "style": "coverage",
      "sources": [
        "W6"
      ]
    },
    {
      "title": "Calculate and interpret priorities",
      "zh": "需求 A 的 Value=40%、Cost=20%、Risk=10%；B 为 30%、10%、5%。按课程公式计算并排序；说明分母为零如何处理，并指出为何不能只按分数作最终决定。",
      "task": "For requirement A, Value=40%, Cost=20%, Risk=10%; for B, the values are 30%, 10%, 5%. Calculate and rank priorities using the course formula. Explain a zero denominator and why the score cannot be the sole decision rule.",
      "answerZh": "A=40/(20+10)=1.33；B=30/(10+5)=2，按此比较 B 较高。分母为零无法直接计算，应检查估计并采用其他讨论依据，不任意写零或无穷。还需考虑必要性、依赖、范围和风险，百分比应来自同一候选集合。",
      "answer": "A = 40/(20+10) ≈ 1.33; B = 30/(10+5) = 2, so B ranks higher under this score. A zero denominator makes the formula undefined and requires checking estimates or using another decision basis. Consider mandatory needs, dependencies, scope and risk, with percentages derived consistently from the same candidate set.",
      "checks": [
        {
          "zh": "公式与两个计算正确",
          "en": "Use the correct formula and calculations"
        },
        {
          "zh": "正确处理零分母",
          "en": "Explain an undefined zero denominator"
        },
        {
          "zh": "给出分数之外的决策因素",
          "en": "Explain decision factors beyond the score"
        }
      ],
      "section": 1,
      "style": "coverage",
      "sources": [
        "W6"
      ]
    },
    {
      "title": "Dependencies and scope creep",
      "zh": "赞助人要求把个性化首页插入本周发布；团队尚未完成预约所有者识别，而取消功能依赖它。说明如何安排依赖、处理新增请求，并区分受控变化与 scope creep。",
      "task": "A sponsor asks for a personalised homepage in this week’s release. Booking-owner identification is unfinished and cancellation depends on it. Explain dependency-aware sequencing, how to handle the new request, and the distinction between controlled change and scope creep.",
      "answerZh": "先识别取消功能对所有者识别的依赖，不能把高价值功能视为无需基础工作。记录首页请求，分析成本进度与核心任务影响后获得决定。经批准并调整计划的变化可受控；未评估即不断加范围是 scope creep。",
      "answer": "Recognise that cancellation depends on identifying the booking owner and sequence prerequisite work accordingly. Log the homepage request and assess cost, schedule and core-goal impact before an authorised decision. Approved changes with adjusted plans can be controlled; unassessed scope expansion is scope creep.",
      "checks": [
        {
          "zh": "识别并解释先后依赖",
          "en": "Identify and explain sequencing dependencies"
        },
        {
          "zh": "新增请求先评估再决定",
          "en": "Assess a new request before deciding"
        },
        {
          "zh": "区分变化与无控制扩张",
          "en": "Distinguish change from uncontrolled expansion"
        }
      ],
      "section": 0,
      "style": "coverage",
      "sources": [
        "W6"
      ]
    },
    {
      "title": "Choose a prioritisation technique",
      "zh": "学生、前台与赞助人都认为自己的需求最重要。选择 100 points 或 pairwise comparison，说明具体如何执行、它揭示什么，以及一项局限；再说明如何记录最后决定。",
      "task": "Students, receptionists and the sponsor each claim their needs are most important. Choose 100-point allocation or pairwise comparison. Explain how it works, what it reveals, one limitation, and how to record the final decision.",
      "answerZh": "100 points 让各相关者在同一候选需求中分配固定点数以显露取舍；pairwise 则逐对比较。前者可能有策略性分配，后者需求多时比较量大。统一解释需求、讨论差异及依赖，记录最终顺序、参与者和理由，不把分数当自动裁决。",
      "answer": "In 100-point allocation, stakeholders distribute a fixed total across the same candidate requirements to expose tradeoffs; pairwise comparison compares candidates in pairs. Allocation can be strategic, while pairwise work grows with the candidate set. Clarify meanings, discuss disagreement and dependencies, and record the agreed order, participants and reasons rather than treating scores as automatic authority.",
      "checks": [
        {
          "zh": "清楚说明所选方法的执行",
          "en": "Explain how the chosen method operates"
        },
        {
          "zh": "说明取舍信息及局限",
          "en": "Explain revealed tradeoffs and a limitation"
        },
        {
          "zh": "最后决定可记录和追踪",
          "en": "Record an accountable decision"
        }
      ],
      "section": 2,
      "style": "coverage",
      "sources": [
        "W6"
      ]
    }
  ],
  "7": [
    {
      "title": "Precondition, trigger and guarantees",
      "zh": "“学生已经登录；点击取消；系统最终释放空档；未确认时不取消。”将四个描述分别对应前置条件、触发、成功保证和最小保证，并解释为什么不应在主流程再次无理由加入登录。",
      "task": "Classify these statements as precondition, trigger, success guarantee or minimal guarantee: the student is authenticated; the student requests cancellation; the slot is released after success; no cancellation occurs without confirmation. Explain why the main flow should not unnecessarily repeat login.",
      "answerZh": "已登录是前置；请求取消是触发；成功后释放空档是成功保证；未经确认不取消是最小保证。前置已成立，主流程应聚焦目标交互，而非无理由重做前置活动。",
      "answer": "Authentication is the precondition; requesting cancellation is the trigger; releasing the slot after success is the success guarantee; no cancellation without confirmation is the minimal guarantee. Preconditions already hold when the use case begins, so do not insert redundant login steps without a scenario reason.",
      "checks": [
        {
          "zh": "四个字段分类准确",
          "en": "Classify all four fields correctly"
        },
        {
          "zh": "区分状态、事件与结果",
          "en": "Distinguish state, initiating event and outcomes"
        },
        {
          "zh": "前置条件与主流程保持一致",
          "en": "Keep the precondition and main flow consistent"
        }
      ],
      "section": 1,
      "style": "scenario",
      "sources": [
        "W7",
        "EXAM"
      ]
    },
    {
      "title": "User-goal level and actor",
      "zh": "评价用例名“Execute SQL DELETE”和主 Actor“Alex，19 岁”。将其改成 Blue 层取消预约用例的名称和角色；说明为什么用例不能代替性能等质量需求。",
      "task": "Evaluate the use-case title “Execute SQL DELETE” and primary actor “Alex, aged 19.” Replace them for a Blue-level cancellation use case and explain why use cases cannot replace quality requirements such as performance.",
      "answerZh": "名称改为 Cancel Booking，Actor 用 Student 等外部角色。Blue 层表达用户目标及可观察交互，SQL 是实现细节，画像个人身份不是Actor类别。用例主要描述功能行为，仍需独立记录性能指标及条件。",
      "answer": "Use “Cancel Booking” and the external role “Student.” Blue level describes a user goal and observable actor–system interaction; SQL is implementation detail, while a persona’s personal identity is not the actor category. Use cases primarily describe functional behaviour; performance measures and conditions still need separate requirements.",
      "checks": [
        {
          "zh": "动词短语名称与角色正确",
          "en": "Use a goal-level verb phrase and external role"
        },
        {
          "zh": "解释 Blue 层与实现细节区别",
          "en": "Distinguish Blue level from implementation detail"
        },
        {
          "zh": "说明质量需求仍需单独表达",
          "en": "Explain why separate quality requirements are needed"
        }
      ],
      "section": 0,
      "style": "scenario",
      "sources": [
        "W7",
        "EXAM"
      ]
    },
    {
      "title": "Repair the main success scenario",
      "zh": "给定取消预约：学生选预约、系统显示详情、学生确认、系统取消并释放空档。将它写成有编号的 Actor/System 主流程；再写“学生在确认步骤拒绝”的扩展，标明对应步骤和去向。",
      "task": "Given cancellation actions—student selects a booking, system shows details, student confirms, system cancels and releases the slot—write a numbered actor–system main success scenario. Add a step-linked extension for declining confirmation, with an explicit destination.",
      "answerZh": "1 学生选择预约；2 系统展示详情；3 学生确认取消；4 系统取消、释放空档并显示确认。3a 学生拒绝：保持原预约不变并结束。扩展不应一边拒绝一边仍达到成功保证。",
      "answer": "1 Student selects a booking. 2 System displays its details. 3 Student confirms cancellation. 4 System cancels it, releases the slot and displays confirmation. Extension 3a: the student declines; preserve the booking and end the use case. Keep alternative outcomes consistent with the guarantees.",
      "checks": [
        {
          "zh": "每步责任和顺序清楚",
          "en": "Give clear responsibility and sequence"
        },
        {
          "zh": "扩展绑定确认步骤",
          "en": "Link the extension to the confirmation step"
        },
        {
          "zh": "说明处理与结束或返回位置",
          "en": "State handling and an end or return destination"
        }
      ],
      "section": 2,
      "style": "scenario",
      "sources": [
        "W7",
        "EXAM"
      ]
    },
    {
      "title": "From story to complete use case",
      "zh": "故事为“学生查看自己未来的预约以安排学习”。系统已能识别登录学生。写 Blue 层 View My Bookings 用例，包括 Actor、前置、Trigger、两类保证、编号主流程和“无未来预约”扩展。自行增加规则要标为拟议。",
      "task": "Story: a student views upcoming owned bookings to plan study. The system can identify the authenticated student. Write a Blue-level “View My Bookings” use case with actor, precondition, trigger, both guarantees, numbered main flow, and a no-upcoming-bookings extension. Label added rules as proposed.",
      "answerZh": "Actor 为 Student；前置已登录；触发请求查看预约；最小保证不改变原预约；成功保证显示该学生未来预约。主流程：1 请求查看；2 系统查找属于该学生的未来预约；3 系统展示结果。2a 无结果：显示无未来预约并结束。时间排序等未给规则需标为拟议。",
      "answer": "Actor: Student. Precondition: authenticated. Trigger: requests upcoming bookings. Minimal guarantee: existing bookings are unchanged. Success guarantee: the student’s upcoming bookings are displayed. 1 Student requests the list. 2 System finds that student’s upcoming bookings. 3 System displays results. Extension 2a: none exist; show a no-bookings state and end. Label extra ordering rules as proposed.",
      "checks": [
        {
          "zh": "字段完整且与故事目标一致",
          "en": "Include all fields aligned to the story goal"
        },
        {
          "zh": "保障与无结果扩展不矛盾",
          "en": "Keep guarantees consistent with the no-results extension"
        },
        {
          "zh": "不加入 SQL 或未标注业务规则",
          "en": "Avoid SQL detail and unlabelled invented rules"
        }
      ],
      "section": 2,
      "style": "scenario",
      "sources": [
        "W7",
        "EXAM"
      ]
    }
  ],
  "8": [
    {
      "title": "Activity diagram from a main flow",
      "zh": "根据“学生选预约→系统显示详情→学生确认→系统取消并释放空档”画 Actor/System 两泳道活动图。写一段顺序和泳道说明供 AI 检查；按 Tutorial 08 只画主流程，并说明这是否已被确认是统一考试规则。",
      "task": "Draw a two-swimlane activity diagram for: student selects booking → system displays details → student confirms → system cancels and releases the slot. Add a textual sequence and responsibility explanation for AI checking. Follow Tutorial 08’s main-flow-only instruction and state whether it is a confirmed universal exam rule.",
      "answerZh": "图应有起终点，选择与确认在 Student 泳道，显示详情及取消释放在 System 泳道，箭头依主流程连接。此题按 Tutorial 08 不画扩展；不能把课堂约定说成已确认考试统一规则。AI 只接收文字说明，不直接看图。",
      "answer": "Include initial and final nodes. Put selection and confirmation in the Student lane, and display and cancellation/release in the System lane. Connect actions in main-flow order. This exercise follows Tutorial 08 by omitting extensions; that instruction is not confirmed as a universal exam rule. AI assesses the text explanation, not drawing pixels.",
      "checks": [
        {
          "zh": "起终点及流程顺序正确",
          "en": "Include start/end nodes and the correct order"
        },
        {
          "zh": "两泳道责任分配明确",
          "en": "Assign responsibilities to the two lanes"
        },
        {
          "zh": "区分课堂约定与未确认考试规则",
          "en": "Distinguish tutorial instruction from an unconfirmed exam rule"
        }
      ],
      "section": 1,
      "style": "scenario",
      "sources": [
        "W8",
        "W7",
        "T08",
        "EXAM"
      ]
    },
    {
      "title": "Decision versus concurrency",
      "zh": "某图用 Fork 表示“是否有空位”，又用 Merge 等待两个并行检查都完成。指出两处问题，选择正确的符号；说明 guard、Merge 与 Join 的作用。",
      "task": "A diagram uses a fork for “Are rooms available?” and a merge to wait for two parallel checks. Identify both mistakes and choose appropriate notation. Explain guards and the difference between a merge and a join.",
      "answerZh": "条件选择应使用 Decision 并给分支 guard，备选路径用 Merge 汇合；Fork 用于并发分裂，Join 用于同步并发分支。Merge 不代表等待所有输入。不要为了符号丰富而凭空加入并发。",
      "answer": "Use a decision with guards for conditional alternatives and a merge to reconverge alternative paths. A fork starts concurrent flows; a join synchronises concurrent branches. A merge does not mean waiting for all incoming paths. Do not invent concurrency merely to use more notation.",
      "checks": [
        {
          "zh": "识别条件分支应为 Decision",
          "en": "Use a decision for conditional alternatives"
        },
        {
          "zh": "区分 Merge 与 Join 的等待语义",
          "en": "Distinguish merge from join synchronisation"
        },
        {
          "zh": "解释 guard 和 Fork",
          "en": "Explain guards and forks"
        }
      ],
      "section": 1,
      "style": "coverage",
      "sources": [
        "W8"
      ]
    },
    {
      "title": "Domain concepts and multiplicities",
      "zh": "系统记录 Student、Room、Booking。每个预约属于一个学生并对应一间房；学生可暂时没有预约。列出三个领域类及相关属性，写双向多重性，并解释 Booking 是否是 Room 子类。",
      "task": "The system records Student, Room and Booking. Each booking belongs to one student and refers to one room; a student may have no bookings. Give relevant attributes, state multiplicities in both directions, and explain whether Booking is a subclass of Room.",
      "answerZh": "Student 可有 studentId、name；Room 有 roomId、capacity；Booking 有 bookingId、startTime、endTime。Student 1 对 Booking 0..*；每个 Booking 关联 1 Student。Room 1 对 Booking 0..*，每个 Booking 指向 1 Room。预约使用房间而非是一种房间，不能设为子类。",
      "answer": "Student can have studentId and name; Room can have roomId and capacity; Booking can have bookingId, startTime and endTime. A student has 0..* bookings, each booking has exactly one student. A room has 0..* bookings across times, each booking refers to one room. Booking uses or refers to a room; it is not a kind of room, so inheritance is inappropriate.",
      "checks": [
        {
          "zh": "领域类与属性合理",
          "en": "Choose domain concepts and attributes"
        },
        {
          "zh": "两组关系的双向多重性正确",
          "en": "State both directions of both relationships"
        },
        {
          "zh": "区分关联与 is-a",
          "en": "Distinguish association from is-a generalisation"
        }
      ],
      "section": 2,
      "style": "coverage",
      "sources": [
        "W8"
      ]
    },
    {
      "title": "Cross-model consistency audit",
      "zh": "用例最后一步“确认后取消并释放空档”，但活动图在确认前就取消，领域模型还规定一个预约可属于任意多个学生。找出不一致并修正；说明三种模型分别表达什么。",
      "task": "The use case cancels and releases the slot after confirmation, but the activity diagram cancels before confirmation and the domain model lets a booking belong to any number of students. Identify and repair the inconsistencies and explain the purpose of each model.",
      "answerZh": "活动顺序应改为先确认再取消；按本题每个预约属于一个学生的规则，修正预约端对应学生多重性为 1。用例描述Actor与系统交互；活动图表达步骤和责任；领域模型表达领域概念与关系。不能擅自加入共享所有者规则。",
      "answer": "Move cancellation after confirmation in the activity diagram. Under the stated single-owner rule, make each Booking relate to exactly one Student. A use-case description explains actor–system interactions, an activity diagram shows actions, order and responsibility, and a domain model shows domain concepts and relationships. Do not invent shared ownership to justify an inconsistency.",
      "checks": [
        {
          "zh": "识别并修正先后顺序",
          "en": "Identify and repair the ordering inconsistency"
        },
        {
          "zh": "多重性符合已给业务规则",
          "en": "Align multiplicity with the stated ownership rule"
        },
        {
          "zh": "区分三种模型用途",
          "en": "Distinguish the purposes of the three models"
        }
      ],
      "section": 0,
      "style": "scenario",
      "sources": [
        "W8",
        "EXAM"
      ]
    }
  ],
  "9": [
    {
      "title": "Validation or verification?",
      "zh": "分别判断并解释：(a)问学生提醒是否能帮助他们到场；(b)检查提醒需求是否定义发送时间及接收者；(c)检查两条提醒规则是否矛盾。说明为什么需求阶段就可以做这些检查。",
      "task": "Classify and explain: (a) asking students whether reminders help them attend; (b) checking whether the reminder requirement defines timing and recipient; (c) checking two reminder rules for conflict. Explain why these activities can occur during requirements work.",
      "answerZh": "(a) Validation 检查是否满足真实需要；(b)(c) Verification 检查规格清晰与一致。可通过访谈、走查和同行审查在编码前进行，不必等到运行软件。",
      "answer": "(a) is validation because it checks fit to actual user needs. (b) and (c) are verification because they examine clarity and consistency of requirements. Interviews, walkthroughs and inspections can take place before coding; these checks do not require a completed running program.",
      "checks": [
        {
          "zh": "正确区分三个活动",
          "en": "Classify all three activities"
        },
        {
          "zh": "解释真实需要与规格质量",
          "en": "Explain user needs versus specification quality"
        },
        {
          "zh": "说明需求阶段可采用的活动",
          "en": "Explain checks available during requirements work"
        }
      ],
      "section": 0,
      "style": "coverage",
      "sources": [
        "W9"
      ]
    },
    {
      "title": "Prototype selection",
      "zh": "团队还不确定预约提醒该出现在什么流程阶段，但有人主张先做完整高保真界面。选择合适的早期原型，说明研究问题、成本和反馈；指出高保真不能证明哪两类生产能力。",
      "task": "The team is unsure where reminders belong in the booking workflow, but someone proposes a complete high-fidelity interface first. Select an early prototype and justify the research question, cost and feedback. Name two production capabilities that high fidelity does not establish.",
      "answerZh": "可先用低保真纸面流程测试提醒出现时机，便于快速修改并集中讨论用户任务。高保真可更逼真，但成本较高，不能仅凭外观证明后台完整、性能或安全达标。选择取决于研究问题而非越逼真越好。",
      "answer": "A low-fidelity paper workflow can test where reminders help, cheaply and with rapid revision. High fidelity may improve realism but costs more and can distract from unresolved flow questions. It does not establish a complete backend, performance or security. Match fidelity to the research question rather than assuming greater realism is always better.",
      "checks": [
        {
          "zh": "原型选择对应未解决问题",
          "en": "Match prototype choice to the unresolved question"
        },
        {
          "zh": "说明成本与修改反馈权衡",
          "en": "Explain cost, iteration and feedback tradeoffs"
        },
        {
          "zh": "指出保真度不保证生产能力",
          "en": "Explain that fidelity does not prove production capability"
        }
      ],
      "section": 1,
      "style": "coverage",
      "sources": [
        "W9"
      ]
    },
    {
      "title": "Make a verification test meaningful",
      "zh": "需求为“95% 查询两秒内返回”，但没有写负载、数据规模或环境。说明缺失信息对验证的影响；补充一组明确标为拟议的条件，并设计测试与需求 ID 的链接。",
      "task": "The requirement says “95% of searches return within two seconds” without load, dataset size or environment. Explain the verification problem, propose explicitly labelled test conditions, and show how to link a test to a requirement ID.",
      "answerZh": "不同负载和环境会产生不同结果，当前条件不足以一致判断。拟议：在约定环境、代表性数据集和 300 并发用户下测量响应分布；这些条件需确认。将 NFR-P1 关联到 T-P1，记录测试方法、阈值、结果与状态，不能只凭一次快速响应判通过。",
      "answer": "Results vary with load, data and environment, so the requirement cannot be checked consistently yet. Proposed conditions: an agreed environment, representative dataset and 300 concurrent users, subject to validation. Link NFR-P1 to T-P1, recording measurement method, threshold, result and status. A single fast response does not establish the 95% condition.",
      "checks": [
        {
          "zh": "解释条件缺失为何影响可测试性",
          "en": "Explain why missing conditions affect testability"
        },
        {
          "zh": "拟议条件清楚且不冒充题面事实",
          "en": "State proposed conditions without inventing scenario facts"
        },
        {
          "zh": "测试链接与统计阈值一致",
          "en": "Link a test that checks the stated threshold"
        }
      ],
      "section": 2,
      "style": "coverage",
      "sources": [
        "W9"
      ]
    },
    {
      "title": "A passing system that solves the wrong problem",
      "zh": "测试证明每月 CSV 导出准确无误，但用户需要当天发现预约冲突。解释哪里通过 Verification、哪里未通过 Validation；提出一个用户验证活动和一个规格检查活动。",
      "task": "Tests show a monthly CSV export is accurate, but users need to detect booking conflicts on the same day. Explain what may pass verification and fail validation. Propose one user-validation activity and one specification-checking activity.",
      "answerZh": "导出若符合已写规格可通过相应Verification，但仍不满足当天发现冲突的真实需要，Validation有问题。用情境走查确认用户何时需要哪些信息；再检查改写后的时效需求是否有明确阈值、条件且不冲突。",
      "answer": "The export may satisfy its written specification and pass the relevant verification, yet fail validation because it does not support same-day conflict detection. Walk through realistic conflict situations with users to establish what information is needed and when. Then inspect the revised timeliness requirement for explicit thresholds, conditions and consistency.",
      "checks": [
        {
          "zh": "允许符合规格同时未满足需要",
          "en": "Explain how compliance can coexist with unmet need"
        },
        {
          "zh": "验证活动聚焦真实使用",
          "en": "Focus validation on actual use"
        },
        {
          "zh": "规格检查活动具体可执行",
          "en": "Give a concrete specification check"
        }
      ],
      "section": 0,
      "style": "coverage",
      "sources": [
        "W9"
      ]
    }
  ],
  "10": [
    {
      "title": "Baseline does not mean frozen forever",
      "zh": "需求基线批准后，相关者发现预约冲突规则遗漏。解释 baseline 的作用，说明为何既不能直接改文档也不能一概拒绝变化，并列出记录、分析、决定、更新、沟通的流程。",
      "task": "After a baseline is approved, stakeholders discover a missing booking-conflict rule. Explain what the baseline provides, why neither editing it silently nor rejecting every change is appropriate, and outline recording, analysis, decision, update and communication.",
      "answerZh": "基线是已批准的参考版本，帮助团队知道当前有效要求。允许受控变化：记录缺失与理由，分析对成本进度和依赖的影响，授权决定，批准后更新版本、相关模型测试和计划，沟通并验证。保留原批准历史。",
      "answer": "A baseline is an approved reference identifying the currently agreed requirements. It permits controlled change: record the omission and reason, analyse cost, schedule and dependency impacts, obtain an authorised decision, update versions, affected models/tests and plans if approved, communicate and verify. Retain the prior approval history.",
      "checks": [
        {
          "zh": "基线定义准确且可受控改变",
          "en": "Define a baseline and controlled change"
        },
        {
          "zh": "包含批准决定而非直接修改",
          "en": "Include an authorised decision"
        },
        {
          "zh": "更新相关产物并保留历史",
          "en": "Update related artefacts and retain history"
        }
      ],
      "section": 0,
      "style": "coverage",
      "sources": [
        "W10"
      ]
    },
    {
      "title": "Forward and backward traceability",
      "zh": "RTM 有“业务目标 G1→需求 R1→用例 UC1→测试 T1”。解释 forward、backward、bidirectional traceability；说明没有需求来源的功能与没有测试的需求分别提示什么风险。",
      "task": "An RTM links business goal G1 → requirement R1 → use case UC1 → test T1. Explain forward, backward and bidirectional traceability. What risks are suggested by a feature without a requirement source and a requirement without a test?",
      "answerZh": "Forward 从需求追到设计实现测试以查覆盖；Backward 从产物回到需求和来源以查必要性；双向结合两者。无来源功能可能是额外范围，需核实；无测试需求可能未验证。表格存在不代表链接和测试结果完整。",
      "answer": "Forward traceability follows requirements into downstream artefacts to check coverage. Backward traceability links artefacts back to requirements and their origins to check justification. Bidirectional traceability combines both. An unsourced feature may be extra scope and an untested requirement may lack verification; investigate rather than assuming. A matrix alone proves neither completeness nor successful tests.",
      "checks": [
        {
          "zh": "三个方向解释正确",
          "en": "Explain all three traceability directions"
        },
        {
          "zh": "识别来源与测试缺口风险",
          "en": "Identify origin and test-coverage gaps"
        },
        {
          "zh": "不把表格存在等同完成验证",
          "en": "Do not equate a matrix with completed verification"
        }
      ],
      "section": 2,
      "style": "coverage",
      "sources": [
        "W10",
        "W9",
        "TRACE"
      ]
    },
    {
      "title": "Change history versus artefact links",
      "zh": "文档甲记录“谁在何时把并发数 300 改为 3000 以及理由”；文档乙记录“R8 对应 UC2、设计 D3 和负载测试 T9”。解释两种追溯的用途，说明为何不能仅看表格叫 mapping 或 matrix 就分类。",
      "task": "Document A records who changed concurrency from 300 to 3000, when and why. Document B links R8 to UC2, design D3 and load test T9. Explain the purpose of each kind of traceability and why names such as mapping or matrix alone do not determine the classification.",
      "answerZh": "甲追踪版本变更历史及责任；乙追踪产物之间的实现和测试关系。判断要看记录的内容与上下文，不是表格名称；变更影响分析通常同时需要两类信息。",
      "answer": "A records change history, timing, reasons and responsibility. B records relationships between requirements and downstream artefacts. Classify by the relationship represented and its context, not the table’s name. Change-impact analysis often needs both the history and the artefact links.",
      "checks": [
        {
          "zh": "区分变更历史与产物关系",
          "en": "Distinguish change history from artefact relationships"
        },
        {
          "zh": "解释按内容和上下文判断",
          "en": "Classify by content and context"
        },
        {
          "zh": "说明影响分析如何使用两者",
          "en": "Explain how impact analysis uses both"
        }
      ],
      "section": 2,
      "style": "coverage",
      "sources": [
        "W10",
        "TRACE"
      ]
    },
    {
      "title": "Impact analysis before implementation",
      "zh": "R8 的并发量从 300 提高到 3000，并关联架构、服务器预算、响应时间需求和负载测试。写一份简短变更处理建议，包含影响、授权决定、批准后的更新与验证；不能仅改一个数字。",
      "task": "R8 is changed from 300 to 3000 concurrent users and links to architecture, server budget, response-time requirements and load tests. Write a brief change-handling recommendation covering impact, authorised decision, updates after approval and verification. Do not simply edit the number.",
      "answerZh": "分析架构容量、成本、进度、依赖、技术风险及响应指标是否可实现；授权人员可批准、拒绝或延期。若批准，更新版本基线、设计预算计划和测试负载，沟通并重新验证，将理由与结果留档。提高数字不代表已有能力。",
      "answer": "Analyse capacity, architecture, cost, schedule, dependencies, technical risk and the feasibility of response targets. Obtain an authorised approval, rejection or deferral. If approved, update requirement version/baseline, designs, budget/plans and load tests, communicate and re-verify. Retain reasons and results; editing the number does not establish capacity.",
      "checks": [
        {
          "zh": "影响分析覆盖资源、风险和依赖",
          "en": "Cover resources, risks and dependencies"
        },
        {
          "zh": "包含授权决定及可能延期拒绝",
          "en": "Include an authorised decision and possible deferral or rejection"
        },
        {
          "zh": "批准后更新产物测试并沟通",
          "en": "Update artefacts/tests and communicate after approval"
        }
      ],
      "section": 1,
      "style": "coverage",
      "sources": [
        "W10"
      ]
    }
  ]
};
const PRACTICE_TITLES=[["需求、分析与规格说明", "以用户为中心的开发", "相关者与具体利益", "SDLC 与需求变化"], ["识别引导性问题", "问题陈述与范围", "选择互补获取技术", "开放题、封闭题与工作坊"], ["基于证据构建画像", "角色、画像与心理特征", "包容性用户研究", "从画像追溯到需求"], ["根据情境写用户故事", "用 INVEST 诊断并拆分", "可测试验收条件", "检查画像与故事一致性"], ["本课 SMART 的判断", "FURPS+ 分类与论证", "重写易用性与性能需求", "从业务目标到可追溯需求"], ["MoSCoW 与发布范围", "计算并解释优先级", "依赖与范围失控", "选择优先级方法"], ["前置、触发与两类保证", "用户目标层与 Actor", "修复主流程及扩展", "从故事到完整用例"], ["从主流程画活动图", "条件选择与并发", "领域概念与双向多重性", "跨模型一致性检查"], ["Validation 还是 Verification", "选择原型保真度", "设计有意义的验证测试", "满足规格但解决错了问题"], ["基线不是永远冻结", "正向、反向和双向追溯", "变更历史与产物关系", "实施前分析变更影响"]];
for(const lesson of LESSONS){
 const original={id:'lesson'+lesson.id,title:'Core application',task:lesson.task,answer:lesson.answer,checks:lesson.checks,section:[1,1,1,2,2,2,2,1,0,1][lesson.id-1],style:[1,5].includes(lesson.id)?'sample':[2,3,4,7,8].includes(lesson.id)?'scenario':'coverage',sources:['W'+lesson.id,...([1,5].includes(lesson.id)?['SAMPLE']:[2,3,4,7,8].includes(lesson.id)?['EXAM']:[])]};
 lesson.questions=[original,...PRACTICE_BANK[lesson.id].map((q,i)=>{
  BI.set(q.title,{zh:PRACTICE_TITLES[lesson.id-1][i],en:q.title});
  BI.set(q.task,{zh:q.zh,en:q.task});BI.set(q.answer,{zh:q.answerZh,en:q.answer});
  const checks=q.checks.map(c=>{BI.set(c.en,c);return c.en});
  return {...q,id:'lesson'+lesson.id+'q'+(i+2),checks};
 })];
}
BI.set('Core application',{zh:'核心应用 · 原有练习',en:'Core application · existing exercise'});

const PRACTICE_SOURCES={"W1": {"title": "Role of Requirements", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043650"}, "W2": {"title": "Gathering Requirements", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043667"}, "W3": {"title": "User Profiling", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043684"}, "W4": {"title": "Categorize Requirements", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043711"}, "W5": {"title": "Write Requirements", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043729"}, "W6": {"title": "Prioritise Requirements", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043751"}, "W7": {"title": "Use Case Development", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043771"}, "W8": {"title": "Use Case Illustration", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043788"}, "W9": {"title": "Validation and Verification", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043805"}, "W10": {"title": "Changing Requirements", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043833"}, "T08": {"title": "Tutorial 08 — activity diagram instruction", "url": "https://learn.adelaide.edu.au/courses/30725/modules/items/1043793"}, "EXAM": {"title": "Exam structure — 2 and 6 November announcements", "url": "https://learn.adelaide.edu.au/courses/30725/discussion_topics/240437"}, "RULES": {"title": "Information about exam", "url": "https://learn.adelaide.edu.au/courses/30725/discussion_topics/230238"}, "SAMPLE": {"title": "Official Part 1 sample questions (questions only)", "url": "https://learn.adelaide.edu.au/courses/30725/files/7113590?wrap=1"}, "TRACE": {"title": "Different Types of Traceability", "url": "https://learn.adelaide.edu.au/courses/30725/discussion_topics/232146"}};

// Align the original stakeholder task with its actual wording, rather than an unrelated design criterion.
LESSONS[0].checks[2]='区分系统与项目相关者';
BI.set('区分系统与项目相关者',{zh:'区分系统与项目相关者',en:'Distinguish system and project stakeholders'});
GUIDE_STEPS.push(['15','每个主题五题','Five questions per topic','在每个主题的第 4 步“作答与检查”切换 Q1–Q5。Q1 保留原来的答案；其余四题单独保存、自评和 AI 批改，并随账号同步。已作答只表示写过内容，不代表答对。题型依据老师 Part 1 样题和考试结构摘要；所有新增题都是原创仿题，非老师原题或官方答案。Week 6、9、10 的课程补充题不代表已确认出题。','In step 4 of each topic, switch between Q1–Q5. Q1 keeps your original draft; the four additions have independent drafts, checklists, AI reviews and account sync. Written means text has been entered, not that an answer is correct. Variants follow the archived Part 1 sample and exam-structure summaries; they are original practice, not official questions or worked answers. Coverage questions for Weeks 6, 9 and 10 do not imply confirmed exam inclusion.']);

GUIDE_STEPS.push(['16','带题目追问 AI','Discuss a task with AI','在批改区点击“讨论本题”，或在某条检查项/改进建议旁点击追问。右下角问答会关联该题，带入当前答案与最近保存的批改；答案改过时也会附上旧稿并提醒区别。可以在“关联练习”下拉框选择别的题目，或自动跟随当前题。需要时取消附带答案，只问题目；查看附带内容后点击发送，快捷按钮不会自动消耗 API 额度。不同题目的对话分别引用各自的近期记录；只保留最近二十轮总记录。AI 会依据课程资料核对旧建议，不把以前的 AI 反馈当作官方答案。','Click Discuss this task beside grading, or ask about an individual criterion/improvement. The floating tutor links the task with the current draft and latest saved feedback. If edited, the graded draft is also included and distinguished. Select another task or follow the current question in the task selector. Turn off answer attachment for task-only questions. Preview the context before sending; quick buttons never make paid calls automatically. Follow-up history is scoped to the selected task, within the latest twenty exchanges overall. The tutor checks old advice against course evidence rather than treating earlier AI feedback as official answers.']);
