import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearch } from '../../contexts/SearchContext';
import { CharacterSearch } from '../../components/CharacterSearch';
import { useFavorites } from '@/contexts/FavoritesContext';

jest.mock('../../contexts/SearchContext', () => ({
  useSearch: jest.fn(),
}));

jest.mock('../../contexts/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span>Search Icon</span>,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// Mock FontAwesomeIcon
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span>Search Icon</span>,
}));

const mockSetSearchQuery = jest.fn();

const mockCharacter: Character = {
  id: 1,
  name: 'Test Character',
  thumbnail: { path: 'path/to/image', extension: 'jpg' },
  description: '',
  modified: '',
  resourceURI: '',
  comics: {
    available: 0,
    collectionURI: '',
    items: [{ resourceURI: '', name: '', type: '' }],
    returned: 0,
  },
  series: {
    available: 0,
    collectionURI: '',
    items: [{ resourceURI: '', name: '', type: '' }],
    returned: 0,
  },
  stories: {
    available: 0,
    collectionURI: '',
    items: [{ resourceURI: '', name: '', type: '' }],
    returned: 0,
  },
  events: {
    available: 0,
    collectionURI: '',
    items: [{ resourceURI: '', name: '', type: '' }],
    returned: 0,
  },
  urls: [{ type: 'detail', url: 'http://test.url' }],
};

describe('CharacterSearch', () => {
  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
    });

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
    });
  });

  it('should render the title if provided', () => {
    render(
      <CharacterSearch
        title="Test Title"
        handleSearchChange={() => {}}
        characters={[]}
        error={null}
      />,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should call handleSearchChange on input change', () => {
    const handleSearchChange = jest.fn();
    render(
      <CharacterSearch
        handleSearchChange={handleSearchChange}
        characters={[]}
        error={null}
      />,
    );
    fireEvent.change(screen.getByPlaceholderText('SEARCH A CHARACTER...'), {
      target: { value: 'Spider' },
    });
    expect(handleSearchChange).toHaveBeenCalled();
  });

  it('should display the correct number of results', () => {
    render(
      <CharacterSearch
        handleSearchChange={() => {}}
        characters={[mockCharacter]}
        error={null}
      />,
    );
    expect(screen.getByText('1 RESULT')).toBeInTheDocument();
  });

  it('should display an error message if error is provided', () => {
    const error = { message: 'Error fetching characters' };
    render(
      <CharacterSearch
        handleSearchChange={() => {}}
        characters={[]}
        error={error as Error}
      />,
    );
    expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
  });

  it('should render CardList with characters', () => {
    render(
      <CharacterSearch
        handleSearchChange={() => {}}
        characters={[mockCharacter]}
        error={null}
      />,
    );
    expect(screen.getByText('Test Character')).toBeInTheDocument();
  });
});
