import { Dispatch, SetStateAction } from 'react';

import { Card } from '@mantine/core';

import { Button } from '~/components';
import { TODO_COMPLETE_TEXT, TODO_INCOMPLETE_TEXT } from '~/constants';
import { Todo } from '~/types';
import { formatDate } from '~/utils/utils';

interface Props {
  todo: Todo;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
  isSelected: boolean;
}
const TodoCard = ({ todo, setSelectedTodo, isSelected }: Props) => {
  const { id, createdAt, done, title, updatedAt } = todo;
  const handleClick = () => setSelectedTodo(todo);
  return (
    <Card>
      <h2>{title}</h2>
      <h2>{formatDate(createdAt)}</h2>
      <h2>{done ? TODO_COMPLETE_TEXT : TODO_INCOMPLETE_TEXT}</h2>
      <h2>{formatDate(updatedAt)}</h2>
      <Button onClick={handleClick}>View</Button>
    </Card>
  );
};

export default TodoCard;
