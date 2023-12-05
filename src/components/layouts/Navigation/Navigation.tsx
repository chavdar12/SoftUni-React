import "./navigation.scss";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SCREEN_MD, useWindowDimensions } from "#utils";
import { Icon } from "#components";
import { useState } from "react";

type textsType = {
  key: string;
  value: string;
};

interface NavigationProps {
  classes?: string;
  texts?: textsType[];
  isAdmin?: boolean;
  handleLanguageChange?: () => void;
}

export function Navigation({
  classes,
  texts,
  isAdmin = false,
  handleLanguageChange,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  return (
    <div className={["navigation", classes].join(" ")}>
      <div
        className={[
          "navigation__wrapper",
          isAdmin ? "" : "navigation__wrapper--user",
        ].join(" ")}
      >
        {width <= SCREEN_MD && (
          <Icon
            name="menu"
            size="xl"
            classes="navigation__wrapper__icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
      </div>
      {width <= SCREEN_MD && isMenuOpen && (
        <div className="navigation__mobile-menu">items</div>
      )}
    </div>
  );
}
export default Navigation;
