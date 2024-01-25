import { google, sheets_v4 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
function toPascalCase(str: string) {
  const matches = str.match(/[a-z]+/gi);
  if (matches) {
    return matches
      .map(function (word: string) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      })
      .join("");
  }
  return "";
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  interface ReturnData {
    [key: string]: string;
  }

  // const { range } = req.query;

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
    auth: client as any,
  }) as sheets_v4.Sheets;

  // const response = await sheets.spreadsheets.values.batchGet({
  //   spreadsheetId: "1FiIbZvrED_QvbLdlLECgb1tyqP2MUl5BGyEJRxUcWyA",
  //   ranges: ["sheet!A1:Z90"],
  // });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1FiIbZvrED_QvbLdlLECgb1tyqP2MUl5BGyEJRxUcWyA",
    range: "sheet!A1:Z90",
  });

  // remove any empty rows

  interface Data {
    range: string;
    majorDimension: string;
    values: string[][];
  }

  const data = response.data as Data;
  const values = data.values;

  const headers = values[0];

  // trim all spaces in headers
  // const headers = values[0].map((header) => header.replace(/\s/g, ""));

  // //! trim all spaces in headers and make it in PascalCase
  // const headers = values[0].map((header) => {
  //   header = header.replace(/\s/g, "");
  //   return header.charAt(0).toUpperCase() + header.slice(1);
  // });

  // using the function
  // let headers = values[0].map((header) => toPascalCase(header));

  // const filteredValues = values.map((row) => {
  //   row = row.filter(
  //     (cell) => cell !== undefined && cell !== null && cell !== ""
  //   );
  //   return row;
  // });

  let objects = values.slice(1).map((row) => {
    let obj: ReturnData = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return obj;
  });

  res.status(200).json(objects);
}
