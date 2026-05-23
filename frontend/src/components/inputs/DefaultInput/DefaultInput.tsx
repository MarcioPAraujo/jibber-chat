"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./defaultInput.module.css";

interface DefaultInputProps {
  id: string;
  placeholder: string;
  label?: string;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

const DefaultInput: React.FC<DefaultInputProps> = ({
  id,
  placeholder,
  label,
  errorMessage,
  register,
  value,
  onChange,
  disabled = false,
  readOnly = false,
}) => {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={`${styles.input} ${errorMessage ? styles.error : ""}`}
        id={id}
        placeholder={placeholder}
        {...register}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
export default DefaultInput;
