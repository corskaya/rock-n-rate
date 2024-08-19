import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Label, Input, Button, Message, Loading } from "../../components";
import { register } from "./slice";
import { AppDispatch, RootState } from "../../store";
import { RegisterRequest } from "./types";
import { CheckCircleFilled } from "@ant-design/icons";
import styles from "./styles.module.css";

const Register: React.FC = () => {
  const { registerPending, registerFulfilled, registerRejected, errorMessage } = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: RegisterRequest) => {
    dispatch(register(values));
  };

  return (
    <div className={styles.container}>
      {!registerFulfilled && (
        <div className={styles.innerContainer}>
          <Form
            className={styles.formContainer}
            onFinish={(values) => handleSubmit(values as RegisterRequest)}
          >
            <h2 className={styles.formLabel}>Register an Account</h2>
            <div className={styles.formFields}>
              <div className={styles.formFieldContainer}>
                <Label>Username:</Label>
                <Input name="username" className={styles.formInput} />
              </div>
              <div className={styles.formFieldContainer}>
                <Label>E-Mail:</Label>
                <Input name="email" className={styles.formInput} />
              </div>
              <div className={styles.formFieldContainer}>
                <Label>Password:</Label>
                <Input
                  name="password"
                  type="password"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formFieldContainer}>
                <Label>Confirm Password:</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  className={styles.formInput}
                />
              </div>
            </div>
            {registerRejected && (
              <div className={styles.errorMessageContainer}>
                <Message>{errorMessage}</Message>
              </div>
            )}
            <div className={styles.formFooter}>
              <Link className={styles.formFooterLink} to="/login">
                Already have an account?
              </Link>
              <Button type="submit">
                {registerPending ? <Loading size="small" /> : "Register"}
              </Button>
            </div>
          </Form>
        </div>
      )}
      {registerFulfilled && (
        <div className={styles.emailSentContainer}>
          <div className={styles.emailSentHeader}>
            <CheckCircleFilled className={styles.emailSentIcon} />
            <span className={styles.emailSentHeading}>
              Verify Your Email Address
            </span>
          </div>
          <p className={styles.emailSentText}>
            We've sent a verification link to your email. Please check your
            inbox and click the link to activate your account. If you don't see
            the email, please check your spam folder.
          </p>
        </div>
      )}
    </div>
  );
}

export default Register;
