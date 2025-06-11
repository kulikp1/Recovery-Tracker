/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/logo.png";
import { Home, BarChart2, Info, LogOut, Gift } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSaveName = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = { ...user, name: editedName };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("userUpdated"));

    setUserName(editedName);
    setEditModalOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logo} alt="Recovery Logo" className={styles.logo} />
        <span className={styles.appName}>Recovery</span>
      </div>
      <nav className={styles.nav}>
        <Link to="/recoveryTracker" className={styles.navLink}>
          <Home className={styles.icon} />
          <span>Головна</span>
        </Link>
        <Link to="/stats" className={styles.navLink}>
          <BarChart2 className={styles.icon} />
          <span>Статистика</span>
        </Link>
        <Link to="/rewards" className={styles.navLink}>
          <Gift className={styles.icon} />
          <span>Винагороди</span>
        </Link>
        <button
          onClick={() => setEditModalOpen(true)}
          className={styles.navLink}
        >
          <Info className={styles.icon} />
          <span>Змінити ім’я</span>
        </button>
        <button onClick={handleLogout} className={styles.navLink}>
          <LogOut className={styles.icon} />
          <span>LogOut</span>
        </button>
      </nav>

      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Змінити ім’я</h3>
            <input
              className={`${styles.input} ${styles.editInput}`}
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Нове ім’я"
            />
            <div className={styles.modalActions}>
              <button className={styles.deleteBtn} onClick={handleSaveName}>
                Зберегти
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setEditModalOpen(false)}
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
