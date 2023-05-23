import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'First name', width: 400 },
  {field: 'email', headerName: 'Email', type: 'String', width: 300},
  {field: '', headerName: 'Action', type: 'String', width: 300},
];

export default function DataTable({data, filteredData}) {

  data = filteredData ? filteredData : data

  return (
    <div style={{ height: 470, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}