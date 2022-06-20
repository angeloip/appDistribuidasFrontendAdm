import { ModalUpdateCategory } from "../modals/ModalUpdateCategory";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteCategoryRequest } from "../api/categoryRequest";
import Swal from "sweetalert2";
import { useState } from "react";
import styles from "../styles/SingleCategory.module.css";
import { useData } from "../context/dataContext";

export const SingleCategory = ({ category }) => {
  const [show, setShow] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const [categories, setCategories] = useData().categories;

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

  const deleteCategory = async () => {
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
  return (
    <>
      <tr className={styles.colProduct}>
        <td>{category._id}</td>
        <td>{category.name}</td>
        <td>
          <div className={styles.actionsBtn}>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => {
                setCategoriaSeleccionada(category);
                setShow(true);
              }}
            >
              <FaEdit size={18} />
            </button>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => deleteCategory()}
            >
              <FaTrash size={18} />
            </button>
          </div>
        </td>
      </tr>
      <ModalUpdateCategory
        show={show}
        setShow={setShow}
        categoriaSeleccionada={categoriaSeleccionada}
      />
    </>
  );
};
