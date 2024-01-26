"use client";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import DataPage from "./util/DataMain";
import Image from "next/image";

import "./page.css";

export default function Main() {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captcha) {
      console.log("captcha is valid");
    } else {
      console.log("captcha is not valid");
    }
  };

  useEffect(() => {
    if (captcha) {
      setValid(true);
      // push into location /Data
      history.pushState({ id: "data" }, "", "Data");
    } else {
      setValid(false);
    }
  }, [captcha]);

  return (
    <>
      {valid ? (
        <DataPage valid={valid} />
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
