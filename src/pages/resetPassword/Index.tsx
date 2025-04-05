import { useDispatch, useSelector } from "react-redux";
import { Form, Label, Input, Button, Message, Loading } from "../../components";
import { resetPassword } from "./slice";
import { ResetPasswordRequest } from "./types";
import { AppDispatch, RootState } from "../../store";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ResetPassword: React.FC = () => {
  const { 
    resetPasswordPending, 
    resetPasswordRejected, 
    errorMessage,
  } = useSelector((state: RootState) => state.resetPassword);
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (values: ResetPasswordRequest) => {
    dispatch(
      resetPassword({
        body: {
          password: values.password,
          confirmPassword: values.confirmPassword,
          passwordRefreshToken: token!,
        },
        navigate,
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Form
          className={styles.formContainer}
          onFinish={(values) => handleSubmit(values as ResetPasswordRequest)}
        >
          <h2 className={styles.formLabel}>{t('Reset your password')}</h2>
          <div className={styles.formFieldContainer}>
            <Label>{t('New password')}:</Label>
            <Input
              name="password"
              type="password"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formFieldContainer}>
            <Label>{t('Confirm password')}:</Label>
            <Input
              name="confirmPassword"
              type="password"
              className={styles.formInput}
            />
          </div>
          {resetPasswordRejected && (
            <div className={styles.errorMessageContainer}>
              <Message>{t(errorMessage ?? 'An error occurred')}</Message>
            </div>
          )}
          <div className={styles.formFooter}>
            <Button type="submit">
              {resetPasswordPending ? <Loading size="small" /> : t('Reset')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
