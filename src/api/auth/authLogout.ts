import { backendBaseUrl } from '@/helpers/baseUrl';
import { ILogoutResponse } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';

const authLogout = async (): Promise<ILogoutResponse | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: ILogoutResponse = await response.json();

    return data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao fazer logout',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default authLogout;
