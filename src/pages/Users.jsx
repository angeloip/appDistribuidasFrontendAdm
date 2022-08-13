import React from "react";
import { useDish } from "../context/dishContext";
import styles from "../styles/Users.module.css";
import { Header } from "../components/Header";

export const Users = () => {
  document.title = "Usuarios";
  const [toggle] = useDish().toggle;

  const classToggle = toggle
    ? `${styles.usersContainer} ${styles.extended}`
    : styles.usersContainer;
  return (
    <div className={classToggle}>
      <Header>Usuarios</Header>
    </div>
  );
};
