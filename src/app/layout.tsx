"use client";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import { Alert, CssBaseline, Snackbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InfoOpenContext } from "./context/InfoOpenContext";

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
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState<
    "error" | "info" | "success" | "warning" | string
  >("success");
  const [message, setMessage] = React.useState("All good!");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <html lang="en">
      <title>Skill me</title>
      <meta
        name="description"
        content="Application to help you learn new skills"
      />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={inter.className}>
        <InfoOpenContext.Provider
          value={{
            setOpen: setOpen,
            setSeverity: setSeverity,
            setMessage: setMessage,
          }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </InfoOpenContext.Provider>
        <Analytics />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity as any}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </body>
    </html>
  );
}
