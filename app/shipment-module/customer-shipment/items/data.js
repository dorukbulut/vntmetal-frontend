export const columns = [
  { id: "step", label: "Sıra No.", minWidth: 170 },

  {
    id: "n_piece",
    label: "Hazır Adet",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },


  {
    id: "isQC",
    label: "Kalite Kontrol",
    minWidth: 170,
    align: "right",
  },{
    id: "type",
    label: "Tip",
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

export const columnsAtelier = [
  { id: "step", label: "Sıra No.", minWidth: 170 },
  {
    id: "package",
    label: "Paket No.",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "n_piece",
    label: "Sevk Edilen Ad.",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total_kg",
    label: "Tartılan Kg.",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Sevk Tarihi",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "delete",
    label: "Sil",
    minWidth: 170,
    align: "right",
  },
];
