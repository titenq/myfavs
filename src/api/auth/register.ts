import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { IRegisterRequest } from '@/interfaces/registerInterface';
import { IUserResponse } from '@/interfaces/userInterface';

const register = async (registerData: IRegisterRequest): Promise<IUserResponse | IGenericError> => {
  try {
    const {
      recaptchaToken,
      ...restData
    } = registerData;

    const response = await fetch(`${backendBaseUrl}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Recaptcha-Token': recaptchaToken!
      },
      body: JSON.stringify(restData)
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: IUserResponse = await response.json();

    return data;
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao se cadastrar',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default register;
