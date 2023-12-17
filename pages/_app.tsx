import { ApolloProvider } from '@apollo/client';
import client from '../constants/apollo-client';
import { useEffect } from 'react';
import { parse } from 'cookie';
import { GetServerSideProps } from 'next';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
  cookies: string;
}

const App: React.FC<AppProps> = ({ Component, pageProps, cookies }) => {
  useEffect(() => {
    const parsedCookies = parse(cookies || '');
    const token = parsedCookies.token;
  }, [cookies]);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie || '',
    },
  };
};

export default App;
