// Exam catalog: 50 major Indian examinations.
// Each exam has practice topics (grouped by subject) and a full-mock pattern.
// Marking: `correct` = marks for a right answer, `wrong` = marks for a wrong answer (0 or negative).
// Timing: if EVERY section of a paper has `minutes`, the paper uses locked sectional timing
// and the paper's `minutes` equals their sum. Otherwise the paper has one shared timer.
// Patterns follow the latest official notifications known at build time; verify before each exam season.

const T = (subject, names) => names.map((name) => ({ subject, name }));
const S = (name, questions, correct, wrong, minutes) =>
  minutes ? { name, questions, correct, wrong, minutes } : { name, questions, correct, wrong };
const P = (name, minutes, sections, note) => (note ? { name, minutes, sections, note } : { name, minutes, sections });

// ---------- Shared topic lists ----------
const BANK_ENG = ['Reading Comprehension', 'Cloze Test', 'Error Spotting', 'Sentence Improvement', 'Para Jumbles', 'Fill in the Blanks', 'Vocabulary'];
const BANK_QUANT = ['Simplification & Approximation', 'Number Series', 'Data Interpretation', 'Quadratic Equations', 'Percentage', 'Profit & Loss', 'Simple & Compound Interest', 'Time & Work', 'Time, Speed & Distance', 'Ratio & Proportion', 'Averages & Ages', 'Mixtures & Alligations', 'Probability', 'Permutation & Combination'];
const BANK_REASON = ['Seating Arrangement', 'Puzzles', 'Syllogism', 'Inequalities', 'Blood Relations', 'Direction Sense', 'Coding-Decoding', 'Order & Ranking', 'Alphanumeric Series', 'Input-Output', 'Data Sufficiency'];
const BANK_GA = ['Current Affairs', 'Banking Awareness', 'Financial Awareness', 'Static GK', 'Government Schemes', 'RBI & Monetary Policy'];

const SSC_QUANT = ['Number System', 'Simplification', 'Percentage', 'Profit & Loss', 'Ratio & Proportion', 'Averages', 'Time & Work', 'Time, Speed & Distance', 'Simple & Compound Interest', 'Algebra', 'Geometry', 'Mensuration', 'Trigonometry', 'Data Interpretation'];
const SSC_REASON = ['Analogy', 'Classification', 'Series', 'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Venn Diagrams', 'Syllogism', 'Mirror & Water Images', 'Paper Folding & Cutting', 'Embedded Figures', 'Missing Number'];
const SSC_ENG = ['Reading Comprehension', 'Cloze Test', 'Error Spotting', 'Sentence Improvement', 'Synonyms & Antonyms', 'One Word Substitution', 'Idioms & Phrases', 'Active & Passive Voice', 'Direct & Indirect Speech', 'Spelling Correction', 'Para Jumbles'];
const SSC_GA = ['History', 'Geography', 'Indian Polity', 'Economy', 'Physics (General Science)', 'Chemistry (General Science)', 'Biology (General Science)', 'Static GK', 'Current Affairs', 'Computer Awareness'];
const GEN_SCIENCE = ['Physics', 'Chemistry', 'Biology', 'Life Sciences'];

const UPSC_GS = ['Ancient History', 'Medieval History', 'Modern History', 'Art & Culture', 'Indian Geography', 'World Geography', 'Indian Polity & Constitution', 'Indian Economy', 'Environment & Ecology', 'Science & Technology', 'International Relations', 'Current Affairs'];
const CSAT = ['Reading Comprehension', 'Logical Reasoning', 'Analytical Ability', 'Decision Making', 'Basic Numeracy', 'Data Interpretation'];

