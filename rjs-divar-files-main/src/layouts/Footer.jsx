import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className={styles.heart}>&hearts;</span> Develop By Behrad With
      </p>
    </footer>
  );
};

export default Footer;
