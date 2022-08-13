import styles from "../styles/Loading.module.css";
import logoIcon from "../img/logoIcon.png";

export const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={logoIcon} alt="IziFood" />
      <h3>Cargando...</h3>
    </div>
  );
};
