import axios from "axios";

/* const url = "https://app-distribuida.herokuapp.com/api/products/"; */
const url = "http://localhost:5000/api/products/";

export const getDishesRequest = () => axios.get(url);

export const getDishRequest = (id) => axios.get(url + id);

export const deleteDishRequest = (id) => axios.delete(url + id);

export const createDishRequest = (dish) => {
  const form = new FormData();

  for (let key in dish) {
    form.append(key, dish[key]);
  }

  return axios.post(url, form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const updateDishRequest = (id, newInfoDish) =>
  axios.put(url + id, newInfoDish);
