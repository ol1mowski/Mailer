import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minut
      gcTime: 10 * 60 * 1000, // 10 minut
    },
    mutations: {
      retry: 1,
      onError: (error: Error) => {
        toast.error(error.message || 'Wystąpił błąd podczas wykonywania operacji');
      },
    },
  },
}); 