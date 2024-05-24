import axios from "axios";

// Construct the base API URLs using environment variables
const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_MTUAPI;
const API_URL_GU = `${API_URL}TU/`;
const API_URL_M = `${API_URL}M/`;

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

const MTUApi = {
  /**
   * Retrieves all group users from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllGroupUsers: async () => {
    return handleRequest((config) => axios.get(`${API_URL_GU}all`, config));
  },

  /**
   * Retrieves a group user by its ID from the API.
   * 
   * @param {string} id - The ID of the group user to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getGroupUserById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL_GU}${id}`, config));
  },

  /**
   * Deletes a group user by its ID from the API.
   * 
   * @param {string} id - The ID of the group user to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteGroupUser: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL_GU}delete/${id}`, config)
    );
  },

  /**
   * Edits a group user with the given ID and updated data.
   * 
   * @param {string} id - The ID of the group user to edit.
   * @param {Object} updatedGroupUser - The updated group user data.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editGroupUser: async (id, updatedGroupUser) => {
    return handleRequest((config) =>
      axios.put(`${API_URL_GU}edit/${id}`, updatedGroupUser, config)
    );
  },

  /**
   * Creates a new group user with the given team ID and user ID.
   * 
   * @param {string} teamId - The ID of the team to associate with the user.
   * @param {string} userId - The ID of the user to associate with the team.
   * @returns {Promise<Object>} - The data from the API response.
   */
  createGroupUser: async (teamId, userId) => {
    return handleRequest((config) =>
      axios.post(`${API_URL_GU}`, {
        teamId: teamId,
        userId: userId,
      }, config)
    );
  },

  /**
   * Retrieves all managers from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllManagers: async () => {
    return handleRequest((config) => axios.get(`${API_URL_M}all`, config));
  },

  /**
   * Retrieves a manager by its ID from the API.
   * 
   * @param {string} id - The ID of the manager to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getManagerById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL_M}${id}`, config));
  },

  /**
   * Deletes a manager by its ID from the API.
   * 
   * @param {string} id - The ID of the manager to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteManager: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL_M}delete/${id}`, config)
    );
  },

  /**
   * Edits a manager with the given ID and updated data.
   * 
   * @param {string} id - The ID of the manager to edit.
   * @param {Object} updatedManager - The updated manager data.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editManager: async (id, updatedManager) => {
    return handleRequest((config) =>
      axios.put(`${API_URL_M}edit/${id}`, updatedManager, config)
    );
  },

  /**
   * Creates a new manager with the given team ID and user ID.
   * 
   * @param {string} teamId - The ID of the team to associate with the manager.
   * @param {string} userId - The ID of the user to associate with the team.
   * @returns {Promise<Object>} - The data from the API response.
   */
  createManager: async (teamId, userId) => {
    return handleRequest((config) =>
      axios.post(`${API_URL_M}`, {
        teamId: teamId,
        userId: userId,
      }, config)
    );
  },

  /**
   * Retrieves team users associated with a specific team ID from the API.
   * 
   * @param {string} id - The ID of the team.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getTeamUsersByTeamId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_GU}users/${id}`, config)
    );
  },

  /**
   * Retrieves managers associated with a specific team ID from the API.
   * 
   * @param {string} id - The ID of the team.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getManagersByTeamId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_M}users/${id}`, config)
    );
  },

  /**
   * Retrieves group users associated with a specific user ID from the API.
   * 
   * @param {string} id - The ID of the user.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getGUByUserId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_GU}teams/${id}`, config)
    );
  },

  /**
   * Retrieves managers associated with a specific user ID from the API.
   * 
   * @param {string} id - The ID of the user.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getManagerByUserId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_M}teams/${id}`, config)
    );
  },
};

export default MTUApi;
