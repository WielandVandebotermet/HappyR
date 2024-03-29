import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_SURVEY;
const SurveyQuestionApi = {

      getSurveyById: async (id) => {
        try {
          const response = await axios.get(`${API_URL}${id}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching Survey: ${error.message}`);
        }
      },
    
      deleteSurveyQuestion: async (id) => {
        try {
          await axios.delete(`${API_URL}delete/${id}`);
        } catch (error) {
          throw new Error(`Error deleting Survey: ${error.message}`);
        }
      },
    
      editSurveyQuestion: async (groupName, id) => {
        try {
          await axios.put(`${API_URL}edit/${id}`, groupName, {
            headers: { 'Content-Type': 'application/plain'}
          });
        } catch (error) {
          throw new Error(`Error editing Survey: ${error.message}`);
        }
      },
    
      createSurveyQuestion: async (testName,) => {
        try {

              await axios.post(`${API_URL}create`, {
                testName: testName,
              });
        } catch (error) {
          throw new Error(`Error creating M: ${error.message}`);
        }
      }  
    };
export default SurveyQuestionApi;