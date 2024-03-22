import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_USERAPI;

  const UserApi = {

    getAllUsers: async () => {
      try {
        const response = await axios.get(`${API_URL}all`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
      }
    },

    getUserById: async (id) => {
      try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching team: ${error.message}`);
      }
    },
  
    deleteUser: async (id) => {
      try {
        await axios.delete(`${API_URL}delete/${id}`);
      } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
    },
  
    editUser: async (id, updatedUser) => {
      try {
        await axios.put(`${API_URL}edit/${id}`, updatedUser);
      } catch (error) {
        throw new Error(`Error editing user: ${error.message}`);
      }
    },
  
    createUser: async (newUser) => {
      try {
        await axios.post(`${API_URL}`, newUser);
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    }
  };
  
export default UserApi;