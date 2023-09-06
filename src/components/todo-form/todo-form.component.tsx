import { Todo } from '~/types';

interface Props {
  selectedTodo: Todo;
}

const TodoForm = ({ selectedTodo }: Props) => {
  return (
    <form>
      <h1>{selectedTodo.title}</h1>
    </form>
  );
};

export default TodoForm;
