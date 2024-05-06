import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_TEMPLATE;

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

const TemplateApi = {
  getAllTemplates: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  getTemplateById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  deleteTemplate: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  editTemplate: async (groupName, id) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}edit/${id}`, groupName, config)
    );
  },

  createTemplate: async (testName) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}create`, {
        testName: testName,
      }, config)
    );
  },
};
export default TemplateApi;
