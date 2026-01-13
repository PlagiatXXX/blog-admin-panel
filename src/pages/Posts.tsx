import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPosts } from '../services/api';
import { Link as RouterLink } from 'react-router-dom';

export const Posts = () => {
  const queryClient = useQueryClient();

  // 1. Получение данных (Fetching)
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,    // Функция, которая будет выполнять запрос
  });

  // 2. Операция изменения данных (Mutation)
  const { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePost, // Функция, которая будет вызвана
    onSuccess: () => {
      // При успехе - инвалидируем (делаем неактуальным) кеш 'posts'
      // React Query автоматически сделает повторный запрос getPosts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
        deletePostMutation(id);
    }
  }

  // 3. Рендеринг в зависимости от состояния
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Произошла ошибка: {error.message}</Alert>;
  }

  return (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h4">
        Управление постами
      </Typography>
            <Button variant="contained" component={RouterLink} to="/posts/new">
                Создать пост
            </Button>
        </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Заголовок</TableCell>
              <TableCell>ID автора</TableCell>
              <TableCell>Дата публикации</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.userId}</TableCell>
                <TableCell>{new Date(post.publishedAt).toLocaleString('ru-RU')}</TableCell>
                <TableCell align="right" sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button variant="outlined" component={RouterLink} to={`/posts/edit/${post.id}`}>
                    Редактировать
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(post.id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
