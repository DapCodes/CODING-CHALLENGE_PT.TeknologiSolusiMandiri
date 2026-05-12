import apiClient from './client';
import {
  ApiResponse,
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
  TodoFilters,
  PaginationMeta,
} from '../types';

interface FetchTodosResult {
  todos: Todo[];
  pagination: PaginationMeta;
}

export const todoApi = {
  getAll: async (filters: TodoFilters = {}): Promise<FetchTodosResult> => {
    const params: Record<string, string | number | boolean> = {};

    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;
    if (filters.search) params.search = filters.search;
    if (filters.completed !== null && filters.completed !== undefined)
      params.completed = filters.completed;
    if (filters.category_id) params.category_id = filters.category_id;
    if (filters.priority) params.priority = filters.priority;
    if (filters.sort_by) params.sort_by = filters.sort_by;
    if (filters.sort_order) params.sort_order = filters.sort_order;

    const { data } = await apiClient.get<ApiResponse<Todo[]>>('/todos', { params });
    return {
      todos: data.data ?? [],
      pagination: data.pagination ?? {
        current_page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0,
      },
    };
  },

  getById: async (id: number): Promise<Todo> => {
    const { data } = await apiClient.get<ApiResponse<Todo>>(`/todos/${id}`);
    return data.data!;
  },

  create: async (payload: CreateTodoDto): Promise<Todo> => {
    const { data } = await apiClient.post<ApiResponse<Todo>>('/todos', payload);
    return data.data!;
  },

  update: async (id: number, payload: UpdateTodoDto): Promise<Todo> => {
    const { data } = await apiClient.put<ApiResponse<Todo>>(`/todos/${id}`, payload);
    return data.data!;
  },

  toggleComplete: async (id: number): Promise<Todo> => {
    const { data } = await apiClient.patch<ApiResponse<Todo>>(`/todos/${id}/complete`);
    return data.data!;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};
