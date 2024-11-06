import React from "react";
import Select from "react-select";
import { groupBadgeStyles, groupStyles } from "./styles";

const Dropdown = (props) => {

  const { options, handleChange, value } = props;

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  
  return (
    <Select
      options={options}
      formatGroupLabel={formatGroupLabel}
      onChange={handleChange}
      value={options.filter(option => JSON.stringify(option.value) === JSON.stringify(value))[0]}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
    />
  );
};
export default Dropdown;
