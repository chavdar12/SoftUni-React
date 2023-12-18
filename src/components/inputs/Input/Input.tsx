import "./input.scss";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { CustomError } from "#components";
import { ReactNode } from "react";

interface FormInputProps {
  classes?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  label: string;
  type?: string;
  disabled?: boolean;
  children?: ReactNode;
  placeholder?: string;
  borderRadius?: boolean;
  size?: "sm" | "md" | "lg" | "full";
}

export function Input({
  classes,
  register,
  errors,
  type,
  label,
  disabled = false,
  children,
  placeholder,
  borderRadius = true,
  size = "sm",
}: FormInputProps) {
  return (
    <>
      <div
        className={[
          "input-container",
          `input-container--${size}`,
          disabled && "input-container--disabled",
          borderRadius && "input-container--border-radius",
          classes,
        ].join(" ")}
      >
        {label && <p className="text input-container__label">{label}</p>}
        <div
          className={["input-wrapper", errors?.message ? "error" : ""].join(
            " "
          )}
        >
          <input
            type={type}
            disabled={disabled}
            className="input"
            placeholder={placeholder}
            {...register}
          />
          {children}
        </div>
        {errors?.message && !disabled && <CustomError text={errors?.message} />}
      </div>
    </>
  );
}
export default Input;
