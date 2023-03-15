"use client";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/navigation";

const actions = [
  {
    icon: <EditIcon />,
    name: "Analiz Güncelle",
    path: "/order-module/quotation/form/analysis",
    type: "update",
  },
  {
    icon: <SaveIcon />,
    name: "Analiz Ekle",
    path: "/order-module/quotation/form/analysis",
    type: "create",
  },
  {
    icon: <PostAddIcon />,
    name: "Teklif Kalemi Ekle",
    path: "/order-module/quotation/form/item",
    type: "create",
  },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

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
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e, path = action.path, type = action.type) => {
              router.replace(path + `?type=${type}`);
            }}
            key={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
