export const columns = [
    { id: "workorder", label: "İş Emri No.", minWidth: 170 },

    {
        id: "remaining",
        label: "Döküm bekleyen (adet)",
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
