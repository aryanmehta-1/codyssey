import './rewards.css';

/** Small inline "+N XP" pill used after completing a lesson/quiz/quest. */
export default function XPReward({ amount }) {
  return <span className="xp-reward-pill">✨ +{amount} XP</span>;
}
