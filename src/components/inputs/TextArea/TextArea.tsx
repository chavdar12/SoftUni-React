import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import "./text-area.scss";
import { CustomError } from "#components";

interface TextAreaProps {
  classes?: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  size?: "sm" | "md" | "lg";
}

function TextArea({
  classes,
  label,
  placeholder,
  register,
  errors,
  size = "lg",
}: TextAreaProps) {
  return (
    <div
      className={[
        "textarea-container",
        `textarea-container--${size}`,
        classes,
      ].join(" ")}
    >
      <label className="textarea-container__label">{label}</label>
      <textarea
        className={[
          "textarea-container__text-area",
          errors?.message ? "error" : "",
        ].join(" ")}
        placeholder={placeholder}
        {...register}
      />
      {errors && (
        <CustomError classes="text-area__error" text={errors.message} />
      )}
    </div>
  );
}

export default TextArea;
