import React, { useEffect, useState } from "react";
import styles from "./AnalyticsPage.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Header from "../Header/Header";

const AnalyticsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
    if (!userId) return;

    fetch("https://683264f0c3f2222a8cb22fc0.mockapi.io/taskforusers")
      .then((res) => res.json())
      .then((tasks) => {
        const userTasks = tasks.filter(
          (task) => task.userId === String(userId)
        );

        const dailyStats = {};

        userTasks.forEach((task) => {
          const date = task.date;
          if (!date) return;

          if (!dailyStats[date]) {
            dailyStats[date] = { date, completed: 0, total: 0 };
          }

          dailyStats[date].total += 1;
          if (task.completed) {
            dailyStats[date].completed += 1;
          }
        });

        const result = Object.values(dailyStats).map((d) => ({
          date: d.date,
          performance: Math.round((d.completed / d.total) * 100),
        }));

        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(result);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />

        <div className={styles.left}>
          <h1 className={styles.title}>Слідкуй за продуктивністю</h1>
          <p className={styles.description}>
            Графік продуктивності на основі виконаних завдань.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis
                  stroke="#fff"
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#a259ff"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
