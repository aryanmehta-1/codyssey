import './coding.css';

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
