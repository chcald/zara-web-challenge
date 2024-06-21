import md5 from 'crypto-js/md5';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const MAX_ITEMS = Number(process.env.MAX_ITEMS) || 50;

type Response = { data: { results: Character[] } };

export function getQueryParams(offset?: number, name?: string) {
  const ts = new Date().getTime().toString();
  const params: Params = {
    ts,
    apikey: PUBLIC_KEY!,
    hash: md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString(),
    limit: MAX_ITEMS,
    offset,
  };
  if (name) params.nameStartsWith = name;
  return (Object.keys(params) as (keyof typeof params)[])
    .filter((key) => params[key] !== undefined)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`,
    )
    .join('&');
}

export const getCharacterList = async (
  offset?: number,
  name?: string,
): Promise<Character[] | null> => {
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
