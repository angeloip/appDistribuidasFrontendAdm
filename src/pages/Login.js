import styles from "../styles/Login.module.css";
import logo from "../img/logo.png";
import { firebaseErrors } from "../utils/firebaseErrors";
import { Formik, Form, Field } from "formik";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useApi } from "../context/apiContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  document.title = "Login | IziFood";
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);

  const [beUser, setBeUser] = useAuth().beUser;
  const setUserRole = useAuth().userRole[1];
  const logIn = useAuth().logIn;
  const saveToken = useAuth().saveToken;
  const [isLoading, setIsLoading] = useState(false);

  const createLoginRequest = useApi().createLoginRequest;

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    await logIn(email, password)
      .then(async (userCredential) => {
        const user = {
          email: email,
          password: password
        };

        await createLoginRequest(user)
          .then((res) => {
            if (res.data.role === "admin") {
              setBeUser(res.data);
              saveToken(res.data.token);
              setUserRole(res.data.role);
              setHidden(true);
              Toast.fire({
                icon: "success",
                title: `Bienvenido ${res.data.name}`
              });
              return <Navigate to="/admin/products" />;
            } else {
              setError("Usuario no autorizado");
            }
          })
          .catch((err) => {
            const error = err.response;
            alert(error.data.errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = firebaseErrors(errorCode);
        setError(errorMessage);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      setError("");
      setHidden(true);
      setIsLoading(false);
    };
  }, [beUser]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginSubContainer}>
        <div className={styles.imgLogo}>
          <figure className={styles.figure}>
            <img src={logo} alt="IziFood" />
          </figure>
        </div>

        <h2 className={styles.loginTittle}>Iniciar Sesión</h2>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.email) {
              errores.email = "Ingrese un email";
            }

            if (!valores.password) {
              errores.password = "Ingrese una contraseña";
            }

            return errores;
          }}
          onSubmit={(valores) => {
            handleLogin(valores.email, valores.password);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <div className={`container ${styles.containerForm}`}>
              <Form action="" className={styles.formulario}>
                <div className={styles.cont_input}>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    placeholder=" "
                    className={
                      errors.email && touched.email
                        ? `${styles.form__input} ${styles.warning}`
                        : `${styles.form__input}`
                    }
                    disabled={isLoading}
                  />
                  <label className={styles.form__label} htmlFor="email">
                    Correo
                  </label>
                </div>

                <div className={styles.cont_input}>
                  <Field
                    type={hidden ? "password" : "text"}
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder=" "
                    disabled={isLoading}
                    className={
                      errors.password && touched.password
                        ? `${styles.form__input} ${styles.inputPass} ${styles.warning}`
                        : `${styles.form__input} ${styles.inputPass}`
                    }
                  />
                  {hidden ? (
                    <AiOutlineEyeInvisible
                      onClick={() => setHidden(false)}
                      className={styles.eye}
                    />
                  ) : (
                    <AiOutlineEye
                      onClick={() => setHidden(true)}
                      className={styles.eye}
                    />
                  )}
                  <label className={styles.form__label} htmlFor="password">
                    Contraseña
                  </label>
                </div>

                {error ? (
                  <div className={styles.errorMessage}>
                    <p>{error}</p>
                  </div>
                ) : null}

                {isLoading ? (
                  <button
                    type="button"
                    className={styles.disabledButton}
                    disabled
                  >
                    <ImSpinner9 className={styles.iconLoading} />
                    Iniciando Sesión...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={styles.btnSubmitForm}
                    onClick={() => {
                      setError("");
                    }}
                  >
                    Iniciar Sesión
                  </button>
                )}

                <button
                  type="button"
                  className={`${styles.btnForm} ${styles.buttonForgotPass}`}
                  onClick={() => {}}
                >
                  ¿Olvidaste tu contraseña?
                </button>

                <div>
                  <p className={styles.orP}>
                    <span className={styles.orSpan}>O</span>
                  </p>
                  <button
                    type="button"
                    className={`${styles.btnForm} ${styles.buttonGoogle}`}
                    onClick={() => {}}
                  >
                    <FcGoogle size={20} className={styles.iconGoogle} />
                    Acceder con Google
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};
