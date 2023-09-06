import { useState } from 'react';

import { Button, TodoCard } from '~/components';

import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClick = async () => {
    const res = await fetch('http://localhost:8080/todos');
    const { data: todos } = await res.json();
    setTodos(todos);
  };

  return (
    <div className='h-screen'>
      <Button onClick={handleClick}>I am Mantine Button</Button>
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default App;
