# ExamAI – Architecture

AI mock-test platform for 50 major Indian exams (UPSC, JEE, NEET, GATE, CAT, Banking, Insurance, SSC, Railways and more).
A student picks an exam, then either a **topic** (30 AI questions, one at a time, instant score) or a **full mock**
(real exam pattern: sections, marking, negative marking, timer, auto-submit). Every finished test can be downloaded as a PDF.

## Tech stack
| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite 5 |
| Backend | Netlify Functions (Node 20), served at `/api/*` |
| LLM | Groq API, model from `GROQ_MODEL` (default `llama-3.3-70b-versatile`) |
| PDF | jsPDF (client-side) |
| Tests | Vitest |
| Hosting | GitHub → Netlify (auto-deploy on push) |

The Groq key lives only in `.env` (local) and Netlify environment variables (production). The browser never sees it.

## Folder structure (final)
```
exam-ai/
├─ ARCHITECTURE.md  README.md  netlify.toml  package.json  vite.config.js  index.html  .env.example
├─ netlify/functions/
│  └─ questions.mjs          # Phase 2: POST /api/questions → Groq
├─ src/
│  ├─ data/exams.js          # Phase 1: 50 exams, topics, mock patterns
│  ├─ data/examUtils.js      # Phase 1: catalog helpers
│  ├─ lib/prompt.js          # Phase 2: prompt builder
│  ├─ lib/validate.js        # Phase 2: question schema validation + dedupe
│  ├─ lib/api.js             # Phase 2: browser client for /api/questions
│  ├─ engine/practice.js     # Phase 3: 30-question topic session
│  ├─ engine/mock.js         # Phase 3: full mock session + timers
│  ├─ engine/scoring.js      # Phase 3: marking + result breakdown
│  ├─ components/*.jsx       # Phase 4: UI screens
│  ├─ lib/pdf.js             # Phase 5: questionnaire PDF
│  ├─ App.jsx  main.jsx  styles.css
└─ tests/phase1 … phase5/
```

## Data model (Phase 1)
```js
Exam    = { id, name, category, body, topics: Topic[], papers: Paper[] }
Topic   = { subject, name }
Paper   = { name, minutes, sections: Section[], note? }
Section = { name, questions, correct, wrong, minutes? }   // wrong is 0 or negative
```
Timing rule: if every section of a paper has `minutes`, sections are **locked and sequential** (e.g. CAT, IBPS PO) and the
paper's `minutes` equals their sum. Otherwise one shared timer with free navigation between sections.
Multi-paper exams (UPSC CSE GS I + CSAT, NDA, CDS, CTET…) let the user pick which paper to attempt as a mock.

## Question model (Phase 2)
```js
Question = { id, subject, topic, question, options: [4 strings], answerIndex: 0-3, explanation, difficulty: 'easy'|'medium'|'hard' }
```
All questions are single-correct MCQs (numerical/TITA/MSQ types are converted to MCQs; noted per paper).

## API contract (Phase 2)
`POST /api/questions`
```json
{ "examId": "jee-main", "subject": "Physics", "topic": "Rotational Motion", "count": 1, "avoid": ["first 80 chars of earlier questions"] }
```
→ `200 { "questions": Question[] }` · `400` bad input · `502` LLM failure after 2 retries.
`count` max 10 per call (keeps each call under Netlify's 10 s limit). `topic` may be omitted for mocks (whole-section mix).

## Prompt strategy (Phase 2)
System prompt: expert paper-setter for `<exam>`, mirror the style, difficulty and topic weightage of the last 5–7 years of
`<exam>` papers, prefer high-yield concepts that are repeatedly asked, original questions (no verbatim copying),
exactly one correct option, short explanation, JSON only. Temperature 0.7. `avoid` list prevents repeats.
The UI labels questions as "in the style of recent papers", never as guaranteed predictions.

## Phases

### Phase 1 – Setup & exam catalog
Vite + React scaffold, Netlify config, 50-exam catalog with topics and mock patterns, helper functions, placeholder page,
tests in `tests/phase1`, push to GitHub.

### Phase 2 – AI question engine
Netlify Function `questions.mjs` calling Groq (`https://api.groq.com/openai/v1/chat/completions`, JSON mode),
prompt builder, validation (4 options, valid answerIndex, non-empty text), dedupe by normalized question text,
retry ×2, browser client `lib/api.js`. Tests: unit tests with mocked fetch + one live test that runs only when
`GROQ_API_KEY` is set.

### Phase 3 – Test engine (pure logic, no UI)
- **Practice:** 30 questions on one topic, served one at a time; next question prefetched while the user answers;
  answer locks on submit; score shown after Q30 (correct / wrong / accuracy).
- **Full mock:** builds the question plan from the paper pattern, fetches in batches of 10 (first batch before start,
  rest in background), applies marking per section, handles shared or sectional timers, auto-submits at 0:00,
  scores only answered questions.
- **Scoring:** total, per-section marks, correct/wrong/unattempted, accuracy, negative marks lost.
Tests in `tests/phase3` (timers tested with fake timers).

### Phase 4 – UI (React)
Screens: Home (exam dropdown grouped by category → mode: Topic practice / Full mock → topic or paper picker),
Instructions (pattern table, marking, timer), Question screen (question, 4 options, progress, timer, question palette
for mocks, mark for review), Result (score, section breakdown, review with explanations). Responsive, light/dark.
Tests in `tests/phase4` (component smoke tests).

### Phase 5 – PDF download & deployment
"Download questionnaire" on the result screen → PDF with exam, date, score, every question, user answer, correct answer,
explanation. README with setup steps. Deploy: Netlify connected to the GitHub repo, `GROQ_API_KEY` and `GROQ_MODEL`
set in Netlify environment variables. Tests in `tests/phase5`.

## Rules for the coding agent
1. Implement only the phase requested. Do not refactor files from earlier phases unless a test requires it.
2. Never commit `.env`. Never expose the Groq key to the browser.
3. Keep replies short: list changed files and test results only.
