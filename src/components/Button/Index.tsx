import { ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  color?: "success" | "info";
} & React.ComponentPropsWithoutRef<"button">;

const Button: React.FC<Props> = ({ children, className, color = "success", ...rest }) => {
  return (
    <button
      className={`${styles.button} ${color === "info" ? styles.infoColor : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
