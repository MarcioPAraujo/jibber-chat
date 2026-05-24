import { format, isValid, parse } from "date-fns";
import { useState } from "react";
import Calendar from "@/components/Calendar/Calendar";
import { LuCalendar } from "react-icons/lu";
import dateMask from "@/utils/masks/dateMask";
import InputErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./dateInput.module.css";

interface IDateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (date: string) => void;
  isRquired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  calendarClassName?: string;
  errorMessage?: string;
}
const DateInput: React.FC<IDateInputProps> = ({
  id,
  label,
  placeholder,
  value,
  readonly = false,
  isRquired = false,
  disabled = false,
  calendarClassName,
  errorMessage,
  onChange,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const onChangeDate = (date: Date | null) => {
    if (!date) return;
    const formattedDate = format(date, "dd/MM/yyyy");
    onChange(formattedDate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedDate = dateMask(inputValue);
    onChange(parsedDate);
  };

  const getDateValue = () => {
    if (!value) return null;
    if (value.length !== 10) return null;
    const parsedDate = parse(value, "dd/MM/yyyy", new Date());
    if (isValid(parsedDate)) {
      return parsedDate;
    }
    return null;
  };

  const readOnlyClass = readonly ? "readonly" : "";
  const disabledClass = disabled ? "disabled" : "";

  const combinedClass = `${readOnlyClass} ${disabledClass}`.trim();
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <div className={styles.label}>
          {isRquired && <span>*&nbsp;</span>}
          {label}
        </div>
        <div className={`${combinedClass} ${styles.inputWrapper}`}>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            readOnly={readonly}
            className={styles.input}
          />
          <abbr title="clique para abrir o calendário">
            <button
              type="button"
              id={id}
              disabled={disabled}
              className={`${combinedClass} ${styles.calendarButton}`}
              onClick={() => {
                if (!readonly && !disabled) {
                  setShowCalendar(!showCalendar);
                }
              }}
            >
              <LuCalendar />
            </button>
          </abbr>
        </div>
      </div>
      <InputErrorMessage message={errorMessage} />
      {!readonly && !disabled && (
        <Calendar
          isOpen={showCalendar}
          date={getDateValue()}
          onClose={() => setShowCalendar(false)}
          onChange={onChangeDate}
          calendarClassName={calendarClassName}
        />
      )}
    </div>
  );
};
export default DateInput;
