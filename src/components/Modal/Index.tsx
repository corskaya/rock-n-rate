import { CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { ReactNode, useEffect } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
  suffix?: ReactNode;
  centerBody?: boolean;
  children: ReactNode;
};

const Modal: React.FC<Props> = ({ show, onClose = () => {}, title, suffix, centerBody = false, children }) => {

  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    }
  }, [show]);

  return (
    show && (
      <div className={styles.modalContainer}>
        <div onClick={onClose} className={styles.overlay}></div>
        <div className={styles.modalContent}>
          <div className={styles.modalHeaderWeb}>
            <h2 className={styles.modalTitle}>{title}</h2>
            {suffix}
          </div>
          <div className={styles.modalHeaderMobile}>
            <div className={styles.modalHeaderItemMobile}>
              <CloseOutlined
                className={styles.rateModalCloseIconMobile}
                onClick={onClose}
              />
            </div>
            <div className={styles.modalHeaderItemMobile}>
              <h2 className={styles.modalTitle}>{title}</h2>
            </div>
            <div className={styles.modalHeaderItemMobile}>
              {suffix}
            </div>
          </div>
          <div
            className={`${styles.modalBodyContainer} ${
              centerBody ? styles.modalBodyCenter : ""
            }`}
          >
            <div>{children}</div>
          </div>
          <div className={styles.rateModalCloseBtnContainerWeb}>
            <div className={styles.rateModalCloseBtnWeb} onClick={onClose}>
              <CloseOutlined className={styles.rateModalCloseIcon} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
