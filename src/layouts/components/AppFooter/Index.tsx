import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const AppFooter: React.FC = () => {
  return (
    <div className={styles.footerFix}>
      <div className={styles.footerContainer}>
        <div>Rock'n Rate © - 2024</div>
        <div className={styles.separator}>-</div>
        <Link className={styles.footerLink} to='/about'>
          About
        </Link>
      </div>
    </div>
  );
}

export default AppFooter;
