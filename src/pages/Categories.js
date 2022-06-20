import { useState } from "react";
import { useDish } from "../context/dishContext";
import { ImSpinner9 } from "react-icons/im";
import nophoto from "../nophoto.jpeg";
import { FaBars } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import styles from "../styles/Categories.module.css";
import { SingleCategory } from "../components/SingleCategory";
import { ModalAddCategory } from "../modals/ModalAddCategory";
import { CategoriesTable } from "../components/SkeletonMolds";
import { useData } from "../context/dataContext";

export const Categories = () => {
  const [show, setShow] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useData().isLoadingCategory;
  const [categories, setCategories] = useData().categories;

  const [toggle, setToggle] = useDish().toggle;
  const [toggleTemp, setToogleTemp] = useDish().toggleTemp;

  const classToggle = toggle
    ? `${styles.categoriesContainer} ${styles.extended}`
    : styles.categoriesContainer;

  return (
    <div className={classToggle}>
      <header className={styles.headerProducts}>
        <div className={styles.flexContent}>
          <div>
            <button
              type="button"
              className={styles.buttonSide}
              onClick={() => {
                setToogleTemp(!toggleTemp);
                setToggle(toggleTemp && true);
              }}
            >
              <FaBars className={styles.iconBar} size={20} />
            </button>
            <h4>Categorías</h4>
          </div>

          <div>
            <span>Admin</span>
            <img src={nophoto} alt="" />
          </div>
        </div>
      </header>

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

        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingCategory ? (
                [...Array(5)].map((x, i) => <CategoriesTable key={i} />)
              ) : categories ? (
                categories.length > 0 ? (
                  categories.map((category) => {
                    return (
                      <SingleCategory key={category._id} category={category} />
                    );
                  })
                ) : (
                  <tr style={{ background: "#fff" }}>
                    <td colSpan="3">
                      <h2 style={{ textAlign: "center" }}>No hay categorías</h2>
                    </td>
                  </tr>
                )
              ) : (
                <tr style={{ background: "#fff" }}>
                  <td colSpan="3">
                    <h2 style={{ textAlign: "center" }}>No hay categorías</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ModalAddCategory show={show} setShow={setShow} />
      </div>
    </div>
  );
};
