import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface AutocompleteFieldProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  [key: string]: any;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  placeholder,
  disabled = false,
  error = false,
  helperText = '',
  ...other
}) => (
  <MuiAutocomplete
    disablePortal
    options={options}
    getOptionLabel={(option) => option.label}
    value={options.find((opt) => opt.value === value) || null}
    onChange={(event, newValue) => onChange(event, newValue ? newValue.value : null)}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        name={name}
        placeholder={placeholder}
        fullWidth
        error={error}
        helperText={helperText}
      />
    )}
    disabled={disabled}
    sx={{ mb: 2 }}
    {...other}
  />
);

export default AutocompleteField;
