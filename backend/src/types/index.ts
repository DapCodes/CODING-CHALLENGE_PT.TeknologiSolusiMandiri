export type Priority = 'high' | 'medium' | 'low';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface TodoFilters {
  search?: string;
  completed?: boolean;
  category_id?: number;
  priority?: Priority;
  sort_by?: 'created_at' | 'updated_at' | 'due_date' | 'title' | 'priority';
  sort_order?: 'ASC' | 'DESC';
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
  errors?: Record<string, string>[];
  pagination?: PaginationMeta;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  category_id?: number;
  priority?: Priority;
  due_date?: string;
}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {
  completed?: boolean;
}

export interface CreateCategoryDto {
  name: string;
  color?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
