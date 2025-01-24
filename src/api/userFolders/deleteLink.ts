import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { IDeleteLinkProps } from '@/interfaces/userFoldersInterface';

const deleteLink = async (
  userId: string,
  deleteLinkProps: IDeleteLinkProps
): Promise<{ ok: true } | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/${userId}/link`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(deleteLinkProps)
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();
      return data;
    }

    return { ok: true };
  } catch (_error) {
    return {
      error: true,
      message: 'erro ao deletar link',
      statusCode: 400
    };
  }
};

export default deleteLink;
