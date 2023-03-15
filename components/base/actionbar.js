"use client";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SaveIcon from "@mui/icons-material/Save";

const actions = [
  { icon: <EditIcon />, name: "Analiz Güncelle" },
  { icon: <SaveIcon />, name: "Analiz Ekle" },
  { icon: <PostAddIcon />, name: "Teklif Kalemi Ekle" },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{
          position: "absolute",
          bottom: 5,
          left: 3,
          "& .MuiFab-primary": { backgroundColor: "#1e40af", color: "#ffffff" },
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
