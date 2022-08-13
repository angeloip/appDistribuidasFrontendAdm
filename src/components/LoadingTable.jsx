import Spinner from "./Spinner";
import styles from "../styles/Spinner.module.css";

export const LoadingTable = () => {
  return (
    <div className={styles.loadingTableContainer}>
      <h2>CARGANDO DATA . . .</h2>
      <Spinner size={50} />
    </div>
  );
};
