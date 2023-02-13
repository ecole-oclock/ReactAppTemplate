import { QueryClient } from '@tanstack/react-query';
// Create a client
export default new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
