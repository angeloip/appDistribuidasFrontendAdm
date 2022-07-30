import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { useState } from "react";
import styles from "../styles/ModalAgregarPlato.module.css";
import Spinner from "../components/Spinner";
import noImg from "../img/no-image-dish.jpg";
import { useApi } from "../context/apiContext";
import { useData } from "../context/dataContext";
import Swal from "sweetalert2";

export const ModalEditImageDish = ({ show, setShow, platoSeleccionado }) => {
  console.log(platoSeleccionado);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useData().data;
  const updateImageRequest = useApi().updateImageRequest;
  const editarImagen = async (image) => {
    setIsLoading(true);
    const img = {
      image: image
    };

    await updateImageRequest(platoSeleccionado._id, img)
      .then((res) => {
        const dataNueva = data;
        dataNueva.forEach((product) => {
          if (platoSeleccionado._id === product._id) {
            product.image.url = res.data.image.url;
            product.image.public_id = res.data.image.public_id;
          }
        });
        setData(dataNueva);

        Swal.fire(
          "Plato Actualizado",
          "La imagen de plato ha sido actualizado",
          "success"
        );

        console.log(res.data);
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
        <Modal.Title>Editar Imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            imagen: ""
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.imagen || valores.imagen === undefined) {
              errores.imagen = "Por favor, ingrese una imagen";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            editarImagen(valores.imagen);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <div className={`container ${styles.containerForm}`}>
              <Form action="" className={styles.formulario}>
                <div className={styles.topModal}>
                  <h5>{platoSeleccionado.name}</h5>

                  <figure className={styles.figure}>
                    <img
                      src={platoSeleccionado.image.url || noImg}
                      alt={platoSeleccionado.name}
                    />
                  </figure>
                </div>
                <div className={styles.cont_file}>
                  <input
                    type="file"
                    name="imagen"
                    id="imagen"
                    accept="image/*"
                    className={
                      errors.imagen && touched.imagen
                        ? `${styles.form__input} ${styles.form__area} ${styles.warning}`
                        : `${styles.form__input} ${styles.form__area}`
                    }
                    onChange={(e) =>
                      setFieldValue("imagen", e.currentTarget.files[0])
                    }
                  />
                  <label className={styles.form__label} htmlFor="imagen">
                    Imagen
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
                    "Editar Imagen"
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
