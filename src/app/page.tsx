"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { InfoOpenContext } from "./context/InfoOpenContext";

import DataPage from "./util/DataMain";
import Image from "next/image";

import "./page.css";

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

export default function Main() {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setOpen, setSeverity, setMessage } =
    React.useContext(InfoOpenContext);
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captcha) {
      console.log("captcha is valid");
    } else {
      console.log("captcha is not valid");
    }
  };

  useEffect(() => {
    console.log(captcha);

    if (captcha) {
      setLoading(true);
      setValid(true);
      fetch("/api/v1/getAll?captchaResponse=" + captcha)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setLoading(false);
            setValid(false);

            setOpen(true);
            setSeverity("error");
            setMessage(data.message);
          } else {
            setLoading(false);
            setValid(true);
            setData(data);
          }
        })

        .catch((err) => {
          setLoading(false);
          setValid(false);
          setOpen(true);
          setSeverity("error");
          setMessage("Captcha is not valid");
        });

      // setValid(true);
      // history.pushState({ id: "data" }, "", "Data");
    } else {
      setValid(false);
    }
  }, [captcha]);

  return (
    <>
      {valid && data ? (
        <DataPage
          loading={loading}
          valid={valid}
          response={captcha}
          data={data}
          setData={setData}
        />
      ) : (
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              width: 150,
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s  ease-in-out",
              "&:active": {
                transform: "scale(1.05) ",
              },

              "&::after": {
                content: "''",
                position: "absolute",
                top: "50%",
                left: "40%",
                width: "10%",
                height: "10%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(107,189,254,1) 0%, rgba(254,107,139,1) 8%, rgba(131,254,111,1) 22%, rgba(131,254,111,1) 36%, rgba(113,105,229,1) 51%, rgba(232,0,0,1) 77%, rgba(255,142,83,1) 96%, rgba(248,255,83,1) 100%)",
                zIndex: -1,
                transition: "all .2s  ease-in-out",
                // animation: "circleColors 10s infinite alternate",
              },

              "&:active::after": {
                width: "200%",
                height: "200%",
                transform: "scale(10)",
                transition: "all 7s  ease-in-out",
              },
            }}
          >
            <Image
              src={"/cat.gif"}
              width={150}
              height={150}
              alt="cat polishing it's nails waiting for you to confirm that you are not a bot"
              priority={true}
              draggable={false}
            />
          </Box>
          <ReCAPTCHA
            sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={(v: string) => {
              setCaptcha(v);
              // submit the form
            }}
          />
        </Box>
      )}
    </>
  );
}
