import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>🧠 Recovery</div>
        <h1 className={styles.title}>Welcome!</h1>
        <p className={styles.description}>
          Віднови емоційний баланс, позбудься вигоряння та поверни контроль над
          життям.
        </p>
        <Link to="/program" className={styles.learnMore}>
          Дізнатися більше
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.signin}>Увійти</h2>
          <input type="text" placeholder="Email" className={styles.input} />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
          />
          <Link to="/dashboard" className={styles.submit}>
            Увійти
          </Link>

          <p className={styles.registerHint}>
            Не маєш акаунта? <Link to="/signup">Зареєструйся</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
