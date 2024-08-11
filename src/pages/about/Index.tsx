import styles from "./styles.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.header}>About Rock'n Rate</h2>
        <div className={styles.heading}>Welcome to Rock'n Rate</div>
        <p className={styles.explanation}>
          Rock'n Rate is a dedicated platform for rock music enthusiasts.
          Whether you're into classic rock, punk, metal, or any other subgenre,
          this is the place to discover, rate, and discuss all things rock.
        </p>
        <div className={styles.heading}>Our Mission</div>
        <p className={styles.explanation}>
          Our mission is to create a space where rock music lovers can connect,
          share their thoughts, and explore the world of rock music. We aim to
          be the go-to platform for discovering new rock music, revisiting old
          classics, and engaging with a community of like-minded individuals.
        </p>
        <div className={styles.heading}>Key Features</div>
        <ul>
          <li>
            <strong>Discover Rock Music:</strong> Search for artists, albums,
            and songs within the rock genre.
          </li>
          <li>
            <strong>Rate and Review:</strong> Share your opinions by rating and
            reviewing your favorite (or not-so-favorite) rock artists, albums,
            and songs.
          </li>
          <li>
            <strong>Community Insights:</strong> Explore ratings and reviews
            from fellow rock fans to help you discover new music.
          </li>
          <li>
            <strong>User Contributions:</strong> Add new rock artists, albums,
            and songs that aren't yet on the platform.
          </li>
          <li>
            <strong>Personalization:</strong> Create a profile, upload a profile
            picture, and manage your preferences.
          </li>
        </ul>
        <div className={styles.heading}>The Story Behind Rock'n Rate</div>
        <p className={styles.explanation}>
          I'm Çağrı, and I built Rock'n Rate entirely on my own as a passion
          project. I wanted to create a platform dedicated solely to rock music,
          where fans could connect and share their love for the genre. This
          project was developed with no financial gain in mind—just a genuine
          passion for rock music and web development.
        </p>
        <div className={styles.heading}>Connect with Me</div>
        <p className={styles.explanation}>
          I’m always open to feedback and suggestions. Feel free to connect with
          me on{" "}
          <span
            className={styles.link}
            onClick={() => window.open("https://www.linkedin.com/in/cagriorskaya")}
          >
            LinkedIn
          </span>{" "}
          or check out the code on{" "}
          <span
            className={styles.link}
            onClick={() => window.open("https://github.com/corskaya")}
          >
            GitHub
          </span>
          .
        </p>
        <div className={styles.heading}>License</div>
        <p className={styles.explanation}>
          Rock'n Rate is an open-source project licensed under the MIT License.
          Contributions are welcome!
        </p>
      </div>
    </div>
  );
};

export default About;
