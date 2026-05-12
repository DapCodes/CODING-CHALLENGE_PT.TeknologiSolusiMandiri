import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Priority } from '../types';
import Category from './Category';

export interface TodoAttributes {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  category_id?: number | null;
  priority: Priority;
  due_date?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface TodoCreationAttributes
  extends Optional<TodoAttributes, 'id' | 'description' | 'completed' | 'category_id' | 'priority' | 'due_date'> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public completed!: boolean;
  public category_id!: number | null;
  public priority!: Priority;
  public due_date!: Date | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title cannot be empty' },
        len: { args: [1, 255], msg: 'Title must be between 1 and 255 characters' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    priority: {
      type: DataTypes.ENUM('high', 'medium', 'low'),
      allowNull: false,
      defaultValue: 'medium',
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'todos',
    modelName: 'Todo',
    timestamps: true,
    underscored: true,
  }
);

Todo.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Todo, { foreignKey: 'category_id', as: 'todos' });

export default Todo;
