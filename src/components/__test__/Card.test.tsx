import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';
import { useFavorites } from '../../contexts/FavoritesContext';

jest.mock('../../contexts/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

const mockCharacter: Character = {
    id: 1,
    name: 'Character 1',
    thumbnail: { path: '/path1', extension: 'jpg' },
    description: '',
    modified: '',
    resourceURI: '',
    comics: {
      available: 0,
      collectionURI: '',
      items: [{ resourceURI: '', name: '', type: '' }], // Asegúrate de tener un solo objeto en el array
      returned: 0,
    },
    series: {
      available: 0,
      collectionURI: '',
      items: [{ resourceURI: '', name: '' }],
      returned: 0,
    },
    stories: {
      available: 0,
      collectionURI: '',
      items: [{ resourceURI: '', name: '' }],
      returned: 0,
    },
    events: {
      available: 0,
      collectionURI: '',
      items: [{ resourceURI: '', name: '' }],
      returned: 0,
    },
    urls: [{ type: '', url: '' }],
  };
  

describe('Card component', () => {
  const mockHandleCardClick = jest.fn();
  const mockUseFavorites = useFavorites as jest.MockedFunction<typeof useFavorites>;

  beforeEach(() => {
    mockUseFavorites.mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      getFavoriteById: jest.fn(),
      isFromFavorites: false,
      setIsFromFavorites: jest.fn(),
      isFavorite: jest.fn().mockReturnValue(false),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Card character={mockCharacter} handleCardClick={mockHandleCardClick} />);

    expect(screen.getByAltText('Hero image')).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });

  it('calls handleCardClick when card is clicked', () => {
    render(<Card character={mockCharacter} handleCardClick={mockHandleCardClick} />);

    fireEvent.click(screen.getByText(mockCharacter.name));

    expect(mockHandleCardClick).toHaveBeenCalledWith(mockCharacter);
  });

  it('shows the correct favorite icon', () => {
    mockUseFavorites.mockReturnValueOnce({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      getFavoriteById: jest.fn(),
      isFromFavorites: false,
      setIsFromFavorites: jest.fn(),
      isFavorite: jest.fn().mockReturnValue(true), // Mock to return true for favorite
    });

    render(<Card character={mockCharacter} handleCardClick={mockHandleCardClick} />);

    expect(screen.getByAltText('Favorite Hero')).toHaveAttribute('src', '/heart.svg');
  });

  it('shows the correct unfavorite icon', () => {
    render(<Card character={mockCharacter} handleCardClick={mockHandleCardClick} />);

    expect(screen.getByAltText('Favorite Hero')).toHaveAttribute('src', '/unselected-heart.svg');
  });
});
