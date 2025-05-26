import React, { useEffect, useState, useRef } from "react";
import styles from "./RecoveryPage.module.css";
import CalendarSidebar from "../CalendarSidebar/CalendarSidebar";
import Header from "../Header/Header";

const RecoveryPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 🟡 Витягуємо user з localStorage, якщо є
  const user = React.useMemo(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  }, []);

  const currentUserId = user?.id || null;

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("https://683264f0c3f2222a8cb22fc0.mockapi.io/taskforusers")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
        setLoading(false);
      });
  }, []);

  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  // Якщо currentUserId немає, то масив пустий (щоб не рендерити чужі дані)
  const currentDayTasks = currentUserId
    ? tasks.filter(
        (task) =>
          task.userId === currentUserId &&
          isSameDay(new Date(task.date), selectedDate)
      )
    : [];

  const completedCount = currentDayTasks.filter((t) => t.completed).length;

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.pageContent}>
          <h1 className={styles.title}>Привіт, Олено!</h1>
          <p className={styles.subtitle}>
            Завдання на {selectedDate.toLocaleDateString("uk-UA")}
          </p>

          {loading ? (
            <p>Завантаження завдань...</p>
          ) : currentDayTasks.length === 0 ? (
            <p>Немає завдань на цей день.</p>
          ) : (
            <>
              <div className={styles.taskGrid}>
                {currentDayTasks.map((task) => (
                  <div key={task.id} className={styles.taskCard}>
                    <div className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        readOnly
                        className={styles.checkboxInput}
                      />
                      <span className={styles.customCheckbox}></span>
                    </div>
                    <span
                      className={`${styles.taskTitle} ${
                        task.completed ? styles.taskDone : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.progress}>
                Прогрес: {completedCount} / {currentDayTasks.length}
              </div>

              <div className={styles.badges}>
                <span className={styles.badge}>🟡 3 дні поспіль</span>
                <span className={styles.badge}>🟢 7 днів поспіль</span>
              </div>

              <button
                className={styles.programButton}
                onClick={() => (window.location.href = "/program")}
              >
                Перейти до програми
              </button>
            </>
          )}
        </div>

        <CalendarSidebar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          className={styles.calendarSidebar}
        />
      </div>
    </div>
  );
};

export default RecoveryPage;
