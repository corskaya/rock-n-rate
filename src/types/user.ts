type User = {
  _id: string;
  email: string;
  username: string;
  role: UserRole;
  isPrivate: boolean;
  avatar: string;
  about: string;
  ratingCount?: number;
  commentCount?: number;
  createdAt: string;
  updatedAt: string;
};

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export default User;