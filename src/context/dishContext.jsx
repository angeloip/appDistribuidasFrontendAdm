import { createContext, useContext, useState } from "react";

const dishContext = createContext();

export const useDish = () => {
  const context = useContext(dishContext);
  if (!context) throw new Error("Dish Provider is missing");
  return context;
};

export const DishProvider = ({ children }) => {
  const [toggle, setToggle] = useState(true);
  const [toggleTemp, setToogleTemp] = useState(false);

  const value = {
    toggle: [toggle, setToggle],
    toggleTemp: [toggleTemp, setToogleTemp]
  };

  return <dishContext.Provider value={value}>{children}</dishContext.Provider>;
};
