import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';

const deleteFolder = async (
  userId: string,
  deleteFolderId: string
): Promise<{ ok: true } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ deleteFolderId })
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();
      return data;
    }

    return { ok: true };
  } catch (_error) {
    return {
      error: true,
      message: 'erro ao deletar pasta',
      statusCode: 400
    };
  }
};

export default deleteFolder;
