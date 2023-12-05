import "./button.scss";

interface ButtonProps {
  classes?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
}

export function Button({
  classes,
  type = "button",
  onClick,
  disabled = false,
  text,
}: ButtonProps) {
  return (
    <div className={["button", classes].join(" ")}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="button__button"
      >
        <p className="button__text">{text}</p>
      </button>
    </div>
  );
}
export default Button;
