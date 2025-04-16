import { Label } from "../../../../components";
import styles from "./About.module.css";
import User from "../../../../types/user";
import { useTranslation } from 'react-i18next';

type Props = {
  user: User;
};

const About: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.aboutContainer}>
      <h3 className={styles.headerText}>{`${t('About')} ${user.username}`}</h3>
      <Label className={styles.data}>{user.about || t('No information')}</Label>
    </div>
  );
}

export default About;
