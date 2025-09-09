import React from 'react';

import MuiTextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  variant?: MuiTextFieldProps['variant'];
  error?: boolean;
  helperText?: string;
  slotProps?: MuiTextFieldProps['slotProps'];
}


const TextField: React.FC<TextFieldProps> = ({ label, name, value, onChange, type = 'text', placeholder, variant, error = false, helperText = '', slotProps }) => (
  <MuiTextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    variant={variant}
    fullWidth
    error={error}
    helperText={helperText}
    sx={{ mb: 2 }}
    slotProps={slotProps}
  />
);

export default TextField;
