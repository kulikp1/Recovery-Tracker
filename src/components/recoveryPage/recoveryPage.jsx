import React, { useEffect, useState, useMemo } from "react";
import styles from "./RecoveryPage.module.css";

const RecoveryPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  useEffect(() => {
    fetch("https://68321216c3f2222a8cb15cdb.mockapi.io/tasks")
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

  // Розбивка задач на дні по 3 шт
  const taskChunks = useMemo(() => {
    const result = [];
    for (let i = 0; i < tasks.length; i += 3) {
      result.push(tasks.slice(i, i + 3));
    }
    return result;
  }, [tasks]);

  // Мітки днів
  const dayLabels = useMemo(() => {
    const extraDaysCount = Math.max(0, taskChunks.length - 3);
    const extraLabels = Array(extraDaysCount)
      .fill("")
      .map((_, i) => `День ${i + 4}`);
    return ["Сьогодні", "Завтра", "Післязавтра", ...extraLabels];
  }, [taskChunks.length]);

  const currentDayTasks = taskChunks[selectedDayIndex] || [];
  const completedCount = currentDayTasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className={styles.container}>
      <div className={styles.shapes}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />
        <div className={`${styles.shape} ${styles.shape3}`} />
        <div className={`${styles.line} ${styles.line1}`} />
        <div className={`${styles.line} ${styles.line2}`} />
        <div className={`${styles.wavy} ${styles.wavy1}`} />
        <div className={`${styles.wavy} ${styles.wavy2}`} />
      </div>

      <div className={styles.pageContent}>
        <h1 className={styles.title}>Привіт, Олено!</h1>
        <p className={styles.subtitle}>Твої завдання на день</p>

        {/* Перемикач днів */}
        <div className={styles.daySwitcher}>
          {dayLabels.map((label, idx) => (
            <button
              key={idx}
              className={`${styles.dayButton} ${
                selectedDayIndex === idx ? styles.active : ""
              }`}
              onClick={() => setSelectedDayIndex(idx)}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Завантаження завдань...</p>
        ) : (
          <>
            {currentDayTasks.length === 0 ? (
              <p>Немає завдань на цей день.</p>
            ) : (
              <>
                <div className={styles.taskGrid}>
                  {currentDayTasks.map((task) => (
                    <div key={task.id} className={styles.taskCard}>
                      <label>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          readOnly
                          className={styles.checkbox}
                        />
                        <span className={task.completed ? styles.taskDone : ""}>
                          {task.title}
                        </span>
                      </label>
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
          </>
        )}
      </div>
    </div>
  );
};

export default RecoveryPage;
