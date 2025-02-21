import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { IUsersLinks } from '@/interfaces/userInterface';

const getUsersLinks = async (): Promise<IUsersLinks[] | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: IUsersLinks[] = await response.json();

    return data;
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao buscar usuários',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default getUsersLinks;
