import styles from "../styles/Sidebar.module.css";
import { BiChevronRight, BiLogOut, BiSun, BiMoon } from "react-icons/bi";
import { RiDashboardLine, RiUser3Line } from "react-icons/ri";
import { BsBoxSeam, BsBarChartLine } from "react-icons/bs";
import { GrUnorderedList } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDish } from "../context/dishContext";
import logoIcon from "../img/logoIcon.png";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";

export const Sidebar = () => {
  const [modeSwitch, setModeSwitch] = useState(false);

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

  const logOut = useAuth().logOut;
  const setBeUser = useAuth().beUser[1];

  const cerrarSesion = async () => {
    await logOut()
      .then((res) => {
        setBeUser(null);
        Toast.fire({
          icon: "success",
          title: `Ha cerrado sesión`
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [toggle, setToggle] = useDish().toggle;
  const [toggleTemp, setToogleTemp] = useDish().toggleTemp;

  const classModeSwitch = modeSwitch
    ? `${styles.sidebarContainer} ${styles.dark}`
    : styles.sidebarContainer;

  const classToggle =
    toggle || false
      ? `${styles.sidebar} ${styles.close}`
      : toggleTemp
      ? `${styles.sidebar} ${styles.extended}`
      : styles.sidebar;

  return (
    <div className={classModeSwitch}>
      <nav className={classToggle}>
        <header>
          <div className={styles.image_text}>
            <span className={styles.image}>
              <img src={logoIcon} alt="" />
            </span>

            <div className={`${styles.text} ${styles.logo_text}`}>
              <span className={styles.name}>IziFood</span>
              <span className={styles.profession}>¡Más sabor!</span>
            </div>
          </div>

          <BiChevronRight
            size={25}
            className={styles.toggle}
            onClick={() => setToggle(!toggle)}
          />
        </header>

        <div className={styles.menu_bar}>
          <div className={styles.menu}>
            <li className={styles.search_box}>
              <AiOutlineSearch className={styles.icon} />
              <input type="text" placeholder="Buscar..." />
            </li>

            <ul className={styles.menu_links}>
              <li
                className={styles.nav_link}
                onClick={() => setToogleTemp(false)}
              >
                <Link to="/admin/dashboard" className={styles.link}>
                  <RiDashboardLine className={styles.icon} />
                  <span className={`${styles.text} ${styles.nav_text}`}>
                    Dashboard
                  </span>
                </Link>
              </li>

              <li
                className={styles.nav_link}
                onClick={() => setToogleTemp(false)}
              >
                <Link to="/admin/users" className={styles.link}>
                  <RiUser3Line className={styles.icon} />
                  <span className={`${styles.text} ${styles.nav_text}`}>
                    Usuarios
                  </span>
                </Link>
              </li>

              <li
                className={styles.nav_link}
                onClick={() => setToogleTemp(false)}
              >
                <Link to="/admin/products" className={styles.link}>
                  <BsBoxSeam className={styles.icon} />
                  <span className={`${styles.text} ${styles.nav_text}`}>
                    Productos
                  </span>
                </Link>
              </li>

              <li
                className={styles.nav_link}
                onClick={() => setToogleTemp(false)}
              >
                <Link to="/admin/analytics" className={styles.link}>
                  <BsBarChartLine className={styles.icon} />
                  <span className={`${styles.text} ${styles.nav_text}`}>
                    Analíticas
                  </span>
                </Link>
              </li>

              <li
                className={styles.nav_link}
                onClick={() => setToogleTemp(false)}
              >
                <Link to="/admin/categories" className={styles.link}>
                  <GrUnorderedList className={styles.icon} />
                  <span className={`${styles.text} ${styles.nav_text}`}>
                    Categorías
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.bottom_content}>
            <li className="">
              <button className={styles.link} onClick={() => cerrarSesion()}>
                <BiLogOut className={styles.icon} />
                <span className={`${styles.text} ${styles.nav_text}`}>
                  Cerrar Sesión
                </span>
              </button>
            </li>

            <li className={styles.mode}>
              <div className={styles.sun_moon}>
                <BiMoon className={`${styles.icon} ${styles.moon}`} />
                <BiSun className={`${styles.icon} ${styles.sun}`} />
              </div>
              <span className={`${styles.mode_text} ${styles.text}`}>
                {modeSwitch ? "Light Mode" : "Dark Mode"}
              </span>

              <div
                className={styles.toggle_switch}
                onClick={() => setModeSwitch(!modeSwitch)}
              >
                <span className={styles.switch}></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};
