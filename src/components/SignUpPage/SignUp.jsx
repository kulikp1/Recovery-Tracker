import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import logo from "../../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bcrypt from "bcryptjs";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Введіть ім’я" : "";
      case "email":
        return !validateEmail(value) ? "Некоректний email" : "";
      case "password":
        return value.length < 6 ? "Мінімум 6 символів" : "";
      case "confirmPassword":
        return value !== form.password ? "Паролі не співпадають" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Перевірка у реальному часі
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Повна перевірка перед надсиланням
    const newErrors = {};
    for (let field in form) {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Виправте помилки у формі");
      return;
    }

    try {
      const res = await fetch(
        "https://68321216c3f2222a8cb15cdb.mockapi.io/users"
      );
      const users = await res.json();
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === form.email.toLowerCase()
      );

      if (existingUser) {
        toast.error("Користувач з таким email вже існує");
        return;
      }

      const hashedPassword = await bcrypt.hash(form.password, 10);

      await fetch("https://68321216c3f2222a8cb15cdb.mockapi.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: hashedPassword,
        }),
      });

      toast.success("Реєстрація успішна!");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Сталася помилка. Спробуйте ще раз.");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <div className={styles.backgroundShapes}>{/* Shapes... */}</div>

      <form onSubmit={handleSubmit} noValidate className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
        <h2 className={styles.signup}>Реєстрація</h2>

        <input
          type="text"
          name="name"
          placeholder="Ім’я"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.inputWithIcon}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Повторіть пароль"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.inputWithIcon}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}

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
