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
  const urlDish = url + "products/";

  const getDishesRequest = () => axios.get(urlDish);

  const getDishRequest = (id) => axios.get(urlDish + id);

  const deleteDishRequest = (id) => axios.delete(urlDish + id);

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

  const exportExcelOfDishes = () => axios.post(urlDish + "exportxlsx", {});

  const updateDishRequest = (id, newInfoDish) =>
    axios.put(urlDish + id, newInfoDish);

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
    createDishRequest: createDishRequest,
    loadDishesWithExcel: loadDishesWithExcel,
    exportExcelOfDishes: exportExcelOfDishes,
    updateDishRequest: updateDishRequest,
    getCategoriesRequest: getCategoriesRequest,
    getCategoryRequest: getCategoryRequest,
    deleteCategoryRequest: deleteCategoryRequest,
    createCategoryRequest: createCategoryRequest,
    updateCategoryRequest: updateCategoryRequest
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};
