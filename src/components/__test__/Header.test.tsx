import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { SearchProvider, useSearch } from '../../contexts/SearchContext';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header component', () => {
  const showHeader = () => {
    render(
      <SearchProvider>
        <LoadingProvider>
          <FavoritesProvider>
            <Header />
          </FavoritesProvider>
        </LoadingProvider>
      </SearchProvider>,
    );
  };

  it('should render logo and favorites counter', () => {
    showHeader();
    const logoElement = screen.getByAltText('marvel logo');
    expect(logoElement).toBeInTheDocument();

    const favoritesCounterElement = screen.getByText('0');
    expect(favoritesCounterElement).toBeInTheDocument();
  });

  it('should handle logo click', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    // (useSearch as jest.Mock).mockReturnValue({ resetSearch: jest.fn() });

    showHeader();

    fireEvent.click(screen.getByTestId('logo-wrapper'));

    expect(push).toHaveBeenCalledWith('/');
    // expect(useSearch().resetSearch).toHaveBeenCalled();
  });

  it('should navigate to favorites page on favorites counter click', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    showHeader();

    fireEvent.click(screen.getByTestId('favorites-counter-wrapper'));

    expect(push).toHaveBeenCalledWith('/favorites');
  });
});
