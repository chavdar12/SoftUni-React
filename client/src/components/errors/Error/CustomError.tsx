import './custom-error.scss';

interface CustomErrorProps {
  classes?: string;
  text?: string;
}

export function CustomError({ classes, text }: CustomErrorProps) {
  return (
    <div className={['custom-error', classes].join(' ')}>
      <p className="custom-error__text">{text}</p>
    </div>
  );
}
export default CustomError;
