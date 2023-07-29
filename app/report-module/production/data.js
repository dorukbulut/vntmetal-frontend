export const columns = [
    { id: "reference", label: "Döküm No.", minWidth: 170 },
    { id: "workorder", label: "İş Emri No.", minWidth: 170 },
    { id: "saleorder", label: "Sipariş No.", minWidth: 170 },
    { id: "quotorder", label: "Teklif No.", minWidth: 170 },
    {
        id: "product_status",
        label: "Döküm Durumu",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "atelier_status",
        label: "İşleme Durumu",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "shipment_status",
        label: "Sevkiyat Durumu",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "n_piece",
        label: "Sipariş Adedi",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },

    {
        id: "customer",
        label: "Cari Kod.",
        minWidth: 170,
        align: "right",
    },
];
