import { backendBaseUrl } from '@/helpers/baseUrl';
import { IResendLinkResponse, IResetPasswordData } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';

const resetPassword = async (resetPasswordData: IResetPasswordData): Promise<IResendLinkResponse | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(resetPasswordData)
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

export default resetPassword;
