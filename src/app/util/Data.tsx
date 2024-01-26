"use client";
import React from "react";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

interface Props {
  data: string[][];
}

export default function Data({ data }: Props) {
  // console.log("🚀 ~ Data ~ data:", data);
  // Timestamp	Email Address	Full name	Linkedin account	Github account	Governorate	Experience at	Name what you have experience in	Your Job title	A Breife detail about you expreince	Your projects links	Your Certificates	Job title	Breife detail about you expreince	Projects links	Certificates

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    // { field: "Timestamp", headerName: "Timestamp", width: 200 },
    { field: "Full name", headerName: "Full name", width: 200 },
    // { field: "EmailAddress", headerName: "Email Address", width: 200 },
    { field: "Experience at", headerName: "Experience at", width: 200 },
    { field: "Job title", headerName: "Job title", width: 200 },
    {
      field: "Linkedin account",
      headerName: "Linkedin account",
      width: 200,
    },
    { field: "Github account", headerName: "Github account", width: 200 },
    { field: "Governorate", headerName: "Governorate", width: 200 },

    {
      field: "Brief detail about you experience",
      headerName: "Brief detail about you experience",
      width: 200,
    },
    // { field: "ProjectsLinks", headerName: "Projects links", width: 200 },
    // { field: "Certificates", headerName: "Certificates", width: 200 },
  ];

  //   add id to rows data
  const rows = data.map((item, index) => {
    // check any empty cells and replace with "N/A"

    return {
      id: index,
      ...item,
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
      }}
      // add a button down
      // components={{
      //   Toolbar: GridToolbar,

      // }}
    />
  );
}
