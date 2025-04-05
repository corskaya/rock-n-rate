import { useSelector } from "react-redux";
import { Button } from "../../../components";
import defaultProfilePicture from "../../../assets/default-profile-picture.png";
import styles from "../styles.module.css";
import React from "react";
import User from "../../../types/user";
import { RootState } from "../../../store";
import { useTranslation } from 'react-i18next';

type Props = {
  user: User;
};

const Settings: React.FC<Props> = ({ user }) => {
  const { user: loginUser } = useSelector((state: RootState) => state.login);
  const { t } = useTranslation();

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.statisticsImageContainerMobile}>
        <img
          src={user.avatar || defaultProfilePicture}
          alt={`${user.username} avatar`}
          className={styles.statisticsImageMobile}
        />
      </div>
      <h1 className={styles.username}>{user.username}</h1>
      {user._id === loginUser?._id && (
        <Button className={styles.settingsBtn}>{t('Profile Settings')}</Button>
      )}
    </div>
  );
}

export default Settings;
