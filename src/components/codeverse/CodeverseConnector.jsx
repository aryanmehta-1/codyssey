import './codeverse.css';

/** Dashed constellation connector line between two Codeverse nodes. */
export default function CodeverseConnector({ active = false }) {
  return <div className={`codeverse-connector ${active ? 'codeverse-connector--active' : ''}`} />;
}
