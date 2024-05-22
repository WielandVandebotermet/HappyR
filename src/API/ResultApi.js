import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_RESULT;

const handleRequest = async (request) => {
  try {
    const token = localStorage.getItem('access_token');
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

const ResultApi = {
  getAllResults: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  getResultsByManager: async (SurveyId, UserId) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}manager/`, {SurveyId, UserId}, config)
    );
  },

  getResultById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  getResultBySurveyId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}survey/${id}`, config)
    );
  },

  deleteResult: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  editResult: async (groupName, id) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}edit/${id}`, groupName, config)
    );
  },

  createResult: async (surveyId, userId, totalResult, scoreList, groupId) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}create/`, {
        surveyId: surveyId,
        userId: userId,
        groupId: groupId,
        totalResult: totalResult,
        scoreList: scoreList,
      }, config)
    );
  },
};

export default ResultApi;
