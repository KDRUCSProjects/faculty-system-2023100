import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from 'react';


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Full Name', width: 400 },
  {field: 'email', headerName: 'Email', type: 'String', width: 300},
];

export default function DataTable({data, filteredData}) {

  console.log(data)

  const [state, setState] = useState([])
  const addNewData = (newData) => {
    setState([...state, newData]);
  };

  console.log(state)

  let newData = filteredData ? filteredData : data

  return (
    <div style={{ height: 470, width: '100%' }}>
      <DataGrid
        rows={newData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onCellClick={(e)=>addNewData(e.row.id)}
      />
    </div>
  );
}