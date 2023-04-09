export const columns = [
  { id: "reference", label: "İş Emri No.", minWidth: 170 },
  {
    id: "account_id",
    label: "Cari Kod",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "day",
    label: "Gün",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "month",
    label: "Ay",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "year",
    label: "Yıl",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "isProduct",
    label: "İşlem",
    minWidth: 170,
    align: "right",
  },
  {
    id: "options",
    label: "Düzenle",
    minWidth: 170,
    align: "right",
  },
];
