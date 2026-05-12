import React, { useState } from 'react';
import {
  Button,
  Popconfirm,
  Typography,
  Empty,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Category } from '../../types';
import { useCategoryContext } from '../../context/CategoryContext';
import CategoryForm from '../category/CategoryForm';

const { Text } = Typography;

const CategoryList: React.FC = () => {
  const { categories, deleteCategory } = useCategoryContext();
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleEdit = (cat: Category) => {
    setEditCategory(cat);
    setFormOpen(true);
  };

  return (
    <div className="neo-category-list">
      {categories.length === 0 ? (
        <div className="neo-empty">
          <Empty
            description={
              <Text strong style={{ fontSize: 16 }}>
                No categories yet. Create one to organize your todos!
              </Text>
            }
          />
        </div>
      ) : (
        categories.map((cat) => (
          <div key={cat.id} className="neo-category-item">
            <div className="neo-category-info">
              <div
                className="neo-category-color"
                style={{ backgroundColor: cat.color }}
              />
              <div>
                <Text strong className="neo-category-name">{cat.name}</Text>
                <Text type="secondary" className="neo-category-date">
                  Created {dayjs(cat.created_at).format('MMM D, YYYY')}
                </Text>
              </div>
            </div>
            <div className="neo-category-color-code">
              <span
                className="neo-color-tag"
                style={{ backgroundColor: cat.color }}
              >
                {cat.color}
              </span>
            </div>
            <div className="neo-category-actions">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEdit(cat)}
                className="neo-action-btn"
              />
              <Popconfirm
                title="Delete this category?"
                description="Todos in this category will become uncategorized."
                onConfirm={() => deleteCategory(cat.id)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  className="neo-action-btn neo-action-delete"
                />
              </Popconfirm>
            </div>
          </div>
        ))
      )}

      <CategoryForm
        open={formOpen}
        category={editCategory}
        onClose={() => { setFormOpen(false); setEditCategory(null); }}
      />
    </div>
  );
};

export default CategoryList;
