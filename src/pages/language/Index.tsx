import ReactCountryFlag from "react-country-flag";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setLanguage } from "./slice";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

const Language: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n, t } = useTranslation();

  const handleLangChange = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    // window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.header}>{t('Set language')}</h2>
        <p className={styles.explanation}>{t('Select your preferred language')}</p>
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
