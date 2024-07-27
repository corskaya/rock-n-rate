import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  InboxOutlined,
  SearchOutlined,
  SoundOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.css";
import logo from "../../../assets/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const primaryNavLinks = [
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Register",
    path: "/register",
  },
];

const secondaryNavLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Artists",
    path: "/artists",
  },
  {
    label: "Albums",
    path: "/albums",
  },
  {
    label: "Songs",
    path: "/songs",
  },
];

const navIcons = [
  {
    icon: <TeamOutlined className={styles.navIcon} />,
    path: "/artists",
  },
  {
    icon: <InboxOutlined className={styles.navIcon} />,
    path: "/albums",
  },
  {
    icon: <SoundOutlined className={styles.navIcon} />,
    path: "/songs",
  },
  {
    icon: <UserOutlined className={styles.navIcon} />,
    path: "/user",
  },
];

const AppHeader: React.FC = () => {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.login.token);
  const user = useSelector((state: RootState) => state.login.user);

  return (
    <div className={styles.headerFix}>
      <div className={styles.headerContainer}>
        <div className={styles.leftPart}>
          <Link className={styles.logoContainer} to="/">
            <img className={styles.logo} src={logo} alt="Logo" />
          </Link>
          <h4 className={styles.description}>
            Rate your song, album and artist.
          </h4>
        </div>
        <div className={styles.rightPart}>
          <div className={styles.navInputContainer}>
            <SearchOutlined className={styles.navInputIcon} />
            <input className={styles.navInput} placeholder="Quick search" />
          </div>
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
            <SearchOutlined className={`${styles.navIcon} ${styles.navLink}`} />
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
