"use client";

import useMonthCalendar, { ICalendarDay } from "@/hook/useMonthCalendar";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "@/hook/useClickOutside";
import styles from "./calendar.module.css";

interface ICalendar {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  onChange?: (date: Date | null) => void;
  calendarClassName?: string;
}

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const Calendar: React.FC<ICalendar> = ({
  isOpen,
  date,
  onClose,
  onChange,
  calendarClassName,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarDate, setCalendarDate] = useState<Date | null>(date);
  const {
    year,
    month,
    calendarDaysDate,
    handleNextYear,
    handlePrevYear,
    handlePrevMonth,
    handleNextMonth,
  } = useMonthCalendar(calendarDate, setCalendarDate);

  useClickOutside({
    ref: calendarRef,
    onClickOutside: onClose,
  });
  useEffect(() => {
    setCalendarDate(date);
  }, [date]);

  const getDayClassName = (day: ICalendarDay) => {
    let className = "";
    if (day.isToday) className += "today ";
    if (day.dayOfWeek === 0 || day.dayOfWeek === 6) className += "weekend ";
    if (!day.isCurrentMonth) className += "not-current-month ";
    if (day.isSelected) className += "selected ";
    return className.trim();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={calendarRef}
      className={`calendar ${calendarClassName || ""} ${styles.calendar}`}
    >
      <div className={styles.header}>
        <div className={styles.buttonsContainer}>
          <button
            type="button"
            onClick={handlePrevYear}
            className={styles.navigationButton}
          >
            <FaAnglesLeft />
          </button>
          <button
            type="button"
            onClick={handlePrevMonth}
            className={styles.navigationButton}
          >
            <FaAngleLeft />
          </button>
        </div>
        <div className={styles.currentMonth}>
          {months[month]} {year}
        </div>
        <div className={styles.buttonsContainer}>
          <button
            type="button"
            onClick={handleNextMonth}
            className={styles.navigationButton}
          >
            <FaAngleRight />
          </button>
          <button
            type="button"
            onClick={handleNextYear}
            className={styles.navigationButton}
          >
            <FaAnglesRight />
          </button>
        </div>
      </div>
      <div className={styles.daysContainer}>
        {week.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
        {calendarDaysDate.map((day, idx) => (
          <button
            type="button"
            key={idx}
            disabled={!day.isCurrentMonth}
            className={`${getDayClassName(day)} ${styles.dayButton}`}
            onClick={() => {
              setCalendarDate(day.dayDate);
              onChange?.(day.dayDate);
              onClose();
            }}
          >
            {day.dayDate.getDate()}
          </button>
        ))}
      </div>
      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.todayButton}
          onClick={() => {
            const today = new Date();
            setCalendarDate(today);
            if (onChange) onChange(today);
            onClose();
          }}
        >
          Hoje
        </button>
      </div>
    </div>
  );
};
export default Calendar;
