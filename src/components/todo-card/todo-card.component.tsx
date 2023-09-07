import { Card } from '@mantine/core';

import { Button } from '~/components';
import { TODO_COMPLETE_TEXT, TODO_INCOMPLETE_TEXT } from '~/constants';
import { Todo } from '~/types';
import { formatDate } from '~/utils/utils';

interface Props {
  todo: Todo;
  handleEdit: (todo: Todo) => void;
  handleDelete: (todo: Todo) => void;
  isSelected: boolean;
}
const TodoCard = ({ todo, handleEdit, handleDelete, isSelected }: Props) => {
  const { createdAt, done, title, updatedAt } = todo;
  const onEditClick = () => handleEdit(todo);
  const onDeleteClick = () => handleDelete(todo);
  return (
    <Card className={`border-rounded ${isSelected ? 'border-red' : ''}`}>
      <h2>Title: {title}</h2>
      <h2>Created: {formatDate(createdAt)}</h2>
      <h2>Status: {done ? TODO_COMPLETE_TEXT : TODO_INCOMPLETE_TEXT}</h2>
      <h2>Last Edit: {formatDate(updatedAt)}</h2>

      <div className='flex gap-2'>
        <Button onClick={onEditClick}>Edit</Button>
        <Button onClick={onDeleteClick}>Delete</Button>
      </div>
    </Card>
  );
};

export default TodoCard;
