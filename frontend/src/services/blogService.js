import api from './api';

export const blogService = {
  getAll: (params) => api.get('/blogs', { params }),
  getOne: (slug) => api.get(`/blogs/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  like: (id) => api.put(`/blogs/${id}/like`),
  addComment: (id, data) => api.post(`/blogs/${id}/comments`, data),
};
