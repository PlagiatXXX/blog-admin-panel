import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getPostById, type PostFormData, updatePost } from '../services/api';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

export const PostFormPage = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PostFormData>({
    mode: 'onChange',
  });

  // Загрузка данных для редактирования
  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPostById(id!),
    enabled: isEditMode, // Запрос выполнится только в режиме редактирования
  });
  
  // Заполняем форму, когда данные загрузились
  useEffect(() => {
    if (post) {
        setValue('title', post.title);
        setValue('content', post.content);
        setValue('userId', post.userId);
    }
  }, [post, setValue]);


  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: PostFormData) => 
        isEditMode ? updatePost({ postId: id!, postData: data }) : createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });

  const onSubmit = (data: PostFormData) => {
    // userId пока ставим статично
    mutate({ ...data, userId: 1 });
  };

  if (isLoadingPost) {
    return <CircularProgress />;
  }
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{isEditMode ? 'Редактировать пост' : 'Создать пост'}</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            {...register('title', { required: 'Заголовок обязателен',
              minLength: { value: 3, message: 'Минимум 3 символа' },
              maxLength: { value: 100, message: 'Максимум 100 символов' },
             })}
            label="Заголовок"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            {...register('content', 
              { required: 'Содержимое обязательно',
                minLength: { value: 10, message: 'Напишите хотя бы 10 символов' },
               })}
            label="Содержимое"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          {isError && <Alert severity="error">Ошибка: {error.message}</Alert>}
          
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button type="submit" 
            variant="contained" 
            disabled={isPending || !isValid}>
              {isPending ? <CircularProgress size={24} /> : (isEditMode ? 'Сохранить' : 'Создать')}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/posts')}>
              Отмена
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
