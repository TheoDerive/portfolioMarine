export const metadata = {
  title: "Marine Sicaud",
  description: "Portfolio de Marine Sicaud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
