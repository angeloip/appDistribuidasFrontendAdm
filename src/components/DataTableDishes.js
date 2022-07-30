import MUIDataTable from "mui-datatables";
import { useData } from "../context/dataContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "../styles/DataTableDishes.module.css";
import { ModalEditarPlato } from "../modals/ModalEditarPlato";
import { useState } from "react";
import Swal from "sweetalert2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useApi } from "../context/apiContext";
import noImg from "../img/no-image-dish.jpg";

export const DataTableDishes = () => {
  const [data, setData] = useData().data;
  const options = useData().options;
  const moreOptions = useData().moreOptions;
  const [show, setShow] = useState(false);
  const [platoSeleccionado, setPlatoSeleccionado] = useState([]);
  const deleteDishRequest = useApi().deleteDishRequest;
  const allOptions = { ...options, ...moreOptions };

  const updateDish = (id) => {
    const dish = data.find((dish) => dish._id === id);
    setPlatoSeleccionado(dish);
    setShow(true);
  };

  const showLoading = () => {
    Swal.fire({
      title: "Espere un momento",
      html: "Eliminando plato...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  };

  const deleteDish = (id) => {
    const dish = data.find((dish) => dish._id === id);
    Swal.fire({
      title: `¿Desea borrar el plato ${dish.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        showLoading();
        await deleteDishRequest(dish._id)
          .then((res) => {
            setData(data.filter((dishDelete) => dishDelete._id !== dish._id));
            Swal.fire(
              "Eliminado",
              `El plato ${dish.name} ha sido eliminado`,
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
      name: "ingredients",
      label: "INGREDIENTES",
      options: {
        customBodyRender: (val) => {
          return (
            <>
              {val
                .map((ingredient) => ingredient)
                .join(", ")
                .slice(0, 100) + "..."}
            </>
          );
        }
      }
    },
    {
      name: "preparation",
      label: "PREPARACIÓN",
      options: {
        customBodyRender: (val) => {
          return <>{val.slice(0, 100) + "..."}</>;
        }
      }
    },
    {
      name: "benefits",
      label: "BENEFICIOS",
      options: {
        customBodyRender: (val) => {
          return (
            <>
              {val
                .map((benefit) => benefit)
                .join(", ")
                .slice(0, 100) + "..."}
            </>
          );
        }
      }
    },
    {
      name: "category",
      label: "CATEGORIA",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "image",
      label: "IMAGEN",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className={styles.img_box}>
              <img
                src={value.url || noImg}
                className={styles.product__image}
                alt={tableMeta.rowData[1]}
              />
            </div>
          );
        }
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
                onClick={() => updateDish(tableMeta.rowData[0])}
              >
                <FaEdit size={18} />
              </button>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => deleteDish(tableMeta.rowData[0])}
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
          title={"Lista de Platos"}
          data={data}
          columns={columns}
          options={allOptions}
        />
      </ThemeProvider>

      <ModalEditarPlato
        show={show}
        setShow={setShow}
        platoSeleccionado={platoSeleccionado}
      />
    </div>
  );
};
