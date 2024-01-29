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
  // interface Data {
  //   spreadsheetId: string;
  //   valueRanges: ValueRange[];
  // }

  // interface ValueRange {
  //   range: string;
  //   majorDimension: string;
  //   values: string[][];
  // }

  interface ReturnData {
    [key: string]: string;
  }

  const { rowNumber } = req.query;
  let rowNumbered: number;
  try {
    if (
      typeof rowNumber !== "string" ||
      isNaN(Number(rowNumber)) ||
      Number(rowNumber) < 0
    ) {
      return res
        .status(400)
        .json({ message: "Please provide a valid row number" });
    }

    rowNumbered = Number(rowNumber);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Please provide a valid row number" });
  }

  if (
    typeof rowNumbered !== "string" ||
    isNaN(Number(rowNumbered)) ||
    Number(rowNumbered) < 0
  ) {
  }

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

  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: "1FiIbZvrED_QvbLdlLECgb1tyqP2MUl5BGyEJRxUcWyA",
    ranges: [
      `sheet!A${(rowNumbered as number) + 2}:Z${(rowNumbered as number) + 2}`,
    ],
  });

  // remove any empty rows
  interface ValueRange {
    range: string;
    majorDimension: string;
    values: string[][];
  }

  interface Data {
    spreadsheetId: string;
    valueRanges: ValueRange[];
  }

  const data = response.data as Data;
  const values = data.valueRanges[0].values;

  // const headers = values[0];
  // console.log("🚀 ~ headers:", headers);

  // trim all spaces in headers
  // const headers = values[0].map((header) => header.replace(/\s/g, ""));

  //! trim all spaces in headers and make it in PascalCase
  // const headers = values[0].map((header) => {
  //   header = header.replace(/\s/g, "");
  //   return header.charAt(0).toUpperCase() + header.slice(1);
  // });

  // using the function
  // let headers = values[0].map((header) => toPascalCase(header));
  let filteredValues;

  try {
    filteredValues = values.map((row) => {
      row = row.filter(
        (cell) => cell !== undefined && cell !== null && cell !== ""
      );
      return row;
    });
  } catch (error) {
    // console.log("🚀 ~ error:", error);

    res.status(400).json("No data found for that ID");
  }

  // let objects = filteredValues.slice(1).map((row) => {
  //   let obj: ReturnData = {};
  //   headers.forEach((header, i) => {
  //     obj[header] = row[i];
  //   });
  //   return obj;
  // });

  res.status(200).json(/*filteredValues*/ { data: "no data found" });
}
