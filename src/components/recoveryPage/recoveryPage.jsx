import React, { useEffect, useState, useRef } from "react";
import styles from "./RecoveryPage.module.css";
import CalendarSidebar from "../CalendarSidebar/CalendarSidebar";
import Header from "../Header/Header";

const RecoveryPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Отримання користувача з localStorage
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

  const currentDayTasks = currentUserId
    ? tasks.filter(
        (task) =>
          task.userId === currentUserId &&
          isSameDay(new Date(task.date), selectedDate)
      )
    : [];

  const completedCount = currentDayTasks.filter((t) => t.completed).length;

  const handleToggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      await fetch(
        `https://683264f0c3f2222a8cb22fc0.mockapi.io/taskforusers/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.pageContent}>
          <h1 className={styles.title}>
            Привіт, {user?.email?.split("@")[0] || "користувачу"}!
          </h1>
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
                    <label className={styles.customCheckboxWrapper}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                      />
                      <span className={styles.customCheckbox}></span>
                      <span
                        className={
                          task.completed ? styles.taskDone : styles.taskTitle
                        }
                      >
                        {task.title}
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              <div className={styles.progress}>
                Прогрес: {completedCount} / {currentDayTasks.length}
              </div>

              <button
                className={styles.programButton}
                onClick={() => (window.location.href = "/about")}
              >
                Про програму
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
