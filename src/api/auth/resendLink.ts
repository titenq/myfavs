import { backendBaseUrl } from '@/helpers/baseUrl';
import { IResendLink, IResendLinkResponse } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';

const resendLink = async (resendLink: IResendLink): Promise<IResendLinkResponse | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/resend-link`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(resendLink)
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
      message: 'erro ao reenviar link',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default resendLink;
