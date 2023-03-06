"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ error }) {
  const [state, setState] = React.useState({
    open: error.isOpen,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  React.useEffect(() => {
    setState({ ...state, open: error.isOpen });
  }, [error]);
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div width="w-screen">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert severity={error.type}>
            <AlertTitle>{error.title}</AlertTitle>
            {error.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
