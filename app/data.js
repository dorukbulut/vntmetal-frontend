import PersonIcon from "@mui/icons-material/Person";
import NoteIcon from "@mui/icons-material/Note";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FactoryIcon from "@mui/icons-material/Factory";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import InventoryIcon from "@mui/icons-material/Inventory";

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

    "production-module": [
      {
        name: "Ocak ve Dökümhane",
        logo: <FactoryIcon />,
        path: "/production-module/production",
      },
      {
        name: "Atölye",
        logo: <PrecisionManufacturingIcon />,
        path: "/production-module/atelier",
      },
      {
        name: "Stok Bilgileri",
        logo: <InventoryIcon />,
        path: "/production-module/stock",
      },
      { name: "Çıkış", logo: <ExitToAppIcon />, path: "/homepage" },
    ],
    "qc-module": [
      {
        name: "Ocak ve Dökümhane",
        logo: <FactoryIcon />,
        path: "/qc-module/production",
      },
      {
        name: "Atölye",
        logo: <PrecisionManufacturingIcon />,
        path: "/qc-module/atelier",
      },
      { name: "Çıkış", logo: <ExitToAppIcon />, path: "/homepage" },
    ],
    "shipment-module": [
      {
        name: "Müşteri Sevkiyat",
        logo: <FactoryIcon />,
        path: "/shipment-module/customer-shipment",
      },
      {
        name: "Paketleme",
        logo: <PrecisionManufacturingIcon />,
        path: "/shipment-module/packaging",
      },
      { name: "Çıkış", logo: <ExitToAppIcon />, path: "/homepage" },
    ],
    "report-module": [
      {
        name: "Teklif Raporları",
        logo: <FactoryIcon />,
        path: "/report-module/quotations",
      },
      {
        name: "Sipariş Raporları",
        logo: <PrecisionManufacturingIcon />,
        path: "/report-module/orders",
      },
      {
        name: "İş Emri Raporları",
        logo: <PrecisionManufacturingIcon />,
        path: "/report-module/work-orders",
      },
      {
        name: "Sevkiyat Raporları",
        logo: <PrecisionManufacturingIcon />,
        path: "/report-module/shipment",
      },
      { name: "Çıkış", logo: <ExitToAppIcon />, path: "/homepage" },
    ],
  },
];
