import { Dispatch, SetStateAction } from 'react';

import { Card } from '@mantine/core';

import { Button } from '~/components';
import { TODO_COMPLETE_TEXT, TODO_INCOMPLETE_TEXT } from '~/constants';
import { Todo } from '~/types';
import { formatDate } from '~/utils/utils';

interface Props {
  todo: Todo;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
  handleDelete: (todo: Todo) => void;
  isSelected: boolean;
}
const TodoCard = ({
  todo,
  setSelectedTodo,
  handleDelete,
  isSelected,
}: Props) => {
  const { createdAt, done, title, updatedAt } = todo;
  const onViewClick = () => setSelectedTodo(todo);
  const onDeleteClick = () => handleDelete(todo);
  return (
    <Card className={`border-rounded ${isSelected ? 'border-red' : ''}`}>
      <h2>{title}</h2>
      <h2>{formatDate(createdAt)}</h2>
      <h2>{done ? TODO_COMPLETE_TEXT : TODO_INCOMPLETE_TEXT}</h2>
      <h2>{formatDate(updatedAt)}</h2>

      <div className='flex gap-2'>
        <Button onClick={onViewClick}>Edit</Button>
        <Button onClick={onDeleteClick}>Delete</Button>
      </div>
    </Card>
  );
};

export default TodoCard;
