export type ResetPasswordRequest = {
  password: string;
  confirmPassword: string;
  passwordRefreshToken: string;
};