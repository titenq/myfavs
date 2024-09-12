export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  createdAt: Date;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  isEmailVerified?: boolean | null;
  emailVerificationToken?: string | null;
  createdAt: Date;
}

export type IEmailVerifiedResponse = Omit<IUserResponse, 'isEmailVerified' | 'emailVerificationToken'>;
