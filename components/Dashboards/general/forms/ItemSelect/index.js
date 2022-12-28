import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'name', headerName: 'Ürün', width: 200 },
  { field: 'description', headerName: 'açıklama', width: 200 },
  { field: 'dimensions', headerName: 'Ölçü', width: 200 },
  { field: 'analysis', headerName: 'Analiz', width: 130 },
  {
    field: 'qty',
    headerName: 'Miktar',
    type: 'number',
    width: 130,
  },
  {
    field: 'price',
    headerName: 'Fiyat(Birim)',
    type: 'number',
    width: 130,
  },
 
];

export default function ControlledSelectionGrid({items, setSelectedItem}) {

    
    
    const [selectionModel, setSelectionModel] = React.useState([]);
    React.useEffect(() => {
      setSelectedItem(selectionModel);
    }, [selectionModel]);
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
         
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          rows={items}
          columns={columns}
        />
      </div>
    );
  }