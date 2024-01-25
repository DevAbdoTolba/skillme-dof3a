"use client";

import type { Metadata } from "next";
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
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
