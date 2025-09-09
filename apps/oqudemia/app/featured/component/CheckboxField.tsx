
type CheckboxColor = 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
type CheckboxSize = 'small' | 'medium';

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  color?: CheckboxColor;
  size?: CheckboxSize;
  orientation?: 'horizontal' | 'vertical'; // horizontal = row, vertical = column
  error?: boolean;
  helperText?: string;
}

import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  color = 'primary',
  size = 'medium',
  orientation = 'vertical',
  error = false,
  helperText = '',
}) => (
  <FormGroup row={orientation === 'horizontal'} sx={{ mb: 2 }}>
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          color={color}
          size={size}
        />
      }
      label={label}
    />
    {helperText && <span style={{ color: error ? '#d32f2f' : undefined, fontSize: '0.75rem', marginLeft: 8 }}>{helperText}</span>}
  </FormGroup>
);

export default CheckboxField;
