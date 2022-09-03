import type { TodoStatus } from '../types';

export const translateStatus = (status: TodoStatus) => {

  if (status === 'waiting') return '未着手';
  if (status === 'working') return '着手中';
  if (status === 'pending') return '保留中';
  if (status === 'discontinued') return '中止';
  if (status === 'completed') return '完了';

  return status;
};