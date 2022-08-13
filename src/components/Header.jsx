import { useDish } from "../context/dishContext";
import styles from "../styles/Header.module.css";
import nophoto from "../nophoto.jpeg";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/authContext";

export const Header = ({ children }) => {
  const setToggle = useDish().toggle[1];
  const [toggleTemp, setToogleTemp] = useDish().toggleTemp;
  const [beUser] = useAuth().beUser;

  return (
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
          <h4>{children}</h4>
        </div>

        <div>
          <span>{beUser.name || beUser.email}</span>
          <img src={nophoto} alt="" />
        </div>
      </div>
    </header>
  );
};
