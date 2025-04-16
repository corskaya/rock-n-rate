import { Modal } from "../../../../components";
import styles from "./AboutModal.module.css";
import { useTranslation } from "react-i18next";

type Props = {
  show: boolean;
  onClose: () => void;
  text: string;
};

const AboutModal: React.FC<Props> = ({ show, onClose, text }) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      title={t("About")}
      onClose={onClose}
    >
      <p className={styles.aboutModalText}>
        {text}
      </p>
    </Modal>
  );
}

export default AboutModal;
