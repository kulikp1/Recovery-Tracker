import React from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import logo from "../../../assets/logo.png";

const SignupPage = () => {
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
        <h2 className={styles.signup}>Реєстрація</h2>
        <input type="text" placeholder="Ім’я" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Пароль" className={styles.input} />
        <input
          type="password"
          placeholder="Повторіть пароль"
          className={styles.input}
        />
        <Link to="/dashboard" className={styles.submit}>
          Зареєструватися
        </Link>
        <p className={styles.loginHint}>
          Вже маєш акаунт? <Link to="/">Увійти</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
