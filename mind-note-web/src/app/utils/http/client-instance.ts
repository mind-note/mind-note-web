// utils/http/client-instance.ts
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken } from '../auth/refresh';

export const createClientHttpInstance = (): AxiosInstance => {
  const instance = axios.create({
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken_client');
    //console.log('[Client Axios] accessToken_client:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          Cookies.set('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }

        Cookies.remove('accessToken');
        alert('로그인이 만료되었습니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/';
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
