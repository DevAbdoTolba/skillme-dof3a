"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState, lazy } from "react";
import Loader from "./Loader";

const Data = lazy(() => import("./Data"));
const Header = lazy(() => import("./header"));

/* 
    {
spreadsheetId: "1FiIbZvrED_QvbLdlLECgb1tyqP2MUl5BGyEJRxUcWyA",
valueRanges: [
{
range: "sheet!A2:V90",
majorDimension: "ROWS",
values: [
[
"1/19/2024 6:22:48",
"mtolba2004@gmail.com",
"Abdulrahamn Ahmed Mohamed Ahmed Tolba",
"https://www.linkedin.com/in/devabdotolba/",
"https://github.com/DevAbdoTolba",
"المنيا",
"Web (front, back)",
"",
"",
"",
"",
"",
"Frontend engineer",
"Very happy",
"https://github.com/DevAbdoTolba/theday
https://github.com/DevAbdoTolba/AAA-AAST-WEB_Project",
"https://drive.google.com/open?id=1w-aBpWQ41fl3EAEse9CGtdmZUH3p6u7C, https://drive.google.com/open?id=1PU1-Bj_aldNfoyuT0vG75cvPsUfim4vW"
]
]
}
]
}
    */

interface Props {
  valid: boolean;
}

// interface DataType {
//   data: {
//     Timestamp: string;
//     "Email Address": string;
//     "Full name": string;
//     "Linkedin account": string;
//     "Github account": string;
//     Governorate: string;
//     "Experience at": string;
//     "Name what you have experience in": string;
//     "Your Job title": string;
//     "A Breife detail about you expreince": string;
//     "Your projects links": string;
//     "Your Certificates": string;
//     "Job title": string;
//     "Breife detail about you expreince": string;
//     "Projects links": string;
//     Certificates: string;
//   }[];
// }

type DataType = {
  Timestamp: string;
  "Email Address": string;
  "Full name": string;
  "Linkedin account": string;
  "Github account": string;
  Governorate: string;
  "Experience at": string;
  "Job title": string;
  "Brief detail about you experience": string;
  "Projects links": string;
  Certificates: string;
  "Phone number": string;
}[];

export default function Main({ valid }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataType>([
    {
      Timestamp: "",
      "Email Address": "",
      "Full name": "",
      "Linkedin account": "",
      "Github account": "",
      Governorate: "",
      "Experience at": "",
      "Job title": "",
      "Brief detail about you experience": "",
      "Projects links": "",
      Certificates: "",
      "Phone number": "",
    },
  ]);

  useEffect(() => {
    fetch("/api/v1/getAll?range=sheet!A2:Z90")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });

    // listen for refreash or leave the page

    // window.addEventListener("beforeunload", (e) => {
    //   // e.preventDefault();
    //   e.returnValue =
    //     "Are you sure you want to leave? you will need to re-enter the captcha again";
    // });
  }, []);

  console.log(data);

  return valid ? (
    loading ? (
      <>
        <Loader />
        <Box
          // center
          sx={{
            position: "absolute",
            top: "80%",

            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        </Box>
      </>
    ) : (
      <>
        <Header />

        <Data data={data} />
      </>
    )
  ) : (
    <>
      {(() => {
        window.location.href = "/";
        return <>hello</>;
      })()}
    </>
  );
}
