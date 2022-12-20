import React, { useState, useEffect } from "react"
import Table from "./Table"
import EditableCell from "./Table/EditableCell.js"
import Checkbox from '@mui/material/Checkbox';
import axios from "axios"
function SetItem({fields, setFields}) {
const [rowdata, setRowData] = useState([]);
const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(() => {
    console.log(fields);
    if(fields.options.Customer_ID !== '') {
      axios({
        method : "POST",
        data : {
            Customer_ID : fields.options.Customer_ID
        },

        url : `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/get`,
        withCredentials : true
    })
    .then(res => {
        if (res.status === 200) {

            const formedData = res.data.map((item,index) => {
                return {
                    item_id : item.item_id,
                    item : index + 1,
                    description : '',
                    dimensions :  " ",
                    analysis  : item.analyze.analyze_Name,
                    qty : item.unit_frequence,
                    unitprice : item.unit_price,
                    total_price : parseFloat(item.unit_price) * parseInt(item.unit_frequence),
                    deliveryTime : '',
                    checked : true,
                    

                }
            })
            setRowData(formedData);
        }
    })
    .catch(err => console.log);
    }
    

    }
  , [fields])
  

  const updateMyData = (rowIndex, columnId, value) => {
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
        return initialValue
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
        return initialValue
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
        return initialValue
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
          return initialValue
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
          return initialValue
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
          return initialValue
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
          

  const onClick = (e) => {
    updateMyData(index, id, e.target.checked);
    console.log(rowdata);
  };
          return (
            <Checkbox
            checked={initialValue}
            onClick={onClick}
            />
            
          )
        },
      },
  ]
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-8">
        <Table columns={columns} data={rowdata} updateMyData={updateMyData}
          skipPageReset={skipPageReset}/>
      </div>
    </div>
  )
}
export default SetItem