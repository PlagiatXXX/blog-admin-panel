import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { type RootState } from '../store/store';

export const ProtectedRoute = () => {
  // Берем состояние аутентификации из Redux store
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Если пользователь авторизован, показываем вложенный контент (наши страницы)
  if (isAuthenticated) {
    return <Outlet />;
  }

  // Если нет — перенаправляем на страницу логина
  return <Navigate to="/login" replace />;
};
