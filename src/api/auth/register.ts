import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { IRegisterData } from '@/interfaces/registerInterface';
import { IUserResponse } from '@/interfaces/userInterface';

const register = async (registerData: IRegisterData): Promise<IUserResponse | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(registerData)
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: IUserResponse = await response.json();

    return data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao se cadastrar',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default register;
