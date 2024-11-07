import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Cards Pokemon',
  description: 'Site para favoritar seus cards favoritos de Pokemon.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-green-700 text-white min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold">Pokemon TCG Explorer</h1>
            <p className="text-gray-400">Descubra cartas e detalhes de Pokémon</p>
          </header>
          <main>{children}</main>
          <footer className="text-center text-sm mt-6 text-gray-500">
            <p>Danilo Correia e Silva RM 557540</p>
            <p>Ricardo Rodrigues Cotovasso RM 558295</p>
          </footer>
        </div>
      </body>
    </html>
  );
}