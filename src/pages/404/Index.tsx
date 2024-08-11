import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.statusCode}>404</h1>
        <h3 className={styles.heading}>Oops! Page Not Found</h3>
        <p className={styles.explanation}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <span className={styles.listHeading}>What can you do?</span>
        <ul>
          <li>Double-check the URL for typos.</li>
          <li>
            Return to the{" "}
            <Link className={styles.link} to="">
              homepage
            </Link>
            .
          </li>
          <li>
            If you believe this is an error, please{" "}
            <Link className={styles.link} to="#">
              contact us
            </Link>
            .
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
