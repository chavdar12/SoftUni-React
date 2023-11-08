import './image.scss';

interface ImageProps {
  classes?: string;
  image?: string;
  size?: string;
}

export function Image({ classes, image, size }: ImageProps) {
  return (
    <div className={['image', classes].join(' ')}>
      <img src={image} alt="image" className="image__img" />
    </div>
  );
}
export default Image;
