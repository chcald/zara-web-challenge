import { useState, useEffect } from 'react';
import comicService from '../services/comicService';

const useComicImage = (comicUrl: string): { comicImage: string; loading: boolean; error: Error | null } => {
    const [comicImage, setComicImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchComicImageData = async () => {
        try {
          const image = await comicService.fetchComicImage(comicUrl);
          setComicImage(image);
          setLoading(false);
        } catch (error) {
          setError(error as Error);
          setLoading(false);
        }
      };
  
      fetchComicImageData();
    }, [comicUrl]);
  
    return { comicImage, loading, error };
  };
  
  export default useComicImage;
