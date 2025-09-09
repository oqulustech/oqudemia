import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { SelectChangeEvent } from '@mui/material/Select';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  helperText?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options, error = false, helperText = '' }) => (
  <FormControl fullWidth sx={{ mb: 2 }} error={error}>
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-label`}
      id={name}
      name={name}
      value={value}
      label={label}
      onChange={onChange}
    >
      <MenuItem value="">
        <em>Select {label}</em>
      </MenuItem>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </Select>
    {helperText && <span style={{ color: error ? '#d32f2f' : undefined, fontSize: '0.75rem', marginTop: 4 }}>{helperText}</span>}
  </FormControl>
);

export default SelectField;
