import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Input } from '@mantine/core';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Button, FormWrapper } from '~/components';
import { TITLE_REQUIRED_MESSAGE } from '~/constants';
import { Todo, TodoFormData } from '~/types';

const todoFormSchema = Yup.object().shape({
  title: Yup.string().required(TITLE_REQUIRED_MESSAGE),
  done: Yup.boolean().required(),
});

interface Props {
  selectedTodo: Todo | null;
  onSubmit: ({ id, formValues }: TodoFormData) => void;
}

const TodoForm = ({ selectedTodo, onSubmit }: Props) => {
  const { id, title, done } = selectedTodo ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(todoFormSchema),
    defaultValues: {
      title: title ?? '',
      done: done ?? false,
    },
  });

  const isEditing = !!id,
    isDisabled = !isDirty || !!Object.keys(errors).length;

  return (
    <FormWrapper
      onSubmit={handleSubmit((formValues) =>
        onSubmit({ id: id ?? null, formValues }),
      )}
    >
      <h2>{!!title ? `Title: ${title}` : 'Add New Todo'}</h2>

      <Input {...register('title')} placeholder='Title' />
      {errors?.title ? (
        <span className='text-red-500'>{errors.title.message}</span>
      ) : null}

      {isEditing ? <Checkbox {...register('done')} label='Done' /> : null}

      <Button isDisabled={isDisabled} submitType='submit'>
        {isEditing ? 'Edit' : 'Create'}
      </Button>
    </FormWrapper>
  );
};

export default TodoForm;
