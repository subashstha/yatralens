import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  saveDestination: (id) => api.put(`/auth/save/${id}`),
  uploadAvatar: (file) => {
    const form = new FormData();
    form.append('image', file);
    return api.post('/upload/single', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};
