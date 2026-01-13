import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import { getCommentsCount, getPostsCount, getUsersCount } from '../services/api';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';

export const Dashboard = () => {
  // Используем useQueries для параллельного выполнения нескольких запросов
  const results = useQueries({
    queries: [
      { queryKey: ['postsCount'], queryFn: getPostsCount },
      { queryKey: ['usersCount'], queryFn: getUsersCount },
      { queryKey: ['commentsCount'], queryFn: getCommentsCount },
    ],
  });

  // Извлекаем результаты
  const postsCountQuery = results[0];
  const usersCountQuery = results[1];
  const commentsCountQuery = results[2];

  // Проверяем состояние загрузки и ошибок
  const isLoading = postsCountQuery.isLoading || usersCountQuery.isLoading || commentsCountQuery.isLoading;
  const isError = postsCountQuery.isError || usersCountQuery.isError || commentsCountQuery.isError;
  const error = postsCountQuery.error || usersCountQuery.error || commentsCountQuery.error;


  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Произошла ошибка при загрузке дашборда: {error?.message}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Дашборд
      </Typography>

      <Grid container spacing={3}>
        {/* Карточка для постов */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArticleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h5" component="div">
                  {postsCountQuery.data}
                </Typography>
                <Typography color="text.secondary">Всего постов</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Карточка для пользователей */}
        <Grid size={{xs: 12, sm: 6, md: 4}} >
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
              <Box>
                <Typography variant="h5" component="div">
                  {usersCountQuery.data}
                </Typography>
                <Typography color="text.secondary">Всего пользователей</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Карточка для комментариев */}
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CommentIcon sx={{ fontSize: 40, color: 'info.main' }} />
              <Box>
                <Typography variant="h5" component="div">
                  {commentsCountQuery.data}
                </Typography>
                <Typography color="text.secondary">Всего комментариев</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Здесь можно добавить больше статистики, графики и т.д. */}
    </Box>
  );
};
