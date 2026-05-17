import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import Router from './router.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { App, ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

export let customMessage: MessageInstance;
export let customNotification: NotificationInstance;

const store = setupStore();

// ✅ Separate component inside <App> context
const AppContent = () => {
  const { message: msg, notification: notif } = App.useApp(); // ✅ use App.useApp() instead

  useEffect(() => {
    customMessage = msg;
    customNotification = notif;

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key?.startsWith('temp-')) localStorage.removeItem(key);
    }
  }, []);

  return <Router />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: { controlHeight: 36, borderRadius: 3 },
            components: {
              Button: { fontWeight: 500 },
            },
          }}
        >
          <App>
            <AppContent />
          </App>
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)