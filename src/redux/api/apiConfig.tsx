import {API_URL} from '@app/config';
import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
});

const baseQueryWithRetry = retry(
  async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const {status} = result.error;
      console.log('🚀 ~ status:', status);
    }

    return result;
  },
  {
    maxRetries: 0,
    backoff: async (attempt, maxRetries) => {
      const attempts = Math.min(attempt, maxRetries);

      await new Promise(resolve => {
        setTimeout(resolve, attempts * 1000);
      });
    },
  },
);

const apiConfig = createApi({
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});

export default apiConfig;
