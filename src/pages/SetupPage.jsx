import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import DegreePage from './setup/DegreePage';
import BranchPage from './setup/BranchPage';
import CollegePage from './setup/CollegePage';
import YearPage from './setup/YearPage';
import CareerGoalPage from './setup/CareerGoalPage';
import './pages.css';

const STEPS = ['degree', 'branch', 'college', 'year', 'goal'];

/**
 * Orchestrates the 5 onboarding steps (Degree → Branch → College → Year → Goal).
 * Each step is its own component under pages/setup/, kept purely presentational;
 * this page owns the wizard state so there's a single source of truth to explain.
 */
export default function SetupPage() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const { setOnboarding } = useProgress();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({ degree: '', branch: '', college: '', year: '', goal: '' });

  const stepKey = STEPS[stepIndex];
  const canProceed = !!answers[stepKey];

  const handleSelect = (value) => setAnswers((a) => ({ ...a, [stepKey]: value }));

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    completeOnboarding(answers);
    setOnboarding(answers);
    navigate('/dashboard');
  };

  const handleBack = () => setStepIndex((i) => Math.max(0, i - 1));

  return (
    <div className="setup-shell">
      <div className="setup-card">
        <p className="eyebrow" style={{ marginBottom: 12 }}>Welcome to Codyssey — let's personalize your journey</p>
        <div className="setup-progress">
          {STEPS.map((s, i) => (
            <div key={s} className={`setup-progress__seg ${i <= stepIndex ? 'setup-progress__seg--active' : ''}`} />
          ))}
        </div>

        {stepKey === 'degree' && <DegreePage value={answers.degree} onSelect={handleSelect} />}
        {stepKey === 'branch' && <BranchPage value={answers.branch} onSelect={handleSelect} />}
        {stepKey === 'college' && <CollegePage value={answers.college} onSelect={handleSelect} />}
        {stepKey === 'year' && <YearPage value={answers.year} onSelect={handleSelect} />}
        {stepKey === 'goal' && <CareerGoalPage value={answers.goal} onSelect={handleSelect} />}

        <div className="setup-nav">
          <Button variant="ghost" onClick={handleBack} disabled={stepIndex === 0}>Back</Button>
          <Button onClick={handleNext} disabled={!canProceed}>
            {stepIndex === STEPS.length - 1 ? 'Enter Codyssey 🚀' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
