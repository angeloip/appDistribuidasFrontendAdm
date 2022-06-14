import { ModalUpdateCategory } from "../modals/ModalUpdateCategory";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteCategoryRequest } from "../api/categoryRequest";
import Swal from "sweetalert2";
import { useState } from "react";
import styles from "../styles/SingleCategory.module.css";

export const SingleCategory = ({ category, categories, setCategories }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  const deleteCategory = async () => {
    Swal.fire({
      title: `¿Desea borrar la categoría ${category.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isLoading ? "Eliminando..." : "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
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
        setIsLoading(false);
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
        categories={categories}
        setCategories={setCategories}
      />
    </>
  );
};
