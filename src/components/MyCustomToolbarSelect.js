import { IconButton } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import React from "react";
import { useData } from "../context/dataContext";
import { useApi } from "../context/apiContext";
import Swal from "sweetalert2";

export const MyCustomToolbarSelect = ({
  selectedRows,
  displayData,
  setSelectedRows
}) => {
  const [data, setData] = useData().data;
  const deleteManyDishesRequest = useApi().deleteManyDishesRequest;

  const showLoading = () => {
    Swal.fire({
      title: "Espere un momento",
      html: "Eliminando platos...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  };

  const deleteDishes = (selectedRows) => {
    const result = selectedRows.map((item) => data.at(item.index));
    const selectedIds = result.map((item) => item._id);
    Swal.fire({
      title: `¿Desea borrar los platos seleccionados?`,
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
        await deleteManyDishesRequest(selectedIds)
          .then((res) => {
            setData(data.filter((dish) => !selectedIds.includes(dish._id)));
            Swal.fire(
              "Platos eliminados",
              `Se ha eliminado un total de ${selectedIds.length} plato(s)`,
              "success"
            );
            setSelectedRows([]);
          })
          .catch((err) => console.log(err.response));
      }
    });
  };
  return (
    <div style={{ paddingRight: "26px" }}>
      <IconButton onClick={() => deleteDishes(selectedRows)}>
        <FaTrash size={20} />
      </IconButton>
    </div>
  );
};
