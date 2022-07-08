import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import { useApi } from "../context/apiContext";
import { useData } from "../context/dataContext";
import styles from "../styles/ModalAgregarPlato.module.css";

export const ModalAgregarPlato = ({ show, setShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useData().data;
  const [categories] = useData().categories;
  const createDishRequest = useApi().createDishRequest;

  const agregarPlato = async (valores) => {
    setIsLoading(true);
    const ingredients = valores.ingredientes.split(", ");
    const benefits = valores.beneficios.split(", ");
    const tags = valores.tags.split(", ");

    let plato = {
      name: valores.nombre,
      ingredients: ingredients,
      preparation: valores.preparacion,
      benefits: benefits,
      category: valores.categoria,
      image: valores.imagen,
      tags: tags
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
            imagen: "",
            tags: ""
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
            if (!valores.tags) {
              errores.tags = "Por favor, ingrese los tags";
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

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="ingredientes"
                    id="ingredientes"
                    autoComplete="off"
                    placeholder=" "
                    className={`${styles.form__input} ${styles.form__area}`}
                    disabled={isLoading}
                    rows={4}
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
                    rows={4}
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
                    rows={4}
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

                <div className={styles.cont_area}>
                  <Field
                    component="textarea"
                    name="tags"
                    id="tags"
                    autoComplete="off"
                    placeholder=" "
                    className={`${styles.form__input} ${styles.form__area}`}
                    disabled={isLoading}
                    rows={2}
                  />
                  <label className={styles.form__label} htmlFor="tags">
                    Tags
                  </label>
                </div>
                <ErrorMessage
                  name="tags"
                  component={() => (
                    <div className={styles.error}>{errors.tags}</div>
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
