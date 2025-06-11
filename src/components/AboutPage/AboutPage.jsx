import React from "react";
import styles from "./AboutPage.module.css";
import { Cpu, Database, Sparkles, Server, ShieldCheck } from "lucide-react";
import logo from "../../../assets/logo.png";
import Header from "../Header/Header";

const AboutPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />
        <div className={`${styles.shape} ${styles.shape3}`} />
        <div className={`${styles.line} ${styles.line1}`} />
        <div className={`${styles.line} ${styles.line2}`} />
        <div className={`${styles.wavy} ${styles.wavy1}`} />
        <div className={`${styles.wavy} ${styles.wavy2}`} />

        <div className={styles.left}>
          <img src={logo} alt="Recovery Logo" className={styles.logoImage} />
          <h1 className={styles.title}>Про застосунок</h1>
          <p className={styles.description}>
            <strong>Recovery Tracker</strong> — це інноваційний застосунок,
            створений для підтримки <strong>військових</strong> та{" "}
            <strong>цивільних</strong> користувачів.
            <br />
            <br />
            <span className={styles.subBlock}>
              <strong>Військовим</strong> він допомагає відслідковувати
              емоційний стан, самопочуття й адаптацію в умовах стресу. Це —
              інструмент рефлексії та поступового відновлення.
            </span>
            <br />
            <span className={styles.subBlock}>
              <strong>Цивільним</strong> — слугує у щоденній рутині як трекер
              здорових звичок, емоційного балансу чи підтримка після хвороб і
              навантажень.
            </span>
          </p>
        </div>

        {/* Права частина — переваги */}
        <div className={styles.right}>
          <ul className={styles.features}>
            <li>
              <Cpu className={styles.icon} />
              <span>
                <strong>React-інтерфейс</strong>
                <br />
                Швидкий та сучасний користувацький досвід
              </span>
            </li>
            <li>
              <Database className={styles.icon} />
              <span>
                <strong>Локальне зберігання</strong>
                <br />
                Доступ до даних навіть без інтернету
              </span>
            </li>
            <li>
              <Sparkles className={styles.icon} />
              <span>
                <strong>Кастомна анімація</strong>
                <br />
                Плавність і приємна взаємодія
              </span>
            </li>
            <li>
              <Server className={styles.icon} />
              <span>
                <strong>Синхронізація з бекендом</strong>
                <br />
                Зберігання та відновлення даних користувача
              </span>
            </li>
            <li>
              <ShieldCheck className={styles.icon} />
              <span>
                <strong>Архітектура безпеки</strong>
                <br />
                Захист і конфіденційність даних
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
