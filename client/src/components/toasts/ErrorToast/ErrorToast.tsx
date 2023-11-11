import "./error-toast.scss";

import { toast } from "react-toastify";

interface ErrorToastProps {
  classes?: string;
  text?: string;
}

export function ErrorToast({ classes, text }: ErrorToastProps) {
  return toast(<ErrorToast text={text} />, {
    className: ["error-toast", classes].join(" "),
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
}
export default ErrorToast;
