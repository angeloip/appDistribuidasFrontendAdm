import React, { useState } from "react";
import { useDish } from "../context/dishContext";
import styles from "../styles/Dashboard.module.css";
import { Header } from "../components/Header";

export const Dashboard = () => {
  const [toggle, setToggle] = useDish().toggle;

  const classToggle = toggle
    ? `${styles.dashboardContainer} ${styles.extended}`
    : styles.dashboardContainer;

  return (
    <div className={classToggle}>
      <Header>Dashboard</Header>

      <br />
    </div>
  );
};
