import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';

const createFolder = async (userId: string, folderName: string): Promise<{ ok: true } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/${userId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ folderName })
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    return { ok: true };
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao criar pasta',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default createFolder;
