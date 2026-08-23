import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import CodeverseBackground from '../components/codeverse/CodeverseBackground';
import CodeverseConnector from '../components/codeverse/CodeverseConnector';
import CodeverseProgress from '../components/codeverse/CodeverseProgress';
import LearningNode from '../components/codeverse/LearningNode';
import NodeDetails from '../components/codeverse/NodeDetails';
import { useProgress } from '../hooks/useProgress';
import '../components/codeverse/codeverse.css';

export default function CodeversePage() {
  const { skillsWithProgress, student, questsWithStatus } = useProgress();
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Reverse order so the chain reads bottom-to-top like the brief's example (React at top).
  const chain = [...skillsWithProgress].reverse();

  return (
    <PageContainer title="Codeverse">
      <CodeverseProgress skills={skillsWithProgress} />

      <div className="codeverse-canvas">
        <CodeverseBackground />
        <div className="codeverse-chain">
          {chain.map((skill, i) => (
            <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LearningNode skill={skill} onClick={setSelectedSkill} />
              {i < chain.length - 1 && (
                <CodeverseConnector active={skill.status === 'completed' || skill.status === 'current'} />
              )}
            </div>
          ))}
        </div>
      </div>

      <NodeDetails
        skill={selectedSkill}
        completedLessonIds={student.completedLessonIds}
        quests={questsWithStatus}
        onClose={() => setSelectedSkill(null)}
      />
    </PageContainer>
  );
}
