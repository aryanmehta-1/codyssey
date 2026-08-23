import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { getLessonsForSkill } from '../../data/lessons';
import { getQuestsForSkill } from '../../data/quests';
import './codeverse.css';

/** Modal shown when a Codeverse node is clicked — lesson checklist + next quest. */
export default function NodeDetails({ skill, completedLessonIds, quests, onClose }) {
  const navigate = useNavigate();
  if (!skill) return null;

  const skillLessons = getLessonsForSkill(skill.id);
  const skillQuests = quests.filter((q) => q.skillId === skill.id);
  const nextQuest = skillQuests.find((q) => q.status !== 'completed');

  return (
    <Modal open={!!skill} onClose={onClose}>
      <div className="node-details">
        <div className="node-details__header">
          <span className="node-details__icon">{skill.icon}</span>
          <div>
            <h2>{skill.name}</h2>
            <p className="text-secondary" style={{ fontSize: 13 }}>{skill.progress}% Complete</p>
          </div>
        </div>

        <ProgressBar percent={skill.progress} color={skill.color} height={10} />

        <div className="node-details__topics">
          {skillLessons.map((lesson) => {
            const done = completedLessonIds.includes(lesson.id);
            return (
              <div className="node-details__topic" key={lesson.id}>
                {done ? (
                  <CheckCircle2 size={16} color="var(--success)" />
                ) : (
                  <Circle size={16} color="var(--text-muted)" />
                )}
                <span className={done ? 'text-secondary' : ''}>{lesson.title}</span>
              </div>
            );
          })}
        </div>

        {nextQuest && (
          <div className="node-details__quest">
            <strong>NEXT QUEST</strong>
            <span>{nextQuest.title} — <span className="mono">+{nextQuest.xp} XP</span></span>
          </div>
        )}

        <Button
          fullWidth
          onClick={() => {
            onClose();
            navigate('/learn', { state: { skillId: skill.id } });
          }}
        >
          Continue Learning
        </Button>
      </div>
    </Modal>
  );
}