const PHY = ['Units & Measurements', 'Kinematics', 'Laws of Motion', 'Work, Energy & Power', 'Rotational Motion', 'Gravitation', 'Properties of Matter', 'Thermodynamics', 'Kinetic Theory', 'Oscillations & Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects of Current', 'Electromagnetic Induction & AC', 'Optics', 'Modern Physics', 'Semiconductors'];
const CHEM = ['Mole Concept', 'Atomic Structure', 'Chemical Bonding', 'Chemical Thermodynamics', 'Chemical Equilibrium', 'Ionic Equilibrium', 'Electrochemistry', 'Chemical Kinetics', 'Solutions', 'Periodic Table', 'Coordination Compounds', 'p-Block Elements', 'd & f-Block Elements', 'General Organic Chemistry', 'Hydrocarbons', 'Haloalkanes & Haloarenes', 'Alcohols, Phenols & Ethers', 'Aldehydes, Ketones & Carboxylic Acids', 'Amines', 'Biomolecules'];
const MATHS = ['Sets, Relations & Functions', 'Complex Numbers', 'Quadratic Equations', 'Sequences & Series', 'Permutations & Combinations', 'Binomial Theorem', 'Matrices & Determinants', 'Limits & Continuity', 'Differentiation & Applications', 'Integration', 'Differential Equations', 'Straight Lines', 'Circles', 'Conic Sections', 'Vectors', '3D Geometry', 'Probability', 'Statistics', 'Trigonometry'];
const BOTANY = ['Cell Biology', 'Plant Kingdom', 'Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Photosynthesis', 'Respiration in Plants', 'Plant Growth & Development', 'Sexual Reproduction in Flowering Plants', 'Principles of Inheritance', 'Molecular Basis of Inheritance', 'Ecology', 'Biotechnology'];
const ZOOLOGY = ['Animal Kingdom', 'Structural Organisation in Animals', 'Biomolecules', 'Digestion & Absorption', 'Breathing & Exchange of Gases', 'Body Fluids & Circulation', 'Excretory Products', 'Locomotion & Movement', 'Neural Control & Coordination', 'Chemical Coordination', 'Human Reproduction', 'Reproductive Health', 'Evolution', 'Human Health & Disease'];
const MED = ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Microbiology', 'Forensic Medicine', 'Community Medicine (PSM)', 'ENT', 'Ophthalmology', 'General Medicine', 'General Surgery', 'Obstetrics & Gynaecology', 'Paediatrics', 'Orthopaedics', 'Dermatology', 'Psychiatry', 'Anaesthesia', 'Radiology'];

const GATE_GA = ['Verbal Aptitude', 'Quantitative Aptitude', 'Analytical Aptitude', 'Spatial Aptitude'];
const MBA_VARC = ['Reading Comprehension', 'Para Jumbles', 'Para Summary', 'Odd Sentence Out', 'Vocabulary & Grammar'];
const MBA_DILR = ['Data Interpretation', 'Logical Reasoning Sets', 'Arrangements', 'Games & Tournaments', 'Venn Diagrams', 'Data Sufficiency'];
const MBA_QA = ['Arithmetic', 'Algebra', 'Geometry & Mensuration', 'Number System', 'Modern Maths (P&C, Probability)'];
const CURRENT_GK = ['Current Affairs', 'Static GK', 'Business & Economy', 'Awards & Sports'];
const LAW = ['Legal Reasoning', 'Constitutional Law', 'Law of Contracts', 'Law of Torts', 'Criminal Law'];
const ENG_BASIC = ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Sentence Correction'];
const LOGIC = ['Logical Reasoning', 'Critical Reasoning', 'Analytical Reasoning'];

// GATE helper: same paper structure for every discipline.
const gate = (id, discipline, topics) => ({
  id,
  name: `GATE ${discipline}`,
  category: 'Engineering',
  body: 'IITs (rotating)',
  topics: [...T('General Aptitude', GATE_GA), ...T(discipline, topics)],
  papers: [
    P('GATE Paper', 180, [
      S('General Aptitude (1-mark)', 5, 1, -0.33),
      S('General Aptitude (2-mark)', 5, 2, -0.67),
      S(`${discipline} (1-mark)`, 25, 1, -0.33),
      S(`${discipline} (2-mark)`, 30, 2, -0.67),
    ], 'NAT/MSQ questions are delivered as single-correct MCQs in this app.'),
  ],
});

// Bank prelims helper: English / Quant / Reasoning with 20-minute sectional timing.
const bankPrelims = (id, name, body, eng, quant, reason, quantLabel = 'Quantitative Aptitude') => ({
  id,
  name,
  category: 'Banking',
  body,
  topics: [...T('English Language', BANK_ENG), ...T(quantLabel, BANK_QUANT), ...T('Reasoning Ability', BANK_REASON)],
  papers: [
    P('Prelims', 60, [
      S('English Language', eng, 1, -0.25, 20),
      S(quantLabel, quant, 1, -0.25, 20),
      S('Reasoning Ability', reason, 1, -0.25, 20),
    ]),
  ],
});

