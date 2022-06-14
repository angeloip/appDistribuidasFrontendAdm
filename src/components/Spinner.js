import React from "react";
import { ImSpinner9 } from "react-icons/im";
import styles from "../styles/Spinner.module.css";

export default function Spinner({ size }) {
  return <ImSpinner9 className={styles.iconLoading} size={size} />;
}
