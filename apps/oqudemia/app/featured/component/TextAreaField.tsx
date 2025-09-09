import React from 'react';
import TextField from '@mui/material/TextField';

import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  minRows?: number;  
  variant?: MuiTextFieldProps['variant'];
  error?: boolean;
  helperText?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, value, onChange, placeholder, minRows, variant, error = false, helperText = '' }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    error={error}
    helperText={helperText}
    multiline
    minRows={minRows}
    fullWidth
    variant={variant}
    sx={{ mb: 2 }}
  />
);

export default TextAreaField;
