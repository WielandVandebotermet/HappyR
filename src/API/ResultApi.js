import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_RESULT;

const ResultApi = {
    getAllResults: async () => {
      try {
        const response = await axios.get(`${API_URL}all`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching Results: ${error.message}`);
      }
    }, 

    getResultsByManager: async (id) => {
      try {
        const response = await axios.get(`${API_URL}manager/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching Results: ${error.message}`);
      }
    }, 
  
    getResultById: async (id) => {
      try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching Result: ${error.message}`);
      }
    },

    getResultBySurveyId: async (id) => {
      try {
        const response = await axios.get(`${API_URL}survey/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching Result: ${error.message}`);
      }
    },
  
    deleteResult: async (id) => {
      try {
        await axios.delete(`${API_URL}delete/${id}`);
      } catch (error) {
        throw new Error(`Error deleting Result: ${error.message}`);
      }
    },
  
    editResult: async (groupName, id) => {
      try {
        await axios.put(`${API_URL}edit/${id}`, groupName, {
          headers: { 'Content-Type': 'application/plain'}});
      } catch (error) {
        throw new Error(`Error editing Result: ${error.message}`);
      }
    },
    
  
    createResult: async (surveyId, userId, totalResult, scoreList, groupId) => {
      try {
        await axios.post(`${API_URL}create/`, {
          surveyId: surveyId,
          userId: userId,
          groupId: groupId,
          totalResult: totalResult,
          scoreList: scoreList,
        });
        console.log(surveyId, userId, totalResult, scoreList);
      } catch (error) {
        throw new Error(`Error creating Result: ${error.message}`);
      }
    }
    
  };

export default ResultApi;