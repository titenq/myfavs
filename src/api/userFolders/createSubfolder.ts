import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';

const createSubfolder = async (userId: string, subfolderName: string, folderId: string): Promise<{ ok: true } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/${userId}/subfolders/${folderId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ subfolderName })
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    return { ok: true };
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao criar subpasta',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default createSubfolder;
