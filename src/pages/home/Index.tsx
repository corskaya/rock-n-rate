import Description from "./components/Description";
import PopularArtists from "./components/PopularArtists";
import PopularAlbums from "./components/PopularAlbums";
import PopularSongs from "./components/PopularSongs";
import styles from "./styles.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Description />
      <PopularArtists />
      <PopularAlbums />
      <PopularSongs />
    </div>
  );
}

export default Home;
