import './box.scss';

interface BoxProps {
  classes?: string;
  children?: React.ReactNode;
}

export function Box({ classes, children }: BoxProps) {
  return <div className={['box', classes].join(' ')}>{children}</div>;
}

export default Box;
