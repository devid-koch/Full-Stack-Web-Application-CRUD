import { createBrowserRouter } from 'react-router-dom';
import AuthPage from './pages/Auth';
import Profile from './pages/Profile';
import ProtectedRoute from './components/common/protected-route';
import RootLayout from './layouts/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: '/me',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
