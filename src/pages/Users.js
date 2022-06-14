import React from "react";
import { useDish } from "../context/dishContext";
import nophoto from "../nophoto.jpeg";
import { FaBars } from "react-icons/fa";
import styles from "../styles/Users.module.css";

export const Users = () => {
  const [toggle, setToggle] = useDish().toggle;
  const [toggleTemp, setToogleTemp] = useDish().toggleTemp;

  const classToggle = toggle
    ? `${styles.usersContainer} ${styles.extended}`
    : styles.usersContainer;
  return (
    <div className={classToggle}>
      {" "}
      <header className={styles.headerProducts}>
        <div className={styles.flexContent}>
          <div>
            <button
              type="button"
              className={styles.buttonSide}
              onClick={() => {
                setToogleTemp(!toggleTemp);
                setToggle(toggleTemp && true);
              }}
            >
              <FaBars className={styles.iconBar} size={20} />
            </button>
            <h4>Usuarios</h4>
          </div>

          <div>
            <span>Admin</span>
            <img src={nophoto} alt="" />
          </div>
        </div>
      </header>
    </div>
  );
};
