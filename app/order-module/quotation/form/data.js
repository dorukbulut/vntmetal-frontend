export const QuotationInfo = [
  {
    name: "Geçerlilik Süresi",
    type: "text",
    isRequired: false,
    rows: 5,
  },
  {
    name: "Teslimat Açıklaması",
    type: "text",
    isRequired: false,
    rows: 5,
  },
  {
    name: "Ödeme Şekli",
    type: "text",
    isRequired: false,
    rows: 5,
  },

  {
    name: "Ekstra Açıklama",
    type: "text",
    isRequired: false,
    rows: 5,
  },
];

export const TransPortdata = [
  {
    name: "Teslimat Tipi",
    type: "dropdown",
    data: [{ title: "Yurt İçi" }, { title: "Yurt Dışı" }],
    isRequired: true,
  },
  {
    name: "Teslimat Şekli",
    type: "dropdown",
    data: [{ title: "Yurt İçi", title: "Yurt Dışı" }],
    isRequired: true,
  },

  {
    name: "Döviz Tipi",
    type: "dropdown",
    data: [{ title: "Yurt İçi", title: "Yurt Dışı" }],
    isRequired: true,
  },

  {
    name: "Döviz Kuru (TL ise 1 giriniz)",
    type: "number",
    isRequired: true,
  },
  {
    name: "Paketleme Ücreti",
    type: "number",
    isRequired: true,
  },
  {
    name: "Yükleme Ücreti",
    type: "number",
    isRequired: true,
  },
  {
    name: "Taşıma Ücreti",
    type: "number",
    isRequired: true,
  },
  {
    name: "Açıklama",
    type: "text",
    isRequired: true,
  },
];
export const TransPortDataExtra = [
  {
    name: "Liman veya Belirlenen Yerde teslim Ücreti",
    type: "number",
    isRequired: true,
  },
  {
    name: "İhracat Prosedür Ücretleri",
    type: "number",
    isRequired: true,
  },
  {
    name: "Çıkış terminali Ücretleri",
    type: "number",
    isRequired: true,
  },
  {
    name: "Araca Yükleme Ücreti",
    type: "number",
    isRequired: true,
  },
  {
    name: "Varış Terminali Ücreti",
    type: "number",
    isRequired: true,
  },
  {
    name: "Araca Yükleme Ücreti",
    type: "number",
    isRequired: true,
  },

  {
    name: "İthalat Prosedür Ücreti",
    type: "number",
    isRequired: true,
  },
];

export const PreparedData = [
  {
    name: "Hazırlayan",
    type: "text",
    isRequired: true,
  },

  {
    name: "Onaylayan",
    type: "text",
    isRequired: true,
  },
];

export const INCOTERMS_EXTRA = [
  {
    title: "EXW",
  },
  {
    title: "FCA",
  },
  {
    title: "FAS",
  },
  { title: "FOB" },
  {
    title: "CFR",
  },
  {
    title: "CIF",
  },
  {
    title: "CPT",
  },
  {
    title: "CIP",
  },
  {
    title: "DAP",
  },
  {
    title: "DPU",
  },
  {
    title: "DDP",
  },
];

export const INCOTERMS_INTRA = [
  {
    title: "VNTFT",
  },
  {
    title: "MT",
  },
  {
    title: "ARAS",
  },

  {
    title: "UPS",
  },
];
