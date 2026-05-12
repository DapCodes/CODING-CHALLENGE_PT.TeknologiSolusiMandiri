import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { message } from 'antd';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../types';
import { categoryApi } from '../api/categoryApi';

interface CategoryContextValue {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  createCategory: (data: CreateCategoryDto) => Promise<void>;
  updateCategory: (id: number, data: UpdateCategoryDto) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextValue | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (data: CreateCategoryDto) => {
    const newCategory = await categoryApi.create(data);
    setCategories((prev) => [...prev, newCategory].sort((a, b) => a.name.localeCompare(b.name)));
    message.success('Category created');
  }, []);

  const updateCategory = useCallback(async (id: number, data: UpdateCategoryDto) => {
    const updated = await categoryApi.update(id, data);
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? updated : c)).sort((a, b) => a.name.localeCompare(b.name))
    );
    message.success('Category updated');
  }, []);

  const deleteCategory = useCallback(async (id: number) => {
    await categoryApi.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    message.success('Category deleted');
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoryContext.Provider
      value={{ categories, loading, fetchCategories, createCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = (): CategoryContextValue => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error('useCategoryContext must be used within CategoryProvider');
  return ctx;
};
