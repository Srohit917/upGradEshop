import { TextField } from "@mui/material";

const TextInput = (props) => {
  const { name, label, onChange, error, value } = props;
  return (
    <TextField
      name={name}
      variant="outlined"
      label={label}
      error={error}
      value={value}
      onChange={onChange}
      helperText={error}
      sx={{
        width: "100%",
      }}
    ></TextField>
  );
};
export default TextInput;
