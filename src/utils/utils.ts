import { format } from 'date-fns';

import {
  DATE_FORMAT,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_HEADERS,
} from '~/constants';

const handleError = async (error: string) => {
  console.error(`${DEFAULT_ERROR_MESSAGE}: ${error}`);
};

const formatDate = (date: string) => {
  try {
    return format(new Date(date), DATE_FORMAT);
  } catch (e) {
    const error = e as string;
    handleError(error);
  }
};

interface FetchWrapperArgs {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: { [key: string]: unknown };
}

const fetchWrapper = async ({
  endpoint,
  method = 'GET',
  payload,
}: FetchWrapperArgs) => {
  try {
    const headers = DEFAULT_HEADERS,
      body = !!payload ? { body: JSON.stringify(payload) } : {};

    const res = await fetch(endpoint, { method, headers, ...body });

    if (!res.ok) {
      const error = await res.json();
      handleError(error.error);
      return null;
    } else {
      return await res.json();
    }
  } catch (e) {
    const error = e as string;
    handleError(error);
  }
};

export { formatDate, handleError, fetchWrapper };
