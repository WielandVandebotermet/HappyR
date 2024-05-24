import axios from "axios";

// Construct the base API URL using environment variables
const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_SURVEY;

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

const SurveyApi = {
  /**
   * Retrieves all surveys from the API.
   * 
   * @returns {Promise<Object>} - The data from the API response.
   */
  getAllSurveys: async () => {
    return handleRequest((config) => axios.get(`${API_URL}all`, config));
  },

  /**
   * Retrieves a specific survey by its ID from the API.
   * 
   * @param {string} id - The ID of the survey to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getSurveyById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL}${id}`, config));
  },

  /**
   * Retrieves surveys by user ID from the API.
   * 
   * @param {string} id - The ID of the user.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getSurveysByUserId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}FilterByUserId/${id}`, config)
    );
  },

  /**
   * Retrieves surveys by manager ID from the API.
   * 
   * @param {string} id - The ID of the manager.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getSurveysByManagerId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}FilterByManagerId/${id}`, config)
    );
  },

  /**
   * Retrieves survey results by manager ID from the API.
   * 
   * @param {string} id - The ID of the manager.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getSurveysResultsByManagerId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}FilterResultsByManagerId/${id}`, config)
    );
  },

  /**
   * Deletes a specific survey by its ID from the API.
   * 
   * @param {string} id - The ID of the survey to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteSurvey: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}delete/${id}`, config)
    );
  },

  /**
   * Edits a survey with the given ID and updated data.
   * 
   * @param {string} id - The ID of the survey to edit.
   * @param {string} testName - The name of the survey.
   * @param {string} startDate - The start date of the survey.
   * @param {Array<Object>} questions - The list of questions for the survey.
   * @param {Array<string>} groupList - The list of groups associated with the survey.
   * @param {boolean} started - The status of whether the survey has started.
   * @returns {Promise<Object>} - The data from the API response.
   */
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

  /**
   * Creates a new survey with the given data.
   * 
   * @param {string} testName - The name of the survey.
   * @param {string} startDate - The start date of the survey.
   * @param {Array<Object>} questions - The list of questions for the survey.
   * @param {Array<string>} groupList - The list of groups associated with the survey.
   * @param {boolean} started - The status of whether the survey has started.
   * @returns {Promise<Object>} - The data from the API response.
   */
  createSurvey: async (
    testName,
    startDate,
    questions,
    groupList,
    started
  ) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}create`, {
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
