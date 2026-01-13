import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // В реальном приложении здесь была бы проверка логина/пароля
    // Мы же просто "диспатчим" action для входа
    dispatch(login());
    // И перенаправляем пользователя на главную страницу
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Вход в панель
          </Typography>
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue="admin@test.com"
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue="password"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Войти
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
