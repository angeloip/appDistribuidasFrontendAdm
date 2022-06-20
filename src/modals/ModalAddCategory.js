import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { createCategoryRequest } from "../api/categoryRequest";
import Spinner from "../components/Spinner";
import { useData } from "../context/dataContext";
import styles from "../styles/ModalAgregarPlato.module.css";

export const ModalAddCategory = ({ show, setShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useData().categories;

  const agregarCategoria = async (valores) => {
    setIsLoading(true);

    let categoria = {
      name: valores.nombre
    };

    await createCategoryRequest(categoria)
      .then((res) => {
        setCategories([...categories, res.data]);
        Swal.fire(
          "Categoría Agregada",
          `La categoría ${valores.nombre} ha sido agregada`,
          "success"
        );
      })
      .catch((err) => alert(err.response));

    setIsLoading(false);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            nombre: ""
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.nombre) {
              errores.nombre = "Por favor, ingrese un nombre";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            agregarCategoria(valores);
          }}
        >
          {({ errors, setFieldValue }) => (
            <div className={`container ${styles.containerForm}`}>
              <Form action="" className={styles.formulario}>
                <div className={styles.cont_input}>
                  <Field
                    type="text"
                    name="nombre"
                    id="nombre"
                    autoComplete="off"
                    placeholder=" "
                    className={styles.form__input}
                    disabled={isLoading}
                  />
                  <label className={styles.form__label} htmlFor="nombre">
                    Nombre
                  </label>
                </div>
                <ErrorMessage
                  name="nombre"
                  component={() => (
                    <div className={styles.error}>{errors.nombre}</div>
                  )}
                />

                <button
                  type={isLoading ? "button" : "submit"}
                  className={styles.btnSubmitForm}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size={20} />
                      Guardando...
                    </>
                  ) : (
                    "Guardar"
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
