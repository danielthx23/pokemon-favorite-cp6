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
      <body className="bg-gradient-to-br from-teal-200 to-blue-300 text-white h-screen flex items-center justify-center">
        <div className="p-6 rounded-lg h-full w-full max-w-4xl">
          <header className="text-center mb-6 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-neutral-950">Pokemon TCG Explorer</h1>
            <p className="text-neutral-900">Descubra cartas e detalhes de Pokémon</p>
          </header>
          <main>{children}</main>
          <footer className="text-center text-sm mt-6 text-neutral-950 flex flex-col gap-2">
            <p>Danilo Correia e Silva RM 557540</p>
            <p>Ricardo Rodrigues Cotovasso RM 558295</p>
            <p>Daniel Saburo Akiyama RM 558263</p>
          </footer>
        </div>
      </body>
    </html>
  );
}