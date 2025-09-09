import api from '../utils/axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const menuService = {
  async getTopMenu() {
    const response = await api.get(`${API_URL}/topmenu`);
    return response.data;
  },
};
