import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { activate } from "./slice";
import { Loading, Message } from "../../components";
import { useTranslation } from 'react-i18next';

const Activation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const activationCode = searchParams.get('code');

  const { activatePending, activateRejected, errorMessage } = useSelector((state: RootState) => state.activation);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!userId || !activationCode) {
      return navigate("/not-found");
    }

    dispatch(activate({ userId, activationCode }));
  }, [dispatch, navigate, userId, activationCode]);

  return (
    <div className={styles.container}>
      {activateRejected && (
        <Message>{t(errorMessage ?? "An error occurred")}</Message>
      )}
      {activatePending && (
        <Loading size="large" />
      )}
    </div>
  );
}

export default Activation;
