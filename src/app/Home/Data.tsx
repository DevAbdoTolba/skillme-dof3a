"use client";
import React from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  data: string[][];
}

export default function Data({ data }: Props) {
  console.log("🚀 ~ Data ~ data:", data);
  // Timestamp	Email Address	Full name	Linkedin account	Github account	Governorate	Experience at	Name what you have experience in	Your Job title	A Breife detail about you expreince	Your projects links	Your Certificates	Job title	Breife detail about you expreince	Projects links	Certificates

  //   add id to rows data
  const rows = data.map((row, index) => {
    return {
      id: index,
      Timestamp: row[0],
      EmailAddress: row[1],
      Fullname: row[2],
      Linkedinaccount: row[3],
      Githubaccount: row[4],
      Governorate: row[5],
      Experienceat: row[6],
      Jobtitle: row[7],
      Breifedetailaboutyouexpreince: row[8],
      Projectslinks: row[9],
      Certificates: row[10],
    };
  });
  console.log("🚀 ~ rows ~ rows:", rows);

  return (
    <DataGrid
      sx={{
        height: 400,
      }}
      //   getRowId={(row) => row[0]}
      rows={rows}
      columns={[
        { field: "Timestamp", headerName: "Timestamp", width: 200 },
        { field: "Email Address", headerName: "Email Address", width: 200 },
        { field: "Full name", headerName: "Full name", width: 200 },
        {
          field: "Linkedin account",
          headerName: "Linkedin account",
          width: 200,
        },
        { field: "Github account", headerName: "Github account", width: 200 },
        { field: "Governorate", headerName: "Governorate", width: 200 },
        { field: "Experience at", headerName: "Experience at", width: 200 },
        {
          field: "Name what you have experience in",
          headerName: "Name what you have experience in",
          width: 200,
        },
        { field: "Your Job title", headerName: "Your Job title", width: 200 },
        {
          field: "A Breife detail about you expreince",
          headerName: "A Breife detail about you expreince",
          width: 200,
        },
        {
          field: "Your projects links",
          headerName: "Your projects links",
          width: 200,
        },
        {
          field: "Your Certificates",
          headerName: "Your Certificates",
          width: 200,
        },
        { field: "Job title", headerName: "Job title", width: 200 },
        {
          field: "Breife detail about you expreince",
          headerName: "Breife detail about you expreince",
          width: 200,
        },
        { field: "Projects links", headerName: "Projects links", width: 200 },
        { field: "Certificates", headerName: "Certificates", width: 200 },
      ]}
    />
  );
}
