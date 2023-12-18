import "./box.scss";

interface BoxProps {
  classes?: string;
  children?: React.ReactNode;
  heading?: string;
}

export function Box({ classes, children, heading }: BoxProps) {
  return (
    <div className={["box", classes].join(" ")}>
      {heading && <h2 className="box__heading">{heading}</h2>}
      {children}
    </div>
  );
}

export default Box;
