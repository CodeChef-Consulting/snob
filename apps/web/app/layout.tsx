import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '../lib/providers';

export const metadata: Metadata = {
  title: 'Restaurant Ratings',
  description: 'Restaurant ratings from Reddit data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
