import { EXAMS, CATEGORIES } from './exams.js';

const round2 = (n) => Math.round(n * 100) / 100;

/** Exams grouped by category, for the exam dropdown. */
export function getExamsByCategory() {
  return CATEGORIES.map((category) => ({
    category,
    exams: EXAMS.filter((e) => e.category === category).map(({ id, name }) => ({ id, name })),
  }));
}

export function getExamById(id) {
  return EXAMS.find((e) => e.id === id) || null;
}

/** Topics of one exam grouped by subject, for the topic dropdown. */
export function getTopicsBySubject(examId) {
  const exam = getExamById(examId);
  if (!exam) return [];
  const groups = new Map();
  for (const { subject, name } of exam.topics) {
    if (!groups.has(subject)) groups.set(subject, []);
    groups.get(subject).push(name);
  }
  return [...groups].map(([subject, topics]) => ({ subject, topics }));
}

export function getPaper(examId, paperIndex = 0) {
  return getExamById(examId)?.papers[paperIndex] || null;
}

/** Summary used on the mock instructions screen. */
export function getPaperStats(paper) {
  const sectionalTiming = paper.sections.every((s) => typeof s.minutes === 'number');
  return {
    totalQuestions: paper.sections.reduce((sum, s) => sum + s.questions, 0),
    maxMarks: round2(paper.sections.reduce((sum, s) => sum + s.questions * s.correct, 0)),
    durationMinutes: paper.minutes,
    sectionalTiming,
    negativeMarking: paper.sections.some((s) => s.wrong < 0),
  };
}
