import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';
import { ReactNode } from 'react';

type Props = {
  page?: ReactNode;
}

const AppContent: React.FC<Props> = ({ page }) => {
  return (
    <div className={styles.contentContainer}>
      {page}
      <Outlet />
    </div>
  );
}

export default AppContent;
