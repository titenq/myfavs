import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { ILinkBody } from '@/interfaces/userFoldersInterface';

const createLink = async (userId: string, link: ILinkBody, folderId: string): Promise<{ ok: true } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/${userId}/link/${folderId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(link)
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    return { ok: true };
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao criar link',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default createLink;
