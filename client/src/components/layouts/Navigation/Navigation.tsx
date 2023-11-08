/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './navigation.scss';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Login, Logo } from '#assets';
import { Avatar, Icon } from '#components';
import { SCREEN_LG, useWindowDimensions } from '#utils';

type textsType = {
  key: string;
  value: string;
};

interface NavigationProps {
  classes?: string;
  texts?: textsType[];
  handleLanguageChange?: () => void;
}

export function Navigation({ classes, texts, handleLanguageChange }: NavigationProps) {
  const { i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const activeText = texts?.find((text) => text.key === window.location.pathname.split('/')[1]);

  const renderTexts = () => {
    return texts?.map((text, index) => (
      <div
        key={index}
        className="navigation__content__texts__wrapper"
        onClick={() => {
          navigate(text.key);
        }}
      >
        <h3
          className={[
            'navigation__content__texts__wrapper__text',
            activeText?.key === text.key ? 'navigation__content__texts__wrapper__text--active' : '',
          ].join(' ')}
        >
          {text.value}
        </h3>
      </div>
    ));
  };

  return <div className={['navigation', classes].join(' ')}></div>;
}
export default Navigation;
