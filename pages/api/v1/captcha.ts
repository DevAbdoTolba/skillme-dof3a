import { google, sheets_v4 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get from the post request data : response
  const { response } = req.body;

  //   https://www.google.com/recaptcha/api/siteverify?secret=your_secret&response=response_string&remoteip=user_ip_address

  // send the response to google

  const checkCaptcha = async () => {
    fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_RECAPTCHA_SITE_KEY}&response=${response}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        res.status(200).json({
          state: data.success,
        });
      });
  };
  checkCaptcha();
}
