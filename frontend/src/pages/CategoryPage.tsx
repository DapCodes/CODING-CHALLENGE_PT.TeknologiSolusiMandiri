import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CategoryList from '../components/category/CategoryList';
import CategoryForm from '../components/category/CategoryForm';

const { Title } = Typography;

const CategoryPage: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="neo-page">
      <div className="neo-page-header">
        <div className="neo-page-header-text">
          <Title level={3} className="neo-page-title">
            Categories
          </Title>
          <p className="neo-page-subtitle">Organize your todos with categories.</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormOpen(true)}
          className="neo-btn neo-btn-primary"
          size="middle"
        >
          New Category
        </Button>
      </div>

      <CategoryList />

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
};

export default CategoryPage;
