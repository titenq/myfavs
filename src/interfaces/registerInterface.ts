export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface IRegister extends IRegisterData {
  confirmPassword: string;
}
