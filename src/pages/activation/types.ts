import User from "../../types/user";

export type ActivationRequest = {
  userId: string;
  activationCode: string;
};

export type ActivationResponse = {
  user: User;
  token: string;
};