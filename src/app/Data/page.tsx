"use client";
import { Alert } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Page() {
  return (
    <>
      <Alert severity="error">
        {`
        Hold on just a sec, love! Seems like your access request got tangled up
        along the way. Turns out, you haven't quite unlocked the magic key to
        reach this route yet. Don't worry, it's nothing a little authentication
        can't fix. Just double-check your login credentials, maybe give that
        captcha a refresh if it's been a while, and try again. Boom! You'll be
        whisked away to your destination in no time. In the meantime, feel free
        to check out our help center at
        https://www.linkedin.com/in/devabdotolba/ for any extra guidance on
        navigating the authentication maze. And hey, if things still feel wonky,
        our super-powered support team is just a click away, ready to unravel
        any lingering knots. Remember, with the right login and a dash of
        patience, this little detour will feel like a blip in no time! We can't
        wait to welcome you in properly.
     `}
      </Alert>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  );
}
