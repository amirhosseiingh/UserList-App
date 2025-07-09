// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './provider'; 
import { Toaster } from 'react-hot-toast'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Management App',
  description: 'A simple CRUD app with Next.js and React Query',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
