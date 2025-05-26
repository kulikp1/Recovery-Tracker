import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    isMilitary: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: val }));
    if (type !== "checkbox") {
      const error = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const assignTasksToUser = async (userId, startDate) => {
    const taskUrl = form.isMilitary
      ? "https://683264f0c3f2222a8cb22fc0.mockapi.io/militaryTask"
      : "https://68321216c3f2222a8cb15cdb.mockapi.io/tasks";

    const taskRes = await fetch(taskUrl);
    const tasks = await taskRes.json();

    const formattedTasks = tasks.map((task, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + Math.floor(index / 3));

      return {
        userId,
        title: task.title,
        description: task.description,
        date: date.toISOString().split("T")[0],
        completed: false,
      };
    });

    for (const task of formattedTasks) {
      await fetch("https://683264f0c3f2222a8cb22fc0.mockapi.io/taskforusers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (let field in form) {
      if (field !== "isMilitary") {
        const error = validateField(field, form[field]);
        if (error) newErrors[field] = error;
      }
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
      let users = await res.json();
      if (!Array.isArray(users)) users = [];

      const existingUser = users.find(
        (u) => u.email?.toLowerCase() === form.email.toLowerCase()
      );
      if (existingUser) {
        toast.error("Користувач з таким email вже існує");
        return;
      }

      const hashedPassword = await bcrypt.hash(form.password, 10);
      const startDate = new Date().toISOString().split("T")[0];

      const createUserRes = await fetch(
        "https://68321216c3f2222a8cb15cdb.mockapi.io/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: hashedPassword,
            createdAt: startDate,
            isMilitary: form.isMilitary,
          }),
        }
      );

      const newUser = await createUserRes.json();

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        })
      );

      await assignTasksToUser(newUser.id, startDate);

      toast.success("Реєстрація успішна!");
      navigate("/recoveryTracker");
    } catch (error) {
      console.error(error);
      toast.error("Сталася помилка. Спробуйте ще раз.");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <div className={styles.backgroundShapes}></div>

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

        {/* 🟩 Чекбокс "Я військовий" */}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isMilitary"
            checked={form.isMilitary}
            onChange={handleChange}
            className={styles.checkbox}
          />
          Я військовий
        </label>

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
