import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { ILoginData } from '@/interfaces/loginInterface';
import { IUser } from '@/interfaces/userInterface';

const login = async (loginData: ILoginData): Promise<IUser | IGenericError> => {
  try {
    const { email, password, recaptchaToken } = loginData;

    const response = await fetch(`${backendBaseUrl}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Recaptcha-Token': recaptchaToken!
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: IUser = await response.json();

    return data;
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao fazer login',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default login;
