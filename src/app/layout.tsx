"use client";

import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./layout.css";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Skill me",
//   description: "Application to help you learn new skills",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // black theme

  return (
    <html lang="en">
      <title>Skill me</title>
      <meta
        name="description"
        content="Application to help you learn new skills"
      />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
