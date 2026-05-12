import React, { useState, useCallback, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Popconfirm,
  Pagination,
  Typography,
  Tooltip,
  Empty,
  Spin,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  TagOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Todo } from '../../types';
import { useTodoContext } from '../../context/TodoContext';
import TodoForm from './TodoForm';

const { Text } = Typography;

const priorityConfig: Record<string, { label: string; className: string }> = {
  high:   { label: 'High', className: 'neo-priority-high' },
  medium: { label: 'Medium', className: 'neo-priority-medium' },
  low:    { label: 'Low', className: 'neo-priority-low' },
};

const TodoList: React.FC = () => {
  const { todos, pagination, filters, loading, fetchTodos, toggleTodo, deleteTodo, updateTodo } =
    useTodoContext();
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleToggle = useCallback(
    async (id: number) => {
      setActionLoading((prev) => ({ ...prev, [id]: true }));
      try {
        await toggleTodo(id);
      } finally {
        setActionLoading((prev) => ({ ...prev, [id]: false }));
      }
    },
    [toggleTodo]
  );

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
    setFormOpen(true);
  };

  const handleUpdate = async (data: Parameters<typeof updateTodo>[1]) => {
    if (editTodo) await updateTodo(editTodo.id, data);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    fetchTodos({ page, limit: pageSize ?? filters.limit });
  };

  if (loading && todos.length === 0) {
    return (
      <div className="neo-loading">
        <Spin size="large" />
        <Text strong style={{ marginTop: 16 }}>Loading todos...</Text>
      </div>
    );
  }

  return (
    <>
      <div className="neo-todo-list">
        {todos.length === 0 ? (
          <div className="neo-empty">
            <Empty
              description={
                <Text strong style={{ fontSize: 16 }}>
                  No todos found. Create one to get started!
                </Text>
              }
            />
          </div>
        ) : (
          todos.map((todo) => {
            const priority = priorityConfig[todo.priority];
            const isOverdue = !todo.completed && todo.due_date && dayjs(todo.due_date).isBefore(dayjs());

            return (
              <div
                key={todo.id}
                className={`neo-todo-item ${todo.completed ? 'neo-todo-completed' : ''}`}
              >
                <div className="neo-todo-checkbox">
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    disabled={actionLoading[todo.id]}
                  />
                </div>

                <div className="neo-todo-content">
                  <div className="neo-todo-title-row">
                    <Text
                      delete={todo.completed}
                      strong
                      className={`neo-todo-title ${todo.completed ? 'completed' : ''}`}
                    >
                      {todo.title}
                    </Text>
                  </div>

                  {todo.description && (
                    <Text
                      type="secondary"
                      className="neo-todo-description"
                    >
                      {todo.description}
                    </Text>
                  )}

                  <div className="neo-todo-meta">
                    <span className={`neo-badge ${priority.className}`}>
                      {priority.label}
                    </span>

                    {todo.category && (
                      <span className="neo-badge neo-badge-category">
                        <TagOutlined /> {todo.category.name}
                      </span>
                    )}

                    {todo.due_date && (
                      <span className={`neo-badge ${isOverdue ? 'neo-badge-overdue' : 'neo-badge-date'}`}>
                        <CalendarOutlined />{' '}
                        {dayjs(todo.due_date).format('MMM D, YYYY')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="neo-todo-actions">
                  <Tooltip title="Edit">
                    <Button
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(todo)}
                      className="neo-action-btn"
                    />
                  </Tooltip>
                  <Popconfirm
                    title="Delete this todo?"
                    onConfirm={() => deleteTodo(todo.id)}
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                  >
                    <Tooltip title="Delete">
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        className="neo-action-btn neo-action-delete"
                      />
                    </Tooltip>
                  </Popconfirm>
                </div>
              </div>
            );
          })
        )}
      </div>

      {pagination.total > 0 && (
        <div className="neo-pagination">
          <Text type="secondary" className="neo-pagination-info">
            Showing {Math.min((pagination.current_page - 1) * pagination.per_page + 1, pagination.total)}-
            {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} todos
          </Text>
          <Pagination
            current={pagination.current_page}
            pageSize={pagination.per_page}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            size="small"
          />
        </div>
      )}

      <TodoForm
        open={formOpen}
        todo={editTodo}
        onClose={() => { setFormOpen(false); setEditTodo(null); }}
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default TodoList;
