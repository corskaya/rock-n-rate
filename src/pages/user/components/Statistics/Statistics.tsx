import dayjs from "dayjs";
import { Label } from "../../../../components";
import defaultProfilePicture from "../../../../assets/default-profile-picture.png";
import styles from "./Statistics.module.css";
import User from "../../../../types/user";
import { useTranslation } from 'react-i18next';

type Props = {
  user: User;
};

const Statistics: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.statisticsInfoContainer}>
        <h3 className={styles.headerText}>{t('Statistics')}</h3>
        <div className={styles.statistics}>
          <div className={styles.statisticsPair}>
            <Label className={styles.label}>{t('Joined')}:</Label>
            <Label className={styles.data}>
              {dayjs(user.createdAt).format("MMMM DD, YYYY")}
            </Label>
          </div>
          <div className={styles.statisticsPair}>
            <Label className={styles.label}>{t('Role')}:</Label>
            <Label className={styles.data}>{user.role}</Label>
          </div>
          <div className={styles.statisticsPair}>
            <Label className={styles.label}>{t('Ratings')}:</Label>
            <Label className={styles.data}>{user.ratingCount}</Label>
          </div>
          <div className={styles.statisticsPair}>
            <Label className={styles.label}>{t('Comments')}:</Label>
            <Label className={styles.data}>{user.commentCount}</Label>
          </div>
        </div>
      </div>
      <div className={styles.statisticsImageContainer}>
        <img
          src={user.avatar || defaultProfilePicture}
          alt={`${user.username} avatar`}
          className={styles.statisticsImage}
        />
      </div>
    </div>
  );
}

export default Statistics;
