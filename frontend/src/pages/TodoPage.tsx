import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TodoList from '../components/todo/TodoList';
import TodoFilters from '../components/todo/TodoFilters';
import TodoForm from '../components/todo/TodoForm';
import { useTodoContext } from '../context/TodoContext';
import { CreateTodoDto } from '../types';

const { Title } = Typography;

const TodoPage: React.FC = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const { createTodo } = useTodoContext();

  return (
    <div className="neo-page">
      <div className="neo-page-header">
        <div className="neo-page-header-text">
          <Title level={3} className="neo-page-title">
            My Todos
          </Title>
          <p className="neo-page-subtitle">Stay organized, stay productive.</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateOpen(true)}
          className="neo-btn neo-btn-primary"
          size="middle"
        >
          New Todo
        </Button>
      </div>

      <TodoFilters />
      <div className="neo-divider" />
      <TodoList />

      <TodoForm
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={async (data) => createTodo(data as CreateTodoDto)}
      />
    </div>
  );
};

export default TodoPage;
