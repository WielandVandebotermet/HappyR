import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_CATEGORY;

const handleRequest = async (request) => {
  try {
    const token = Cookies.get("access_token");
    const response = await request({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adding a default Content-Type header
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};

const CategoryApi = {
  getAllCategorys: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  getCategoryById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  deleteCategory: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  editCategory: async (categorieId, categorieName, categorieImpact) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}edit/${categorieId}`, {
        categoryName: categorieName,
        scoreImpact: categorieImpact,
      }, config)
    );
  },

  createCategory: async (categorieName, categorieImpact) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}create`, {
        categoryName: categorieName,
        scoreImpact: categorieImpact,
       }, config)
    );
  },
};

export default CategoryApi;
