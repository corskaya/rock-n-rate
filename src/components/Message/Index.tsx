import { ReactNode } from "react";
import styles from "./styles.module.css";

type Props = {
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"span">;

const Message: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <span 
      className={`${styles.message} ${className}`} 
      {...rest}
    >
      {children}
    </span>
  );
}

export default Message;
