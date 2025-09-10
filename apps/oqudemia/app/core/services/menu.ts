import api from '../utils/axios';

export const menuService = {
  async getTopMenu() {
    const response = await api.get('/topmenu');
    return response.data;
  },
};
