import { Label } from "../../../components";
import styles from "../styles.module.css";
import User from "../../../types/user";

type Props = {
  user: User;
};

const About: React.FC<Props> = ({ user }) => {
  return (
    <div className={styles.aboutContainer}>
      <h3 className={styles.headerText}>{`About ${user.username}`}</h3>
      <Label className={styles.data}>{user.about || "No information"}</Label>
    </div>
  );
}

export default About;
