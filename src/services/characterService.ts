import md5 from 'crypto-js/md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = 'ceae6d55789ffb4fcf134cacf3a0fc3b';
const PRIVATE_KEY = 'b5b9e4a4e82fd4a2d235bc14b97d54883a992ca1';
const MAX_ITEMS = 50;

type Response = { data: { results: Character[] } };

export function getQueryParams(offset?: number, name?: string) {
  const ts = new Date().getTime().toString();
  const params = {
    ts,
    apikey: PUBLIC_KEY,
    hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY),
    limit: offset === undefined ? MAX_ITEMS : offset,
    offset,
    nameStartsWith: name, // if name is undefined: nameStartsWith will not be added
  };
  return (Object.keys(params) as (keyof typeof params)[])
    .filter((key) => params[key] !== undefined)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`
    )
    .join('&');
}

export const getCharacterList = async (offset?: number, name?: string): Promise<Character[] | null> => {
    const url = `${BASE_URL}/characters?${getQueryParams(offset, name)}`;
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
