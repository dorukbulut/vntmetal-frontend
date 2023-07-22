export const columns = [
    { id: "reference", label: "Paket No.", minWidth: 170 },
    { id: "description", label: "Açıklama", minWidth: 170 },
    {
        id: "workorder",
        label: "Kullanım Durumu",
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
