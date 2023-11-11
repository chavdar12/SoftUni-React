import "./grid-item.scss";

interface IGridItem {
  classes?: string | string[];
  xs?: 1 | 2 | 3 | 4;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 * GridItem
 *
 * GridItem component
 */
export function GridItem({
  xs = 4,
  md = null,
  lg = null,
  children,
  onClick,
  classes,
}: IGridItem) {
  return (
    <div
      onClick={onClick}
      className={["grid-item", `xs-${xs} md-${md} lg-${lg}`, classes].join(" ")}
    >
      {children}
    </div>
  );
}

export default GridItem;
