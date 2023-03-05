import EditIcon from "@mui/icons-material/Edit";
import Action from "../action";
export const formatData = (rows) => {
  return rows.map((row) => {
    return {
      ...row,
      options: (
        <Action preference={{ name: "Düzenle", action: "Müşteriyi Düzenle" }}>
          <EditIcon />
        </Action>
      ),
    };
  });
};