export const EXAMS = [
  // ---------- UPSC & Defence ----------
  {
    id: 'upsc-cse', name: 'UPSC Civil Services (Prelims)', category: 'UPSC & Defence', body: 'UPSC',
    topics: [...T('General Studies', UPSC_GS), ...T('CSAT', CSAT)],
    papers: [
      P('GS Paper I', 120, [S('General Studies', 100, 2, -0.66)]),
      P('CSAT (GS Paper II)', 120, [S('CSAT', 80, 2.5, -0.83)], 'Qualifying paper (33%).'),
    ],
  },
  {
    id: 'upsc-capf', name: 'UPSC CAPF (Assistant Commandant)', category: 'UPSC & Defence', body: 'UPSC',
    topics: T('General Ability & Intelligence', ['General Mental Ability', 'General Science', 'Current Events', 'Indian Polity & Economy', 'History of India', 'Indian & World Geography']),
    papers: [P('Paper I', 120, [S('General Ability & Intelligence', 125, 2, -0.66)])],
  },
  {
    id: 'upsc-cds', name: 'UPSC CDS', category: 'UPSC & Defence', body: 'UPSC',
    topics: [...T('English', SSC_ENG.slice(0, 8)), ...T('General Knowledge', ['History', 'Geography', 'Polity', 'Economy', 'General Science', 'Defence & Current Affairs']), ...T('Elementary Mathematics', ['Arithmetic', 'Algebra', 'Trigonometry', 'Geometry', 'Mensuration', 'Statistics'])],
    papers: [
      P('English', 120, [S('English', 120, 0.83, -0.28)]),
      P('General Knowledge', 120, [S('General Knowledge', 120, 0.83, -0.28)]),
      P('Elementary Mathematics', 120, [S('Elementary Mathematics', 100, 1, -0.33)], 'Not taken by OTA candidates.'),
    ],
  },
  {
    id: 'nda', name: 'UPSC NDA & NA', category: 'UPSC & Defence', body: 'UPSC',
    topics: [...T('Mathematics', ['Algebra', 'Matrices & Determinants', 'Trigonometry', 'Analytical Geometry', 'Differential Calculus', 'Integral Calculus', 'Vectors', 'Statistics & Probability']), ...T('General Ability Test', ['English', 'Physics', 'Chemistry', 'General Science', 'History & Freedom Movement', 'Geography', 'Current Events'])],
    papers: [
      P('Mathematics', 150, [S('Mathematics', 120, 2.5, -0.83)]),
      P('General Ability Test', 150, [S('English', 50, 4, -1.33), S('General Knowledge', 100, 4, -1.33)]),
    ],
  },
  {
    id: 'upsc-ese', name: 'UPSC ESE Prelims (Paper I)', category: 'UPSC & Defence', body: 'UPSC',
    topics: T('General Studies & Engineering Aptitude', ['Current Issues', 'Engineering Aptitude', 'Engineering Mathematics', 'Design & Drawing', 'Standards & Quality Practices', 'Energy & Environment', 'Project Management', 'Material Science', 'ICT', 'Ethics & Values in Engineering']),
    papers: [P('Paper I', 120, [S('General Studies & Engineering Aptitude', 100, 2, -0.66)], 'Paper II is discipline-specific and not included.')],
  },
  {
    id: 'afcat', name: 'AFCAT', category: 'UPSC & Defence', body: 'Indian Air Force',
    topics: T('AFCAT', ['General Awareness', 'Verbal Ability in English', 'Numerical Ability', 'Reasoning & Military Aptitude']),
    papers: [P('AFCAT', 120, [S('General Awareness', 25, 3, -1), S('Verbal Ability in English', 30, 3, -1), S('Numerical Ability', 15, 3, -1), S('Reasoning & Military Aptitude', 30, 3, -1)], 'Section split varies by year; total is 100 questions.')],
  },
  {
    id: 'agniveer-gd', name: 'Army Agniveer (GD)', category: 'UPSC & Defence', body: 'Indian Army',
    topics: T('Agniveer GD', ['General Knowledge', 'General Science', 'Mathematics', 'Logical Reasoning']),
    papers: [P('CEE', 60, [S('General Knowledge', 15, 2, -0.5), S('General Science', 15, 2, -0.5), S('Mathematics', 15, 2, -0.5), S('Logical Reasoning', 5, 2, -0.5)])],
  },

  // ---------- Engineering ----------
  {
    id: 'jee-main', name: 'JEE Main (Paper 1)', category: 'Engineering', body: 'NTA',
    topics: [...T('Physics', PHY), ...T('Chemistry', CHEM), ...T('Mathematics', MATHS)],
    papers: [P('B.E./B.Tech', 180, [S('Physics', 25, 4, -1), S('Chemistry', 25, 4, -1), S('Mathematics', 25, 4, -1)], 'Numerical questions are delivered as MCQs in this app.')],
  },
  {
    id: 'jee-advanced', name: 'JEE Advanced', category: 'Engineering', body: 'IITs',
    topics: [...T('Physics', PHY), ...T('Chemistry', CHEM), ...T('Mathematics', MATHS)],
    papers: [
      P('Paper 1', 180, [S('Physics', 16, 3, -1), S('Chemistry', 16, 3, -1), S('Mathematics', 16, 3, -1)], 'Pattern changes every year; approximated as single-correct MCQs.'),
      P('Paper 2', 180, [S('Physics', 16, 3, -1), S('Chemistry', 16, 3, -1), S('Mathematics', 16, 3, -1)], 'Pattern changes every year; approximated as single-correct MCQs.'),
    ],
  },
  {
    id: 'bitsat', name: 'BITSAT', category: 'Engineering', body: 'BITS Pilani',
    topics: [...T('Physics', PHY), ...T('Chemistry', CHEM), ...T('English Proficiency', ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Composition']), ...T('Logical Reasoning', ['Verbal Reasoning', 'Non-verbal Reasoning']), ...T('Mathematics', MATHS)],
    papers: [P('BITSAT', 180, [S('Physics', 30, 3, -1), S('Chemistry', 30, 3, -1), S('English Proficiency', 10, 3, -1), S('Logical Reasoning', 20, 3, -1), S('Mathematics', 40, 3, -1)])],
  },
  gate('gate-cs', 'Computer Science', ['Engineering Mathematics', 'Discrete Mathematics', 'Digital Logic', 'Computer Organization & Architecture', 'Programming & Data Structures', 'Algorithms', 'Theory of Computation', 'Compiler Design', 'Operating Systems', 'Databases', 'Computer Networks']),
  gate('gate-ec', 'Electronics & Communication', ['Engineering Mathematics', 'Networks', 'Signals & Systems', 'Electronic Devices', 'Analog Circuits', 'Digital Circuits', 'Control Systems', 'Communications', 'Electromagnetics']),
  gate('gate-me', 'Mechanical Engineering', ['Engineering Mathematics', 'Engineering Mechanics', 'Strength of Materials', 'Theory of Machines', 'Machine Design', 'Fluid Mechanics', 'Heat Transfer', 'Thermodynamics', 'Manufacturing Processes', 'Industrial Engineering']),
  gate('gate-ee', 'Electrical Engineering', ['Engineering Mathematics', 'Electric Circuits', 'Electromagnetic Fields', 'Signals & Systems', 'Electrical Machines', 'Power Systems', 'Control Systems', 'Electrical Measurements', 'Analog & Digital Electronics', 'Power Electronics']),
  gate('gate-ce', 'Civil Engineering', ['Engineering Mathematics', 'Engineering Mechanics', 'Solid Mechanics', 'Structural Analysis', 'Concrete Structures', 'Steel Structures', 'Geotechnical Engineering', 'Fluid Mechanics & Hydraulics', 'Hydrology & Irrigation', 'Environmental Engineering', 'Transportation Engineering', 'Surveying']),

  // ---------- Medical ----------
  {
    id: 'neet-ug', name: 'NEET UG', category: 'Medical', body: 'NTA',
    topics: [...T('Physics', PHY), ...T('Chemistry', CHEM), ...T('Botany', BOTANY), ...T('Zoology', ZOOLOGY)],
    papers: [P('NEET UG', 180, [S('Physics', 45, 4, -1), S('Chemistry', 45, 4, -1), S('Botany', 45, 4, -1), S('Zoology', 45, 4, -1)])],
  },
  {
    id: 'neet-pg', name: 'NEET PG', category: 'Medical', body: 'NBEMS',
    topics: T('Medical Subjects', MED),
    papers: [P('NEET PG', 210, [S('Medical Subjects', 200, 4, -1)])],
  },
  {
    id: 'ini-cet', name: 'INI-CET', category: 'Medical', body: 'AIIMS New Delhi',
    topics: T('Medical Subjects', MED),
    papers: [P('INI-CET', 180, [S('Medical Subjects', 200, 1, -0.33)])],
  },
  {
    id: 'fmge', name: 'FMGE', category: 'Medical', body: 'NBEMS',
    topics: T('Medical Subjects', MED),
    papers: [P('Part A', 150, [S('Medical Subjects', 150, 1, 0)]), P('Part B', 150, [S('Medical Subjects', 150, 1, 0)])],
  },

  // ---------- Management ----------
  {
    id: 'cat', name: 'CAT', category: 'Management', body: 'IIMs',
    topics: [...T('VARC', MBA_VARC), ...T('DILR', MBA_DILR), ...T('Quantitative Ability', MBA_QA)],
    papers: [P('CAT', 120, [S('VARC', 24, 3, -1, 40), S('DILR', 22, 3, -1, 40), S('Quantitative Ability', 22, 3, -1, 40)], 'TITA questions are delivered as MCQs in this app.')],
  },
  {
    id: 'xat', name: 'XAT', category: 'Management', body: 'XLRI',
    topics: [...T('Verbal & Logical Ability', MBA_VARC), ...T('Decision Making', ['Ethical Dilemmas', 'Business Situations', 'Data-based Decisions']), ...T('Quant & Data Interpretation', [...MBA_QA, 'Data Interpretation']), ...T('General Knowledge', CURRENT_GK)],
    papers: [P('XAT', 180, [S('Verbal & Logical Ability', 26, 1, -0.25), S('Decision Making', 21, 1, -0.25), S('Quant & Data Interpretation', 28, 1, -0.25), S('General Knowledge', 20, 1, 0)], 'Actual XAT gives 170 min for Part 1 and 10 min for GK.')],
  },
  {
    id: 'snap', name: 'SNAP', category: 'Management', body: 'Symbiosis International',
    topics: [...T('General English', ['Reading Comprehension', 'Verbal Reasoning', 'Verbal Ability']), ...T('Quant, DI & DS', [...MBA_QA, 'Data Interpretation', 'Data Sufficiency']), ...T('Analytical & Logical Reasoning', ['Puzzles', 'Arrangements', 'Coding-Decoding', 'Critical Reasoning'])],
    papers: [P('SNAP', 60, [S('General English', 16, 1, -0.25), S('Quant, DI & DS', 20, 1, -0.25), S('Analytical & Logical Reasoning', 24, 1, -0.25)])],
  },
  {
    id: 'nmat', name: 'NMAT', category: 'Management', body: 'GMAC',
    topics: [...T('Language Skills', ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Para Jumbles']), ...T('Quantitative Skills', [...MBA_QA, 'Data Interpretation']), ...T('Logical Reasoning', ['Arrangements', 'Critical Reasoning', 'Puzzles', 'Coding-Decoding'])],
    papers: [P('NMAT', 120, [S('Language Skills', 36, 3, 0, 28), S('Quantitative Skills', 36, 3, 0, 52), S('Logical Reasoning', 36, 3, 0, 40)])],
  },
  {
    id: 'cmat', name: 'CMAT', category: 'Management', body: 'NTA',
    topics: [...T('Quantitative Techniques & DI', [...MBA_QA, 'Data Interpretation']), ...T('Logical Reasoning', ['Arrangements', 'Puzzles', 'Syllogism', 'Blood Relations']), ...T('Language Comprehension', ['Reading Comprehension', 'Grammar', 'Vocabulary']), ...T('General Awareness', CURRENT_GK), ...T('Innovation & Entrepreneurship', ['Startups & Ecosystem', 'Business Models', 'Government Initiatives'])],
    papers: [P('CMAT', 180, [S('Quantitative Techniques & DI', 20, 4, -1), S('Logical Reasoning', 20, 4, -1), S('Language Comprehension', 20, 4, -1), S('General Awareness', 20, 4, -1), S('Innovation & Entrepreneurship', 20, 4, -1)])],
  },
  {
    id: 'mat', name: 'MAT', category: 'Management', body: 'AIMA',
    topics: [...T('Language Comprehension', ['Reading Comprehension', 'Grammar', 'Vocabulary']), ...T('Intelligence & Critical Reasoning', ['Puzzles', 'Critical Reasoning', 'Series']), ...T('Mathematical Skills', MBA_QA), ...T('Data Analysis & Sufficiency', ['Data Interpretation', 'Data Sufficiency']), ...T('Indian & Global Environment', CURRENT_GK)],
    papers: [P('MAT', 150, [S('Language Comprehension', 40, 1, -0.25), S('Intelligence & Critical Reasoning', 40, 1, -0.25), S('Mathematical Skills', 40, 1, -0.25), S('Data Analysis & Sufficiency', 40, 1, -0.25), S('Indian & Global Environment', 40, 1, -0.25)])],
  },

  // ---------- Law & Others ----------
  {
    id: 'clat', name: 'CLAT (UG)', category: 'Law & Others', body: 'Consortium of NLUs',
    topics: [...T('English Language', ['Reading Comprehension', 'Vocabulary', 'Inference']), ...T('Current Affairs & GK', CURRENT_GK), ...T('Legal Reasoning', LAW), ...T('Logical Reasoning', LOGIC), ...T('Quantitative Techniques', ['Data Interpretation', 'Arithmetic', 'Percentages & Ratios'])],
    papers: [P('CLAT', 120, [S('English Language', 24, 1, -0.25), S('Current Affairs & GK', 28, 1, -0.25), S('Legal Reasoning', 32, 1, -0.25), S('Logical Reasoning', 24, 1, -0.25), S('Quantitative Techniques', 12, 1, -0.25)])],
  },
  {
    id: 'ailet', name: 'AILET (UG)', category: 'Law & Others', body: 'NLU Delhi',
    topics: [...T('English Language', ENG_BASIC), ...T('Current Affairs & GK', CURRENT_GK), ...T('Logical Reasoning', [...LOGIC, ...LAW.slice(0, 2)])],
    papers: [P('AILET', 120, [S('English Language', 50, 1, -0.25), S('Current Affairs & GK', 30, 1, -0.25), S('Logical Reasoning', 70, 1, -0.25)])],
  },
  {
    id: 'cuet-ug', name: 'CUET UG (General Test)', category: 'Law & Others', body: 'NTA',
    topics: T('General Test', ['General Knowledge', 'Current Affairs', 'General Mental Ability', 'Numerical Ability', 'Quantitative Reasoning', 'Logical & Analytical Reasoning']),
    papers: [P('General Test', 60, [S('General Test', 50, 5, -1)])],
  },
  {
    id: 'nchm-jee', name: 'NCHM JEE', category: 'Law & Others', body: 'NTA',
    topics: T('NCHM JEE', ['Numerical Ability & Analytical Aptitude', 'Reasoning & Logical Deduction', 'General Knowledge & Current Affairs', 'English Language', 'Aptitude for Service Sector']),
    papers: [P('NCHM JEE', 180, [S('Numerical Ability & Analytical Aptitude', 30, 4, -1), S('Reasoning & Logical Deduction', 30, 4, -1), S('General Knowledge & Current Affairs', 30, 4, -1), S('English Language', 60, 4, -1), S('Aptitude for Service Sector', 50, 4, -1)])],
  },

  // ---------- Banking ----------
  bankPrelims('ibps-po', 'IBPS PO (Prelims)', 'IBPS', 30, 35, 35),
  bankPrelims('ibps-clerk', 'IBPS Clerk (Prelims)', 'IBPS', 30, 35, 35, 'Numerical Ability'),
  bankPrelims('sbi-po', 'SBI PO (Prelims)', 'SBI', 30, 35, 35),
  bankPrelims('sbi-clerk', 'SBI Clerk (Prelims)', 'SBI', 30, 35, 35, 'Numerical Ability'),
  bankPrelims('rbi-assistant', 'RBI Assistant (Prelims)', 'RBI', 30, 35, 35, 'Numerical Ability'),
  {
    id: 'ibps-rrb-po', name: 'IBPS RRB PO (Prelims)', category: 'Banking', body: 'IBPS',
    topics: [...T('Reasoning', BANK_REASON), ...T('Quantitative Aptitude', BANK_QUANT)],
    papers: [P('Prelims', 45, [S('Reasoning', 40, 1, -0.25), S('Quantitative Aptitude', 40, 1, -0.25)])],
  },
  {
    id: 'rbi-grade-b', name: 'RBI Grade B (Phase 1)', category: 'Banking', body: 'RBI',
    topics: [...T('General Awareness', BANK_GA), ...T('English Language', BANK_ENG), ...T('Quantitative Aptitude', BANK_QUANT), ...T('Reasoning', BANK_REASON)],
    papers: [P('Phase 1', 120, [S('General Awareness', 80, 1, -0.25, 25), S('English Language', 30, 1, -0.25, 25), S('Quantitative Aptitude', 30, 1, -0.25, 25), S('Reasoning', 60, 1, -0.25, 45)])],
  },

  // ---------- Insurance ----------
  {
    id: 'lic-aao', name: 'LIC AAO (Prelims)', category: 'Insurance', body: 'LIC',
    topics: [...T('Reasoning Ability', BANK_REASON), ...T('Quantitative Aptitude', BANK_QUANT), ...T('English Language', BANK_ENG)],
    papers: [P('Prelims', 60, [S('Reasoning Ability', 35, 1, -0.25, 20), S('Quantitative Aptitude', 30, 1, -0.25, 20), S('English Language', 35, 1, -0.25, 20)])],
  },
  {
    id: 'niacl-ao', name: 'NIACL AO (Prelims)', category: 'Insurance', body: 'New India Assurance',
    topics: [...T('English Language', BANK_ENG), ...T('Reasoning Ability', BANK_REASON), ...T('Quantitative Aptitude', BANK_QUANT)],
    papers: [P('Prelims', 60, [S('English Language', 30, 1, -0.25, 20), S('Reasoning Ability', 35, 1, -0.25, 20), S('Quantitative Aptitude', 35, 1, -0.25, 20)])],
  },

  // ---------- SSC ----------
  {
    id: 'ssc-cgl', name: 'SSC CGL (Tier 1)', category: 'SSC', body: 'SSC',
    topics: [...T('General Intelligence & Reasoning', SSC_REASON), ...T('General Awareness', SSC_GA), ...T('Quantitative Aptitude', SSC_QUANT), ...T('English Comprehension', SSC_ENG)],
    papers: [P('Tier 1', 60, [S('General Intelligence & Reasoning', 25, 2, -0.5), S('General Awareness', 25, 2, -0.5), S('Quantitative Aptitude', 25, 2, -0.5), S('English Comprehension', 25, 2, -0.5)])],
  },
  {
    id: 'ssc-chsl', name: 'SSC CHSL (Tier 1)', category: 'SSC', body: 'SSC',
    topics: [...T('General Intelligence', SSC_REASON), ...T('General Awareness', SSC_GA), ...T('Quantitative Aptitude', SSC_QUANT), ...T('English Language', SSC_ENG)],
    papers: [P('Tier 1', 60, [S('General Intelligence', 25, 2, -0.5), S('General Awareness', 25, 2, -0.5), S('Quantitative Aptitude', 25, 2, -0.5), S('English Language', 25, 2, -0.5)])],
  },
  {
    id: 'ssc-mts', name: 'SSC MTS', category: 'SSC', body: 'SSC',
    topics: [...T('Numerical & Mathematical Ability', SSC_QUANT.slice(0, 10)), ...T('Reasoning Ability', SSC_REASON), ...T('General Awareness', SSC_GA), ...T('English Language', SSC_ENG)],
    papers: [P('CBE', 90, [S('Numerical & Mathematical Ability', 20, 3, 0), S('Reasoning Ability', 20, 3, 0), S('General Awareness', 25, 3, -1), S('English Language', 25, 3, -1)], 'Actual exam has two 45-minute sessions; no negative marking in Session I.')],
  },
  {
    id: 'ssc-gd', name: 'SSC GD Constable', category: 'SSC', body: 'SSC',
    topics: [...T('General Intelligence & Reasoning', SSC_REASON), ...T('General Knowledge', SSC_GA), ...T('Elementary Mathematics', SSC_QUANT.slice(0, 10)), ...T('English', SSC_ENG.slice(0, 7))],
    papers: [P('CBE', 60, [S('General Intelligence & Reasoning', 20, 2, -0.25), S('General Knowledge', 20, 2, -0.25), S('Elementary Mathematics', 20, 2, -0.25), S('English', 20, 2, -0.25)])],
  },
  {
    id: 'ssc-cpo', name: 'SSC CPO (Paper 1)', category: 'SSC', body: 'SSC',
    topics: [...T('General Intelligence & Reasoning', SSC_REASON), ...T('General Knowledge', SSC_GA), ...T('Quantitative Aptitude', SSC_QUANT), ...T('English Comprehension', SSC_ENG)],
    papers: [P('Paper 1', 120, [S('General Intelligence & Reasoning', 50, 1, -0.25), S('General Knowledge', 50, 1, -0.25), S('Quantitative Aptitude', 50, 1, -0.25), S('English Comprehension', 50, 1, -0.25)])],
  },
  {
    id: 'ssc-je', name: 'SSC JE (Paper 1)', category: 'SSC', body: 'SSC',
    topics: [...T('General Intelligence & Reasoning', SSC_REASON), ...T('General Awareness', SSC_GA), ...T('General Engineering', ['Civil & Structural Engineering', 'Electrical Engineering', 'Mechanical Engineering'])],
    papers: [P('Paper 1', 120, [S('General Intelligence & Reasoning', 50, 1, -0.25), S('General Awareness', 50, 1, -0.25), S('General Engineering', 100, 1, -0.25)])],
  },

  // ---------- Railways ----------
  {
    id: 'rrb-ntpc', name: 'RRB NTPC (CBT 1)', category: 'Railways', body: 'RRB',
    topics: [...T('General Awareness', SSC_GA), ...T('Mathematics', SSC_QUANT), ...T('General Intelligence & Reasoning', SSC_REASON)],
    papers: [P('CBT 1', 90, [S('General Awareness', 40, 1, -0.33), S('Mathematics', 30, 1, -0.33), S('General Intelligence & Reasoning', 30, 1, -0.33)])],
  },
  {
    id: 'rrb-group-d', name: 'RRB Group D', category: 'Railways', body: 'RRB',
    topics: [...T('Mathematics', SSC_QUANT), ...T('General Intelligence & Reasoning', SSC_REASON), ...T('General Science', GEN_SCIENCE), ...T('General Awareness', SSC_GA)],
    papers: [P('CBT', 90, [S('Mathematics', 25, 1, -0.33), S('General Intelligence & Reasoning', 30, 1, -0.33), S('General Science', 25, 1, -0.33), S('General Awareness', 20, 1, -0.33)])],
  },
  {
    id: 'rrb-alp', name: 'RRB ALP (CBT 1)', category: 'Railways', body: 'RRB',
    topics: [...T('Mathematics', SSC_QUANT), ...T('General Intelligence & Reasoning', SSC_REASON), ...T('Basic Science & Engineering', GEN_SCIENCE.slice(0, 3)), ...T('General Awareness', SSC_GA)],
    papers: [P('CBT 1', 60, [S('Mathematics', 20, 1, -0.33), S('General Intelligence & Reasoning', 25, 1, -0.33), S('Basic Science & Engineering', 20, 1, -0.33), S('General Awareness', 10, 1, -0.33)])],
  },

  // ---------- Teaching & Professional ----------
  {
    id: 'ctet', name: 'CTET', category: 'Teaching & Professional', body: 'CBSE',
    topics: T('CTET', ['Child Development & Pedagogy', 'Language I (English)', 'Language II (Hindi)', 'Mathematics', 'Environmental Studies', 'Science', 'Social Studies']),
    papers: [
      P('Paper 1 (Classes I–V)', 150, [S('Child Development & Pedagogy', 30, 1, 0), S('Language I', 30, 1, 0), S('Language II', 30, 1, 0), S('Mathematics', 30, 1, 0), S('Environmental Studies', 30, 1, 0)]),
      P('Paper 2 (Classes VI–VIII)', 150, [S('Child Development & Pedagogy', 30, 1, 0), S('Language I', 30, 1, 0), S('Language II', 30, 1, 0), S('Mathematics & Science', 60, 1, 0)]),
    ],
  },
  {
    id: 'ugc-net', name: 'UGC NET (Paper 1)', category: 'Teaching & Professional', body: 'NTA',
    topics: T('Teaching & Research Aptitude', ['Teaching Aptitude', 'Research Aptitude', 'Reading Comprehension', 'Communication', 'Mathematical Reasoning & Aptitude', 'Logical Reasoning', 'Data Interpretation', 'ICT', 'People, Development & Environment', 'Higher Education System']),
    papers: [P('Paper 1', 60, [S('Teaching & Research Aptitude', 50, 2, 0)], 'Paper 2 is subject-specific; the full exam is 150 questions in 180 minutes.')],
  },
  {
    id: 'ca-foundation', name: 'CA Foundation (Papers 3 & 4)', category: 'Teaching & Professional', body: 'ICAI',
    topics: [...T('Business Mathematics', ['Ratio, Proportion & Logarithms', 'Equations', 'Linear Inequalities', 'Mathematics of Finance', 'Permutations & Combinations', 'Sequence & Series', 'Sets, Relations & Functions', 'Basic Calculus']), ...T('Logical Reasoning', ['Number Series & Coding', 'Direction Tests', 'Seating Arrangements', 'Blood Relations']), ...T('Statistics', ['Statistical Description of Data', 'Central Tendency & Dispersion', 'Probability', 'Theoretical Distributions', 'Correlation & Regression', 'Index Numbers']), ...T('Business Economics', ['Theory of Demand & Supply', 'Theory of Production & Cost', 'Price Determination in Markets', 'Business Cycles', 'National Income', 'Money Market', 'International Trade', 'Indian Economy'])],
    papers: [
      P('Paper 3: Quantitative Aptitude', 120, [S('Business Mathematics', 40, 1, -0.25), S('Logical Reasoning', 20, 1, -0.25), S('Statistics', 40, 1, -0.25)]),
      P('Paper 4: Business Economics', 120, [S('Business Economics', 100, 1, -0.25)]),
    ],
  },
];

export const CATEGORIES = [...new Set(EXAMS.map((e) => e.category))];
