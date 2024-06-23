import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CardList } from '../CardList';
import { useFavorites } from '../../contexts/FavoritesContext';

jest.mock('../../contexts/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

const characterMocklist: Character[] = [
  {
    id: 1,
    name: 'Character 1',
    thumbnail: { path: '/path1', extension: 'jpg' },
    description: '',
    modified: '',
    resourceURI: '',
    comics: {
      available: 0,
      collectionURI: '',
      items: [{ resourceURI: '', name: '' }],
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
  },
  {
    id: 2,
    name: 'Character 2',
    thumbnail: { path: '/path2', extension: 'jpg' },
    description: '',
    modified: '',
    resourceURI: '',
    comics: {
      available: 0,
      collectionURI: '',
      items: [{ resourceURI: '', name: '' }],
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
  },
];

describe('CardList component', () => {
  const mockFavorites = {
    favorites: [] as Character[],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
  };

  beforeEach(() => {
    (useFavorites as jest.Mock).mockReturnValue(mockFavorites);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of cards correctly', () => {
    render(<CardList list={characterMocklist} />);

    characterMocklist.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('handles add favorite click correctly', async () => {
    render(<CardList list={characterMocklist} />);

    const favoriteIcon = screen.getAllByAltText('Favorite Hero')[0];
    await act(async () => {
      fireEvent.click(favoriteIcon);
    });

    expect(mockFavorites.addFavorite).toHaveBeenCalledWith(
      characterMocklist[0],
    );
  });

  it('handles remove favorite click correctly', async () => {
    mockFavorites.favorites = [characterMocklist[0]];
    (useFavorites as jest.Mock).mockReturnValue(mockFavorites);
    render(<CardList list={characterMocklist} />);

    const favoriteIcon = screen.getAllByAltText('Favorite Hero')[0];
    await act(async () => {
      fireEvent.click(favoriteIcon);
    });

    expect(mockFavorites.removeFavorite).toHaveBeenCalledWith(
      characterMocklist[0].id,
    );
  });
});
