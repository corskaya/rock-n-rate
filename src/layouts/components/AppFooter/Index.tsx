import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

const AppFooter: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.footerFix}>
      <div className={styles.footerContainer}>
        <div>Rock'n Rate © - 2024</div>
        <div className={styles.separator}>-</div>
        <Link className={styles.footerLink} to='/about'>
          {t("About")}
        </Link>
        <div className={styles.separator}>-</div>
        <Link className={styles.footerLink} to='/language'>
          {t("Language")}
        </Link>
      </div>
    </div>
  );
}

export default AppFooter;
