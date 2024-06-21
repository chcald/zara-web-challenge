import { useState, useEffect } from 'react';
import { getCharacterList } from '../services/characterService';
import { useLoading } from '../contexts/LoadingContext';

const useCharacters = (initialOffset?: number) => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { setLoading } = useLoading();

  const fetchCharacters = async (offset?: number, name?: string) => {
    setLoading(true);
    try {
      const data = await getCharacterList(offset, name);
      setCharacters(data);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(initialOffset, undefined);
  }, [initialOffset]);

  return { characters, error, fetchCharacters };
};

export default useCharacters;
