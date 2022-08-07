export const firebaseErrors = (errorCode) => {
  let message;
  switch (errorCode) {
    case "auth/invalid-email":
      message = "Correo electrónico no válido";
      break;
    case "auth/weak-password":
      message = "La contraseña debe tener al menos 6 caracteres.";
      break;
    case "auth/wrong-password":
      message = "La contraseña que ingresaste es incorrecta.";
      break;
    case "auth/network-request-failed":
      message = "Por favor revise su conexion a internet.";
      break;
    case "auth/email-already-in-use":
      message = "El correo electrónico ya está en uso.";
      break;
    case "auth/user-not-found":
      message = "El correo no está conectado a una cuenta.";
      break;
    case "auth/too-many-requests":
      message =
        "Se ha detectado muchos intentos de inicio de sesión, espere un momento.";
      break;
    case "auth/user-disabled":
      message = "Su cuenta ha sido deshabilitada.";
      break;

    case "auth/popup-closed-by-user":
      message = "Ventana cerrada por el usuario.";
      break;
    case "auth/unauthorized-domain":
      message = "Dominio no autorizado.";
      break;

    case "auth/operation-not-allowed":
      message = "Cuenta no habilitada";
      break;
    case "auth/requires-recent-login":
      message = "¡Inicia sesión de nuevo e inténtalo de nuevo!";
      break;
    case "auth/phone-number-already-exists":
      message = "El número de teléfono ya está en uso.";
      break;
    case "auth/invalid-phone-number":
      message = "Número de telefono no válido.";
      break;
    case "auth/cannot-delete-own-user-account":
      message = "No puede eliminar su propia cuenta de usuario.";
      break;
    default:
      message = errorCode;
      break;
  }

  return message;
};
