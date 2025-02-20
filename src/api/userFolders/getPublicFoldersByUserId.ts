import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { IUserFolder } from '@/interfaces/userFoldersInterface';

const getPublicFoldersByUserId = async (userId: string): Promise<IUserFolder | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/public/${userId}`, {
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

    const data: IUserFolder = await response.json();

    return data;
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao buscar as pastas do usuário',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default getPublicFoldersByUserId;
