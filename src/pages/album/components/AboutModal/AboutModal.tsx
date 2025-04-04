import { Modal } from "../../../../components";
import styles from "./AboutModal.module.css";

type Props = {
  show: boolean;
  onClose: () => void;
  text: string;
};

const AboutModal: React.FC<Props> = ({ show, onClose, text }) => {
  return (
    <Modal
      show={show}
      title="About"
      onClose={onClose}
    >
      <p className={styles.aboutModalText}>
        {text}
      </p>
    </Modal>
  );
}

export default AboutModal;
