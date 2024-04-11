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

      getSurveyQuestionById: async (id) => {
        try {
          const response = await axios.get(`${API_URL}question/${id}`);
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
    
      editSurveyQuestion: async (Qid, Tid, question) => {
        try {
          await axios.put(`${API_URL}edit/${Qid}`,{
            Tid: Tid,
          });
        } catch (error) {
          throw new Error(`Error editing Survey: ${error.message}`);
        }
      },
    
      createSurveyQuestion: async (Tid, Question) => {
        try {

              await axios.post(`${API_URL}create`, {
                Tid: Tid,
              });
        } catch (error) {
          throw new Error(`Error creating M: ${error.message}`);
        }
      }  
    };
export default SurveyQuestionApi;