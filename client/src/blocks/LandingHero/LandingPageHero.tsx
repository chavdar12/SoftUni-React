import './landing-page-hero.scss';

import { useTranslation } from 'react-i18next';

import { Hero } from '#assets';
import { Block, Button } from '#components';

export function LandingPageHero() {
  const { t } = useTranslation('landing-page-hero-block');

  return (
    <div className="landing-page-hero-wrapper">
      <img src={Hero} alt="Hero" className="landing-page-hero-wrapper__img" />
      <Block classes="landing-page-hero">
        <div className="landing-page-hero__container">
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
          <Button classes="landing-page-hero__container__button" text={t('button')} />
        </div>
      </Block>
    </div>
  );
}
export default LandingPageHero;
