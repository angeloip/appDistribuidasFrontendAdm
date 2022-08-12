import { useState } from "react";
import { useDish } from "../context/dishContext";
import { ImSpinner9 } from "react-icons/im";
import { MdAddTask } from "react-icons/md";
import styles from "../styles/Categories.module.css";
import { ModalAddCategory } from "../modals/ModalAddCategory";
import { useData } from "../context/dataContext";
import { Header } from "../components/Header";
import { DataTableCategory } from "../components/DataTableCategory";

export const Categories = () => {
  const [show, setShow] = useState(false);
  const [isLoadingCategory] = useData().isLoadingCategory;
  const [categories] = useData().categories;

  const [toggle] = useDish().toggle;

  const classToggle = toggle
    ? `${styles.categoriesContainer} ${styles.extended}`
    : styles.categoriesContainer;

  return (
    <div className={classToggle}>
      <Header>Categorías</Header>

      <br />

      <div className={styles.productsBox}>
        <div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setShow(true)}
          >
            <MdAddTask size={18} /> Agregar Categoría
          </button>
        </div>

        <br />

        <div className={styles.dataQuantity}>
          Número de Categorías:{" "}
          {isLoadingCategory ? (
            <ImSpinner9 className={styles.spinner} />
          ) : (
            <span>{categories.length}</span>
          )}
        </div>
        <br />

        <DataTableCategory />
        <ModalAddCategory show={show} setShow={setShow} />
      </div>
    </div>
  );
};
