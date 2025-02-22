import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { IUserResponse } from '@/interfaces/userInterface';

const getUserById = async (userId: string): Promise<IUserResponse | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/users/username/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
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
      message: 'erro ao buscar usuário por id',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default getUserById;
