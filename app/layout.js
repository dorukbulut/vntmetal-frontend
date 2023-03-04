import "../styles/globals.css";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>DÖKÜM YÖNETİM SİSTEMİ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>{children}</body>
    </html>
  );
}
