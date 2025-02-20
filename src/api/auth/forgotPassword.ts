import { backendBaseUrl } from '@/helpers/baseUrl';
import { IResendLink, IResendLinkResponse } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';

const forgotPassword = async (forgotPassword: IResendLink): Promise<IResendLinkResponse | IGenericError> => {
  try {
    const { email, recaptchaToken } = forgotPassword;

    const response = await fetch(`${backendBaseUrl}/auth/forgot-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Recaptcha-Token': recaptchaToken!
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: IResendLinkResponse = await response.json();

    return data;
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao recadastrar senha',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default forgotPassword;
