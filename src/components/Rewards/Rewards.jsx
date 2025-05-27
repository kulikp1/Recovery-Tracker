import React, { useEffect, useState } from "react";
import styles from "./Rewards.module.css";
import Header from "../Header/Header";

const rewards = [
  { days: 1, title: "🔥 Початок є!", emoji: "🏅" },
  { days: 3, title: "🚀 Розгін!", emoji: "🥉" },
  { days: 5, title: "💪 Тримай темп!", emoji: "🥈" },
  { days: 7, title: "🎯 Ціль близько!", emoji: "🥇" },
  { days: 14, title: "🏆 Наполегливість!", emoji: "🏆" },
  { days: 21, title: "⚡ Незламність!", emoji: "🎖️" },
  { days: 30, title: "👑 Легенда!", emoji: "👑" },
];

const RewardPage = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [earnedRewards, setEarnedRewards] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
    if (!userId) return;

    fetch("https://683264f0c3f2222a8cb22fc0.mockapi.io/taskforusers")
      .then((res) => res.json())
      .then((tasks) => {
        const userTasks = tasks
          .filter((task) => task.userId === String(userId) && task.completed)
          .map((task) => new Date(task.date).setHours(0, 0, 0, 0));

        const uniqueDates = [...new Set(userTasks)].sort((a, b) => a - b);

        let streak = 1;

        for (let i = uniqueDates.length - 1; i > 0; i--) {
          const diff =
            (uniqueDates[i] - uniqueDates[i - 1]) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            streak++;
          } else if (diff > 1) {
            break;
          }
        }

        setCurrentStreak(streak);

        const unlocked = rewards.filter((r) => streak >= r.days);
        setEarnedRewards(unlocked);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />

        <div className={styles.left}>
          <h1 className={styles.title}>Ваші винагороди</h1>
          <p className={styles.description}>
            Ви маєте <strong>{currentStreak}</strong> днів безперервного
            прогресу.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.rewardsContainer}>
            <h2 className={styles.title}>Досягнення</h2>
            {earnedRewards.length > 0 ? (
              <ul className={styles.rewardsList}>
                {earnedRewards.map((reward) => (
                  <li key={reward.days} className={styles.rewardItem}>
                    <span className={styles.emoji}>{reward.emoji}</span>
                    <span className={styles.label}>
                      <strong>{reward.days} днів:</strong> {reward.title}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noRewards}>
                Почніть виконувати завдання, щоб отримувати нагороди!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
