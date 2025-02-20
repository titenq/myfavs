import { backendBaseUrl } from '@/helpers/baseUrl';
import { IGenericError } from '@/interfaces/errorInterface';
import { ILinkBody } from '@/interfaces/userFoldersInterface';

const getLinks = async (): Promise<ILinkBody[] | IGenericError> => {
  try {
    const response = await fetch(`${backendBaseUrl}/folders/links`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    if (!response.ok) {
      const data: IGenericError = await response.json();

      return data;
    }

    const data: ILinkBody[] = await response.json();

    return data;
  } catch (_error) {
    const errorMessage: IGenericError = {
      error: true,
      message: 'erro ao buscar links',
      statusCode: 400
    }

    return errorMessage;
  }
};

export default getLinks;
