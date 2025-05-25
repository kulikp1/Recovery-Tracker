import React, { useEffect, useState } from "react";
import styles from "./RecoveryPage.module.css";
import CalendarSidebar from "../CalendarSidebar/CalendarSidebar";
import Header from "../Header/Header";

const RecoveryPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
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

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  const currentDayTasks = tasks.filter(
    (task) => task.date === formattedSelectedDate
  );

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
