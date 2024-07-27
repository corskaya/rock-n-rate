import AppHeader from "./components/AppHeader/Index";
import AppContent from "./components/AppContent/Index";
import AppFooter from "./components/AppFooter/Index";
import { useLocation } from "react-router-dom";
import { Toast } from "../components";
import styles from "./Layout.module.css";

const Layout: React.FC = () => {
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
        <AppHeader />
      </div>
      <div>
        <AppContent />
      </div>
      <div>
        <AppFooter />
      </div>
      <Toast />
    </div>
  );
}

export default Layout;
