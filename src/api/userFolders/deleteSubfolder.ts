import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';

const deleteSubfolder = async (
  userId: string,
  deleteFolderId: string,
  deleteSubfolderName: string
): Promise<{ ok: true } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/subfolders/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ deleteFolderId, deleteSubfolderName })
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();
      return data;
    }

    return { ok: true };
  } catch (_error) {
    return {
      error: true,
      message: 'erro ao deletar subpasta',
      statusCode: 400
    };
  }
};

export default deleteSubfolder;
