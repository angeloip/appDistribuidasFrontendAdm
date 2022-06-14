import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { createDishRequest } from "../api/dish";
import Spinner from "../components/Spinner";
import styles from "../styles/ModalAgregarPlato.module.css";

export const ModalAgregarPlato = ({ show, setShow, data, setData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const agregarPlato = async (valores) => {
    setIsLoading(true);
    const ingredients = valores.ingredientes.split(", ");

    let plato = {
      name: valores.nombre,
      ingredients: ingredients,
      preparation: valores.preparacion,
      benefits: valores.beneficios,
      category: valores.categoria,
      image: valores.imagen
    };

    await createDishRequest(plato)
      .then((res) => {
        setData([...data, res.data]);
        Swal.fire(
          "Plato Agregado",
          `El plato ${valores.nombre} ha sido agregado`,
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
        <Modal.Title>Agregar Plato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            nombre: "",
            ingredientes: "",
            preparacion: "",
            beneficios: "",
            categoria: "Default",
            imagen: ""
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

            if (!valores.imagen || valores.imagen === undefined) {
              errores.imagen = "Por favor, ingrese un archivo";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            agregarPlato(valores);
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
                    <option value="Entradas">Entradas</option>
                    <option value="Sopas">Sopas</option>
                    <option value="Ensaladas">Ensaladas</option>
                    <option value="Platos de Fondo">Platos de Fondo</option>
                    <option value="Postres">Postres</option>
                    <option value="Bebidas Calientes">Bebidas Calientes</option>
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

                <div className={styles.cont_file}>
                  <input
                    type="file"
                    name="imagen"
                    id="imagen"
                    accept="image/*"
                    className={`${styles.form__input} ${styles.form__area}`}
                    onChange={(e) =>
                      setFieldValue("imagen", e.currentTarget.files[0])
                    }
                  />
                  <label className={styles.form__label} htmlFor="imagen">
                    Imagen
                  </label>
                </div>
                <ErrorMessage
                  name="imagen"
                  component={() => (
                    <div className={`${styles.error} ${styles.error_image}`}>
                      {errors.imagen}
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
