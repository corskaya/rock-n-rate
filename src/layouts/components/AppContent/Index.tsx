import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";

const AppContent: React.FC = () => {
  return (
    <div className={styles.contentContainer}>
      <Outlet />
    </div>
  );
}

export default AppContent;
