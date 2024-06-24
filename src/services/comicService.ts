import md5 from 'crypto-js/md5';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

const fetchComicImage = async (comicUrl: string): Promise<string> => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  const apiUrl = `${comicUrl}?apikey=${PUBLIC_KEY}&ts=${timestamp}&hash=${hash}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const comicImage = `${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`;

    return comicImage;
  } catch (error) {
    console.error('Error fetching comic image:', error);
    throw error;
  }
};

export default {
  fetchComicImage,
};
