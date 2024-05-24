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

const SurveyQuestionApi = {
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
   * Retrieves a specific survey question by its ID from the API.
   * 
   * @param {string} id - The ID of the survey question to retrieve.
   * @returns {Promise<Object>} - The data from the API response.
   */
  getSurveyQuestionById: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL}question/${id}`, config)
    );
  },

  /**
   * Deletes a specific survey question by its ID from the API.
   * 
   * @param {string} id - The ID of the survey question to delete.
   * @returns {Promise<Object>} - The data from the API response.
   */
  deleteSurveyQuestion: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL}question/delete/${id}`, config)
    );
  },

  /**
   * Edits a survey question with the given ID and updated data.
   * 
   * @param {string} Sid - The ID of the survey.
   * @param {string} Qid - The ID of the survey question.
   * @param {string} Title - The title of the survey question.
   * @param {string} SubText - The subtext of the survey question.
   * @param {Array<string>} options - The options for the survey question.
   * @param {Object} settings - The settings for the survey question.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editSurveyQuestion: async (Sid, Qid, Title, SubText, options, settings) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}question/edit/${Qid}`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        options: options,
        settings: settings,
      }, config)
    );
  },

  /**
   * Creates a new survey question with the given data.
   * 
   * @param {string} Sid - The ID of the survey.
   * @param {string} Tid - The ID of the template.
   * @param {string} Title - The title of the survey question.
   * @param {string} SubText - The subtext of the survey question.
   * @param {Array<string>} options - The options for the survey question.
   * @param {Object} settings - The settings for the survey question.
   * @returns {Promise<Object>} - The data from the API response.
   */
  createSurveyQuestion: async (Sid, Tid, Title, SubText, options, settings) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}question/create`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        templateId: Tid,
        options: options,
        settings: settings,
      }, config)
    );
  },

  /**
   * Creates a new survey question with category and impact.
   * 
   * @param {string} Sid - The ID of the survey.
   * @param {string} Tid - The ID of the template.
   * @param {string} Title - The title of the survey question.
   * @param {string} SubText - The subtext of the survey question.
   * @param {Array<string>} options - The options for the survey question.
   * @param {Object} settings - The settings for the survey question.
   * @param {string} categorieName - The name of the category.
   * @param {number} categorieImpact - The impact of the category.
   * @returns {Promise<Object>} - The data from the API response.
   */
  createSurveyQuestionAndCategory: async (
    Sid,
    Tid,
    Title,
    SubText,
    options,
    settings,
    categorieName,
    categorieImpact
  ) => {
    return handleRequest((config) =>
      axios.post(`${API_URL}question/create/categorie`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        templateId: Tid,
        options: options,
        settings: settings,
        categoryName: categorieName,
        scoreImpact: categorieImpact,
      }, config)
    );
  },

  /**
   * Edits a survey question with category and impact.
   * 
   * @param {string} Sid - The ID of the survey.
   * @param {string} Qid - The ID of the survey question.
   * @param {string} Title - The title of the survey question.
   * @param {string} SubText - The subtext of the survey question.
   * @param {Array<string>} options - The options for the survey question.
   * @param {Object} settings - The settings for the survey question.
   * @param {string} categorieName - The name of the category.
   * @param {number} categorieImpact - The impact of the category.
   * @returns {Promise<Object>} - The data from the API response.
   */
  editSurveyQuestionAndCategory: async (
    Sid,
    Qid,
    Title,
    SubText,
    options,
    settings,
    categorieName,
    categorieImpact
  ) => {
    return handleRequest((config) =>
      axios.put(`${API_URL}question/edit/categorie/${Qid}`, {
        surveyId: Sid,
        question: Title,
        text: SubText,
        options: options,
        settings: settings,
        categoryName: categorieName,
        scoreImpact: categorieImpact,
      }, config)
    );
  },
};
export default SurveyQuestionApi;
