import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import {
  CheckSquareOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { TodoProvider } from '../../context/TodoContext';
import { CategoryProvider } from '../../context/CategoryContext';
import TodoPage from '../../pages/TodoPage';
import CategoryPage from '../../pages/CategoryPage';

const { Header, Content } = Layout;
const { Title } = Typography;

type ActivePage = 'todos' | 'categories';

const AppLayout: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('todos');

  return (
    <CategoryProvider>
      <TodoProvider>
        <Layout className="neo-layout">
          <Header className="neo-header">
            <div className="neo-header-inner">
              <div className="neo-logo">
                <Title level={4} className="neo-logo-text">
                  INDUSTRIX TODO
                </Title>
              </div>
              <nav className="neo-nav">
                <button
                  className={`neo-nav-btn ${activePage === 'todos' ? 'active' : ''}`}
                  onClick={() => setActivePage('todos')}
                >
                  <CheckSquareOutlined />
                  <span>List</span>
                </button>
                <button
                  className={`neo-nav-btn ${activePage === 'categories' ? 'active' : ''}`}
                  onClick={() => setActivePage('categories')}
                >
                  <TagsOutlined />
                  <span>Cat</span>
                </button>
              </nav>
            </div>
          </Header>

          <Content className="neo-content">
            <div className="neo-content-inner">
              {activePage === 'todos' ? <TodoPage /> : <CategoryPage />}
            </div>
          </Content>
        </Layout>
      </TodoProvider>
    </CategoryProvider>
  );
};

export default AppLayout;
