"use client";
import "../styles/globals.css";
import { Providers } from "./GlobalRedux/provider";
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>DÖKÜM YÖNETİM SİSTEMİ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
