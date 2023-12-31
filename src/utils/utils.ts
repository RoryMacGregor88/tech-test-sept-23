import { format } from 'date-fns';

import { DATE_FORMAT } from '~/constants';

const formatDate = (date: string) => format(new Date(date), DATE_FORMAT);

const handleError = async (errorMessage: string) => {
  console.error('An unexpected error has occurred: ', errorMessage);
};

export { formatDate, handleError };
