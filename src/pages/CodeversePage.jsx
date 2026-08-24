import PageContainer from '../components/layout/PageContainer';
import CodeverseProgress from '../components/codeverse/CodeverseProgress';
import SimpleRoadmapView from '../components/codeverse/SimpleRoadmapView';
import { useProgress } from '../hooks/useProgress';

export default function CodeversePage() {
  const { skillsWithProgress, student } = useProgress();

  return (
    <PageContainer title="Codeverse — Skill Roadmap">
      <CodeverseProgress skills={skillsWithProgress} />
      <div style={{ marginTop: 20 }}>
        <SimpleRoadmapView skills={skillsWithProgress} completedLessonIds={student.completedLessonIds} />
      </div>
    </PageContainer>
  );
}
