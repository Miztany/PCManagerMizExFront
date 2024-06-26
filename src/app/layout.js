'use client'

import "./globals.css";
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p&display=swap" rel="stylesheet" />
      </head>
      <body>
        <RecoilRoot>
          {children}
        </RecoilRoot >
      </body>
    </html>

  );
}
