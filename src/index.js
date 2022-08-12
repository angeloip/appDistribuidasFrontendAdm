import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/dataContext";
import { ApiProvider } from "./context/apiContext";
import { DishProvider } from "./context/dishContext";
import { AuthProvider } from "./context/authContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider>
          <DataProvider>
            <DishProvider>
              <App />
            </DishProvider>
          </DataProvider>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
