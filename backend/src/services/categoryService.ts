import { Category } from '../models';
import { CreateCategoryDto, UpdateCategoryDto } from '../types';

export class CategoryService {
  async findAll(): Promise<Category[]> {
    return Category.findAll({
      order: [['name', 'ASC']],
    });
  }

  async findById(id: number): Promise<Category | null> {
    return Category.findByPk(id);
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return Category.create({
      name: data.name.trim(),
      color: data.color ?? '#6366F1',
    });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category | null> {
    const category = await Category.findByPk(id);
    if (!category) return null;

    await category.update({
      ...(data.name && { name: data.name.trim() }),
      ...(data.color && { color: data.color }),
    });

    return category;
  }

  async delete(id: number): Promise<boolean> {
    const category = await Category.findByPk(id);
    if (!category) return false;

    await category.destroy();
    return true;
  }

  async nameExists(name: string, excludeId?: number): Promise<boolean> {
    const where: Record<string, unknown> = {
      name: name.trim(),
    };

    if (excludeId) {
      const { Op } = await import('sequelize');
      where.id = { [Op.ne]: excludeId };
    }

    const count = await Category.count({ where });
    return count > 0;
  }
}

export const categoryService = new CategoryService();
