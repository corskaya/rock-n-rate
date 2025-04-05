import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleFilled } from "@ant-design/icons";
import { Form, Label, Input, Button, Message, Loading } from "../../components";
import { forgotPassword } from "./slice";
import { AppDispatch, RootState } from "../../store";
import styles from "./styles.module.css";
import { useTranslation } from 'react-i18next';

const ForgotPassword: React.FC = () => {
  const {
    forgotPasswordPending,
    forgotPasswordFulfilled,
    forgotPasswordRejected,
    errorMessage,
  } = useSelector((state: RootState) => state.forgotPassword);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleSubmit = ({ email }: { email: string }) => {
    dispatch(forgotPassword(email));
  };

  return (
    <div className={styles.container}>
      {!forgotPasswordFulfilled && (
        <div className={styles.innerContainer}>
          <Form
            className={styles.formContainer}
            onFinish={(values) => handleSubmit(values as { email: string })}
          >
            <h2 className={styles.formLabel}>{t('Reset your password')}</h2>
            <p className={styles.explanation}>
              {t("Enter your email address, and we'll send you a link to reset your password.")}
            </p>
            <div className={styles.formFieldContainer}>
              <Label>{t('Email')}:</Label>
              <Input name="email" type="email" className={styles.formInput} />
            </div>
            {forgotPasswordRejected && (
              <div className={styles.errorMessageContainer}>
                <Message>{errorMessage}</Message>
              </div>
            )}
            <div className={styles.formFooter}>
              <div className={styles.formFooterLinks}>
                <Link className={styles.formFooterLink} to="/register">
                  {t('Create an Account')}
                </Link>
              </div>
              <Button type="submit">
                {forgotPasswordPending ? (
                  <Loading size="small" />
                ) : (
                  t('Reset Password')
                )}
              </Button>
            </div>
          </Form>
        </div>
      )}
      {forgotPasswordFulfilled && (
        <div className={styles.emailSentContainer}>
          <div className={styles.emailSentHeader}>
            <CheckCircleFilled className={styles.emailSentIcon} />
            <span className={styles.emailSentHeading}>
              {t('Password Reset Link Sent')}
            </span>
          </div>
          <p className={styles.emailSentText}>
            {t('A password reset link has been sent to your email. Please check your inbox and click the link within 1 hour to reset your password. If you do not see the email, please check your spam folder.')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
