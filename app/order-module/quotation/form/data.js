export const QuotationInfo = [
  {
    name: "Geçerlilik Süresi",
    type: "text",
    isRequired: false,
    field: "options",
    area: "validityOfOffer",
    rows: 5,
  },
  {
    name: "Teslimat Açıklaması",
    type: "text",
    isRequired: false,
    field: "options",
    area: "IncotermType",
    rows: 5,
  },
  {
    name: "Ödeme Şekli",
    type: "text",
    isRequired: false,
    field: "options",
    area: "PaymentTerms",
    rows: 5,
  },

  {
    name: "Ekstra Açıklama",
    type: "text",
    isRequired: false,
    field: "options",
    area: "extraDetails",
    rows: 5,
  },
];

export const TransPortdata = [
  {
    name: "Teslimat Şekli",
    type: "dropdown",
    field: "area",
    area: "name",
    data: [{ title: "Yurt İçi" }, { title: "Yurt Dışı" }],
    isRequired: true,
  },
  {
    name: "Teslimat Tipi",
    type: "dropdown",
    field: "delivery_type",
    area: "name",
    data: [{ title: "Yurt İçi", title: "Yurt Dışı" }],
    isRequired: true,
  },

  {
    name: "Döviz Tipi",
    type: "dropdown",
    field: "delivery_type",
    area: "currencyType",
    data: [
      { title: "₺", value: "₺" },
      { title: "$", value: "$" },
      { title: "€", value: "€" },
    ],
    isRequired: true,
  },

  {
    name: "Döviz Kuru (TL ise 1 giriniz)",
    type: "number",
    field: "delivery_type",
    area: "currencyVal",
    isRequired: true,
  },
  {
    name: "Paketleme Ücreti",
    field: "delivery_type",
    area: "package_fee",
    type: "number",
    isRequired: true,
  },
  {
    name: "Yükleme Ücreti",
    field: "delivery_type",
    area: "loading_fee",
    type: "number",
    isRequired: true,
  },
  {
    name: "Taşıma Ücreti",
    field: "delivery_type",
    area: "transport_fee",
    type: "number",
    isRequired: true,
  },
  {
    name: "Açıklama",
    field: "delivery_type",
    area: "description",
    type: "text",
    isRequired: true,
  },
];
export const TransPortDataExtra = [
  {
    name: "Liman veya Belirlenen Yerde teslim Ücreti",
    type: "number",
    field: "delivery_type",
    area: "delivery_fee",
    isRequired: true,
  },
  {
    name: "İhracat Prosedür Ücretleri",
    type: "number",
    field: "delivery_type",
    area: "export_fee",
    isRequired: true,
  },
  {
    name: "Çıkış terminali Ücretleri",
    type: "number",
    field: "delivery_type",
    area: "terminal_fee_exit",
    isRequired: true,
  },
  {
    name: "Araca Yükleme Ücreti",
    type: "number",
    field: "delivery_type",
    area: "vehicleLoading_fee",
    isRequired: true,
  },
  {
    name: "Sigorta Ücreti",
    type: "number",
    field: "delivery_type",
    area: "insurance_fee",
    isRequired: true,
  },
  {
    name: "Varış Terminali Ücreti",
    type: "number",
    field: "delivery_type",
    area: "terminal_fee_entry",
    isRequired: true,
  },

  {
    name: "İthalat Prosedür Ücreti",
    type: "number",
    field: "delivery_type",
    area: "import_fee",
    isRequired: true,
  },
];

export const PreparedData = [
  {
    name: "Hazırlayan",
    type: "text",
    field: "options",
    area: "preparedBy",
    isRequired: true,
  },

  {
    name: "Onaylayan",
    type: "text",
    field: "options",
    area: "approvedBy",
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
