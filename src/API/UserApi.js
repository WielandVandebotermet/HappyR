import axios from 'axios';

// Construct the base API URL using environment variables
const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_USERAPI;

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
        'Content-Type': 'application/json'
      }
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(`Request failed: ${error.message}`);
  }
};

const UserApi = {
  /**
   * Retrieves all users from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllUsers: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  /**
   * Retrieves a specific user by their ID from the API.
   * 
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getUserById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  /**
   * Edits a user with the given ID and updated data.
   * 
   * @param {string} id - The ID of the user to edit.
   * @param {Object} updatedUser - The updated user data.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editUser: async (id, updatedUser) => {
    return handleRequest((config) => axios.put(`${API_URL}edit/${id}`, updatedUser, config));
  },
};

export default UserApi;
