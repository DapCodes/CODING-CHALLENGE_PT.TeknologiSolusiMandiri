import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CategoryAttributes {
  id: number;
  name: string;
  color: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'color'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public color!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Category name cannot be empty' },
        len: { args: [1, 100], msg: 'Category name must be between 1 and 100 characters' },
      },
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: '#6366F1',
      validate: {
        is: { args: /^#([A-Fa-f0-9]{6})$/, msg: 'Color must be a valid hex color (e.g. #3B82F6)' },
      },
    },
  },
  {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,
    underscored: true,
  }
);

export default Category;
