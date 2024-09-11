import { backendBaseUrl } from '../../helpers/baseUrl';
import { IGenericError } from '../../interfaces/errorInterface';
import { ILoginData } from '../../interfaces/loginInterface';
import { IUser } from '../../interfaces/userInterface';

const login = async (loginData: ILoginData): Promise<IUser | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: IUser = await response.json();

    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao fazer login',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default login;
