import { CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { ReactNode } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
  titleSuffix?: string;
  centerBody?: boolean;
  children: ReactNode;
};

const Modal: React.FC<Props> = ({ show, onClose = () => {}, title, titleSuffix, centerBody = false, children }) => {
  return (
    show && (
      <div className={styles.modalContainer}>
        <div onClick={onClose} className={styles.overlay}></div>
        <div className={styles.modalContent}>
          <div className={styles.modalTitleContainer}>
            <h2 className={styles.modalTitle}>{title}</h2>
            {titleSuffix && (
              <h4 className={styles.modalTitleSuffix}>{titleSuffix}</h4>
            )}
          </div>
          <div
            className={`${styles.modalBodyContainer} ${
              centerBody ? styles.modalBodyCenter : ""
            }`}
          >
            <div>{children}</div>
          </div>
          <div className={styles.rateModalCloseBtnContainer}>
            <div className={styles.rateModalCloseBtn} onClick={onClose}>
              <CloseOutlined className={styles.rateModalCloseIcon} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
