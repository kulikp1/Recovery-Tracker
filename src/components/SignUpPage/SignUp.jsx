import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import logo from "../../../assets/logo.png";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error("Паролі не співпадають");
      return;
    }

    try {
      // Перевірка чи такий email вже існує
      const response = await axios.get(
        "https://68321216c3f2222a8cb15cdb.mockapi.io/users"
      );
      const existingUser = response.data.find(
        (user) => user.email === form.email
      );

      if (existingUser) {
        toast.error("Користувач з таким email вже існує");
        return;
      }

      const hashedPassword = CryptoJS.SHA256(form.password).toString();

      await axios.post("https://68321216c3f2222a8cb15cdb.mockapi.io/users", {
        name: form.name,
        email: form.email,
        password: hashedPassword,
      });

      toast.success("Реєстрація успішна! Перенаправлення...");

      setTimeout(() => {
        navigate("/recoveryTracker");
      }, 2000);
    } catch (error) {
      console.error("Помилка:", error.message);
      toast.error("Щось пішло не так. Спробуйте ще раз.");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />

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
