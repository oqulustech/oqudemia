import api from '../utils/axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  // add other user fields as needed
}

export const authorisationService = {

  async login(credentials: UserCredentials): Promise<User> {
    const response = await api.post(`${API_URL}/users`, credentials);
    return response.data;
  },

  async register(data: Omit<User, 'id'> & { password: string }): Promise<User> {
    const response = await api.post(`${API_URL}/register`, data);
    return response.data;
  },

  async getUser(token: string): Promise<User> {
    const response = await api.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  /**
   * Logs out the user by removing the token from localStorage.
   */
  logout() {
    localStorage.removeItem('token');
  },

  /**
   * Updates user data by PATCHing to /users/:id
   * @param id User ID
   * @param data Partial user data to update
   */
  async update(id: string, data: Partial<User>): Promise<User> {
    const response = await api.patch(`${API_URL}/users/${id}`, data);
    return response.data;
  },
};
