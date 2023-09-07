import { beforeEach, describe, expect, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

import { DEFAULT_ERROR_MESSAGE } from '~/constants';

import { fetchWrapper, formatDate, handleError } from './utils';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testErrorMessage = 'error-message',
  errorLog = `${DEFAULT_ERROR_MESSAGE}: ${testErrorMessage}`,
  consoleErrorMock = vi.fn();

describe('Utils', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(consoleErrorMock);
  });

  describe('handleError', () => {
    it('should call console.error with message', () => {
      handleError(testErrorMessage);

      expect(consoleErrorMock).toHaveBeenCalledWith(errorLog);
    });
  });

  describe('formatDate', () => {
    it('should convert an ISO date to a formatted date string', () => {
      const isoDate = '2023-09-06T20:20:28.851Z',
        expected = '6th September 2023';

      const result = formatDate(isoDate);
      expect(result).toEqual(expected);
    });

    it.each([undefined, null, NaN, 123, {}, ''])(
      `should call console.error if invalid date value provided (%s)`,
      (invalidValue) => {
        formatDate(invalidValue);

        expect(consoleErrorMock).toHaveBeenCalledWith(errorLog);
      },
    );
  });

  describe('fetchWrapper', () => {
    it('should call console.error if response is not ok', () => {
      fetchMocker.mockResponse(JSON.stringify({ error: testErrorMessage }), {
        status: 500,
      });

      fetchWrapper({ endpoint: 'http://localhost:3000' });

      expect(consoleErrorMock).toHaveBeenCalledWith(errorLog);
    });

    it('should call console.error if client-side error', () => {
      fetchMocker.mockResponse(() => {
        throw new Error(testErrorMessage);
      });

      fetchWrapper({ endpoint: 'http://localhost:3000' });

      expect(consoleErrorMock).toHaveBeenCalledWith(errorLog);
    });

    it('makes successful request', async () => {
      const message = 'test-message';
      fetchMocker.mockResponse(JSON.stringify({ message }));

      const result = await fetchWrapper({ endpoint: 'http://localhost:3000' });

      expect(result).toEqual({ message });
    });
  });
});
