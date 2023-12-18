import { ReactNode } from "react";
import "./button.scss";

interface ButtonProps {
  classes?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
  children?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  classes,
  type = "button",
  onClick,
  disabled = false,
  text,
  size = "sm",
  loading = false,
}: ButtonProps) {
  return (
    <button
      className={["button", `button--${size}`, classes].join(" ")}
      onClick={disabled || loading ? () => {} : onClick}
      disabled={disabled || loading}
      type={type}
    >
      <div className="button__content-container">{text}</div>
    </button>
  );
}
export default Button;
