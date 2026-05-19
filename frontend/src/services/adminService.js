import api from './api';

export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/users', { params }),
  updateUserRole: (id, role) => api.put(`/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/users/${id}`),
};
