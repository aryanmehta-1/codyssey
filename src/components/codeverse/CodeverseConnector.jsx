import './codeverse.css';

export default function CodeverseConnector({ active = false }) {
  return <div className={`codeverse-connector ${active ? 'codeverse-connector--active' : ''}`} />;
}
