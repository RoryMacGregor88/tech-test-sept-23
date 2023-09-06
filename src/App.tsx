import { useEffect, useState } from 'react';

import { Modal } from '@mantine/core';

import { Header, TodoCard, TodoForm, TodoList } from '~/components';
import { TODOS_ENDPOINT } from '~/constants';
import { Todo, TodoFormValues } from '~/types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const modalIsOpen = !!selectedTodo;

  useEffect(() => {
    /** Immediate function that will run as soon as it is defined */
    (async () => {
      const res = await fetch(TODOS_ENDPOINT);
      const { data: todos } = await res.json();
      setTodos(todos);
    })();
  }, []);

  const handleCloseModal = () => setSelectedTodo(null);

  const handleError = async (errorMessage: string) => {
    console.error('An unexpected error has occurred: ', errorMessage);
  };

  const handleTodoSubmit = async ({ id, formValues }: TodoFormValues) => {
    const isEditing = !!id,
      endpoint = `${TODOS_ENDPOINT}${isEditing ? `/:${id}` : ''}`,
      method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
      method,
      body: JSON.stringify(formValues),
    });

    if (!res.ok) {
      const error = await res.json();
      return handleError(error.error);
    }

    const { data: todo } = await res.json();

    if (isEditing) {
      setTodos((prevTodos) => {
        const filteredTodos = prevTodos.filter((todo) => todo.id === id);
        /** Place most recently edited Todo at top of list */
        return [todo, ...filteredTodos];
      });
    } else {
      setTodos((prevTodos) => [todo, ...prevTodos]);
    }
  };

  const handleDelete = async (todo: Todo) => {
    try {
      const { id } = todo;

      const res = await fetch(`${TODOS_ENDPOINT}/:${todo.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        return handleError(error.error);
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id === id));
    } catch (e) {
      const error = e as string;
      return handleError(error);
    }
  };

  return (
    <>
      <div className='h-screen'>
        <Header />
        <TodoList>
          {todos.map((todo) => {
            const isSelected = selectedTodo?.id === todo.id;
            return (
              <TodoCard
                key={todo.id}
                handleDelete={handleDelete}
                isSelected={isSelected}
                setSelectedTodo={setSelectedTodo}
                todo={todo}
              />
            );
          })}
        </TodoList>
      </div>
      {!!selectedTodo ? (
        <Modal opened={modalIsOpen} onClose={handleCloseModal}>
          <TodoForm selectedTodo={selectedTodo} onSubmit={handleTodoSubmit} />
        </Modal>
      ) : null}
    </>
  );
}

export default App;
