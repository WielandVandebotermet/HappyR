import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_GROUPAPI;

const handleRequest = async (request) => {
  try {
    const token = localStorage.getItem('access_token');
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

const GroupApi = {
  getAllTeams: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  getTeamById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  getTeamsByUserId: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}user/${id}`, config));
  },

  getTeamsBySurveyId: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}survey/${id}`, config));
  },

  deleteTeam: async (id) => {
    return handleRequest((config) => axios.delete(`${API_URL}delete/${id}`, config));
  },

  editTeam: async (groupName, id) => {
    return handleRequest((config) => axios.put(`${API_URL}edit/${id}`, { groupName: groupName }, config));
  },

  createTeam: async (groupName, userId) => {
    return handleRequest((config) => axios.post(`${API_URL}create/${userId}`,  { groupName: groupName }, config));
  }
};

export default GroupApi;
