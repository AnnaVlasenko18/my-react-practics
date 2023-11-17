import axios from 'axios';

axios.defaults.baseURL = 'https://6556437d84b36e3a431f79f0.mockapi.io';

export const fetchQuizzes = async () => {
  const response = await axios.get('/quizzes');
  return response.data;
};

export const createQuize = async quiz => {
  const response = await axios.post('/quizzes', quiz);
  return response.data;
};

export const deleteQuisById = async quizId => {
  const response = await axios.delete(`/quizzes/${quizId}`);
  return response.data;
};
