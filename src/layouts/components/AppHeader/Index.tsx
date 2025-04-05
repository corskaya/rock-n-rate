import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Search as SearchIcon, RecordVoiceOver, Album, MusicNote, Person } from '@mui/icons-material';
import logo from "../../../assets/logo.png";
import { RootState } from "../../../store";
import Search from "./partials/Search";
import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

const AppHeader: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const token = useSelector((state: RootState) => state.login.token);
  const user = useSelector((state: RootState) => state.login.user);

  const primaryNavLinks = [
    {
      label: t("Login"),
      path: "/login",
    },
    {
      label: t("Register"),
      path: "/register",
    },
  ];

  const secondaryNavLinks = [
    {
      label: t("Home"),
      path: "/",
    },
    {
      label: t("Artists"),
      path: "/artists",
    },
    {
      label: t("Albums"),
      path: "/albums",
    },
    {
      label: t("Songs"),
      path: "/songs",
    },
  ];

  const navIcons = [
    {
      icon: <SearchIcon id={styles.searchIcon} />,
      path: "/search",
    },
    {
      icon: <RecordVoiceOver id={styles.artistIcon} />,
      path: "/artists",
    },
    {
      icon: <Album id={styles.albumIcon} />,
      path: "/albums",
    },
    {
      icon: <MusicNote id={styles.songIcon} />,
      path: "/songs",
    },
    {
      icon: <Person id={styles.userIcon} />,
      path: "/user",
    },
  ];

  return (
    <div className={styles.headerFix}>
      <div className={styles.headerContainer}>
        <div className={styles.leftPart}>
          <Link className={styles.logoContainer} to="/">
            <img className={styles.logo} src={logo} alt="Logo" />
          </Link>
          <h4 className={styles.description}>
            {t("Rate your song, album and artist.")}
          </h4>
        </div>
        <div className={styles.rightPart}>
          <Search />
          <nav className={styles.navContainerWeb}>
            {secondaryNavLinks.map((navLink) => (
              <Link
                key={navLink.path}
                className={`${styles.navLink} ${
                  location.pathname === navLink.path
                    ? styles.navLinkSelected
                    : styles.navLinkSecondary
                }`}
                to={navLink.path}
              >
                {navLink.label}
              </Link>
            ))}
            {!token && (
              <div>
                {primaryNavLinks.map((navLink, index) => (
                  <Fragment key={navLink.path}>
                    <Link
                      className={`${styles.navLink} ${
                        location.pathname === navLink.path
                          ? styles.navLinkSelected
                          : styles.navLinkPrimary
                      }`}
                      to={navLink.path}
                    >
                      {navLink.label}
                    </Link>
                    {index !== primaryNavLinks.length - 1 && (
                      <span
                        className={`${styles.navLink} ${styles.navLinkSecondary}`}
                      >
                        |
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
            {token && user && (
              <Link
                className={`${styles.navLink} ${
                  location.pathname === `/user/${user.username}`
                    ? styles.navLinkSelected
                    : styles.navLinkPrimary
                } ${styles.profileContainer}`}
                to={`/user/${user.username}`}
              >
                <UserOutlined style={{ fontSize: 16 }} />
                <div>{user.username}</div>
              </Link>
            )}
          </nav>
          <nav className={styles.navContainerMobile}>
            {navIcons.map((navIcon) => (
              <Link
                key={navIcon.path}
                className={`${styles.navLink} ${
                  location.pathname === navIcon.path
                    ? styles.navLinkSelected
                    : styles.navLinkPrimary
                }`}
                to={
                  navIcon.path === "/user"
                    ? token && user
                      ? `/user/${user.username}`
                      : "/login"
                    : navIcon.path
                }
              >
                {navIcon.icon}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
