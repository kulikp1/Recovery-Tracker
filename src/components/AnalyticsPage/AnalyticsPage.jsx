import React from "react";
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

const data = [
  { date: "01.05", mood: 3 },
  { date: "03.05", mood: 4 },
  { date: "05.05", mood: 2 },
  { date: "07.05", mood: 5 },
  { date: "09.05", mood: 4 },
  { date: "11.05", mood: 3 },
];

const AnalyticsPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />

        <div className={styles.left}>
          <h1 className={styles.title}>Аналітика</h1>
          <p className={styles.description}>
            Слідкуй за своїм емоційним станом у часі. Графік нижче відображає
            динаміку настрою.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.chartCard}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" domain={[1, 5]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#ff7e5f"
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
