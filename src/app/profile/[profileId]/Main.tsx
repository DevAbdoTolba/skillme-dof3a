"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../util/header";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Main() {
  const params = useParams();
  const rowNumber = params?.profileId;
  const [data, setData] = React.useState<string[][]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  useEffect(() => {
    if (isNaN(Number(rowNumber))) {
      return;
    }
    fetch("/api/v1/getSingle?rowNumber=" + rowNumber)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [rowNumber]);
  console.log(data);
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return loading ? (
    "loading"
  ) : (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <div>{data}</div>;
      </ThemeProvider>
    </>
  );
}
