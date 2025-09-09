
type RadioColor = 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
type RadioSize = 'small' | 'medium';

interface RadioFieldProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  color?: RadioColor;
  size?: RadioSize;
  error?: boolean;
  helperText?: string;
}

import React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  color = 'primary',
  size = 'medium',
  error = false,
  helperText = '',
}) => (
  <>
    <FormControlLabel
      control={
        <Radio
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          color={color}
          size={size}
        />
      }
      label={label}
      sx={{ mr: 2 }}
    />
    {helperText && <span style={{ color: error ? '#d32f2f' : undefined, fontSize: '0.75rem', marginLeft: 8 }}>{helperText}</span>}
  </>
);

export default RadioField;


