import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Label, Input, Button, Message, Loading } from "../../components";
import { login } from "./slice";
import { LoginRequest } from "./types";
import { AppDispatch, RootState } from "../../store";
import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { loginPending, loginRejected, errorMessage } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleSubmit = (values: LoginRequest) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Form 
          className={styles.formContainer} 
          onFinish={(values) => handleSubmit(values as LoginRequest)}
        >
          <h2 className={styles.formLabel}>{t('User login')}</h2>
          <div className={styles.formFieldContainer}>
            <Label>{t('Username or Email')}:</Label>
            <Input
              name='usernameOrEmail'
              type='text'
              className={styles.formInput}
            />
          </div>
          <div className={styles.formFieldContainer}>
            <Label>{t('Password')}:</Label>
            <Input
              name='password'
              type='password'
              className={styles.formInput}
            />
          </div>
          {loginRejected && (
            <div className={styles.errorMessageContainer}>
              <Message>{t(errorMessage ?? 'An error occured')}</Message>
            </div>
          )}
          <div className={styles.formFooter}>
            <div className={styles.formFooterLinks}>
              <Link className={styles.formFooterLink} to='/register'>
                {t('Create an Account')}
              </Link>
              <Link className={styles.formFooterLink} to='/forgot-password'>
                {t('Forgot password?')}
              </Link>
            </div>
            <Button type='submit'>
              {loginPending ? <Loading size='small' /> : t('Login')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
