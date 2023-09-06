import { format } from 'date-fns';

import { DATE_FORMAT } from '~/constants';

const formatDate = (date: string) => format(date, DATE_FORMAT);

export { formatDate };
