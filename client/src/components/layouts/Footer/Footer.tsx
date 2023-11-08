import './footer.scss';

import { Grid, GridItem } from '#components';

import { Block } from '../Block';

type textsType = {
  key: string;
  value: string;
};

interface FooterProps {
  classes?: string;
  texts?: textsType[];
}

export function Footer({ classes, texts }: FooterProps) {
  return (
    <footer className={['footer', classes].join(' ')}>
      <Block classes="footer__block">
        <Grid classes="footer__block__grid">
          {texts?.map((text, index) => (
            <GridItem md={4} lg={6} key={index}>
              <p className="footer__block__grid__text">{text.value}</p>
            </GridItem>
          ))}
        </Grid>
      </Block>
    </footer>
  );
}
export default Footer;
