import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import './styles.css';

export const metadata: Metadata = {
  title: 'Bóveda de Juegos',
  description: 'Catálogo de juegos de mesa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
