import './success-toast.scss';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

interface SuccessToastProps {
  classes?: string;
  text?: string;
}

export function SuccessToast({ classes, text }: SuccessToastProps) {
  return toast(<SuccessToast text={text} />, {
    className: ['success-toast', classes].join(' '),
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
}
export default SuccessToast;
