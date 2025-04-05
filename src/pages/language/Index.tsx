import ReactCountryFlag from "react-country-flag";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setLanguage } from "./slice";
import styles from "./styles.module.css";

const Language: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLangChange = (lang: string) => {
    dispatch(setLanguage(lang));
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.header}>Set language</h2>
        <p className={styles.explanation}>Select your preferred language</p>
        <div className={styles.countryFlags}>
          <div 
            className={styles.countryFlagContainer} 
            onClick={() => handleLangChange("en")}
          >
            <div className={styles.outerCountryFlag}>
              <ReactCountryFlag
                className={styles.innerCountryFlag}
                countryCode={"GB"}
                svg
              />
            </div>
            <h3 className={styles.countryLabel}>English</h3>
          </div>
          <div 
            className={styles.countryFlagContainer}
            onClick={() => handleLangChange("tr")}
          >
            <div className={styles.outerCountryFlag}>
              <ReactCountryFlag
                className={styles.innerCountryFlag}
                countryCode={"TR"}
                svg
              />
            </div>
            <h3 className={styles.countryLabel}>Türkçe</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
