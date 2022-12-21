import React, { useState, useEffect } from "react"
import Table from "./Table"
import EditableCell from "./Table/EditableCell.js"
import Checkbox from '@mui/material/Checkbox';
import axios from "axios"
function SetItem({fields,setAll}) {
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
              let dim = ""
            
              if (item.straight_bush === null && item.plate_strip === null && item.doublebracket_bush === null && item.middlebracket_bush === null) {
                dim = `${item.bracket_bush.bigger_diameter}*${item.bracket_bush.body_diameter}*${item.bracket_bush.inner_diameter}*${item.bracket_bush.bracket_length}*${item.bracket_bush.bush_length}`
                
              } if(item.plate_strip === null && item.bracket_bush === null && item.doublebracket_bush === null && item.middlebracket_bush === null) {
                
                dim = `${item.straight_bush.large_diameter}*${item.straight_bush.inner_diameter}*${item.straight_bush.bush_length}`
                
              } if(item.bracket_bush === null && item.straight_bush === null && item.doublebracket_bush === null && item.middlebracket_bush === null) {
    
                dim = `${item.plate_strip.width}*${item.plate_strip["length"]}*${item.plate_strip.thickness}`
              } if (item.bracket_bush === null && item.straight_bush=== null && item.plate_strip=== null && item.middlebracket_bush === null){
                dim = `${item.doublebracket_bush.bigger_diameter}*${item.doublebracket_bush.body_diameter}*${item.doublebracket_bush.inner_diameter}*${item.doublebracket_bush.bracket_l1}*${item.doublebracket_bush.bracket_l2}*${item.doublebracket_bush.bracket_l3}*${item.doublebracket_bush.bracket_full}`
              } if (item.bracket_bush === null && item.straight_bush=== null && item.plate_strip=== null && item.doublebracket_bush === null){
                dim = `${item.middlebracket_bush.bracket_q1}*${item.middlebracket_bush.bracket_q2}*${item.middlebracket_bush.bracket_q3}*${item.middlebracket_bush.bracket_q4}*${item.middlebracket_bush.bracket_l1}*${item.middlebracket_bush.bracket_l2}*${item.middlebracket_bush.bracket_l3}*${item.middlebracket_bush.bracket_full}`
    
              }
                return {
                    item_id : item.item_id,
                    item : index + 1,
                    description : '',
                    dimensions :  dim,
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
  , [fields.options.Customer_ID])
  
  useEffect(() => {
    setAll(rowdata.map(data => {
      if (data.checked) return data
    })) 
  },[rowdata]);

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
          

  const onClick = async (e) => {
    await updateMyData(index, id, e.target.checked);
   
  };
          return (
            <Checkbox
            checked={initialValue}
            onChange={onClick}
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