import PersonIcon from "@mui/icons-material/Person";
import NoteIcon from "@mui/icons-material/Note";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const navlist = [
  {
    "order-module": [
      {
        name: "Müşterilerim",
        logo: <PersonIcon />,
        path: "/order-module/customer",
      },
      {
        name: "Tekliflerim",
        logo: <NoteIcon />,
        path: "/order-module/quotation",
      },
      {
        name: "Siparişlerim",
        logo: <ReceiptIcon />,
        path: "/order-module/order-confirmation",
      },
      {
        name: "İş Emirlerim",
        logo: <LocalPrintshopIcon />,
        path: "/order-module/work-order",
      },
      { name: "Çıkış", logo: <ExitToAppIcon />, path: "/homepage" },
    ],
  },
];
