import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { logout } from "../../login/slice";
import { AppDispatch, RootState } from "../../../store";
import User from "../../../types/user";
import styles from "../styles.module.css";
import { useTranslation } from 'react-i18next';

type Props = {
  user: User;
};

const Logout: React.FC<Props> = ({ user }) => {
  const { user: loginUser } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  return (
    <>
      {user._id === loginUser?._id && (
        <div className={styles.logoutContainer}>
          <Button
            className={styles.logoutBtn}
            onClick={() => dispatch(logout({ navigate }))}
          >
            {t('Logout')}
          </Button>
        </div>
      )}
    </>
  );
}

export default Logout;
