import EditIcon from "@mui/icons-material/Edit";
import Action from "../../../components/base/action";
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
                name: "Müşteriyi Düzenle",
                pathname: "/order-module/customer/form",
                query: {
                  type: "update",
                  id: row.account_id,
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
