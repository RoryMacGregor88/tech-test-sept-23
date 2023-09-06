import { ReactNode } from 'react';

interface Props {
  onSubmit: () => void;
  children: ReactNode;
}

const FormWrapper = ({ onSubmit, children }: Props) => (
  <form
    className='flex flex-col gap-4'
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    {children}
  </form>
);

export default FormWrapper;
