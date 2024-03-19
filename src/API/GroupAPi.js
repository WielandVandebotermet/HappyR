import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_GROUPAPI;

const GroupApi = {
    getAllTeams: async () => {
      try {
        const response = await axios.get(`${API_URL}all`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching teams: ${error.message}`);
      }
    }, 
  
    getTeamById: async (id) => {
      try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching team: ${error.message}`);
      }
    },
  
    deleteTeam: async (id) => {
      try {
        await axios.delete(`${API_URL}Delete/${id}`);
      } catch (error) {
        throw new Error(`Error deleting team: ${error.message}`);
      }
    },
  
    editTeam: async (id, updatedTeam) => {
      try {
        await axios.put(`${API_URL}Edit/${id}`, updatedTeam);
      } catch (error) {
        throw new Error(`Error editing team: ${error.message}`);
      }
    },
  
    createTeam: async (newTeam, userId) => {
      try {
        await axios.post(`${API_URL}`, newTeam, { params: { UserId: userId } });
      } catch (error) {
        throw new Error(`Error creating team: ${error.message}`);
      }
    }
  };

export default GroupApi;