import { QueryClient } from '@tanstack/react-query';

export default new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
});
