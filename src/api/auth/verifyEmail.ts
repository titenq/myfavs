import { backendBaseUrl } from '@/helpers/baseUrl';
import { IVerifyEmailData } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';
import { IUserResponse } from '@/interfaces/userInterface';

const verifyEmail = async (verifyEmailData: IVerifyEmailData): Promise<IUserResponse | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/verify-email`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(verifyEmailData)
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

export default verifyEmail;
