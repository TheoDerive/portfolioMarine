import Loading from "@/component/Loading";

export const metadata = {
  title: "Marine Sicaud",
  description: "Portfolio de Marine Sicaud",
  icons: {
    icon: "/logoSite.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
