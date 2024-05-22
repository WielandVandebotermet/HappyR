import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_MTUAPI;
const API_URL_GU =
  process.env.REACT_APP_API_URL + process.env.REACT_APP_MTUAPI + "TU/";
const API_URL_M =
  process.env.REACT_APP_API_URL + process.env.REACT_APP_MTUAPI + "M/";

const handleRequest = async (request) => {
  try {
    const token = localStorage.getItem('access_token');
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

const MTUApi = {
  //Group Users
  getAllGroupUsers: async () => {
    return handleRequest((config) => axios.get(`${API_URL_GU}all`, config));
  },

  getGroupUserById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL_GU}${id}`, config));
  },

  deleteGroupUser: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL_GU}delete/${id}`, config)
    );
  },

  editGroupUser: async (id, updatedGroupUser) => {
    return handleRequest((config) =>
      axios.put(`${API_URL_GU}edit/${id}`, updatedGroupUser, config)
    );
  },

  createGroupUser: async (teamId, userId) => {
    return handleRequest((config) =>
        axios.post(`${API_URL}TU/`, {
          teamId: teamId,
          userId: userId,
        }, config)
    );
  },

  //Managers
  getAllManagers: async () => {
    return handleRequest((config) => axios.get(`${API_URL_M}all`, config));
  },

  getManagerById: async (id) => {
    return handleRequest((config) => axios.get(`${API_URL_M}${id}`, config));
  },

  deleteManager: async (id) => {
    return handleRequest((config) =>
      axios.delete(`${API_URL_M}delete/${id}`, config)
    );
  },

  editManager: async (id, updatedManager) => {
    return handleRequest((config) =>
      axios.put(`${API_URL_M}edit/${id}`, updatedManager, config)
    );
  },

  createManager: async (teamId, userId) => {
    return handleRequest((config) =>
      axios.post(
        `${API_URL_M}`,
        {
          teamId: teamId,
          userId: userId,
        },
        config
      )
    );
  },

  //Combined
  getTeamUsersByTeamId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_GU}users/${id}`, config)
    );
  },

  getManagersByTeamId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_M}users/${id}`, config)
    );
  },

  getGUByUserId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_GU}teams/${id}`, config)
    );
  },

  getManagerByUserId: async (id) => {
    return handleRequest((config) =>
      axios.get(`${API_URL_M}teams/${id}`, config)
    );
  },
};
export default MTUApi;
