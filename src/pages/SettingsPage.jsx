import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { dailyGoalOptions } from '../data/courses';
import { useProgress } from '../hooks/useProgress';

export default function SettingsPage() {
  const { student, updateSettings, resetProgress } = useProgress();
  const [displayName, setDisplayName] = useState(student.settings.displayName);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const saveName = () => updateSettings({ displayName });

  const handleReset = () => {
    resetProgress();
    setConfirmingReset(false);
  };

  return (
    <PageContainer title="Settings">
      <Card className="settings-section">
        <h3 style={{ marginBottom: 14 }}>Profile</h3>
        <Input label="Display Name" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <Button variant="secondary" onClick={saveName}>Save Name</Button>
      </Card>

      <Card className="settings-section">
        <h3 style={{ marginBottom: 14 }}>Daily Goal</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {dailyGoalOptions.map((opt) => (
            <button
              key={opt.value}
              className={`setup-option ${student.settings.dailyGoalMinutes === opt.value ? 'setup-option--selected' : ''}`}
              onClick={() => updateSettings({ dailyGoalMinutes: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="settings-section">
        <div className="settings-row">
          <div>
            <strong>Theme</strong>
            <p className="text-secondary" style={{ fontSize: 12 }}>Codyssey is dark-themed by design — light mode is on the Phase II roadmap.</p>
          </div>
          <span className="badge-chip badge-chip--primary">Dark</span>
        </div>
      </Card>

      <Card className="settings-section">
        <h3 style={{ marginBottom: 10, color: 'var(--danger)' }}>Danger Zone</h3>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 14 }}>
          This clears all XP, levels, streaks, badges, and lesson/quest progress stored in this browser.
        </p>
        {!confirmingReset ? (
          <Button variant="secondary" onClick={() => setConfirmingReset(true)}>Reset Demo Progress</Button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="ghost" onClick={() => setConfirmingReset(false)}>Cancel</Button>
            <Button onClick={handleReset} variant="secondary" style={{ color: 'var(--danger)' }}>
              Confirm Reset
            </Button>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
