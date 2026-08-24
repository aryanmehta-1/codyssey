
import { skillOrder } from './skills';

export const learningPath = skillOrder.map((skillId, index) => ({
  skillId,
  order: index,
}));
