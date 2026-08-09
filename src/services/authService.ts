'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type ApiResponse } from '../lib/apiClient';
import { ApiUrls } from '../lib/apiUrls';
import { QueryKeys } from '../lib/queryKeys';
import { clearToken, getToken, setToken } from '../lib/authToken';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
}

export const useAdminLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<ApiResponse<{ accessToken: string; user: AdminUser }>>(
        ApiUrls.AUTH_LOGIN,
        credentials,
      );
      setToken(data.data.accessToken);
      return data.data;
    },
    onSuccess: (result) => {
      queryClient.setQueryData([QueryKeys.AUTH_ME], result.user);
    },
  });
};

export const useAdminMe = () =>
  useQuery({
    queryKey: [QueryKeys.AUTH_ME],
    enabled: !!getToken(),
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<AdminUser>>(ApiUrls.AUTH_ME);
      return data.data;
    },
  });

export const useAdminLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    clearToken();
    queryClient.clear();
  };
};
