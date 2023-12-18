import React, { useState, useEffect, useRef } from "react";
import "./navigation.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SCREEN_MD, useWindowDimensions } from "#utils";
import { Icon } from "#components";

type TextsType = {
  key: string;
  value: string;
};

interface NavigationProps {
  classes?: string;
  texts?: TextsType[];
  isAdmin?: boolean;
  dropdownTexts?: TextsType[];
  handleSignOut?: () => void;
  handleLanguageChange?: () => void;
  hasUser?: boolean;
}

export function Navigation({
  classes,
  texts,
  isAdmin = false,
  dropdownTexts,
  handleLanguageChange,
  handleSignOut,
  hasUser = false,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const userProfileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userProfileRef.current &&
        !userProfileRef.current.contains(event.target as Node)
      ) {
        setIsUserProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={["navigation", classes].join(" ")}>
      <div
        className={[
          "navigation__wrapper",
          isAdmin ? "" : "navigation__wrapper--user",
        ].join(" ")}
      >
        {width <= SCREEN_MD ? (
          <Icon
            name="menu"
            size="lg"
            classes="navigation__wrapper__icon"
            color="#ffffff"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : (
          <>
            <Icon
              name="home"
              size="lg"
              classes="navigation__wrapper__icon"
              color="#ffffff"
              onClick={() => navigate("/")}
            />
            <div className="navigation__wrapper__container">
              <div className="navigation__wrapper__container__items">
                {texts?.map((text) => (
                  <div
                    key={text.key}
                    className="navigation__wrapper__items__item"
                    onClick={() => navigate(text.key)}
                  >
                    {text.value}
                  </div>
                ))}
              </div>
            </div>
            <Icon
              name={i18n.language === "en" ? "en" : "bg"}
              size="xl"
              classes="navigation__wrapper__language"
              onClick={handleLanguageChange}
            />
            <div className="navigation__wrapper__user-profile">
              <Icon
                name="user-profile"
                size="xl"
                color="#ffffff"
                onClick={() => setIsUserProfileOpen(!isUserProfileOpen)}
              />
              <div
                className={[
                  "navigation__wrapper__user-profile__container",
                  isUserProfileOpen
                    ? "navigation__wrapper__user-profile__container--open"
                    : "",
                ].join(" ")}
                ref={userProfileRef}
              >
                <div className="navigation__wrapper__user-profile__container__items">
                  {dropdownTexts?.map((text) => {
                    if (text.key === "/logout") {
                      return (
                        <div
                          key={text.key}
                          className="navigation__wrapper__user-profile__container__items__item-wrapper"
                          onClick={handleSignOut}
                        >
                          {text.value}
                        </div>
                      );
                    } else if (hasUser) {
                      return (
                        <div
                          key={text.key}
                          className="navigation__wrapper__user-profile__container__items__item-wrapper"
                          onClick={() => navigate(text.key)}
                        >
                          {text.value}
                        </div>
                      );
                    }
                    {
                      return (
                        <div
                          key={text.key}
                          className="navigation__wrapper__user-profile__container__items__item-wrapper"
                          onClick={() => navigate(text.key)}
                        >
                          {text.value}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {width <= SCREEN_MD && isMenuOpen && (
        <div className="navigation__mobile-menu">items</div>
      )}
    </div>
  );
}

export default Navigation;
