export type Priority = 'high' | 'medium' | 'low';

export interface Category {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  category_id: number | null;
  category: Category | null;
  priority: Priority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationMeta;
}

export interface TodoFilters {
  search?: string;
  completed?: boolean | null;
  category_id?: number | null;
  priority?: Priority | null;
  sort_by?: string;
  sort_order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  category_id?: number | null;
  priority?: Priority;
  due_date?: string | null;
}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {
  completed?: boolean;
}

export interface CreateCategoryDto {
  name: string;
  color?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
