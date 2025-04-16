import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.statusCode}>404</h1>
        <h3 className={styles.heading}>{t("Oops! Page Not Found")}</h3>
        <p className={styles.explanation}>
          {t("The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.")}
        </p>
        <span className={styles.listHeading}>{t("What can you do?")}</span>
        <ul>
          <li>{t("Double-check the URL for typos.")}</li>
          <li>
            {t("Return to the ")}
            <Link className={styles.link} to="">
              {t("homepage")}
            </Link>
            .
          </li>
          <li>
            {t("If you believe this is an error, please ")}
            <Link className={styles.link} to="#">
              {t("contact us")}
            </Link>
            .
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
