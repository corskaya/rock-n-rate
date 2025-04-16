import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./slice";
import { Loading, Message } from "../../components";
import { AppDispatch, RootState } from "../../store";
import Settings from "./components/Settings/Settings";
import Statistics from "./components/Statistics/Statistics";
import About from "./components/About/About";
import Logout from "./components/Logout/Logout";
import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

function User() {
  const { 
    userPending, 
    userFulfilled,
    user,
    userRejected, 
    userErrorMessage,
  } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUser(username!));
  }, [dispatch, username]);

  return (
    <div className={styles.container}>
      {userPending && <Loading />}
      {userRejected && <Message>{t(userErrorMessage ?? "An error occured")}</Message>}
      {userFulfilled && user && (
        <div className={styles.profileContainer}>
          <Settings user={user} />
          <Statistics user={user} />
          <About user={user} />
          <Logout user={user} />
        </div>
      )}
    </div>
  );
}

export default User;
