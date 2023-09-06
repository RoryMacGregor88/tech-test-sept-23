import { format } from 'date-fns';

import { DATE_FORMAT } from '~/constants';

const formatDate = (date: string) => format(new Date(date), DATE_FORMAT);

export { formatDate };
