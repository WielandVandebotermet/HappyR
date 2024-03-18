import axios from 'axios';

const API_URL = process.env.PUBLIC_URL;
const UserApi_url = process.env.UserApi_url;

  const UserApi = {

    getAllUsers: async () => {
      try {
        const response = await axios.get(`${API_URL}${UserApi_url}all`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
      }
    },

    getUserById: async (id) => {
      try {
        const response = await axios.get(`${API_URL}${UserApi_url}${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching team: ${error.message}`);
      }
    },
  
    deleteUser: async (id) => {
      try {
        await axios.delete(`${API_URL}${UserApi_url}Delete/${id}`);
      } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
    },
  
    editUser: async (id, updatedUser) => {
      try {
        await axios.put(`${API_URL}${UserApi_url}Edit/${id}`, updatedUser);
      } catch (error) {
        throw new Error(`Error editing user: ${error.message}`);
      }
    },
  
    createUser: async (newUser) => {
      try {
        await axios.post(`${API_URL}${UserApi_url}`, newUser);
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    }
  };
  
export default UserApi;