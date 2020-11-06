import React from "react";

import styles from "../../styles/Header.module.css";
import logo from "../../public/logo.png";
import back from "../../public/back.svg";

function Header({ showBackBtn, backBtn }) {
  return (
    <div className={styles.headerContainer}>
      {showBackBtn && (
        <img
          src={back}
          alt="back"
          onClick={backBtn}
          className={styles.backBtn}
        />
      )}
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.headerTitle}>Keyper</h1>
    </div>
  );
}

export default Header;
