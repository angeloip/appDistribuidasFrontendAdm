import { createContext, useContext } from "react";
import axios from "axios";

export const apiContext = createContext();

export const useApi = () => {
  const context = useContext(apiContext);
  if (!context) throw new Error("There is not api provider");
  return context;
};

export const ApiProvider = ({ children }) => {
  const url = "http://localhost:5000/api/";
  /* const url = "https://app-distribuida.herokuapp.com/api/"; */
  const urlDish = url + "products/";

  const getDishesRequest = () => axios.get(urlDish);

  const getDishRequest = (id) => axios.get(urlDish + id);

  const deleteDishRequest = (id) => axios.delete(urlDish + id);

  const deleteManyDishesRequest = (ids) =>
    axios.post(urlDish + "deletemanyproducts", ids);

  const createDishRequest = (dish) => {
    const form = new FormData();

    for (let key in dish) {
      form.append(key, dish[key]);
    }

    return axios.post(urlDish, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  const loadDishesWithExcel = (xlsx) => {
    const form = new FormData();

    for (let key in xlsx) {
      form.append(key, xlsx[key]);
    }

    return axios.post(urlDish + "xlsx", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  const updateDishRequest = (id, newInfoDish) =>
    axios.put(urlDish + id, newInfoDish);

  const updateImageRequest = (id, newImage) => {
    const form = new FormData();

    for (let key in newImage) {
      form.append(key, newImage[key]);
    }

    return axios.put(urlDish + "image/" + id, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  const urlCategory = url + "categories/";

  const getCategoriesRequest = () => axios.get(urlCategory);

  const getCategoryRequest = (id) => axios.get(urlCategory + id);

  const deleteCategoryRequest = (id) => axios.delete(urlCategory + id);

  const createCategoryRequest = (category) => axios.post(urlCategory, category);

  const updateCategoryRequest = (id, newInfoCategory) => {
    return axios.put(urlCategory + id, newInfoCategory);
  };

  const value = {
    getDishesRequest: getDishesRequest,
    getDishRequest: getDishRequest,
    deleteDishRequest: deleteDishRequest,
    deleteManyDishesRequest: deleteManyDishesRequest,
    createDishRequest: createDishRequest,
    loadDishesWithExcel: loadDishesWithExcel,
    updateDishRequest: updateDishRequest,
    updateImageRequest: updateImageRequest,
    getCategoriesRequest: getCategoriesRequest,
    getCategoryRequest: getCategoryRequest,
    deleteCategoryRequest: deleteCategoryRequest,
    createCategoryRequest: createCategoryRequest,
    updateCategoryRequest: updateCategoryRequest
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};
