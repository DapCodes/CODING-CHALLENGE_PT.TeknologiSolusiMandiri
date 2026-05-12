import React, { useCallback } from 'react';
import { Input, Select, Space, Button, Row, Col } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { useTodoContext } from '../../context/TodoContext';
import { useCategoryContext } from '../../context/CategoryContext';
import { Priority } from '../../types';

const { Search } = Input;
const { Option } = Select;

const TodoFilters: React.FC = () => {
  const { filters, setFilters, fetchTodos } = useTodoContext();
  const { categories } = useCategoryContext();

  const handleSearch = useCallback(
    (value: string) => {
      setFilters({ search: value || undefined, page: 1 });
      fetchTodos({ search: value || undefined, page: 1 });
    },
    [setFilters, fetchTodos]
  );

  const handleFilterChange = useCallback(
    (key: string, value: unknown) => {
      const update = { [key]: value ?? undefined, page: 1 };
      setFilters(update);
      fetchTodos(update);
    },
    [setFilters, fetchTodos]
  );

  const handleReset = useCallback(() => {
    const reset = {
      search: undefined,
      completed: undefined,
      category_id: undefined,
      priority: undefined,
      page: 1,
    };
    setFilters(reset);
    fetchTodos(reset);
  }, [setFilters, fetchTodos]);

  return (
    <div className="neo-filters">
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={24} md={8} lg={8}>
          <Search
            placeholder="Search todos by title..."
            defaultValue={filters.search}
            onSearch={handleSearch}
            allowClear
            className="neo-search"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Select
            placeholder="Status"
            value={filters.completed}
            onChange={(v) => handleFilterChange('completed', v)}
            allowClear
            className="neo-select"
            style={{ width: '100%' }}
          >
            <Option value={false}>Active</Option>
            <Option value={true}>Completed</Option>
          </Select>
        </Col>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Select
            placeholder="Category"
            value={filters.category_id}
            onChange={(v) => handleFilterChange('category_id', v)}
            allowClear
            className="neo-select"
            style={{ width: '100%' }}
          >
            {categories.map((c) => (
              <Option key={c.id} value={c.id}>
                <Space>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      border: '2px solid #000',
                      background: c.color,
                    }}
                  />
                  {c.name}
                </Space>
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Select
            placeholder="Priority"
            value={filters.priority}
            onChange={(v) => handleFilterChange('priority', v as Priority)}
            allowClear
            className="neo-select"
            style={{ width: '100%' }}
          >
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Col>
        <Col xs={12} sm={8} md={4} lg={4}>
          <Button
            onClick={handleReset}
            className="neo-btn neo-btn-outline"
            icon={<ClearOutlined />}
            block
          >
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TodoFilters;
