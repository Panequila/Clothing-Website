import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps}></input>
      <label
        //Dynamic className/Rendering Strings in JS.. the CSS shrinks if we start typing in the field.
        className={`${otherProps.value.length ? "shrink " : ""}form-input-label`}
      >
        {label}
      </label>
    </div>
  );
};
export default FormInput;
