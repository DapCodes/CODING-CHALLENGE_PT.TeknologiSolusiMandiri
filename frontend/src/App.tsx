import React from 'react';
import { ConfigProvider } from 'antd';
import AppLayout from './components/layout/AppLayout';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 0,
          fontFamily: "'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f0f0f0',
          colorText: '#000000',
          colorBorder: '#000000',
        },
        components: {
          Table: { borderRadius: 0 },
          Button: { borderRadius: 0 },
          Input: { borderRadius: 0 },
          Select: { borderRadius: 0 },
          Modal: { borderRadius: 0 },
          Card: { borderRadius: 0 },
        },
      }}
    >
      <AppLayout />
    </ConfigProvider>
  );
};

export default App;
