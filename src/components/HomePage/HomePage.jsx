import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import logo from "../../../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Введіть email та пароль");
      return;
    }

    try {
      const res = await fetch(
        "https://68321216c3f2222a8cb15cdb.mockapi.io/users"
      );
      const users = await res.json();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        toast.error("Користувача не знайдено");
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        toast.error("Невірний пароль");
        return;
      }

      toast.success("Успішний вхід");

      navigate("/recoveryTracker");
    } catch (error) {
      console.error(error);
      toast.error("Помилка при вході. Спробуйте пізніше");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />

      <div className={`${styles.shape} ${styles.shape1}`}></div>
      <div className={`${styles.shape} ${styles.shape2}`}></div>
      <div className={`${styles.shape} ${styles.shape3}`}></div>
      <div className={`${styles.line} ${styles.line1}`}></div>
      <div className={`${styles.line} ${styles.line2}`}></div>
      <div className={`${styles.wavy} ${styles.wavy1}`}></div>
      <div className={`${styles.wavy} ${styles.wavy2}`}></div>

      <div className={styles.left}>
        <img
          src={logo}
          alt="Recovery Tracker Logo"
          className={styles.logoImage}
        />
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
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className={styles.submit}>
            Увійти
          </button>

          <p className={styles.registerHint}>
            Не маєш акаунта? <Link to="/signup">Зареєструйся</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
