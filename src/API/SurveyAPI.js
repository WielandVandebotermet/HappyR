import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_SURVEY;

const SurveyApi = {

  getAllSurveys: async () => {
    try {
      const response = await axios.get(`${API_URL}all`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching Surveys: ${error.message}`);
    }
  }, 

  getSurveyById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching Survey: ${error.message}`);
    }
  },

  deleteSurvey: async (id) => {
    try {
      await axios.delete(`${API_URL}delete/${id}`);
    } catch (error) {
      throw new Error(`Error deleting Survey: ${error.message}`);
    }
  },

  editSurvey: async (groupName, id) => {
    try {
      await axios.put(`${API_URL}edit/${id}`, groupName, {
        headers: { 'Content-Type': 'application/plain'}
      });
    } catch (error) {
      throw new Error(`Error editing Survey: ${error.message}`);
    }
  },

  createSurvey: async (testName, startDate, reoccuring, questions, groupList, started) => {
    try {
      await axios.post(`${API_URL}`, {
        testName: testName,
        startDate: startDate,
        reoccuring: reoccuring,
        questions: questions,
        groupList: groupList,
        started: started
      });
    } catch (error) {
      throw new Error(`Error creating M: ${error.message}`);
    }
  }  
};
export default SurveyApi;