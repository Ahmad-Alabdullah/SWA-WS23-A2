import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import { Outlet } from 'react-router-dom';
import LoginContext, { LoginProvider } from '@/context/LoginProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend with Next',
  description: 'Created by Team 10',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <LoginProvider>
          <Nav></Nav>
          <div>{children}</div>
        </LoginProvider>
      </body>
    </html>
  );
}
