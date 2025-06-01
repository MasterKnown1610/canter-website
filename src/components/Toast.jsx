import { useEffect } from "react";
import "./Toast.scss";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__icon">{type === "success" ? "✓" : "✕"}</div>
      <div className="toast__message">{message}</div>
    </div>
  );
};

export default Toast;
