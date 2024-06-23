import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterSearch } from '../CharacterSearch';
import { useSearch } from '../../contexts/SearchContext';
import { useFavorites } from '../../contexts/FavoritesContext';

jest.mock('../../contexts/SearchContext', () => ({
  useSearch: jest.fn(),
}));

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

describe('CharacterSearch component', () => {
  const mockHandleSearchChange = jest.fn();
  const mockSearchQuery = 'Spider-Man';

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      searchQuery: mockSearchQuery,
    });

    (useFavorites as jest.Mock).mockReturnValue({
        favorites: characterMocklist,
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title and search input correctly', () => {
    render(
      <CharacterSearch
        title="Favorites"
        handleSearchChange={mockHandleSearchChange}
        characters={[]}
        error={null}
      />,
    );

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('SEARCH A CHARACTER...'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toHaveValue(
      mockSearchQuery,
    );
  });

  it('calls handleSearchChange on input change', () => {
    render(
      <CharacterSearch
        title="Search Characters"
        handleSearchChange={mockHandleSearchChange}
        characters={[]}
        error={null}
      />,
    );

    const searchInput = screen.getByPlaceholderText('SEARCH A CHARACTER...');
    fireEvent.change(searchInput, { target: { value: 'Iron Man' } });

    expect(mockHandleSearchChange).toHaveBeenCalled();
  });

  it('renders the result count correctly', () => {
    render(
      <CharacterSearch
        title="Search Characters"
        handleSearchChange={mockHandleSearchChange}
        characters={characterMocklist}
        error={null}
      />,
    );

    expect(screen.getByText('2 RESULTS')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const error: Error = {
      message: 'Failed to fetch characters',
      name: '',
    };

    render(
      <CharacterSearch
        title="Search Characters"
        handleSearchChange={mockHandleSearchChange}
        characters={[]}
        error={error}
      />,
    );

    expect(
      screen.getByText('Error: Failed to fetch characters'),
    ).toBeInTheDocument();
  });

  it('renders the character list correctly', () => {
    render(
      <CharacterSearch
        title="Search Characters"
        handleSearchChange={mockHandleSearchChange}
        characters={characterMocklist}
        error={null}
      />,
    );

    characterMocklist.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});
