import './grid.scss';

interface GridProps {
  classes?: string | string[];
  children?: React.ReactNode;
}

/**
 * Grid
 *
 * Grid component
 */
export function Grid({ classes, children }: GridProps) {
  return <div className={['grid', classes].join(' ')}>{children}</div>;
}

export default Grid;
