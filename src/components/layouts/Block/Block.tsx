import "./block.scss";

interface BlockProps {
  classes?: string;
  children?: React.ReactNode;
}

export function Block({ classes, children }: BlockProps) {
  return (
    <section className={["block", classes].join(" ")}>
      <div className="block__container">{children}</div>
    </section>
  );
}
export default Block;
