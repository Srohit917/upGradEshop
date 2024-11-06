import { TextField } from "@mui/material";
import { loginStyles } from "./styles";

const TextInput = (props) => {
  const { name, label, onChange, error, value } = props;
  const { textFieldStyle } = loginStyles();
  return (
    <TextField
      name={name}
      variant="outlined"
      label={label}
      error={error}
      value={value}
      onChange={onChange}
      helperText={error}
      className={textFieldStyle}
    ></TextField>
  );
};
export default TextInput;
