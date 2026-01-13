import axios from 'axios';

const API_BASE_URL = 'https://my-json-server.typicode.com/PlagiatXXX/blog-admin-panel';

// Типизируем данные, которые мы ожидаем от API
export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  publishedAt: string;
}

export type PostFormData = {
  title: string;
  content: string;
  userId: number;
}

// Функция для получения всех постов
export const getPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/posts`);
  return data;
};

// Функция для удаления поста по ID
export const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/posts/${postId}`);
};

// Функция для получения одного поста по ID
export const getPostById = async (postId: string): Promise<Post> => {
  const { data } = await axios.get(`${API_BASE_URL}/posts/${postId}`);
  return data;
};

// Функция для создания нового поста
export const createPost = async (postData: PostFormData): Promise<Post> => {
  const newPost = {
    ...postData,
    publishedAt: new Date().toISOString(), // Добавляем текущую дату
  }
  const { data } = await axios.post(`${API_BASE_URL}/posts`, newPost);
  return data;
};

// Функция для обновления существующего поста
export const updatePost = async ({ postId, postData }: { postId: string, postData: PostFormData }): Promise<Post> => {
    const { data } = await axios.put(`${API_BASE_URL}/posts/${postId}`, postData);
    return data;
};

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  active: boolean;
}

// Функция для получения всех пользователей
export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/users`);
  return data;
};

// Функция для обновления пользователя
// Она принимает частичные данные и ID пользователя
export const updateUser = async ( {id, ...userData}: Partial<User> & {id: number} ): Promise<User> => {
    const { data } = await axios.patch(`${API_BASE_URL}/users/${id}`, userData);
    return data;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
  author: string;
  approved: boolean;
}

// Функция для получения всех комментариев
export const getComments = async (): Promise<Comment[]> => {
    const { data } = await axios.get(`${API_BASE_URL}/comments`);
    return data;
}

// Функция для обновления комментария (одобрения)
export const updateComment = async ({id, ...commentData}: Partial<Comment> & {id: number}): Promise<Comment> => {
    const { data } = await axios.patch(`${API_BASE_URL}/comments/${id}`, commentData);
    return data;
}

// Функция для удаления комментария
export const deleteComment = async (commentId: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
}

// Функция для получения количества постов
export const getPostsCount = async (): Promise<number> => {
    const { data } = await axios.get(`${API_BASE_URL}/posts`);
    return data.length;
}

// Функция для получения количества пользователей
export const getUsersCount = async (): Promise<number> => {
    const { data } = await axios.get(`${API_BASE_URL}/users`);
    return data.length;
}

// Функция для получения количества комментариев
export const getCommentsCount = async (): Promise<number> => {
    const { data } = await axios.get(`${API_BASE_URL}/comments`);
    return data.length;
}