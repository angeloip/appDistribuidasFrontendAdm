import { createContext, useContext, useEffect, useState } from "react";
import { getCategoriesRequest } from "../api/categoryRequest";
import { getDishesRequest } from "../api/dish";

const dataContext = createContext();

export const useData = () => {
  const context = useContext(dataContext);
  if (!context) throw new Error("Data Provider is missing");
  return context;
};

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    setIsLoading(true);

    await getDishesRequest()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        const error = err.response;
        alert(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getCategories = async () => {
    setIsLoadingCategory(true);

    await getCategoriesRequest()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        const error = err.response;
        alert(error);
      });

    setIsLoadingCategory(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const value = {
    data: [data, setData],
    categories: [categories, setCategories],
    isLoading: [isLoading, setIsLoading],
    isLoadingCategory: [isLoadingCategory, setIsLoadingCategory]
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};
