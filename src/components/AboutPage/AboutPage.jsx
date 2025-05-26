import React from "react";
import styles from "./AboutPage.module.css"; // Створимо окремий CSS модуль для цієї сторінки
import logo from "../../../assets/logo.png";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      {/* Декоративні фігури */}
      <div className={`${styles.shape} ${styles.shape1}`} />
      <div className={`${styles.shape} ${styles.shape2}`} />
      <div className={`${styles.shape} ${styles.shape3}`} />
      <div className={`${styles.line} ${styles.line1}`} />
      <div className={`${styles.line} ${styles.line2}`} />
      <div className={`${styles.wavy} ${styles.wavy1}`} />
      <div className={`${styles.wavy} ${styles.wavy2}`} />

      <div className={styles.left}>
        <img src={logo} alt="Recovery Logo" className={styles.logoImage} />
        <h1 className={styles.title}>Про Recovery</h1>
        <p className={styles.description}>
          Recovery — це сучасний трекер відновлення звичок, спрямований на
          підтримку вашого особистого прогресу та ментального здоров’я. Програма
          дозволяє вести облік щоденних досягнень, аналізувати статистику та
          повертатися до завдань, коли це потрібно.
        </p>
        <p className={styles.description}>
          Ми віримо, що відновлення — це процес, і зручні цифрові інструменти
          можуть стати вашим союзником на цьому шляху.
        </p>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className={styles.learnMore}
        >
          Дізнатись більше
        </a>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.signin}>Recovery Tracker</h2>
          <p style={{ textAlign: "center", color: "#d1c4e9" }}>
            Цей застосунок створено з турботою про користувача, використовуючи
            сучасні технології: React, локальне зберігання, кастомну анімацію та
            інтеграцію з бекендом.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
