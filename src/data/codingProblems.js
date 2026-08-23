/**
 * "Coding challenges" are simulated as output-prediction / correct-code
 * questions, not a real compiler — see components/coding/CodeEditor.jsx.
 * Sourced from the output-type entries in questions.js.
 */
import { questions } from './questions';

export const codingProblems = questions.filter((q) => q.type === 'output');
