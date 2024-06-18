import { useState, useEffect } from 'react';
import { getCharacterList } from '../services/characterService';

const useCharacters = (initialOffset?: number) => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCharacters = async (offset?: number) => {
    setLoading(true);
    try {
      const data = await getCharacterList(offset);
      setCharacters(data);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(initialOffset);
  }, [initialOffset]);

  return { characters, loading, error, fetchCharacters };
};

export default useCharacters;
