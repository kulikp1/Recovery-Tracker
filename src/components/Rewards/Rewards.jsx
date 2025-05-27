import React, { useEffect, useState } from "react";
import styles from "./Rewards.module.css";
import Header from "../Header/Header";
import {
  Medal,
  Rocket,
  Activity,
  Target,
  Trophy,
  ShieldCheck,
  Crown,
} from "lucide-react";

const rewards = [
  {
    days: 1,
    title: "Початок є!",
    icon: Medal,
    description: "Перший крок зроблено! Твоя подорож тільки починається.",
  },
  {
    days: 3,
    title: "Розгін!",
    icon: Rocket,
    description: "Ти набираєш обертів! Продовжуй у тому ж дусі.",
  },
  {
    days: 5,
    title: "Тримай темп!",
    icon: Activity,
    description: "Ти показуєш сталеву витримку. Так тримати!",
  },
  {
    days: 7,
    title: "Ціль близько!",
    icon: Target,
    description: "Цілий тиждень наполегливості – чудовий результат!",
  },
  {
    days: 14,
    title: "Наполегливість!",
    icon: Trophy,
    description: "Два тижні фокусу! Ти справжній приклад послідовності.",
  },
  {
    days: 21,
    title: "⚡Незламність!",
    icon: ShieldCheck,
    description: "Ти здолав 21 день! Це вже звичка!",
  },
  {
    days: 30,
    title: "Легенда!",
    icon: Crown,
    description: "Цілий місяць послідовності — ти легенда Recovery!",
  },
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
            {earnedRewards.length > 0 ? (
              <ul className={styles.rewardsList}>
                {earnedRewards.map((reward) => (
                  <li key={reward.days} className={styles.rewardItem}>
                    <div className={styles.rewardHeader}>
                      <reward.icon className={styles.rewardIcon} />
                      <span className={styles.label}>
                        <strong>{reward.days} днів:</strong> {reward.title}
                      </span>
                    </div>
                    <p className={styles.rewardDescription}>
                      {reward.description}
                    </p>
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
