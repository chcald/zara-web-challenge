import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../../contexts/FavoritesContext';
import { CardList } from '../../components/CardList';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../contexts/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

const mockPush = jest.fn();

describe('CardList', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Test Character',
    thumbnail: { path: 'path/to/image', extension: 'jpg' },
    description: '',
    modified: '',
    resourceURI: '',
    comics: { available: 0, collectionURI: '', items: [{ resourceURI: '', name: '', type: '' }], returned: 0 },
    series: { available: 0, collectionURI: '', items: [{ resourceURI: '', name: '', type: '' }], returned: 0 },
    stories: { available: 0, collectionURI: '', items: [{ resourceURI: '', name: '', type: '' }], returned: 0 },
    events: { available: 0, collectionURI: '', items: [{ resourceURI: '', name: '', type: '' }], returned: 0 },
    urls: [{ type: 'detail', url: 'http://test.url' }],
  };

  const mockIsFavorite = jest.fn();
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();
  const mockIsFromFavorites = false;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: mockIsFavorite,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      isFromFavorites: mockIsFromFavorites,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of characters', () => {
    render(<CardList list={[mockCharacter]} />);
    expect(screen.getByText('Test Character')).toBeInTheDocument();
  });

  it('should call addFavorite when a non-favorite character is clicked', () => {
    mockIsFavorite.mockReturnValue(false);
    render(<CardList list={[mockCharacter]} />);
    fireEvent.click(screen.getByText('Test Character'));
    expect(mockAddFavorite).toHaveBeenCalledWith(mockCharacter);
  });

  it('should call removeFavorite when a favorite character is clicked', () => {
    mockIsFavorite.mockReturnValue(true);
    render(<CardList list={[mockCharacter]} />);
    fireEvent.click(screen.getByText('Test Character'));
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('should navigate to character detail page if isFromFavorites is true', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: mockIsFavorite,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      isFromFavorites: true,
    });
    render(<CardList list={[mockCharacter]} />);
    fireEvent.click(screen.getByText('Test Character'));
    expect(mockPush).toHaveBeenCalledWith(`/character/${mockCharacter.id}`);
  });
});
