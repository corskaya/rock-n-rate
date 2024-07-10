import User from "../../types/user";

export type LoginRequest = {
  usernameOrEmail: string;
  password: string;
}

export type LoginResponse = {
  user: User;
  token: string;
}