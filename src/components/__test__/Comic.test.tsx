import React from 'react';
import { render, screen } from '@testing-library/react';
import Comic from '../../components/Comic';
import useComicImageService from '../../hooks/useComicImage';

jest.mock('../../hooks/useComicImage');

describe('Comic', () => {
  it('should render loading state', () => {
    (useComicImageService as jest.Mock).mockReturnValue({
      comicImage: '',
      loading: true,
      error: null,
    });

    const mockComic = {
      id: 1,
      name: 'Test Comic',
      resourceURI: 'http://example.com/test-comic',
    };

    render(<Comic {...mockComic} />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorMessage = 'Image not found';
    (useComicImageService as jest.Mock).mockReturnValue({
      comicImage: '',
      loading: false,
      error: new Error(errorMessage),
    });

    const mockComic = {
      id: 1,
      name: 'Test Comic',
      resourceURI: 'http://example.com/test-comic',
    };

    render(<Comic {...mockComic} />);

    expect(
      screen.getByText(`Error loading image ${errorMessage}`),
    ).toBeInTheDocument();
  });

  it('should render comic with image', () => {
    const imageUrl = 'http://example.com/test-image.jpg';
    (useComicImageService as jest.Mock).mockReturnValue({
      comicImage: imageUrl,
      loading: false,
      error: null,
    });

    const mockComic = {
      id: 1,
      name: 'Test Comic',
      resourceURI: 'http://example.com/test-comic',
    };

    render(<Comic {...mockComic} />);

    expect(screen.getByAltText(mockComic.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockComic.name)).toHaveAttribute(
      'src',
      imageUrl,
    );
    expect(screen.getByText(mockComic.name)).toBeInTheDocument();
  });
});
