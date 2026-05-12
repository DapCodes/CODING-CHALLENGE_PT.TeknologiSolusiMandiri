import apiClient from './client';
import { ApiResponse, Category, CreateCategoryDto, UpdateCategoryDto } from '../types';

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return data.data ?? [];
  },

  create: async (payload: CreateCategoryDto): Promise<Category> => {
    const { data } = await apiClient.post<ApiResponse<Category>>('/categories', payload);
    return data.data!;
  },

  update: async (id: number, payload: UpdateCategoryDto): Promise<Category> => {
    const { data } = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, payload);
    return data.data!;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
