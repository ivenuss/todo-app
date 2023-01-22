import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { App as AntdApp } from 'antd';
import { store } from './store';

// Pages
import { HomePage } from '@/pages/home';

const queryClient = new QueryClient();

function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AntdApp>
          <HomePage />
        </AntdApp>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
