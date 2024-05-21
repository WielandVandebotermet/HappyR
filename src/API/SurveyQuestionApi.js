import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_SURVEY;

const handleRequest = async (request) => {
  try {
    const token = Cookies.get("access_token");
    const response = await request({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};

const SurveyQuestionApi = {
  getSurveyById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  getSurveyQuestionById: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}question/${id}`, config)
    );
  },

  deleteSurveyQuestion: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}question/delete/${id}`, config)
    );
  },

  editSurveyQuestion: async (Sid, Qid, Title, SubText, options, settings) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}question/edit/${Qid}`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        options: options,
        settings: settings,
      }, config)
    );
  },

  createSurveyQuestion: async (Sid, Tid, Title, SubText, options, settings) => {

    return handleRequest((config) =>
      axios.post(`${API_URL}question/create`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        templateId: Tid,
        options: options,
        settings: settings,
      }, config)
    );
  },

  createSurveyQuestionAndCategory: async (Sid, Tid, Title, SubText, options, settings, categorieName, categorieImpact) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}question/create/categorie`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        templateId: Tid,
        options: options,
        settings: settings,
        categoryName: categorieName,
        scoreImpact: categorieImpact,
      }, config)
    );
  },

  editSurveyQuestionAndCategory: async (Sid, Qid, Title, SubText, options, settings, categorieName, categorieImpact) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}question/edit/categorie/${Qid}`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        options: options,
        settings: settings,
        categoryName: categorieName,
        scoreImpact: categorieImpact,
      }, config)
    );
  },
};
export default SurveyQuestionApi;
