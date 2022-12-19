import React, { useState, useEffect } from "react"
import Table from "./Table"
import EditableCell from "./Table/EditableCell.js"
import axios from "axios"
function SetItem({customerid}) {
const [rowdata, setRowData] = useState([])
  useEffect(() => {
    axios({
        method : "POST",
        data : {
            Customer_ID : customerid
        },

        url : `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/get`,
        withCredentials : true
    })
    .then(res => {
        if (res.status === 200) {

            const formedData = res.data.map((item,index) => {
                return {
                    item : index + 1,
                    description : '',
                    dimensions :  '',
                    analysis  : item.analyze.analyze_Name,
                    qty : item.unit_frequence,
                    unitprice : item.unit_price,
                    total_price : parseFloat(item.unit_price) * parseInt(item.unit_frequence)

                }
            })

            setRowData(rowdata.concat(formedData));
        }
    })
    .catch(err => console.log);

    }
  , [customerid])
  
 
  const columns = [
    {
      Header: "Öğe",
      accessor: "item",
    },
    {
      Header: "Açıklama",
      accessor: "description",
      Cell : EditableCell
    },
    {
      Header: "Ölçü",
      accessor: "dimensions",
    },
    {
      Header: "Analiz",
      accessor: "analysis",
    },
    {
        Header: "QTY",
        accessor: "qty",
      },
      {
        Header: "Fiyat (Adet)",
        accessor: "unitprice",
      },
      {
        Header: "Toplam Fiyat",
        accessor: "total_price",
      },
      {
        Header: "Teslim Süresi",
        accessor: "deliveryTime",
        Cell : EditableCell
      },
  ]
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-8">
        <Table columns={columns} data={rowdata} />
      </div>
    </div>
  )
}
export default SetItem