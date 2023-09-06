import { TODO_COMPLETE_TEXT, TODO_INCOMPLETE_TEXT } from '~/constants';
import { Todo } from '~/types';
import { formatDate } from '~/utils/utils';

const TodoCard = ({ id, createdAt, done, title, updatedAt }: Todo) => (
  <div>
    <h2>{title}</h2>
    <h2>{createdAt}</h2>
    <h2>{done ? TODO_COMPLETE_TEXT : TODO_INCOMPLETE_TEXT}</h2>
    <h2>{updatedAt}</h2>
  </div>
);

export default TodoCard;
