import styles from "./errorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p className={`${styles.message} ${!message ? styles.invisible : ""}`}>
      {message}
    </p>
  );
};
export default ErrorMessage;
