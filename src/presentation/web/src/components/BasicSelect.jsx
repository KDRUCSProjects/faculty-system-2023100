import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({values, title, setRole}) {
  const [state, setState] = React.useState();

  const handleChange = (event) => {
    console.log(event.target.value)
    setState(values[event.target.value])
    setRole(event.target.value); 
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="Role"
          onChange={handleChange}
        >
          {
            values.map((item, index)=><MenuItem value={index}>{item}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );
}