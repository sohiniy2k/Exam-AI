import { describe, it, expect } from 'vitest';
import { EXAMS, CATEGORIES } from '../../src/data/exams.js';
import { getExamsByCategory, getExamById, getTopicsBySubject, getPaper, getPaperStats } from '../../src/data/examUtils.js';

describe('Phase 1 – exam catalog data', () => {
  it('has exactly 50 exams with unique ids', () => {
    expect(EXAMS).toHaveLength(50);
    expect(new Set(EXAMS.map((e) => e.id)).size).toBe(50);
  });

  it('every exam has required fields and at least 4 unique topics', () => {
    for (const e of EXAMS) {
      expect(e.id, e.id).toMatch(/^[a-z0-9-]+$/);
      expect(e.name && e.category && e.body, e.id).toBeTruthy();
      expect(e.topics.length, e.id).toBeGreaterThanOrEqual(4);
      const keys = e.topics.map((t) => `${t.subject}|${t.name}`);
      expect(new Set(keys).size, `duplicate topic in ${e.id}`).toBe(keys.length);
      for (const t of e.topics) expect(t.subject && t.name, e.id).toBeTruthy();
    }
  });

  it('every paper has valid sections, marking and timing', () => {
    for (const e of EXAMS) {
      expect(e.papers.length, e.id).toBeGreaterThanOrEqual(1);
      for (const p of e.papers) {
        expect(p.name, e.id).toBeTruthy();
        expect(p.minutes, e.id).toBeGreaterThan(0);
        expect(p.sections.length, e.id).toBeGreaterThanOrEqual(1);
        for (const s of p.sections) {
          expect(Number.isInteger(s.questions) && s.questions > 0, `${e.id}/${s.name}`).toBe(true);
          expect(s.correct, `${e.id}/${s.name}`).toBeGreaterThan(0);
          expect(s.wrong, `${e.id}/${s.name}`).toBeLessThanOrEqual(0);
        }
        const timed = p.sections.filter((s) => typeof s.minutes === 'number');
        if (timed.length) {
          expect(timed.length, `${e.id}: all sections need minutes`).toBe(p.sections.length);
          expect(timed.reduce((a, s) => a + s.minutes, 0), `${e.id}: section minutes must sum to paper`).toBe(p.minutes);
        }
      }
    }
  });

  it('matches known official patterns', () => {
    const stats = (id, i = 0) => getPaperStats(getPaper(id, i));
    expect(stats('jee-main')).toMatchObject({ totalQuestions: 75, maxMarks: 300, durationMinutes: 180 });
    expect(stats('neet-ug')).toMatchObject({ totalQuestions: 180, maxMarks: 720, durationMinutes: 180 });
    expect(stats('upsc-cse')).toMatchObject({ totalQuestions: 100, maxMarks: 200 });
    expect(stats('upsc-cse', 1)).toMatchObject({ totalQuestions: 80, maxMarks: 200 });
    expect(stats('cat')).toMatchObject({ totalQuestions: 68, maxMarks: 204, sectionalTiming: true });
    expect(stats('gate-cs')).toMatchObject({ totalQuestions: 65, maxMarks: 100 });
    expect(stats('ssc-cgl')).toMatchObject({ totalQuestions: 100, maxMarks: 200, durationMinutes: 60 });
    expect(stats('ibps-po')).toMatchObject({ totalQuestions: 100, sectionalTiming: true, negativeMarking: true });
    expect(stats('ctet')).toMatchObject({ totalQuestions: 150, negativeMarking: false });
  });

  it('covers all major categories', () => {
    expect(CATEGORIES).toEqual(expect.arrayContaining(['UPSC & Defence', 'Engineering', 'Medical', 'Management', 'Banking', 'Insurance', 'SSC', 'Railways']));
  });
});

describe('Phase 1 – exam utils', () => {
  it('groups exams by category covering all 50', () => {
    const groups = getExamsByCategory();
    expect(groups.reduce((n, g) => n + g.exams.length, 0)).toBe(50);
  });

  it('returns topics grouped by subject', () => {
    const groups = getTopicsBySubject('jee-main');
    expect(groups.map((g) => g.subject)).toEqual(['Physics', 'Chemistry', 'Mathematics']);
    expect(groups[0].topics).toContain('Rotational Motion');
  });

  it('handles unknown ids safely', () => {
    expect(getExamById('nope')).toBeNull();
    expect(getTopicsBySubject('nope')).toEqual([]);
    expect(getPaper('nope')).toBeNull();
  });
});
