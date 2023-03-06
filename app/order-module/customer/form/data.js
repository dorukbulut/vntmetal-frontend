export const customerInputInfo = [
  {
    name: "Cari Kod",
    field: "customer",
    area: "account_id",
    type: "number",
    isRequired: true,
  },
  {
    name: "Cari Ünvan",
    field: "customer",
    area: "account_title",
    type: "text",
    isRequired: true,
  },
  {
    name: "İlgili Kişi",
    field: "customer",
    area: "account_related",
    type: "text",
    isRequired: true,
  },
  {
    name: "T.C. Kimlik Numarası",
    field: "customer",
    area: "account_IN",
    type: "number",
  },

  {
    name: "Telefon 1",
    field: "customer",
    area: "account_tel1",
    type: "text",
  },

  {
    name: "Telefon 2",
    field: "customer",
    area: "account_tel2",
    type: "text",
  },

  {
    name: "Fax Numarası",
    field: "customer",
    area: "account_fax",
    type: "text",
  },

  {
    name: "E-mail",
    field: "customer",
    area: "account_email",
    type: "text",
  },

  {
    name: "Website",
    field: "customer",
    area: "account_website",
    type: "text",
  },

  {
    name: "KEP Adresi",
    field: "customer",
    area: "account_KEP",
    type: "number",
  },
];

export const taxInputInfo = [
  {
    name: "Vergi Numarası",
    field: "taxinfo",
    area: "tax_info_taxID",
    type: "number",
  },
  {
    name: "Vergi Dairesi",
    field: "taxinfo",
    area: "tax_info_Admin",
    type: "text",
  },
  {
    name: "Vergi Dairesi No.",
    field: "taxinfo",
    area: "tax_info_AdminID",
    type: "number",
  },
];

export const adressInputInfo = [
  {
    name: "Müşteri Adres",
    field: "adressinfo",
    area: "customer_Address",
    type: "text",
  },
  {
    name: "Müşteri Bina No.",
    field: "adressinfo",
    area: "customer_bID",
    type: "number",
  },
  {
    name: "Müşteri Bina Adı",
    field: "adressinfo",
    area: "customer_bName",
    type: "text",
  },
  {
    name: "Müşteri Kapı No.",
    field: "adressinfo",
    area: "customer_dID",
    type: "number",
  },

  {
    name: "Kasaba",
    field: "adressinfo",
    area: "customer_town",
    type: "text",
  },

  {
    name: "Semt",
    field: "adressinfo",
    area: "customer_district",
    type: "text",
  },

  {
    name: "Şehir",
    field: "adressinfo",
    area: "customer_city",
    type: "text",
  },

  {
    name: "Ülke",
    field: "adressinfo",
    area: "customer_country",
    type: "text",
  },

  {
    name: "Adres No.",
    field: "adressinfo",
    area: "customer_UAVT",
    type: "number",
  },

  {
    name: "Posta Kodu",
    field: "adressinfo",
    area: "customer_postal",
    type: "number",
  },
];
