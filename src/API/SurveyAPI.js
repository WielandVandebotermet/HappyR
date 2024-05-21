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

const SurveyApi = {
  getAllSurveys: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  getSurveyById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  getSurveysByUserId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}FilterByUserId/${id}`, config)
    );
  },

  getSurveysByManagerId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}FilterByManagerId/${id}`, config)
    );
  },

  getSurveysResultsByManagerId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}FilterResultsByManagerId/${id}`, config)
    );
  },

  deleteSurvey: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  editSurvey: async (
    id,
    testName,
    startDate,
    questions,
    groupList,
    started
  ) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}edit/${id}`, {
        testName: testName,
        startDate: startDate,
        questions: questions,
        groupList: groupList,
        started: started,
      }, config)
    );
  },

  createSurvey: async (
    testName,
    startDate,
    questions,
    groupList,
    started
  ) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}create`,  {
        testName: testName,
        startDate: startDate,
        questions: questions,
        groupList: groupList,
        started: started,
      }, config)
    );
  },
};
export default SurveyApi;
