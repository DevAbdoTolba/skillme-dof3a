"use client";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import DataPage from "./Data/page";
import Image from "next/image";

export default function Main() {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(captcha);
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
          <Image
            src={"/cat.gif"}
            width={150}
            height={150}
            alt="cat polishing it's nails waiting for you to confirm that you are not a bot"
          />
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
