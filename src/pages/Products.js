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
import * as XLSX from "xlsx";
import Spinner from "../components/Spinner";

export const Products = () => {
  const [show, setShow] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [isLoading] = useData().isLoading;
  const [toggle] = useDish().toggle;
  const [data] = useData().data;
  const [loading] = useState(false);

  const classToggle = toggle
    ? `${styles.productsContainer} ${styles.extended}`
    : styles.productsContainer;

  const exportExcel = () => {
    const dataExport = data.map((dish) => {
      return {
        name: dish.name,
        ingredients: dish.ingredients.join(", "),
        preparation: dish.preparation,
        benefits: dish.benefits.join(", "),
        category: dish.category,
        tags: dish.tags.join(", ")
      };
    });

    const wscols = calcColumn(dataExport);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataExport);
    ws["!cols"] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Platos");
    XLSX.writeFile(wb, "DataDePlatos.xlsx");
  };

  const calcColumn = (rows) => {
    return Object.keys(rows[0]).map((data, i) => ({
      wch: rows.reduce(
        (previousValue, currentValue) =>
          Math.max(previousValue, Object.values(currentValue)[i].length),
        10
      )
    }));
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
          <button
            className={styles.addBtn}
            disabled={loading}
            onClick={() => exportExcel()}
          >
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
