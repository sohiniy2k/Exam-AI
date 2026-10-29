// Phase 1 placeholder: verifies the catalog loads in the browser. Replaced by the real UI in Phase 4.
import { useState } from 'react';
import { getExamsByCategory, getTopicsBySubject, getExamById, getPaperStats } from './data/examUtils.js';

export default function App() {
  const [examId, setExamId] = useState('');
  const exam = getExamById(examId);
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '40px auto', padding: 16 }}>
      <h1>ExamAI – Phase 1 check</h1>
      <select value={examId} onChange={(e) => setExamId(e.target.value)}>
        <option value="">Select an exam</option>
        {getExamsByCategory().map((g) => (
          <optgroup key={g.category} label={g.category}>
            {g.exams.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </optgroup>
        ))}
      </select>
      {exam && (
        <>
          <h3>Topics</h3>
          {getTopicsBySubject(examId).map((g) => (
            <p key={g.subject}><b>{g.subject}:</b> {g.topics.join(', ')}</p>
          ))}
          <h3>Full mock</h3>
          {exam.papers.map((p) => {
            const s = getPaperStats(p);
            return <p key={p.name}>{p.name}: {s.totalQuestions} questions, {s.maxMarks} marks, {s.durationMinutes} min{s.sectionalTiming ? ' (sectional timing)' : ''}</p>;
          })}
        </>
      )}
    </main>
  );
}
