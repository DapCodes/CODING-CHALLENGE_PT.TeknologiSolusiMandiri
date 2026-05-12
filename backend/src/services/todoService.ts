import { Op, WhereOptions } from 'sequelize';
import { Todo, Category } from '../models';
import { TodoAttributes } from '../models/Todo';
import { CreateTodoDto, UpdateTodoDto, TodoFilters, PaginationParams, PaginationMeta } from '../types';

interface FindAllResult {
  todos: Todo[];
  pagination: PaginationMeta;
}

export class TodoService {
  async findAll(filters: TodoFilters = {}, pagination: PaginationParams = {}): Promise<FindAllResult> {
    const page = Math.max(1, pagination.page ?? 1);
    const limit = Math.min(50, Math.max(1, pagination.limit ?? 10));
    const offset = (page - 1) * limit;

    const where: WhereOptions<TodoAttributes> = {};

    if (filters.search) {
      where.title = { [Op.iLike]: `%${filters.search}%` };
    }
    if (typeof filters.completed === 'boolean') {
      where.completed = filters.completed;
    }
    if (filters.category_id) {
      where.category_id = filters.category_id;
    }
    if (filters.priority) {
      where.priority = filters.priority;
    }

    const sortBy = filters.sort_by ?? 'created_at';
    const sortOrder = filters.sort_order ?? 'DESC';

    const { count, rows: todos } = await Todo.findAndCountAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          required: false,
        },
      ],
      order: [[sortBy, sortOrder]],
      limit,
      offset,
      distinct: true,
    });

    return {
      todos,
      pagination: {
        current_page: page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit),
      },
    };
  }

  async findById(id: number): Promise<Todo | null> {
    return Todo.findByPk(id, {
      include: [{ model: Category, as: 'category', required: false }],
    });
  }

  async create(data: CreateTodoDto): Promise<Todo> {
    const todo = await Todo.create({
      title: data.title.trim(),
      description: data.description?.trim() ?? null,
      category_id: data.category_id ?? null,
      priority: data.priority ?? 'medium',
      due_date: data.due_date ? new Date(data.due_date) : null,
      completed: false,
    });

    return this.findById(todo.id) as Promise<Todo>;
  }

  async update(id: number, data: UpdateTodoDto): Promise<Todo | null> {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;

    await todo.update({
      ...(data.title !== undefined && { title: data.title.trim() }),
      ...(data.description !== undefined && { description: data.description?.trim() ?? null }),
      ...(data.completed !== undefined && { completed: data.completed }),
      ...(data.category_id !== undefined && { category_id: data.category_id }),
      ...(data.priority !== undefined && { priority: data.priority }),
      ...(data.due_date !== undefined && { due_date: data.due_date ? new Date(data.due_date) : null }),
    });

    return this.findById(id);
  }

  async toggleComplete(id: number): Promise<Todo | null> {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;

    await todo.update({ completed: !todo.completed });
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const todo = await Todo.findByPk(id);
    if (!todo) return false;

    await todo.destroy();
    return true;
  }
}

export const todoService = new TodoService();
