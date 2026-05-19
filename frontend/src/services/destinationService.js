import api from './api';

export const destinationService = {
  getAll: (params) => api.get('/destinations', { params }),
  getOne: (id) => api.get(`/destinations/${id}`),
  getFeatured: () => api.get('/destinations/featured'),
  getTrending: () => api.get('/destinations/trending'),
  getNearby: (params) => api.get('/destinations/nearby', { params }),
  create: (data) => api.post('/destinations', data),
  update: (id, data) => api.put(`/destinations/${id}`, data),
  delete: (id) => api.delete(`/destinations/${id}`),
  getReviews: (destinationId) => api.get(`/destinations/${destinationId}/reviews`),
  createReview: (destinationId, data) => api.post(`/destinations/${destinationId}/reviews`, data),
  deleteReview: (destinationId, reviewId) => api.delete(`/destinations/${destinationId}/reviews/${reviewId}`),
  markReviewHelpful: (destinationId, reviewId) => api.put(`/destinations/${destinationId}/reviews/${reviewId}/helpful`),
};
