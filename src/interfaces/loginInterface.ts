export interface ILoginData {
  email: string;
  password: string;
}

export interface ILogin extends ILoginData {
  isEmailVerified: boolean;
}
