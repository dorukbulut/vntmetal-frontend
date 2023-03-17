import StrBush from "../components/Dashboards/general/forms/QuotationMake/TypeForms/StrBush";
import PlateStrip from "../components/Dashboards/general/forms/QuotationMake/TypeForms/PlateStrip";
import BracketBush from "../components/Dashboards/general/forms/QuotationMake/TypeForms/BracketBush";
import DoubleBracketBush from "../components/Dashboards/general/forms/QuotationMake/TypeForms/DoubleBracketBush";
import MiddleBracketBush from "../components/Dashboards/general/forms/QuotationMake/TypeForms/MiddleBracketBush";

export const ITEM_TYPES = {
  plate_strip: "Plaka",
  straight_bush: "Düz Burç",
  bracket_bush: "Flanşlı Burç",
  doublebracket_bush: "Çift Flanşlı Burç",
  middlebracket_bush: "Ortadan Flanşlı Burç",
};

export const IMAGE_MAPPER = {
  plate_strip: "/platestrip.png",
  straight_bush: "/straightbush.png",
  bracket_bush: "/bracketbush.png",
  doublebracket_bush: "/doublebracket.png",
  middlebracket_bush: "/middlebracket.png",
};

export const steps = [
  "Teklif Tipi Seç",
  "Teklif Hazırla",
  "Teklif Oluştur",
  "İşlemi Tamamla",
];

export const TYPE = [
  { title: "Düz Burç", value: "straight_bush" },
  { title: "Plaka", value: "plate_strip" },
  { title: "Flanşlı Burç", value: "bracket_bush" },
  { title: "Ortadan Flanşlı Burç", value: "middlebracket_bush" },
  { title: "Çift Flanşlı Burç", value: "doublebracket_bush" },
];
export const QUOTYPE = [
  { title: "Anlaşmalı Teklif Hazırlama", id: "0" },
  { title: "Hammade Üzerinden Teklif Hazırlama", id: "1" },
];
export const TYPE_COMPS = {
  straight_bush: <StrBush />,
  plate_strip: <PlateStrip />,
  bracket_bush: <BracketBush />,
  doublebracket_bush: <DoubleBracketBush />,
  middlebracket_bush: <MiddleBracketBush />,
};
