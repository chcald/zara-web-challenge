import { AppProps } from 'next/app';
import { LoadingProvider } from '../contexts/LoadingContext';
import { FavoritesProvider } from '../contexts/FavoritesContext'; 
// import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LoadingProvider>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </LoadingProvider>
  );
};

export default MyApp;
