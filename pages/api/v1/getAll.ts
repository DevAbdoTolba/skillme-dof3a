import { google, sheets_v4 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { range } = req.query;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: process?.env?.TYPE,
      project_id: process?.env?.PROJECT_ID,
      private_key_id: process?.env?.PRIVATE_KEY_ID,
      private_key: process?.env?.PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process?.env?.CLIENT_EMAIL,
      client_id: process?.env?.CLIENT_ID,
    },
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
    ],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({
    version: "v4",
    auth: client,
  }) as sheets_v4.Sheets;

  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: "1FiIbZvrED_QvbLdlLECgb1tyqP2MUl5BGyEJRxUcWyA",
    ranges: [range as string],
  });

  res.status(200).json(response.data);
}
