// import AppHeader from './components/AppHeader/Index';
import AppContent from './components/AppContent/Index.tsx';
import AppFooter from './components/AppFooter/Index.tsx';
import styles from './Layout.module.css';
import { useLocation } from 'react-router-dom';
// import { Toast } from '../components';

function Layout() {
  const routesWithBackgroundImage = [
    '',
    'login',
    'register',
    'artist',
    'album',
    'song',
  ];
  const { pathname } = useLocation();
  const pageName = pathname.split('/')[1];

  return (
    <div
      className={
        routesWithBackgroundImage.includes(pageName)
          ? styles.layoutContainer
          : ''
      }
    >
      <div>
        {/* <AppHeader /> */}
      </div>
      <div>
        <AppContent />
      </div>
      <div>
        <AppFooter />
      </div>
      {/* <Toast /> */}
    </div>
  );
}

export default Layout;
