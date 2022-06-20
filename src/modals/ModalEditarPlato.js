import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateDishRequest } from "../api/dish";
import Spinner from "../components/Spinner";
import { useData } from "../context/dataContext";
import styles from "../styles/ModalEditarPlato.module.css";

export const ModalEditarPlato = ({ show, setShow, platoSeleccionado }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useData().data;
  const [categories, setCategories] = useData().categories;

  const editarPlato = async (valores) => {
    setIsLoading(true);

    const ingredients = valores.ingredientes.split(", ");

    let newInfo = {
      name: valores.nombre,
      ingredients: ingredients,
      preparation: valores.preparacion,
      benefits: valores.beneficios,
      category: valores.categoria
    };

    await updateDishRequest(platoSeleccionado._id, newInfo)
      .then((res) => {
        const dataNueva = data;
        dataNueva.forEach((product) => {
          if (platoSeleccionado._id === product._id) {
            product.name = newInfo.name;
            product.ingredients = newInfo.ingredients;
            product.preparation = newInfo.preparation;
            product.benefits = newInfo.benefits;
            product.category = newInfo.category;
          }
        });
        setData(dataNueva);

        Swal.fire(
          "Plato Actualizado",
          "Los datos del plato han sido actualizados",
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
        <Modal.Title>Editar Plato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            nombre: platoSeleccionado.name,
            ingredientes: platoSeleccionado.ingredients?.join(", "),
            preparacion: platoSeleccionado.preparation,
            beneficios: platoSeleccionado.benefits,
            categoria: platoSeleccionado.category
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.nombre) {
              errores.nombre = "Por favor, ingrese un nombre";
            }
            if (!valores.ingredientes) {
              errores.ingredientes = "Por favor, ingrese los ingredientes";
            }
            if (!valores.preparacion) {
              errores.preparacion = "Por favor, ingrese la preparacion";
            }
            if (!valores.beneficios) {
              errores.beneficios = "Por favor, ingrese los beneficios";
            }
            if (valores.categoria === "Default") {
              errores.categoria = "Por favor, ingrese la categoria";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            editarPlato(valores);
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

                <div className={styles.cont_input}>
                  <Field
                    type="text"
                    name="ingredientes"
                    id="ingredientes"
                    autoComplete="off"
                    placeholder=" "
                    className={styles.form__input}
                    disabled={isLoading}
                  />
                  <label className={styles.form__label} htmlFor="ingredientes">
                    Ingredientes
                  </label>
                </div>
                <ErrorMessage
                  name="ingredientes"
                  component={() => (
                    <div className={styles.error}>{errors.ingredientes}</div>
                  )}
                />

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="preparacion"
                    id="preparacion"
                    autoComplete="off"
                    placeholder=" "
                    className={`${styles.form__input} ${styles.form__area}`}
                    disabled={isLoading}
                    rows={3}
                  />
                  <label className={styles.form__label} htmlFor="preparacion">
                    Preparación
                  </label>
                </div>
                <ErrorMessage
                  name="preparacion"
                  component={() => (
                    <div className={styles.error}>{errors.preparacion}</div>
                  )}
                />

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="beneficios"
                    id="beneficios"
                    autoComplete="off"
                    placeholder=" "
                    className={`${styles.form__input} ${styles.form__area}`}
                    disabled={isLoading}
                    rows={3}
                  />
                  <label className={styles.form__label} htmlFor="beneficios">
                    Beneficios
                  </label>
                </div>
                <ErrorMessage
                  name="beneficios"
                  component={() => (
                    <div className={styles.error}>{errors.beneficios}</div>
                  )}
                />

                <div className={styles.cont_input}>
                  <Field
                    name="categoria"
                    as="select"
                    className={`${styles.form__input} ${styles.my_select}`}
                  >
                    <option value="Default" disabled>
                      Elija una opción
                    </option>
                    {categories.map((categorie) => (
                      <option key={categorie._id} value={categorie.name}>
                        {categorie.name}
                      </option>
                    ))}
                  </Field>
                  <label className={styles.form__label} htmlFor="categoria">
                    Categoría
                  </label>
                </div>
                <ErrorMessage
                  name="categoria"
                  component={() => (
                    <div className={styles.error}>{errors.categoria}</div>
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
