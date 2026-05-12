import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { message } from 'antd';
import { Todo, TodoFilters, PaginationMeta, CreateTodoDto, UpdateTodoDto } from '../types';
import { todoApi } from '../api/todoApi';

interface TodoContextValue {
  todos: Todo[];
  pagination: PaginationMeta;
  filters: TodoFilters;
  loading: boolean;
  fetchTodos: (newFilters?: Partial<TodoFilters>) => Promise<void>;
  setFilters: (filters: Partial<TodoFilters>) => void;
  createTodo: (data: CreateTodoDto) => Promise<void>;
  updateTodo: (id: number, data: UpdateTodoDto) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const defaultPagination: PaginationMeta = {
  current_page: 1,
  per_page: 10,
  total: 0,
  total_pages: 0,
};

const defaultFilters: TodoFilters = {
  page: 1,
  limit: 10,
  sort_by: 'created_at',
  sort_order: 'DESC',
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);
  const [filters, setFiltersState] = useState<TodoFilters>(defaultFilters);
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async (newFilters?: Partial<TodoFilters>) => {
    setLoading(true);
    try {
      const mergedFilters = { ...filters, ...newFilters };
      const { todos: data, pagination: meta } = await todoApi.getAll(mergedFilters);
      setTodos(data);
      setPagination(meta);
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const setFilters = useCallback((newFilters: Partial<TodoFilters>) => {
    setFiltersState((prev) => {
      const merged = { ...prev, ...newFilters, page: newFilters.page ?? 1 };
      return merged;
    });
  }, []);

  const createTodo = useCallback(async (data: CreateTodoDto) => {
    await todoApi.create(data);
    await fetchTodos({ page: 1 });
    message.success('Todo created');
  }, [fetchTodos]);

  const updateTodo = useCallback(async (id: number, data: UpdateTodoDto) => {
    const updated = await todoApi.update(id, data);
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    message.success('Todo updated');
  }, []);

  const toggleTodo = useCallback(async (id: number) => {
    const updated = await todoApi.toggleComplete(id);
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const deleteTodo = useCallback(async (id: number) => {
    await todoApi.delete(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
    message.success('Todo deleted');
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        pagination,
        filters,
        loading,
        fetchTodos,
        setFilters,
        createTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextValue => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider');
  return ctx;
};
