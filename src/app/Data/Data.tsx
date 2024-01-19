"use client";
import React from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  data: string[][];
}

export default function Data({ data }: Props) {
  console.log("🚀 ~ Data ~ data:", data);
  // Timestamp	Email Address	Full name	Linkedin account	Github account	Governorate	Experience at	Name what you have experience in	Your Job title	A Breife detail about you expreince	Your projects links	Your Certificates	Job title	Breife detail about you expreince	Projects links	Certificates

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    // { field: "Timestamp", headerName: "Timestamp", width: 200 },
    { field: "FullName", headerName: "Full name", width: 200 },
    // { field: "EmailAddress", headerName: "Email Address", width: 200 },
    { field: "ExperienceAt", headerName: "Experience at", width: 200 },
    { field: "JobTitle", headerName: "Job title", width: 200 },
    {
      field: "LinkedinAccount",
      headerName: "Linkedin account",
      width: 200,
    },
    { field: "GithubAccount", headerName: "Github account", width: 200 },
    { field: "Governorate", headerName: "Governorate", width: 200 },

    {
      field: "BriefDetailAboutYourExperience",
      headerName: "Brief detail about you experience",
      width: 200,
    },
    // { field: "ProjectsLinks", headerName: "Projects links", width: 200 },
    // { field: "Certificates", headerName: "Certificates", width: 200 },
  ];

  //   add id to rows data
  const rows = data.map((row, index) => {
    /*
    
    */
    return {
      id: index,
      Timestamp: row[0],
      EmailAddress: row[1],
      FullName: row[2],
      LinkedinAccount: row[3],
      GithubAccount: row[4],
      Governorate: row[5],
      ExperienceAt: row[6],
      JobTitle: row[7],
      BriefDetailAboutYourExperience: row[8],
      ProjectsLinks: row[9],
      Certificates: row[10],
    };
  });
  console.log("🚀 ~ rows ~ rows:", rows);

  return (
    <DataGrid
      sx={{
        height: "92dvh",
        "& .MuiDataGrid-row": {
          transition: "all 0.2s  ease-in-out",

          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.02) translate(8px, -2px)",
            transition: "all 0s  ease-in-out",
          },
          "&:active": {
            transform: "scale(1.0) translate(0px, -1px)",
            transition: "all 0s  ease-in-out",
          },
        },
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
      }}
      disableRowSelectionOnClick
      rowCount={rows.length}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      //   getRowId={(row) => row[0]}
      rows={rows}
      columns={columns}
      onRowClick={(row) => {
        console.log("🚀 ~ row ~ row", row);
        window.location.href = `/profile/${row.row.id}`;
      }}
    />
  );
}
