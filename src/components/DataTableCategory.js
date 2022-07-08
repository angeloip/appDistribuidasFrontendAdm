import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useData } from "../context/dataContext";
import { ModalUpdateCategory } from "../modals/ModalUpdateCategory";
import Swal from "sweetalert2";
import styles from "../styles/DataTableCategory.module.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { useApi } from "../context/apiContext";

export const DataTableCategory = () => {
  const [categories, setCategories] = useData().categories;
  const options = useData().options;
  const [show, setShow] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const deleteCategoryRequest = useApi().deleteCategoryRequest;

  const updateCategory = (id) => {
    const category = categories.find((category) => category._id === id);
    setCategoriaSeleccionada(category);
    setShow(true);
  };

  const showLoading = () => {
    Swal.fire({
      title: "Espere un momento",
      html: "Eliminando categoría...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  };

  const deleteCategory = async (id) => {
    const category = categories.find((category) => category._id === id);
    Swal.fire({
      title: `¿Desea borrar la categoría ${category.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        showLoading();
        await deleteCategoryRequest(category._id)
          .then((res) => {
            setCategories(
              categories.filter(
                (categoryDelete) => categoryDelete._id !== category._id
              )
            );
            Swal.fire(
              "Eliminado",
              `La categoría ${category.name} ha sido eliminada`,
              "success"
            );
          })
          .catch((err) => {
            alert(err.response);
          });
      }
    });
  };

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "name",
      label: "NOMBRE",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "actions",
      label: "ACCIONES",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className={styles.actionsBtn}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => updateCategory(tableMeta.rowData[0])}
              >
                <FaEdit size={18} />
              </button>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => deleteCategory(tableMeta.rowData[0])}
              >
                <FaTrash size={18} />
              </button>
            </div>
          );
        }
      }
    }
  ];

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              background: "#009879",

              color: "#fff"
            },

            sortAction: {
              color: "#fff"
            }
          }
        },

        MUIDataTableHeadCell: {
          styleOverrides: {
            data: {
              color: "#fff"
            },
            sortAction: {
              "& path": {
                color: "#fff"
              }
            }
          }
        }
      }
    });

  return (
    <div className={styles.tableContainer}>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Lista de Categorías"}
          data={categories}
          columns={columns}
          options={options}
        />
      </ThemeProvider>

      <ModalUpdateCategory
        show={show}
        setShow={setShow}
        categoriaSeleccionada={categoriaSeleccionada}
      />
    </div>
  );
};
