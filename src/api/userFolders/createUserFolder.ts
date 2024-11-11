import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { IUserFolder } from '@/interfaces/userFoldersInterface';

const createUserFolder = async (userId: string, folderName: string): Promise<IUserFolder | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/${userId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(folderName)
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
      message: 'erro ao criar pasta',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default createUserFolder;
