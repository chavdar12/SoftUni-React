import "./form-input.scss";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { CustomError } from "#components";

interface FormInputProps {
  classes?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  type?: string;
}

export function Input({ classes, register, errors, type }: FormInputProps) {
  return (
    <div className={["input", classes].join(" ")}>
      <input type={type} className="input__input" {...register} />
      {errors && <CustomError classes="input__error" text={errors.message} />}
    </div>
  );
}
export default Input;
