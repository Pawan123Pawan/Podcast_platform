import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={styles.navbar}>
      <div className={styles.container}></div>
      <div className={styles.link}>
        <NavLink to="/" className={currentPath === "/" ? styles.active : ""}>
          SignUp
        </NavLink>
        <NavLink
          to="/podcasts"
          className={currentPath === "/podcasts" ? styles.active : ""}
        >
          Podcast
        </NavLink>
        <NavLink
          to="/create_podcast"
          className={currentPath === "/create_podcast" ? styles.active : ""}
        >
          Start A Podcast
        </NavLink>
        <NavLink
          to="/profile"
          className={currentPath === "/profile" ? styles.active : ""}
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
