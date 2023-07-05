export const columns = [
  { id: "step", label: "Sıra No.", minWidth: 170 },

  {
    id: "n_piece",
    label: "Dök. Adet",
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
    id: "atelier_dims",
    label: "İşleme Ölçüsü",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "n_piece",
    label: "İşlenen Adet",
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
    id: "isQC",
    label: "Kalite Kontrol",
    minWidth: 170,
    align: "right",
  },
  {
    id: "preparedBy",
    label: "Dolduran",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "options",
    label: "Düzenle",
    minWidth: 170,
    align: "right",
  },
];
