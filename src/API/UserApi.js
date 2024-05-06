import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_USERAPI;

const handleRequest = async (request) => {
  try {
    const token = Cookies.get('access_token');
    const response = await request({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};

  const UserApi = {

    getAllUsers: async (id) => {
      return handleRequest((config) => axios.get(`${API_URL}all`, config));
    },

    getUserById: async (id) => {
      return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
    },
  
    editUser: async (id, updatedUser) => {
      return handleRequest((config) => axios.put(`${API_URL}edit/${id}`, updatedUser, config));
    },
  };
  
export default UserApi;