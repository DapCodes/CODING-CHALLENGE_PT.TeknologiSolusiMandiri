import { categoryService } from '../../src/services/categoryService';
import { Category } from '../../src/models';

jest.mock('../../src/models', () => ({
  Category: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    count: jest.fn(),
  },
}));

describe('CategoryService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('returns all categories sorted by name', async () => {
      const mockCategories = [
        { id: 1, name: 'Personal', color: '#10B981' },
        { id: 2, name: 'Work', color: '#3B82F6' },
      ];
      (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);

      const result = await categoryService.findAll();
      expect(result).toEqual(mockCategories);
      expect(Category.findAll).toHaveBeenCalledWith({ order: [['name', 'ASC']] });
    });
  });

  describe('create', () => {
    it('creates a category with default color', async () => {
      const mockCategory = { id: 1, name: 'Work', color: '#6366F1' };
      (Category.create as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.create({ name: 'Work' });
      expect(result).toEqual(mockCategory);
      expect(Category.create).toHaveBeenCalledWith({ name: 'Work', color: '#6366F1' });
    });

    it('creates a category with custom color', async () => {
      const mockCategory = { id: 2, name: 'Personal', color: '#10B981' };
      (Category.create as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.create({ name: 'Personal', color: '#10B981' });
      expect(result.color).toBe('#10B981');
    });
  });

  describe('delete', () => {
    it('returns true when category exists and is deleted', async () => {
      const mockCategory = { destroy: jest.fn() };
      (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

      const result = await categoryService.delete(1);
      expect(result).toBe(true);
      expect(mockCategory.destroy).toHaveBeenCalled();
    });

    it('returns false when category does not exist', async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await categoryService.delete(999);
      expect(result).toBe(false);
    });
  });

  describe('nameExists', () => {
    it('returns true when category name exists', async () => {
      (Category.count as jest.Mock).mockResolvedValue(1);
      const result = await categoryService.nameExists('Work');
      expect(result).toBe(true);
    });

    it('returns false when category name does not exist', async () => {
      (Category.count as jest.Mock).mockResolvedValue(0);
      const result = await categoryService.nameExists('Nonexistent');
      expect(result).toBe(false);
    });
  });
});
