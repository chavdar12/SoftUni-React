import "./form-input.scss";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { CustomError } from "#components";

interface FormInputProps {
  classes?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  label: string;
  type?: string;
}

export function Input({
  classes,
  register,
  errors,
  type,
  label,
}: FormInputProps) {
  return (
    <div className={["input", classes].join(" ")}>
      <label className="input__label">{label}</label>
      <input type={type} className="input__field" {...register} />
      {errors && <CustomError classes="input__error" text={errors.message} />}
    </div>
  );
}
export default Input;
