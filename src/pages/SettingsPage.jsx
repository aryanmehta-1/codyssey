import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { dailyGoalOptions } from '../data/courses';
import { collegeDetails } from '../data/colleges';
import { useProgress } from '../hooks/useProgress';
import { Building2 } from 'lucide-react';

export default function SettingsPage() {
  const { student, updateSettings, setOnboarding, resetProgress } = useProgress();
  const [displayName, setDisplayName] = useState(student.settings.displayName);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const currentCollege = student.onboarding?.college || 'Chitkara University';

  const saveName = () => updateSettings({ displayName });

  const handleCollegeChange = (collegeName) => {
    setOnboarding({ ...(student.onboarding || {}), college: collegeName });
  };

  const handleReset = () => {
    resetProgress();
    setConfirmingReset(false);
  };

  return (
    <PageContainer title="Settings">
      
      <Card className="settings-section" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 14 }}>Profile & Student Info</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Display Name" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <Button variant="secondary" onClick={saveName} style={{ alignSelf: 'flex-start' }}>
            Save Display Name
          </Button>
        </div>
      </Card>

      <Card className="settings-section" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Building2 size={18} color="#6366f1" /> University & Campus
        </h3>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 14 }}>
          Select your university to participate in campus standings & leaderboards.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {collegeDetails.map((c) => {
            const isSelected = currentCollege === c.name;
            return (
              <button
                key={c.id}
                type="button"
                className={`setup-option ${isSelected ? 'setup-option--selected' : ''}`}
                onClick={() => handleCollegeChange(c.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 20 }}>{c.badge}</span>
                <div>
                  <strong style={{ fontSize: 13, display: 'block' }}>{c.shortName}</strong>
                  <span className="text-muted" style={{ fontSize: 11 }}>{c.location}</span>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="settings-section" style={{ marginBottom: 20 }}>
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
        <h3 style={{ marginBottom: 10, color: '#fb4570' }}>Danger Zone</h3>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 14 }}>
          This clears all XP, levels, streaks, badges, and lesson/quest progress stored in this browser.
        </p>
        {!confirmingReset ? (
          <Button variant="secondary" onClick={() => setConfirmingReset(true)}>Reset Demo Progress</Button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="ghost" onClick={() => setConfirmingReset(false)}>Cancel</Button>
            <Button onClick={handleReset} variant="secondary" style={{ color: '#fb4570' }}>
              Confirm Reset
            </Button>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
