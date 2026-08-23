/**
 * Defines the Codeverse chain order and the connective "orbit" labels
 * shown between nodes. Purely presentational — actual unlock logic
 * lives in StudentContext / calculateProgress.js.
 */
import { skillOrder } from './skills';

export const learningPath = skillOrder.map((skillId, index) => ({
  skillId,
  order: index,
}));
