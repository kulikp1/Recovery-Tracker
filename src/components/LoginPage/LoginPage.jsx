import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import logo from "../../../assets/logo.png";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.line} ${styles.line1}`}></div>
        <div className={`${styles.line} ${styles.line2}`}></div>
        <div className={`${styles.wavy} ${styles.wavy1}`}></div>
        <div className={`${styles.wavy} ${styles.wavy2}`}></div>
      </div>

      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
        <h2 className={styles.signin}>Увійти</h2>
        <input type="text" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Пароль" className={styles.input} />
        <Link to="/dashboard" className={styles.submit}>
          Увійти
        </Link>
        <p className={styles.registerHint}>
          Не маєш акаунта? <Link to="/signup">Зареєструйся</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
