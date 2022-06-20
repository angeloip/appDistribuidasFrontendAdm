import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdAddTask } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { SingleProduct } from "../components/SingleProduct";
import { ModalAgregarPlato } from "../modals/ModalAgregarPlato";
import { getDishesRequest } from "../api/dish";
import nophoto from "../nophoto.jpeg";
import styles from "../styles/Products.module.css";
import { useDish } from "../context/dishContext";
import { ProductsTable } from "../components/SkeletonMolds";
import { useData } from "../context/dataContext";

export const Products = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useData().data;
  const [isLoading, setIsLoading] = useData().isLoading;

  const [toggle, setToggle] = useDish().toggle;
  const [toggleTemp, setToogleTemp] = useDish().toggleTemp;

  const classToggle = toggle
    ? `${styles.productsContainer} ${styles.extended}`
    : styles.productsContainer;

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
            <h4>Lista de Platos</h4>
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

        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ingredientes</th>
                <th>Preparación</th>
                <th>Beneficios</th>
                <th>Categoría</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((x, i) => <ProductsTable key={i} />)
              ) : data ? (
                data.length > 0 ? (
                  data.map((producto) => {
                    return (
                      <SingleProduct key={producto._id} producto={producto} />
                    );
                  })
                ) : (
                  <tr style={{ background: "#fff" }}>
                    <td colSpan="8">
                      <h2 style={{ textAlign: "center" }}>No hay productos</h2>
                    </td>
                  </tr>
                )
              ) : (
                <tr style={{ background: "#fff" }}>
                  <td colSpan="8">
                    <h2 style={{ textAlign: "center" }}>No hay productos</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ModalAgregarPlato show={show} setShow={setShow} />
      </div>
    </div>
  );
};
