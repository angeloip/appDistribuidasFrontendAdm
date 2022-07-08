import React, { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdAddTask } from "react-icons/md";
import { ModalAgregarPlato } from "../modals/ModalAgregarPlato";
import styles from "../styles/Products.module.css";
import { useDish } from "../context/dishContext";
import { ProductsTable } from "../components/SkeletonMolds";
import { useData } from "../context/dataContext";
import { Header } from "../components/Header";
import { DataTableDishes } from "../components/DataTableDishes";

export const Products = () => {
  const [show, setShow] = useState(false);
  const [isLoading] = useData().isLoading;
  const [toggle] = useDish().toggle;
  const [data] = useData().data;

  const classToggle = toggle
    ? `${styles.productsContainer} ${styles.extended}`
    : styles.productsContainer;

  return (
    <div className={classToggle}>
      <Header>Platos</Header>

      <br />

      <div className={styles.productsBox}>
        <div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setShow(true)}
          >
            <MdAddTask size={18} /> Agregar Plato
          </button>
        </div>

        <br />

        <div className={styles.dataQuantity}>
          Número de Platos:{" "}
          {isLoading ? (
            <ImSpinner9 className={styles.spinner} />
          ) : (
            <span>{data.length}</span>
          )}
        </div>
        <br />

        <DataTableDishes />

        <ModalAgregarPlato show={show} setShow={setShow} />
      </div>
    </div>
  );
};
