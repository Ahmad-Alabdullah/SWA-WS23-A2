import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LoginProvider } from '@/context/LoginProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend with Next',
  description: 'Created by Team 10',
};

const Nav = dynamic(() => import('@/components/Nav'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <AppRouterCacheProvider>
          <LoginProvider>
            <Nav></Nav>
            <div>{children}</div>
          </LoginProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
