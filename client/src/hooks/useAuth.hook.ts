import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { authApi, type User, type LoginRequest, type RegisterRequest } from '../lib/api';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const { data: currentUserData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });

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

  useEffect(() => {
    if (currentUserData?.success && currentUserData.user) {
      setUser(currentUserData.user);
    } else if (currentUserData && !currentUserData.success) {
      setUser(null);
    }
  }, [currentUserData]);

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
    isLoading: isLoadingUser || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}; 