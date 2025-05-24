import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import logo from "../../../assets/logo.png";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Паролі не співпадають");
      return;
    }

    try {
      const res = await axios.post(
        "https://68321216c3f2222a8cb15cdb.mockapi.io/users",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      console.log("Успішно зареєстровано:", res.data);
      navigate("/recoveryTracker");
    } catch (error) {
      console.error("Помилка реєстрації:", error.message);
      alert("Сталася помилка. Спробуйте ще раз.");
    }
  };

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

      <form onSubmit={handleSubmit} className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
        <h2 className={styles.signup}>Реєстрація</h2>
        <input
          type="text"
          name="name"
          placeholder="Ім’я"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Повторіть пароль"
          value={form.confirmPassword}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submit}>
          Зареєструватися
        </button>
        <p className={styles.loginHint}>
          Вже маєш акаунт? <Link to="/">Увійти</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
