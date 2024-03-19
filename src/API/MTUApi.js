import axios from 'axios';

const API_URL_GU = process.env.REACT_APP_API_URL + process.env.REACT_APP_MTUAPI + "TU/";
const API_URL_M = process.env.REACT_APP_API_URL + process.env.REACT_APP_MTUAPI + "M/";

const MTUApi = {
    getAllGroupUsers: async () => {
        try {
          const response = await axios.get(`${API_URL_GU}all`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching TU: ${error.message}`);
        }
      }, 
    
      getGroupUserById: async (id) => {
        try {
          const response = await axios.get(`${API_URL_GU}${id}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching TU: ${error.message}`);
        }
      },
    
      deleteGroupUser: async (id) => {
        try {
          await axios.delete(`${API_URL_GU}Delete/${id}`);
        } catch (error) {
          throw new Error(`Error deleting TU: ${error.message}`);
        }
      },
    
      editGroupUser: async (id, updatedGroupUser) => {
        try {
          await axios.put(`${API_URL_GU}Edit/${id}`, updatedGroupUser);
        } catch (error) {
          throw new Error(`Error editing TU: ${error.message}`);
        }
      },
    
      createGroupUser: async (NewGroupUser) => {
        try {
          await axios.post(`${API_URL_GU}`, NewGroupUser,);
        } catch (error) {
          throw new Error(`Error creating TU: ${error.message}`);
        }
      },

      getAllManagers: async () => {
        try {
          const response = await axios.get(`${API_URL_M}all`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching M: ${error.message}`);
        }
      }, 
    
      getManagerById: async (id) => {
        try {
          const response = await axios.get(`${API_URL_M}${id}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching M: ${error.message}`);
        }
      },
    
      deleteManager: async (id) => {
        try {
          await axios.delete(`${API_URL_M}Delete/${id}`);
        } catch (error) {
          throw new Error(`Error deleting M: ${error.message}`);
        }
      },
    
      editManager: async (id, updatedManager) => {
        try {
          await axios.put(`${API_URL_M}Edit/${id}`, updatedManager);
        } catch (error) {
          throw new Error(`Error editing M: ${error.message}`);
        }
      },
    
      createManager: async (NewManager) => {
        try {
          await axios.post(`${API_URL_M}`, NewManager,);
        } catch (error) {
          throw new Error(`Error creating M: ${error.message}`);
        }
      }


};
export default MTUApi;