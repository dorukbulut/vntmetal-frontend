export const columns = [
    { id: "account_id", label: "Cari Kod", minWidth: 170 },
    {
        id: "account_title",
        label: "Cari Ünvan",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "account_related",
        label: "İlgili Kişi",
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
