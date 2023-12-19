import "./input.scss";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { CustomError, Icon } from "#components";
import { ReactNode, useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);

  return (
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
        className={["input-wrapper", errors?.message ? "error" : ""].join(" ")}
      >
        <input
          type={
            type === "password" && showPassword ? "text" : type ? type : "text"
          }
          disabled={disabled}
          className="input"
          placeholder={placeholder}
          {...register}
        />
        {type === "password" && (
          <div className="input__password-icon">
            <Icon
              name={showPassword ? "show-pass" : "hide-pass"}
              onClick={() => setShowPassword(!showPassword)}
              color="#000"
            />
          </div>
        )}
        {children}
      </div>
      {errors?.message && !disabled && <CustomError text={errors?.message} />}
    </div>
  );
}
export default Input;
