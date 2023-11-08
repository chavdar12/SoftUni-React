import './product-card.scss';

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  classes?: string;
}

export function ProductCard({ image, title, description, price, classes }: ProductCardProps) {
  return (
    <div className={['product-card', classes].join(' ')}>
      <div className="product-card__wrapper">
        <div className="product-card__image">
          <img src={image} alt={title} />
        </div>
        <div className="product-card__title">
          <h3>{title}</h3>
        </div>
        <div className="product-card__description">
          <p>{description}</p>
        </div>
        <div className="product-card__price">
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
