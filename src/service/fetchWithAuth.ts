import { API_END_POINT } from '../utils/constants/env';

const headers: HeadersInit = {};

export const fetchWithAuthorization = async <T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  const fullUrl = `${API_END_POINT}${url}`;
  try {
    const response = await fetch(fullUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`API Request Failed: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('An error occurred while making the API request. Please try again later.');
  }
};
