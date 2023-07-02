export const columns = [
    { id: "reference", label: "Döküm No.", minWidth: 170 },
    {
        id: "product_status",
        label: "Döküm Durumu",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },

    {
        id: "status",
        label: "İşleme Durumu",
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
