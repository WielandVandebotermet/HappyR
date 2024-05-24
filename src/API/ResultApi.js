import axios from "axios";

// Construct the base API URL using environment variables
const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_RESULT;

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

const ResultApi = {
  /**
   * Retrieves all results from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllResults: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  /**
   * Retrieves results by manager, based on survey ID and user ID.
   * 
   * @param {string} SurveyId - The ID of the survey.
   * @param {string} UserId - The ID of the user.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getResultsByManager: async (SurveyId, UserId) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}manager/`, { SurveyId, UserId }, config)
    );
  },

  /**
   * Retrieves a specific result by its ID from the API.
   * 
   * @param {string} id - The ID of the result to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getResultById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  /**
   * Retrieves results by survey ID from the API.
   * 
   * @param {string} id - The ID of the survey.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getResultBySurveyId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}survey/${id}`, config)
    );
  },

  /**
   * Deletes a specific result by its ID from the API.
   * 
   * @param {string} id - The ID of the result to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteResult: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  /**
   * Edits a result with the given ID and updated data.
   * 
   * @param {string} groupName - The updated group name.
   * @param {string} id - The ID of the result to edit.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editResult: async (groupName, id) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}edit/${id}`, groupName, config)
    );
  },

  /**
   * Creates a new result with the given survey ID, user ID, total result, score list, and group ID.
   * 
   * @param {string} surveyId - The ID of the survey.
   * @param {string} userId - The ID of the user.
   * @param {number} totalResult - The total result score.
   * @param {Array<number>} scoreList - The list of individual scores.
   * @param {string} groupId - The ID of the group.
   * @returns {Promise<Object>} - The data from the API response.
   */
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
