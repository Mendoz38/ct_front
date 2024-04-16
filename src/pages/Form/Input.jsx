import React from "react";

const Input = ({ name, placeHolder, label, className, type, value, onChange}) => {
  return (
    <div className="InputAddOn">
      <span className="InputAddOn-item">{label}</span>
      <input
        name={name}
        className={className}
        type={type}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
