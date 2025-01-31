import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';

const editSubfolder = async (userId: string, editFolderId: string, editSubfolderName: string, editOldSubfolderName: string): Promise<{ ok: true } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/subfolders/${userId}/${editOldSubfolderName}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ editFolderId, editSubfolderName })
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    return { ok: true };
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao editar subpasta',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default editSubfolder;
