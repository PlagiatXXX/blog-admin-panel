import {
  Alert,
  Box,
  Button,
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
import { deleteComment, getComments, updateComment } from '../services/api';

export const Comments = () => {
  const queryClient = useQueryClient();

  // 1. Получаем данные комментариев
  const { data: comments, isLoading, isError, error } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });

  // 2. Мутация для обновления (одобрения) комментария
  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
  
  // 3. Мутация для удаления комментария
  const { mutate: deleteCommentMutation } = useMutation({
      mutationFn: deleteComment,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
  })

  // Обработчик переключения статуса
  const handleApprovalChange = (comment: {id: number, approved: boolean}) => {
    updateCommentMutation({ id: comment.id, approved: !comment.approved });
  };
  
  // Обработчик удаления
  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот комментарий?')) {
        deleteCommentMutation(id);
    }
  }


  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Произошла ошибка: {error.message}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Управление комментариями
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID поста</TableCell>
              <TableCell>Автор</TableCell>
              <TableCell>Текст</TableCell>
              <TableCell>Одобрен</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments?.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell>{comment.postId}</TableCell>
                <TableCell>{comment.author}</TableCell>
                <TableCell>{comment.body}</TableCell>
                <TableCell>
                  <Switch
                    checked={comment.approved}
                    onChange={() => handleApprovalChange(comment)}
                  />
                </TableCell>
                <TableCell align="right">
                    <Button variant='outlined' color='error' onClick={() => handleDelete(comment.id)}>
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
