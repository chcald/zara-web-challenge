import md5 from 'crypto-js/md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = 'ceae6d55789ffb4fcf134cacf3a0fc3b';
const PRIVATE_KEY = 'b5b9e4a4e82fd4a2d235bc14b97d54883a992ca1';

type Response = { data: { results: Character[] } };

export function getQueryParams(offset?: number) {
  const ts = new Date().getTime().toString();
  const params = {
    ts,
    apikey: PUBLIC_KEY,
    hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY),
    limit: offset === undefined ? 50 : undefined,
    offset,
  };
  return (Object.keys(params) as (keyof typeof params)[])
    .filter((key) => params[key] !== undefined)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`
    )
    .join('&');
}

export const getCharacterById = async (id: string): Promise<Character | null> => {
  const url = `${BASE_URL}/characters/${id}?${getQueryParams()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Response = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getCharacterList = async (offset?: number): Promise<Character[] | null> => {
    const url = `${BASE_URL}/characters?${getQueryParams(offset)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Response = await response.json();
      return data.data.results;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  // export const getCharacterListByName = async (name: string) => {
  //   const response = await axios.get(`https://api.example.com/characters?name=${name}`);
  //   return response.data.results;
  // };
