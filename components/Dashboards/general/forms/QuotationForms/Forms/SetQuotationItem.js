"use client";
import React, { useState, useEffect } from "react";
import Table from "../../Table";
import EditIcon from "@mui/icons-material/Edit";
import ActionBar from "../../../../../base/actionbar";
import EditableCell from "../../Table/EditableCell.js/index.js";
import Checkbox from "@mui/material/Checkbox";
import QuotationItemService from "../../../../../../services/QuotationService/QuotationItemService";
import { TYPE } from "../../../../../../utils/mappers";
import Action from "../../../../../base/action";
function SetItem({ fields, setAll, url, prevType, prevId }) {
  const [rowdata, setRowData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const data =
    url === "getitems"
      ? {
          Customer_ID: fields.options.Customer_ID,
          Quotation_ID: fields.options.Quotation_ID,
        }
      : {
          Customer_ID: fields.options.Customer_ID,
        };
  useEffect(() => {
    if (
      fields.options.Customer_ID !== "" &&
      fields.options.Customer_ID !== undefined
    ) {
      QuotationItemService.fetchFormItems(data, url)
        .then((res) => {
          if (res.status === 200) {
            const formedData = res.data.map((item, index) => {
              return {
                item_id: item.item_id,
                item: index + 1,
                itemType: TYPE.find((r) => r.value === item.itemType).title,
                description: item.description ? item.description : "",
                dimensions: item.dimensions,
                analysis: item.analyze.analyze_Name,
                qty: item.unit_frequence,
                unitprice: `${item.unit_price} ${item.currency}`,
                up: true,
                total_price: `${(
                  parseFloat(item.unit_price) * parseInt(item.unit_frequence)
                ).toFixed(2)} ${item.currency}`,
                deliveryTime: item.deliveryTime ? item.deliveryTime : "",
                currency: item.currency,
                checked: item.isUsed,
              };
            });

            setRowData(formedData);
          }
        })
        .catch((err) => console.log);
    }
  }, [fields.options.Customer_ID]);

  useEffect(() => {
    setAll(
      rowdata.map((data) => {
        if (data.checked) return data;
      })
    );
  }, [rowdata]);

  const updateMyData = async (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setRowData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns = [
    {
      Header: "Öğe",
      accessor: "item",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return initialValue;
      },
    },
    {
      Header: "Ürün",
      accessor: "itemType",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return initialValue;
      },
    },
    {
      Header: "Açıklama",
      accessor: "description",
      Cell: EditableCell,
    },
    {
      Header: "Ölçü",
      accessor: "dimensions",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return initialValue;
      },
    },
    {
      Header: "Analiz",
      accessor: "analysis",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return initialValue;
      },
    },
    {
      Header: "QTY",
      accessor: "qty",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return initialValue;
      },
    },
    {
      Header: "Fiyat (Adet)",
      accessor: "unitprice",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return initialValue;
      },
    },
    {
      Header: "Toplam Fiyat",
      accessor: "total_price",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return initialValue;
      },
    },
    {
      Header: "Teslim Süresi",
      accessor: "deliveryTime",
      Cell: EditableCell,
    },
    {
      Header: "Seç",
      accessor: "checked",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        const onClick = async (e) => {
          await updateMyData(index, id, e.target.checked);
        };
        return <Checkbox checked={initialValue} onChange={onClick} />;
      },
    },
    {
      Header: "Düzenle",
      accessor: "item_id",
      Cell: ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
      }) => {
        return (
          <Action
            preference={{
              name: "Düzenle",
              action: ["Kalemi Düzenle"],
              pathname: "/order-module/quotation/form/item",
              query: {
                type: "update",
                id: initialValue,
                prevId: prevId,
                prevType: prevType,
              },
            }}
          >
            <EditIcon />
          </Action>
        );
      },
    },
  ];
  return (
    <div className="container mx-auto shadow-md rounded-lg border-2 w-full">
      <div className="flex justify-center mt-8">
        <Table
          columns={columns}
          data={rowdata}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
        <ActionBar prevType={prevType} prevId={prevId} />
      </div>
    </div>
  );
}
export default SetItem;
