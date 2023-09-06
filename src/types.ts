export interface Todo {
  id: string;
  createdAt: string;
  done: boolean;
  title: string;
  updatedAt: string;
}

export interface TodoFormValues {
  id: string | null;
  formValues: {
    title: string;
    done: boolean;
  };
}
