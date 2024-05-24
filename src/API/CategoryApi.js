import axios from "axios";

// Construct the API URL using environment variables
const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_CATEGORY;

/**
 * Handles API requests, including adding the Authorization header with a bearer token.
 * 
 * @param {Function} request - The axios request function to be executed.
 * @returns {Promise<Object>} - The data from the API response.
 * @throws {Error} - If the request fails, throws an error with a message.
 */
const handleRequest = async (request) => {
  try {
    // Retrieve the access token from local storage
    const token = localStorage.getItem('access_token');

    // Execute the request with the Authorization header
    const response = await request({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Adding a default Content-Type header
      },
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(`Request failed: ${error.message}`);
  }
};

const CategoryApi = {
  /**
   * Retrieves all categories from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllCategorys: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  /**
   * Retrieves a category by its ID from the API.
   * 
   * @param {string} id - The ID of the category to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getCategoryById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  /**
   * Deletes a category by its ID from the API.
   * 
   * @param {string} id - The ID of the category to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteCategory: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  /**
   * Edits a category with the given ID, name, and impact score.
   * 
   * @param {string} categorieId - The ID of the category to edit.
   * @param {string} categorieName - The new name of the category.
   * @param {number} categorieImpact - The new impact score of the category.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editCategory: async (categorieId, categorieName, categorieImpact) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}edit/${categorieId}`, {
        categoryName: categorieName,
        scoreImpact: categorieImpact,
      }, config)
    );
  },

  /**
   * Creates a new category with the given name and impact score.
   * 
   * @param {string} categorieName - The name of the new category.
   * @param {number} categorieImpact - The impact score of the new category.
   * @returns {Promise<Object>} - The data from the API response.
   */
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
