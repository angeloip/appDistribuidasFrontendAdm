import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import { useApi } from "../context/apiContext";
import { useData } from "../context/dataContext";
import styles from "../styles/ModalEditarPlato.module.css";

export const ModalUpdateCategory = ({
  show,
  setShow,
  categoriaSeleccionada
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useData().categories;
  const updateCategoryRequest = useApi().updateCategoryRequest;

  const editarCategoria = async (valores) => {
    setIsLoading(true);

    let newInfo = {
      name: valores.nombre
    };

    await updateCategoryRequest(categoriaSeleccionada._id, newInfo)
      .then((res) => {
        const dataNueva = categories;
        dataNueva.forEach((categorie) => {
          if (categoriaSeleccionada._id === categorie._id) {
            categorie.name = newInfo.name;
          }
        });
        setCategories(dataNueva);

        Swal.fire(
          "Categoría Actualizado",
          "Los datos de la categoría han sido actualizadas",
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
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            nombre: categoriaSeleccionada.name
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.nombre) {
              errores.nombre = "Por favor, ingrese un nombre";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            editarCategoria(valores);
          }}
        >
          {({ errors }) => (
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
                      <Spinner size={20} color={"#fff"} />
                      Editando...
                    </>
                  ) : (
                    "Editar"
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
