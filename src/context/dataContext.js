import { createContext, useContext, useEffect, useState } from "react";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IconButton, Tooltip } from "@mui/material";
import { LoadingTable } from "../components/LoadingTable";
import { useApi } from "./apiContext";
import { MyCustomToolbarSelect } from "../components/MyCustomToolbarSelect";

const dataContext = createContext();

export const useData = () => {
  const context = useContext(dataContext);
  if (!context) throw new Error("Data Provider is missing");
  return context;
};

export const DataProvider = ({ children }) => {
  const getCategoriesRequest = useApi().getCategoriesRequest;
  const getDishesRequest = useApi().getDishesRequest;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const options = {
    /*   selectableRows: "none", */
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    responsive: "standard",
    customToolbar: () => {
      return (
        <span>
          <Tooltip title="Descargar Excel">
            <IconButton
              onClick={() => alert("Descargar excel")}
              style={{
                border: "none",
                outline: "none",
                color: "#0000008a",
                background: "transparent"
              }}
            >
              <RiFileExcel2Fill size={24} />
            </IconButton>
          </Tooltip>
        </span>
      );
    },
    textLabels: {
      pagination: {
        next: "Página siguiente",
        previous: "Página anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de"
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Tabla de Filtros"
      },
      filter: {
        title: "FILTROS",
        reset: "reset"
      },
      viewColumns: {
        title: "Mostrar columnas"
      },
      selectedRows: {
        text: "filas eliminadas",
        delete: "Eliminar"
      },
      body: {
        noMatch: isLoading ? (
          <LoadingTable />
        ) : (
          "Lo sentimos, no hay datos coincidentes para mostrar :("
        )
      }
    }
  };

  const moreOptions = {
    /* onRowSelectionChange: (currentSelect, allSelected) => {
      const result = allSelected.map((item) => data.at(item.index));
      const selectedIds = result.map((item) => item._id);
    }, */
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <MyCustomToolbarSelect
        selectedRows={selectedRows.data}
        displayData={displayData}
        setSelectedRows={setSelectedRows}
      />
    )
  };
  const getData = async () => {
    setIsLoading(true);

    await getDishesRequest()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
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
        console.log(error);
      });

    setIsLoadingCategory(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const value = {
    options: options,
    moreOptions: moreOptions,
    data: [data, setData],
    categories: [categories, setCategories],
    isLoading: [isLoading, setIsLoading],
    isLoadingCategory: [isLoadingCategory, setIsLoadingCategory]
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};
