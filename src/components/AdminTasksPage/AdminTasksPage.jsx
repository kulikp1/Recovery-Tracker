/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./AdminTasksPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";

const TASKS_API = "https://68321216c3f2222a8cb15cdb.mockapi.io/tasks";
const MILITARY_TASKS_API =
  "https://683264f0c3f2222a8cb22fc0.mockapi.io/militaryTask";

const AdminTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("main");

  const currentAPI = activeTab === "main" ? TASKS_API : MILITARY_TASKS_API;

  const fetchTasks = async () => {
    try {
      const res = await fetch(currentAPI);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      toast.error("Помилка завантаження завдань");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    setTitle("");
    setEditingId(null);
  }, [activeTab]);

  const handleAddOrEdit = async () => {
    if (!title.trim()) {
      toast.error("Введіть назву завдання");
      return;
    }

    try {
      if (editingId) {
        await fetch(`${currentAPI}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        });
        toast.success("Завдання оновлено");
        setEditingId(null);
      } else {
        await fetch(currentAPI, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, completed: false }),
        });
        toast.success("Завдання додано");
      }
      setTitle("");
      fetchTasks();
    } catch (err) {
      toast.error("Помилка при збереженні");
      console.log(err);
    }
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await fetch(`${currentAPI}/${taskToDelete}`, { method: "DELETE" });
      toast.success("Завдання видалено");
      fetchTasks();
    } catch (err) {
      toast.error("Помилка при видаленні");
      console.log(err);
    } finally {
      setShowModal(false);
      setTaskToDelete(null);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingId(task.id);
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={`${styles.shape} ${styles.shape1}`}></div>
      <div className={`${styles.shape} ${styles.shape2}`}></div>
      <div className={`${styles.shape} ${styles.shape3}`}></div>
      <div className={`${styles.line} ${styles.line1}`}></div>
      <div className={`${styles.line} ${styles.line2}`}></div>
      <div className={`${styles.wavy} ${styles.wavy1}`}></div>
      <div className={`${styles.wavy} ${styles.wavy2}`}></div>

      <div className={styles.left}>
        <h1 className={styles.title}>Завдання</h1>
        <p className={styles.description}>
          Тут ви можете керувати списком завдань: додавати, редагувати або
          видаляти їх.
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => setActiveTab("main")}
            style={{
              marginRight: "10px",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: activeTab === "main" ? "bold" : "normal",
              background:
                activeTab === "main"
                  ? "linear-gradient(to right, #ff416c, #ff4b2b)"
                  : "rgba(255, 255, 255, 0.1)",
              color: activeTab === "main" ? "white" : "#ccc",
            }}
          >
            Основні завдання
          </button>
          <button
            onClick={() => setActiveTab("military")}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: activeTab === "military" ? "bold" : "normal",
              background:
                activeTab === "military"
                  ? "linear-gradient(to right, #ff416c, #ff4b2b)"
                  : "rgba(255, 255, 255, 0.1)",
              color: activeTab === "military" ? "white" : "#ccc",
            }}
          >
            Військові завдання
          </button>
        </div>

        <div className={styles.card}>
          <input
            type="text"
            placeholder="Введіть нове завдання"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAddOrEdit} className={styles.submit}>
            {editingId ? "Оновити завдання" : "Додати завдання"}
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.signin}>
            {activeTab === "main" ? "Основні завдання" : "Військові завдання"}
          </h2>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li key={task.id} className={styles.taskItem}>
                <span>{task.title}</span>
                <div>
                  <button
                    className={styles.iconBtn}
                    onClick={() => handleEdit(task)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    onClick={() => confirmDelete(task.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
            {tasks.length === 0 && <li>Завдань немає</li>}
          </ul>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Підтвердження</h3>
            <p>Ви дійсно хочете видалити це завдання?</p>
            <div className={styles.modalActions}>
              <button
                onClick={handleDeleteConfirmed}
                className={styles.deleteBtn}
              >
                Так, видалити
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelBtn}
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTasksPage;
