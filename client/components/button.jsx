import React from "react";
import Button from '@mui/material/Button';



const Btn = ({onClick, value}) => {
  return (
    <Button onClick={onClick} sx={{m:2}} variant="contained">{value} </Button>
  )
}

export default Btn