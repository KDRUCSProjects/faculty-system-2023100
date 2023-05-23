import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function primaryButton({onClick, text, style}) {
    console.log(text)
  return (
      <Button variant="contained" onClick={onClick} style={style}>{text}</Button>
  );
}