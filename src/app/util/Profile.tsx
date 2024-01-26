import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type DataTypeForRow = {
  id: number;
  Timestamp: string;
  "Email Address": string;
  "Full name": string;
  "Linkedin account": string;
  "Github account": string;
  Governorate: string;
  "Experience at": string;
  "Job title": string;
  "Brief detail about you experience": string;
  "Projects links": string;
  Certificates: string;
  "Phone number": string;
};
interface Props {
  data: DataTypeForRow;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Profile({ data, open, setOpen }: Props) {
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        scroll={"paper"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            "& a": {
              color: "white",
            },
          }}
        >
          Full name : {data["Full name"]} <br />
          <Link href={`mailto:${data["Email Address"]}`} target="_blank">
            Email Address : {data["Email Address"]} <br />
          </Link>
          <Link href={`https://wa.me/${data["Phone number"]}`} target="_blank">
            Phone number : {data["Phone number"]} <br />
          </Link>
          <Link href={data["Linkedin account"]} target="_blank">
            Linkedin account : {data["Linkedin account"]} <br />
          </Link>
          <Link href={data["Github account"]} target="_blank">
            Github account : {data["Github account"]} <br />
          </Link>
          Governorate : {data["Governorate"]} <br />
          Experience at : {data["Experience at"]} <br />
          Job title : {data["Job title"]} <br />
          Brief detail about you experience :{" "}
          {data["Brief detail about you experience"]} <br />
          Projects links : {data["Projects links"]} <br />
          Certificates : {data["Certificates"]} <br />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
