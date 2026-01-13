import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUser } from '../services/api';

export const Users = () => {
  const queryClient = useQueryClient();

  // 1. Получаем данные пользователей
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  // 2. Создаем мутацию для обновления пользователя
  const { mutate: updateUserMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // Инвалидируем кеш, чтобы список обновился
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    // Можно добавить onError для обработки ошибок обновления
  });

  // 3. Обработчик переключения статуса
  const handleStatusChange = (user: {id: number, active: boolean}) => {
    updateUserMutation({ id: user.id, active: !user.active });
  };


  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Произошла ошибка: {error.message}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Управление пользователями
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Статус (Active)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.active}
                    onChange={() => handleStatusChange(user)}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
