import { todoService } from '../../src/services/todoService';
import { Todo, Category } from '../../src/models';

jest.mock('../../src/models', () => ({
  Todo: {
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Category: {},
}));

const mockTodo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test description',
  completed: false,
  category_id: null,
  priority: 'medium' as const,
  due_date: null,
  update: jest.fn(),
  destroy: jest.fn(),
};

describe('TodoService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('returns todos with pagination metadata', async () => {
      (Todo.findAndCountAll as jest.Mock).mockResolvedValue({
        count: 25,
        rows: [mockTodo],
      });

      const result = await todoService.findAll({}, { page: 1, limit: 10 });
      expect(result.todos).toHaveLength(1);
      expect(result.pagination.total).toBe(25);
      expect(result.pagination.total_pages).toBe(3);
      expect(result.pagination.current_page).toBe(1);
    });

    it('uses default pagination when not specified', async () => {
      (Todo.findAndCountAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

      await todoService.findAll();
      expect(Todo.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({ limit: 10, offset: 0 })
      );
    });

    it('applies search filter correctly', async () => {
      (Todo.findAndCountAll as jest.Mock).mockResolvedValue({ count: 0, rows: [] });

      await todoService.findAll({ search: 'test' });
      expect(Todo.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ title: expect.any(Object) }),
        })
      );
    });
  });

  describe('toggleComplete', () => {
    it('toggles completion status from false to true', async () => {
      const todo = { ...mockTodo, completed: false, update: jest.fn() };
      (Todo.findByPk as jest.Mock)
        .mockResolvedValueOnce(todo)
        .mockResolvedValueOnce({ ...todo, completed: true });

      const result = await todoService.toggleComplete(1);
      expect(todo.update).toHaveBeenCalledWith({ completed: true });
    });

    it('returns null when todo does not exist', async () => {
      (Todo.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await todoService.toggleComplete(999);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deletes a todo and returns true', async () => {
      const todo = { ...mockTodo, destroy: jest.fn() };
      (Todo.findByPk as jest.Mock).mockResolvedValue(todo);

      const result = await todoService.delete(1);
      expect(result).toBe(true);
      expect(todo.destroy).toHaveBeenCalled();
    });

    it('returns false when todo does not exist', async () => {
      (Todo.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await todoService.delete(999);
      expect(result).toBe(false);
    });
  });
});
