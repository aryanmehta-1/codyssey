import './coding.css';

/**
 * Read-only, simulated code display for "what is the output?" challenges.
 * Intentionally NOT a real compiler/execution engine — output is chosen
 * by the learner from multiple choice, keeping scope inside Lectures 1-42.
 */
export default function CodeEditor({ code }) {
  return (
    <div className="code-editor">
      <div className="code-editor__topbar">
        <span className="code-editor__dot" style={{ background: '#f43f5e' }} />
        <span className="code-editor__dot" style={{ background: '#fbbf24' }} />
        <span className="code-editor__dot" style={{ background: '#34d399' }} />
      </div>
      {code}
    </div>
  );
}
