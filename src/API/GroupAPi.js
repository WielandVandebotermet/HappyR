import axios from 'axios';

// Construct the API URL using environment variables
const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_GROUPAPI;

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
        'Content-Type': 'application/json' // Adding a default Content-Type header
      }
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(`Request failed: ${error.message}`);
  }
};

const GroupApi = {
  /**
   * Retrieves all teams from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllTeams: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  /**
   * Retrieves a team by its ID from the API.
   * 
   * @param {string} id - The ID of the team to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getTeamById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  /**
   * Retrieves teams associated with a specific user ID from the API.
   * 
   * @param {string} id - The ID of the user.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getTeamsByUserId: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}user/${id}`, config));
  },

  /**
   * Retrieves teams associated with a specific survey ID from the API.
   * 
   * @param {string} id - The ID of the survey.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getTeamsBySurveyId: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}survey/${id}`, config));
  },

  /**
   * Deletes a team by its ID from the API.
   * 
   * @param {string} id - The ID of the team to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteTeam: async (id) => {
    return handleRequest((config) => axios.delete(`${API_URL}delete/${id}`, config));
  },

  /**
   * Edits a team's name by its ID.
   * 
   * @param {string} groupName - The new name of the team.
   * @param {string} id - The ID of the team to edit.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editTeam: async (groupName, id) => {
    return handleRequest((config) => axios.put(`${API_URL}edit/${id}`, { groupName: groupName }, config));
  },

  /**
   * Creates a new team with the given name and associates it with a specific user.
   * 
   * @param {string} groupName - The name of the new team.
   * @param {string} userId - The ID of the user to associate with the team.
   * @returns {Promise<Object>} - The data from the API response.
   */
  createTeam: async (groupName, userId) => {
    return handleRequest((config) => axios.post(`${API_URL}create/${userId}`, { groupName: groupName }, config));
  }
};

export default GroupApi;
