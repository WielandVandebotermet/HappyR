
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_TEMPLATE;

const CategoryApi = {

    getAllCategorys: async () => {
        try {
          const response = await axios.get(`${API_URL}all`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching Surveys: ${error.message}`);
        }
      }, 
    
      getCategoryById: async (id) => {
        try {
          const response = await axios.get(`${API_URL}${id}`);
          return response.data;
        } catch (error) {
          throw new Error(`Error fetching Survey: ${error.message}`);
        }
      },
    
      deleteCategory: async (id) => {
        try {
          await axios.delete(`${API_URL}delete/${id}`);
        } catch (error) {
          throw new Error(`Error deleting Survey: ${error.message}`);
        }
      },
    
      editCategory: async (groupName, id) => {
        try {
          await axios.put(`${API_URL}edit/${id}`, groupName, {
            headers: { 'Content-Type': 'application/plain'}
          });
        } catch (error) {
          throw new Error(`Error editing Survey: ${error.message}`);
        }
      },
    
      createTemplate: async (testName) => {
        try {
              await axios.post(`${API_URL}create`, {
                testName: testName,
              });
        } catch (error) {
          throw new Error(`Error creating M: ${error.message}`);
        }
      }  
}
export default CategoryApi;