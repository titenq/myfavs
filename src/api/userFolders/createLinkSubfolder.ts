import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { ILinkBody } from '@/interfaces/userFoldersInterface';

const createLinkSubfolder = async (userId: string, link: ILinkBody, folderId: string, subfolderName: string): Promise<{ picture: string } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/${userId}/link/${folderId}/${subfolderName}`, {
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

    return response.json();
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao criar link na subpasta',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default createLinkSubfolder;
