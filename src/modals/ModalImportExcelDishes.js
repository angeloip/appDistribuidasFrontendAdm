import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import { useApi } from "../context/apiContext";
import styles from "../styles/ModalImportExcelDishes.module.css";

export const ModalImportExcelDishes = ({ show, setShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadDishesWithExcel = useApi().loadDishesWithExcel;

  const importExcel = async (xlsx) => {
    setIsLoading(true);

    const data = {
      xlsx: xlsx
    };

    await loadDishesWithExcel(data)
      .then((res) => {
        Swal.fire(
          "Data importada",
          `Se encontró un total de ${res.data.length} registros`,
          "success"
        );
        console.log(res);
      })
      .catch((err) => {
        alert(err.response);
        console.log(err.response);
      });

    setIsLoading(false);
    setShow(false);
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Importar Excel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            xlsx: ""
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.xlsx || valores.xlsx === undefined) {
              errores.xlsx = "Por favor, ingrese un archivo";
            }
            return errores;
          }}
          onSubmit={(values) => {
            importExcel(values.xlsx);
          }}
        >
          {({ errors, setFieldValue }) => (
            <div className={`container ${styles.containerForm}`}>
              <Form action="" className={styles.formulario}>
                <div className={styles.cont_file}>
                  <input
                    type="file"
                    name="xlsx"
                    id="xlsx"
                    /* accept="image/*" */
                    className={`${styles.form__input} ${styles.form__area}`}
                    onChange={(e) =>
                      setFieldValue("xlsx", e.currentTarget.files[0])
                    }
                  />
                  <label className={styles.form__label} htmlFor="xlsx">
                    Subir archivo
                  </label>
                </div>
                <ErrorMessage
                  name="xlsx"
                  component={() => (
                    <div className={`${styles.error} ${styles.error_image}`}>
                      {errors.xlsx}
                    </div>
                  )}
                />

                <button
                  type={isLoading ? "button" : "submit"}
                  className={styles.btnSubmitForm}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size={20} color={"#fff"} />
                      Importando...
                    </>
                  ) : (
                    "Importar"
                  )}
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
