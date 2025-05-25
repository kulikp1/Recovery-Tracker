import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/logo.png";
import { BarChart2, Settings, LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="Recovery Logo" className={styles.logo} />
        <span className={styles.appName}>Recovery</span>
      </div>
      <nav className={styles.nav}>
        <Link to="/stats" className={styles.navLink}>
          <BarChart2 className={styles.icon} />
          <span>Статистика</span>
        </Link>
        <Link to="/settings" className={styles.navLink}>
          <Settings className={styles.icon} />
          <span>Налаштування</span>
        </Link>
        <button onClick={handleLogout} className={styles.navLink}>
          <LogOut className={styles.icon} />
          <span>LogOut</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
