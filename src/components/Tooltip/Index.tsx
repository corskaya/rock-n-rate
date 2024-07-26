import { ReactNode, useRef, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  content: string;
  children: ReactNode;
};

const Tooltip: React.FC<Props> = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const timeoutRef = useRef<number | undefined>();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && <div className={styles.tooltip}>{content}</div>}
    </div>
  );
};

export default Tooltip;
