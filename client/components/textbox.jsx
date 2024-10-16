import React from 'react'
import { TextField } from '@mui/material'


const Textbox = ({value, onChange, label, error}) => {
  return (
    <TextField value={value} onChange={onChange} size='small' fullWidth id="outlined-basic" label={label} error={error} variant="outlined" />
  )
}

export default Textbox