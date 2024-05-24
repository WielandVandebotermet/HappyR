import axios from "axios";

// Construct the base API URL using environment variables
const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_TEMPLATE;

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
        "Content-Type": "application/json",
      },
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(`Request failed: ${error.message}`);
  }
};

const TemplateApi = {
  /**
   * Retrieves all templates from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllTemplates: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  /**
   * Retrieves a specific template by its ID from the API.
   * 
   * @param {string} id - The ID of the template to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getTemplateById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  /**
   * Deletes a specific template by its ID from the API.
   * 
   * @param {string} id - The ID of the template to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteTemplate: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  /**
   * Edits a template with the given ID and updated data.
   * 
   * @param {string} groupName - The name of the template.
   * @param {string} id - The ID of the template to edit.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editTemplate: async (groupName, id) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}edit/${id}`, groupName, config)
    );
  },

  /**
   * Creates a new template with the given name.
   * 
   * @param {string} testName - The name of the template to create.
   * @returns {Promise<Object>} - The data from the API response.
   */
  createTemplate: async (testName) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}create`, {
        testName: testName,
      }, config)
    );
  },
};
export default TemplateApi;
