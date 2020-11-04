import React from "react";

import styles from "../../styles/Header.module.css";
import logo from "../../public/logo.png";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.headerTitle}>Keyper</h1>
    </div>
  );
}

export default Header;
