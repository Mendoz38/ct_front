import React from "react";

const Input = ({ name, placeHolder, label, className, type, value, onChange, register, required, error, yupMessage}) => {
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
        required={required}
        {...register(name)}
      />
      {error && <p className="yup_message"> {error} </p>}
    </div>
  );
};

export default Input;
