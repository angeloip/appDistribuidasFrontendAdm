import axios from "axios";

const url = "http://localhost:5000/api/categories/";

export const getCategoriesRequest = () => axios.get(url);

export const getCategoryRequest = (id) => axios.get(url + id);

export const deleteCategoryRequest = (id) => axios.delete(url + id);

export const createCategoryRequest = (category) => axios.post(url, category);

export const updateCategoryRequest = (id, newInfoCategory) => {
  return axios.put(url + id, newInfoCategory);
};
