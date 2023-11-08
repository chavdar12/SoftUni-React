import './page.scss';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Footer, Navigation } from '#components';

interface PageProps {
  classes?: string;
  children?: React.ReactNode;
  hasNavigation?: boolean;
  hasFooter?: boolean;
}

export function Page({ classes, children, hasNavigation = true, hasFooter = true }: PageProps) {
  const { t, i18n } = useTranslation('page-block');
  const currentLanguage = i18n.language;

  const navigationTexts = [
    {
      key: '/',
      value: t('home'),
    },
    {
      key: '/shop',
      value: t('shop'),
    },
    {
      key: '/contact',
      value: t('contact'),
    },
  ];

  const footerTexts = [
    {
      key: '/',
      value: t('home'),
    },
    {
      key: '/shop',
      value: t('shop'),
    },
    {
      key: '/contact',
      value: t('contact'),
    },
  ];

  const handleLanguageChange = useCallback(() => {
    const newLanguage = currentLanguage === 'en' ? 'bg' : 'en';
    localStorage.setItem('selectedLanguage', newLanguage);
    i18n.changeLanguage(newLanguage);
  }, [currentLanguage, i18n]);

  return (
    <div className={['page', classes].join(' ')}>
      {hasNavigation && (
        <Navigation
          classes="page__navigation"
          texts={navigationTexts}
          handleLanguageChange={handleLanguageChange}
        />
      )}
      <div className="page__content-container">{children}</div>
      {hasFooter && <Footer classes="page__footer" texts={footerTexts} />}
    </div>
  );
}
export default Page;
