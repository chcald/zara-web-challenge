import { render } from '@testing-library/react';
import HomePage from '../page';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { SearchProvider } from '../../contexts/SearchContext';
import { FavoritesProvider } from '../../contexts/FavoritesContext';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      pathname: '/',
      push: jest.fn(),
    }),
  }));

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <SearchProvider>
        <LoadingProvider>
          <FavoritesProvider>
            <HomePage />
          </FavoritesProvider>
        </LoadingProvider>
      </SearchProvider>,
    );

  });
});
