import React from "react";
import styles from "./Header.module.css";
import logo from "../../../assets/logo.png"; // Замінити шлях до лого за потреби
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="Recovery Logo" className={styles.logo} />
        <span className={styles.appName}>Recovery</span>
      </div>
      <nav className={styles.nav}>
        <Link to="/stats" className={styles.navLink}>
          📊 Статистика
        </Link>
        <Link to="/settings" className={styles.navLink}>
          ⚙️ Налаштування
        </Link>
      </nav>
    </header>
  );
};

export default Header;
