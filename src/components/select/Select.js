import React from "react";

const Select = props => {
  const {options} = props
  return (
    <div className={props.param}>
        <label htmlFor={props.name} className="form-label">
          {props.title}
        </label>
        <select 
          className="form-control"
          name={props.name}
          value={props.value}
          onChange={props.onChange}>
          {options.map((option, idx) =>{
            return <option key={idx} value={option.value}>{option.name}</option>
          })}

          {/* <option value="">elegir...</option>
          <option value="premium">premium</option>
          <option value="basic">básico</option> */}
        </select>
        
    </div>
  );
};

export default Select;