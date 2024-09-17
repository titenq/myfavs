import { backendBaseUrl } from '@/helpers/baseUrl';
import { IResendLink, IResendLinkResponse } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';

const forgotPassword = async (forgotPassword: IResendLink): Promise<IResendLinkResponse | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/forgot-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(forgotPassword)
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: IResendLinkResponse = await response.json();

    return data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao recadastrar senha',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default forgotPassword;
