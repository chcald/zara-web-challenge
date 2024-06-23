import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Header from '../Header';
import { useLoading } from '../../contexts/LoadingContext';
import { useSearch } from '../../contexts/SearchContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../contexts/SearchContext', () => ({
  useSearch: jest.fn(),
}));

jest.mock('../../contexts/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('../../contexts/LoadingContext', () => ({
  useLoading: jest.fn(),
}));

describe('Header component', () => {
  const mockPush = jest.fn();
  const mockResetSearch = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [
        { id: 1, name: 'name 1' },
        { id: 2, name: 'name 2' },
        { id: 3, name: 'name 3' },
      ],
    });
    (useSearch as jest.Mock).mockReturnValue({
      resetSearch: mockResetSearch,
      setError: mockSetError,
      setLoading: jest.fn(),
    });

    // Mock useLoading with async behavior
    (useLoading as jest.Mock).mockReturnValue({
      loading: true,
    });
  });

  it('renders correctly and handles logo click', async () => {
    await act(async () => {
      render(<Header />);
    });

    const logoWrapper = screen.getByTestId('logo-wrapper');
    expect(logoWrapper).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(logoWrapper);
    });
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockResetSearch).toHaveBeenCalled();
  });

  it('renders favorites counter correctly', async () => {
    await act(async () => {
      render(<Header />);
    });

    const favoritesCounterWrapper = screen.getByTestId(
      'favorites-counter-wrapper',
    );
    expect(favoritesCounterWrapper).toBeInTheDocument();

    expect(screen.getByText('3')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(favoritesCounterWrapper);
    });

    expect(mockPush).toHaveBeenCalledWith('/favorites');
  });
});
