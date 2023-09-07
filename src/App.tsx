import { useEffect, useState } from 'react';

import { Modal } from '@mantine/core';

import { Button, TodoCard, TodoForm, TodoList } from '~/components';
import { TODOS_ENDPOINT } from '~/constants';
import { Todo, TodoFormData } from '~/types';

import { fetchWrapper } from './utils/utils';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    /** Immediate function that will run as soon as it is defined */
    (async () => {
      const endpoint = TODOS_ENDPOINT;

      const response = await fetchWrapper({ endpoint });
      if (!response) return;

      const { data: todos } = response;
      setTodos(todos);
    })();
  }, []);

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedTodo(null);
  };

  const handleEdit = (todo: Todo) => {
    setModalIsOpen(true);
    setSelectedTodo(todo);
  };

  const onFormSubmit = async ({ id, formValues }: TodoFormData) => {
    const { title, done } = formValues;

    /** Endpoint, method and payload vary between creating and editing todos  */
    const isEditing = !!id,
      endpoint = `${TODOS_ENDPOINT}/${isEditing ? `${id}` : ''}`,
      method = isEditing ? 'PUT' : 'POST',
      payload = isEditing ? { title, done } : { title };

    const response = await fetchWrapper({ endpoint, method, payload });
    if (!response) return handleCloseModal();

    const { data: todo } = response;

    if (isEditing) {
      setTodos((prevTodos) => {
        const filteredTodos = prevTodos.filter((todo) => todo.id !== id);
        /** Place most recently edited Todo at top of list */
        return [todo, ...filteredTodos];
      });
    } else {
      setTodos((prevTodos) => [todo, ...prevTodos]);
    }
    handleCloseModal();
  };

  const handleDelete = async (todo: Todo) => {
    const { id } = todo;

    const endpoint = `${TODOS_ENDPOINT}/${id}`,
      method = 'DELETE';

    const response = await fetchWrapper({ endpoint, method });
    if (!response) return handleCloseModal();

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    handleCloseModal();
  };

  return (
    <>
      <div className='h-screen p-4'>
        <TodoList>
          {todos.map((todo) => {
            const isSelected = selectedTodo?.id === todo.id;
            return (
              <TodoCard
                key={todo.id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                isSelected={isSelected}
                todo={todo}
              />
            );
          })}
        </TodoList>

        <div className='flex justify-center'>
          <Button onClick={() => setModalIsOpen(true)}>Create Todo</Button>
        </div>
      </div>

      {modalIsOpen ? (
        <Modal opened={modalIsOpen} onClose={handleCloseModal}>
          <TodoForm selectedTodo={selectedTodo} onSubmit={onFormSubmit} />
        </Modal>
      ) : null}
    </>
  );
}

export default App;
