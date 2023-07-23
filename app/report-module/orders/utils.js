import Action from "../../../components/base/action";
import EditIcon from "@mui/icons-material/Edit";

export const formatData = (rows) => {
    return rows.map((row) => {
        return {
            ...row,
            options: (
                <Action
                    preference={{
                        name: "Düzenle",
                        action: [
                            {
                                name: "Rapor Al",
                                pathname: "/report-module/orders/customer-report",
                                query: {
                                    customer: row.account_id,
                                },
                            },
                        ],
                    }}
                >
                    <EditIcon />
                </Action>
            ),
        };
    });
};
