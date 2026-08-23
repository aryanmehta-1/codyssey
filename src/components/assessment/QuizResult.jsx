import Button from '../common/Button';
import XPCounter from '../common/XPCounter';
import './assessment.css';

/** Final quiz summary screen with score, accuracy, combo bonus, and XP earned. */
export default function QuizResult({ correct, total, xpAwarded, comboBonus = 0, perfect = false, onContinue }) {
  const accuracy = Math.round((correct / total) * 100);
  return (
    <div className="quiz-result">
      <h2>{perfect ? 'PERFECT RUN 🏆' : 'QUIZ COMPLETE 🎉'}</h2>
      <div className="quiz-result__score mono">{correct} / {total}</div>
      <p className="text-secondary">{accuracy}% Accuracy</p>
      {comboBonus > 0 && (
        <p className="combo-meter" style={{ marginTop: 4 }}>🔥 Combo Bonus +{comboBonus} XP</p>
      )}
      <p className="badge-chip badge-chip--xp" style={{ fontSize: 14, padding: '8px 16px', marginTop: 10 }}>
        <XPCounter value={xpAwarded} prefix="+" />
      </p>
      <Button onClick={onContinue} size="lg">Continue</Button>
    </div>
  );
}
