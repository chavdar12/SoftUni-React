import './shop-content-block.scss';

import { useTranslation } from 'react-i18next';

import { Block, Grid, GridItem, ProductCard } from '#components';

export function ShopContentBlock() {
  const { t } = useTranslation('shop-content-block');

  const data = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'Title 1',
      description: 'Description 1',
      price: 100,
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Title 1',
      description: 'Description 1',
      price: 100,
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Title 1',
      description: 'Description 1',
      price: 100,
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Title 1',
      description: 'Description 1',
      price: 100,
    },
  ];

  return (
    <Block classes="shop-content-block">
      <Grid>
        {data.map((item, index) => (
          <GridItem key={index} classes="shop-content-block__item" md={4} lg={3}>
            <ProductCard
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          </GridItem>
        ))}
      </Grid>
    </Block>
  );
}

export default ShopContentBlock;
