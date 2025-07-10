// src/lib/api/index.ts
import axios from 'axios';
import { store } from '@/lib/redux/store';
import { API_BASE_URL } from './config';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
  },
});

apiClient.interceptors.request.use(
  config => {
    const state = store.getState();
    const loginToken = state.auth.token; 
    if (loginToken) {
      config.headers['Authorization'] = `Bearer ${loginToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// بقیه کد بدون تغییر است
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export const fetchUsers = async (
  page: number = 1
): Promise<GetUsersResponse> => {
  const response = await apiClient.get('/users?page=${page}');
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};
