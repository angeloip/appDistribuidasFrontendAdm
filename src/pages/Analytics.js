import React from "react";
import { useDish } from "../context/dishContext";
import styles from "../styles/Analytics.module.css";
import { Header } from "../components/Header";

export const Analytics = () => {
  const [toggle] = useDish().toggle;

  const classToggle = toggle
    ? `${styles.analyticsContainer} ${styles.extended}`
    : styles.analyticsContainer;
  return (
    <div className={classToggle}>
      <Header>Analíticas</Header>
    </div>
  );
};
