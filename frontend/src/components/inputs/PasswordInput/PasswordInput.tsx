import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { useState } from "react";
import styles from "./passwordInput.module.css";

interface DefaultInputProps {
  id: string;
  placeholder: string;
  label?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  register?: UseFormRegisterReturn;
}
const PasswordInput: React.FC<DefaultInputProps> = ({
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${styles.input} ${errorMessage ? styles.error : ""}`}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        {...register}
      />
      {showPassword && (
        <button
          className={styles.eyeButton}
          type="button"
          onClick={() => setShowPassword(false)}
          aria-label="Esconder senha"
        >
          <LuEyeClosed />
        </button>
      )}
      {!showPassword && (
        <button
          className={styles.eyeButton}
          type="button"
          onClick={() => setShowPassword(true)}
          aria-label="Mostrar senha"
        >
          <LuEye />
        </button>
      )}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
export default PasswordInput;
