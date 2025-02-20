export interface IRegisterData {
  name: string;
  email: string;
  password: string;

}

export interface IRegister extends IRegisterData {
  confirmPassword: string;
}

export interface IRegisterRequest extends IRegisterData {
  recaptchaToken?: string | null;
}
