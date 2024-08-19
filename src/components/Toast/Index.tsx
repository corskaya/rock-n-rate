import { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ToastStatus from "../../types/toast";

const initialToastStatus: ToastStatus = {
  show: false,
};

const Toast: React.FC = () => {
  const [generalToastStatus, setGeneralToastStatus] = useState<ToastStatus>(initialToastStatus);
  const loginToastStatus = useSelector((state: RootState) => state.login.toastStatus);
  const registerToastStatus = useSelector((state: RootState) => state.register.toastStatus);
  const activationToastStatus = useSelector((state: RootState) => state.activation.toastStatus);
  const resetPasswordToastStatus = useSelector((state: RootState) => state.resetPassword.toastStatus);
  const homeToastStatus = useSelector((state: RootState) => state.home.toastStatus);
  const artistsToastStatus = useSelector((state: RootState) => state.artists.toastStatus);
  const artistToastStatus = useSelector((state: RootState) => state.artist.toastStatus);
  const albumsToastStatus = useSelector((state: RootState) => state.albums.toastStatus);
  const albumToastStatus = useSelector((state: RootState) => state.album.toastStatus);
  const songsToastStatus = useSelector((state: RootState) => state.songs.toastStatus);
  const songToastStatus = useSelector((state: RootState) => state.song.toastStatus);
  const dispatch = useDispatch<AppDispatch>();

  const delay = () => new Promise((res) => setTimeout(res, 5000));

  const closeToast = () => {
    setGeneralToastStatus(initialToastStatus);
  };

  // login
  useEffect(() => {
    if (loginToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(loginToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [loginToastStatus, dispatch]);

  // register
  useEffect(() => {
    if (registerToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(registerToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [registerToastStatus, dispatch]);

  // activation
  useEffect(() => {
    if (activationToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(activationToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [activationToastStatus, dispatch]);

  // resetPassword
  useEffect(() => {
    if (resetPasswordToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(resetPasswordToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [resetPasswordToastStatus, dispatch]);

  // home
  useEffect(() => {
    if (homeToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(homeToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [homeToastStatus, dispatch]);

  // artists
  useEffect(() => {
    if (artistsToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(artistsToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [artistsToastStatus, dispatch]);

  // artist
  useEffect(() => {
    if (artistToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(artistToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [artistToastStatus, dispatch]);

  // albums
  useEffect(() => {
    if (albumsToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(albumsToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [albumsToastStatus, dispatch]);

  // album
  useEffect(() => {
    if (albumToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(albumToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [albumToastStatus, dispatch]);

  // songs
  useEffect(() => {
    if (songsToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(songsToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [songsToastStatus, dispatch]);

  // song
  useEffect(() => {
    if (songToastStatus.show) {
      const showToast = async () => {
        setGeneralToastStatus(songToastStatus);
        await delay();
        closeToast();
      };
      showToast();
    }
  }, [songToastStatus, dispatch]);

  const renderIcon = (type: "success" | "error" | "warning" | "info") => {
    switch (type) {
      case "success":
        return <CheckCircleOutlined className={styles.icon} />;
      case "error":
        return <CloseCircleOutlined className={styles.icon} />;
      case "warning":
        return <WarningOutlined className={styles.icon} />;
      case "info":
        return <InfoCircleOutlined className={styles.icon} />;
      default:
        break;
    }
  };

  return (
    generalToastStatus.show && (
      <div className={`${styles.container} ${styles[generalToastStatus.type]}`}>
        {renderIcon(generalToastStatus.type)}
        <p className={styles.title}>{generalToastStatus.title}</p>
        <p className={styles.description}>{generalToastStatus.message}</p>
        <CloseOutlined className={styles.closeBtn} onClick={closeToast} />
      </div>
    )
  );
}

export default Toast;
