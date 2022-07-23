import React, { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdAddTask, MdOutlineCloudDownload } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import { ModalAgregarPlato } from "../modals/ModalAgregarPlato";
import styles from "../styles/Products.module.css";
import { useDish } from "../context/dishContext";
import { useData } from "../context/dataContext";
import { Header } from "../components/Header";
import { DataTableDishes } from "../components/DataTableDishes";
import { ModalImportExcelDishes } from "../modals/ModalImportExcelDishes";
import { useApi } from "../context/apiContext";
import Spinner from "../components/Spinner";

export const Products = () => {
  const [show, setShow] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [isLoading] = useData().isLoading;
  const [toggle] = useDish().toggle;
  const [data] = useData().data;
  const [loading, setLoading] = useState(false);
  const exportExcelOfDishes = useApi().exportExcelOfDishes;

  const classToggle = toggle
    ? `${styles.productsContainer} ${styles.extended}`
    : styles.productsContainer;

  const exportExcel = async () => {
    setLoading(true);

    await exportExcelOfDishes()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));

    setLoading(false);
  };

  return (
    <div className={classToggle}>
      <Header>Platos</Header>

      <br />

      <div className={styles.productsBox}>
        <div className={styles.buttonsFlex}>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setShow(true)}
          >
            <MdAddTask size={18} /> Agregar Plato
          </button>
          <button className={styles.addBtn} onClick={() => setShowImport(true)}>
            <RiFileExcel2Line size={18} /> Importar Excel
          </button>
          <button className={styles.addBtn} onClick={() => exportExcel()}>
            {loading ? (
              <>
                <Spinner size={20} color={"#fff"} />
                Importando...
              </>
            ) : (
              <>
                <MdOutlineCloudDownload size={18} /> Descargar Excel
              </>
            )}
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
        <ModalImportExcelDishes show={showImport} setShow={setShowImport} />
      </div>
    </div>
  );
};
