import "./globals.css";

export const metadata = {
  title: "Rewear PLatform",
  description: "A platform for rewearing clothes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
