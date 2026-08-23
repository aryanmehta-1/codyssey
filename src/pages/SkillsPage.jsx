import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import SkillCard from '../components/skills/SkillCard';
import SkillFilter from '../components/skills/SkillFilter';
import { useProgress } from '../hooks/useProgress';

export default function SkillsPage() {
  const { skillsWithProgress, student } = useProgress();
  const [filter, setFilter] = useState('all');

  const filtered = skillsWithProgress.filter((s) => filter === 'all' || s.status === filter);

  return (
    <PageContainer title="Skills">
      <SkillFilter value={filter} onChange={setFilter} />
      <div className="grid-2">
        {filtered.map((skill) => (
          <SkillCard key={skill.id} skill={skill} completedLessonIds={student.completedLessonIds} />
        ))}
      </div>
    </PageContainer>
  );
}
