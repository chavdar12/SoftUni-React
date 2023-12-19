import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import "./dropdown.scss";
import { CustomError } from "#components";

type DropdownItem = {
  key: string;
  name: string;
};

interface DropdownProps {
  classes?: string;
  items?: string[] | DropdownItem[];
  register?: UseFormRegisterReturn;
  errors?: FieldError;
  label?: string;
  size?: "sm" | "md" | "lg";
}

function Dropdown({
  classes,
  items,
  register,
  errors,
  label,
  size,
}: DropdownProps) {
  const renderItem = (item: string | DropdownItem) => {
    if (typeof item === "string") {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    } else {
      return (
        <option key={item.key} value={item.key}>
          {item.name}
        </option>
      );
    }
  };

  return (
    <div
      className={[
        "dropdown-container",
        `dropdown-container--${size}`,
        classes,
      ].join(" ")}
    >
      {label && <p className="dropdown-container__label">{label}</p>}
      <select
        className={[
          "dropdown-container__select",
          errors?.message ? "error" : "",
        ].join(" ")}
        {...register}
      >
        {items?.map(renderItem)}
      </select>
      {errors && <CustomError text={errors.message} />}
    </div>
  );
}

export default Dropdown;
