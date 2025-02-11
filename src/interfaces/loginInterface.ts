export interface ILoginData {
  email: string;
  password: string;
  recaptchaToken?: string | null;
}

export interface ILogin extends ILoginData {
  isEmailVerified: boolean;
}
