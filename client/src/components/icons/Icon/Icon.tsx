import './icon.scss';

import { useEffect, useState } from 'react';

import sprite from './assets/sprite.svg';
import { Color, hexToRgb, Solver } from './utils/ColorSolver';

type TIconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface IIcon {
  name: string;
  size?: TIconSize;
  color?: string;
  classes?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Icon
 *
 * Icon component used to render different icons from the sprite file
 */
export function Icon({
  name,
  size = 'md',
  color,
  classes,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: IIcon) {
  const [svgFilter, setSvgFilter] = useState<string | undefined>();

  useEffect(() => {
    if (color) {
      const rgb = hexToRgb(color);
      if (rgb) {
        // Check if rgb is not null
        const colorToSolve = new Color(rgb[0], rgb[1], rgb[2]);
        const solver = new Solver(colorToSolve);
        const result = solver.solve();
        setSvgFilter(
          `brightness(0) saturate(100%) ${result.filter.split('filter: ')[1].slice(0, -1)}`,
        );
      }
    }
  }, [color]);

  return (
    <svg
      className={[
        `icon`,
        `icon--${name}`,
        `icon--${size}`,
        onClick && 'icon--clickable',
        classes,
      ].join(' ')}
      style={{ WebkitFilter: svgFilter || '' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <use href={`${sprite}#icon-${name}`} />
    </svg>
  );
}

export default Icon;
