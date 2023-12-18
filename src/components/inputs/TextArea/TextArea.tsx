import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import "./text-area.scss";
import { CustomError } from "#components";

interface TextAreaProps {
  classes?: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  errors?: FieldError;
}

function TextArea({
  classes,
  label,
  placeholder,
  register,
  errors,
}: TextAreaProps) {
  return (
    <div className={["text-area", classes].join(" ")}>
      <label className="text-area__label">{label}</label>
      <textarea
        className="text-area__field"
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
