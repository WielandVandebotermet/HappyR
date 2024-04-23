import axios from "axios";

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

  editSurveyQuestion: async (Qid, Title, SubText, options, settings) => {
    try {
      await axios.put(`${API_URL}question/edit/${Qid}`, {
        question: Title,
        text: SubText,
        options: options,
        settings: settings,
      });
    } catch (error) {
      throw new Error(`Error editing Survey: ${error.message}`);
    }
  },

  createSurveyQuestion: async (Sid, Tid, Title, SubText, options, settings) => {
    console.log("check: ",{
      surveyId: Sid,
      question: Title,
      text: SubText,
      templateId: Tid,
      options: options,
      settings: settings,
    });
    try {
      const response = await axios.post(`${API_URL}question/create`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        templateId: Tid,
        options: options,
        settings: settings,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating M: ${error.message}`);
    }
  },
};
export default SurveyQuestionApi;
