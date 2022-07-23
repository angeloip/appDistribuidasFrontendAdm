import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import { useApi } from "../context/apiContext";
import { useData } from "../context/dataContext";
import styles from "../styles/ModalEditarPlato.module.css";

export const ModalEditarPlato = ({ show, setShow, platoSeleccionado }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useData().data;
  const [categories] = useData().categories;
  const updateDishRequest = useApi().updateDishRequest;

  const editarPlato = async (valores) => {
    setIsLoading(true);

    const ingredients = valores.ingredientes.split(", ");
    const benefits = valores.beneficios.split(", ");
    const tags = valores.tags.split(", ");

    let newInfo = {
      name: valores.nombre,
      ingredients: ingredients,
      preparation: valores.preparacion,
      benefits: benefits,
      category: valores.categoria,
      tags: tags
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
        <Modal.Title>Editar Plato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            nombre: platoSeleccionado.name,
            ingredientes: platoSeleccionado.ingredients?.join(", "),
            preparacion: platoSeleccionado.preparation,
            beneficios: platoSeleccionado.benefits?.join(", "),
            categoria: platoSeleccionado.category,
            tags: platoSeleccionado.tags?.join(", ")
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
            if (!valores.tags) {
              errores.tags = "Por favor, ingrese los tags";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            editarPlato(valores);
          }}
        >
          {({ errors, touched }) => (
            <div className={`container ${styles.containerForm}`}>
              <Form action="" className={styles.formulario}>
                <div className={styles.input_divider}>
                  <div className={styles.input_element}>
                    <div className={styles.cont_input}>
                      <Field
                        type="text"
                        name="nombre"
                        id="nombre"
                        autoComplete="off"
                        placeholder=" "
                        className={
                          errors.nombre && touched.nombre
                            ? `${styles.form__input} ${styles.warning}`
                            : `${styles.form__input}`
                        }
                        disabled={isLoading}
                      />
                      <label className={styles.form__label} htmlFor="nombre">
                        Nombre
                      </label>
                    </div>
                  </div>
                  <div className={styles.input_element}>
                    <div className={styles.cont_input}>
                      <Field
                        name="categoria"
                        as="select"
                        className={
                          errors.categoria && touched.categoria
                            ? `${styles.form__input} ${styles.my_select} ${styles.warning}`
                            : `${styles.form__input} ${styles.my_select}`
                        }
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
                  </div>
                </div>

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="ingredientes"
                    id="ingredientes"
                    autoComplete="off"
                    placeholder=" "
                    className={
                      errors.ingredientes && touched.ingredientes
                        ? `${styles.form__input} ${styles.form__area} ${styles.warning}`
                        : `${styles.form__input} ${styles.form__area}`
                    }
                    disabled={isLoading}
                    rows={4}
                  />
                  <label className={styles.form__label} htmlFor="ingredientes">
                    Ingredientes
                  </label>
                </div>

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="preparacion"
                    id="preparacion"
                    autoComplete="off"
                    placeholder=" "
                    className={
                      errors.preparacion && touched.preparacion
                        ? `${styles.form__input} ${styles.form__area} ${styles.warning}`
                        : `${styles.form__input} ${styles.form__area}`
                    }
                    disabled={isLoading}
                    rows={4}
                  />
                  <label className={styles.form__label} htmlFor="preparacion">
                    Preparación
                  </label>
                </div>

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="beneficios"
                    id="beneficios"
                    autoComplete="off"
                    placeholder=" "
                    className={
                      errors.beneficios && touched.beneficios
                        ? `${styles.form__input} ${styles.form__area} ${styles.warning}`
                        : `${styles.form__input} ${styles.form__area}`
                    }
                    disabled={isLoading}
                    rows={4}
                  />
                  <label className={styles.form__label} htmlFor="beneficios">
                    Beneficios
                  </label>
                </div>

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="tags"
                    id="tags"
                    autoComplete="off"
                    placeholder=" "
                    className={
                      errors.tags && touched.tags
                        ? `${styles.form__input} ${styles.form__area} ${styles.warning}`
                        : `${styles.form__input} ${styles.form__area}`
                    }
                    disabled={isLoading}
                    rows={2}
                  />
                  <label className={styles.form__label} htmlFor="tags">
                    Tags
                  </label>
                </div>

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
