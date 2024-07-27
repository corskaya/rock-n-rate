import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./slice";
import { Loading, Message } from "../../components";
import styles from "./styles.module.css";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";
import About from "./components/About";
import Logout from "./components/Logout";
import { AppDispatch, RootState } from "../../store";

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

  useEffect(() => {
    dispatch(getUser(username!));
  }, [dispatch, username]);

  return (
    <div className={styles.container}>
      {userPending && <Loading />}
      {userRejected && <Message>{userErrorMessage}</Message>}
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
