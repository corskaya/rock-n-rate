import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.header}>{t("About Rock'n Rate")}</h2>
        <div className={styles.heading}>{t("Welcome to Rock'n Rate")}</div>
        <p className={styles.explanation}>
          {t("Rock'n Rate is a dedicated platform for rock music enthusiasts. Whether you're into classic rock, punk, metal, or any other subgenre, this is the place to discover, rate, and discuss all things rock.")}
        </p>
        <div className={styles.heading}>{t("Our Mission")}</div>
        <p className={styles.explanation}>
          {t("Our mission is to create a space where rock music lovers can connect, share their thoughts, and explore the world of rock music. We aim to be the go-to platform for discovering new rock music, revisiting old classics, and engaging with a community of like-minded individuals.")}
        </p>
        <div className={styles.heading}>{t("Key Features")}</div>
        <ul>
          <li>
            <strong>{t("Discover Rock Music:")}</strong> {t("Search for artists, albums, and songs within the rock genre.")}
          </li>
          <li>
            <strong>{t("Rate and Review:")}</strong> {t("Share your opinions by rating and reviewing your favorite (or not-so-favorite) rock artists, albums, and songs.")}
          </li>
          <li>
            <strong>{t("Community Insights:")}</strong> {t("Explore ratings and reviews from fellow rock fans to help you discover new music.")}
          </li>
          <li>
            <strong>{t("User Contributions:")}</strong> {t("Add new rock artists, albums, and songs that aren't yet on the platform.")}
          </li>
          <li>
            <strong>{t("Personalization:")}</strong> {t("Create a profile, upload a profile picture, and manage your preferences.")}
          </li>
        </ul>
        <div className={styles.heading}>{t("The Story Behind Rock'n Rate")}</div>
        <p className={styles.explanation}>
          {t("I'm Çağrı, and I built Rock'n Rate entirely on my own as a passion project. I wanted to create a platform dedicated solely to rock music, where fans could connect and share their love for the genre. This project was developed with no financial gain in mind, just a genuine passion for rock music and web development.")}
        </p>
        <div className={styles.heading}>{t("Connect with Me")}</div>
        {i18n.language === "en" && (
          <p className={styles.explanation}>
            I'm always open to feedback and suggestions. Feel free to connect with me on <LinkedIn /> or check out the code on <Github />.
          </p>
        )}
        {i18n.language === "tr" && (
          <p className={styles.explanation}>
            Geri bildirimlerinizi ve önerilerinizi duymaktan her zaman memnuniyet duyarım. Benimle <LinkedIn /> üzerinden iletişime geçebilir veya projeye göz atmak için <Github /> hesabımı ziyaret edebilirsiniz.
          </p>
        )}
        <div className={styles.heading}>{t("License")}</div>
        <p className={styles.explanation}>
          {t("Rock'n Rate is an open-source project licensed under the MIT License. Contributions are welcome!")}
        </p>
      </div>
    </div>
  );
};

export default About;

const LinkedIn: React.FC = () => {
  return (
    <span
      className={styles.link}
      onClick={() => window.open("https://www.linkedin.com/in/cagriorskaya")}
    >
      LinkedIn
    </span>
  );
}

const Github: React.FC = () => {
  return (
    <span
      className={styles.link}
      onClick={() => window.open("https://github.com/corskaya")}
    >
      GitHub
    </span>
  );
}
