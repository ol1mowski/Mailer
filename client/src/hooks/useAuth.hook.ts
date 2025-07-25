import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { authApi, type User, type LoginRequest, type RegisterRequest } from '../lib/api';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Automatyczne pobieranie użytkownika po odświeżeniu
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authApi.getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
          queryClient.setQueryData(['currentUser'], response);
        }
      } catch (error) {
        console.log('Brak aktywnej sesji');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [queryClient]);


  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.success && data.user) {
        setUser(data.user);
        queryClient.setQueryData(['currentUser'], data);
        toast.success(data.message);
      } else {
        throw new Error(data.message || 'Błąd logowania');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      if (data.success && data.user) {
        setUser(data.user);
        queryClient.setQueryData(['currentUser'], data);
        toast.success(data.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: (data) => {
      setUser(null);
      queryClient.clear();
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const login = async (data: LoginRequest) => {
    await loginMutation.mutateAsync(data);
  };

  const register = async (data: RegisterRequest) => {
    await registerMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return {
    user,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};

// Eksport dla AuthProvider
export const useAuthProvider = useAuth; 