export interface IGenericError {
  error: true;
  message: string;
  statusCode: number;
}

export interface IPropsModalError {
  showModalError: boolean;
  handleModalErrorClose: VoidFunction;
  errorMessage: string;
}
