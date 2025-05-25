import React, { useState, useEffect } from "react";
import styles from "./CalendarSidebar.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CalendarSidebar = ({ selectedDate, onSelectDate, className }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const totalCells = offset + daysInMonth;
  const rows = Math.ceil(totalCells / 7);

  const calendarCells = [];
  for (let i = 0; i < rows * 7; i++) {
    const dayNumber = i - offset + 1;
    if (i < offset || dayNumber > daysInMonth) {
      calendarCells.push(<div key={i} className={styles.empty} />);
    } else {
      const cellDate = new Date(currentYear, currentMonth, dayNumber);
      const isActive = cellDate.toDateString() === selectedDate.toDateString();
      calendarCells.push(
        <div
          key={i}
          className={`${styles.cell} ${isActive ? styles.active : ""}`}
          onClick={() => onSelectDate(cellDate)}
        >
          {dayNumber}
        </div>
      );
    }
  }

  return (
    <div className={`${styles.sidebar} ${className ?? ""}`}>
      <div
        className={styles.header}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <FaChevronLeft
          size={20}
          style={{ cursor: "pointer" }}
          onClick={handlePrevMonth}
          aria-label="Previous month"
        />
        <span className={styles.monthLabel}>
          {new Date(currentYear, currentMonth).toLocaleString("uk-UA", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <FaChevronRight
          size={20}
          style={{ cursor: "pointer" }}
          onClick={handleNextMonth}
          aria-label="Next month"
        />
      </div>

      <div className={styles.grid}>{calendarCells}</div>
    </div>
  );
};

export default CalendarSidebar;
