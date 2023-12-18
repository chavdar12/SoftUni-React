import "./page.scss";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import { Footer, Navigation } from "#components";

interface PageProps {
  classes?: string;
  children?: React.ReactNode;
  hasNavigation?: boolean;
  hasFooter?: boolean;
  isAdmin?: boolean;
}

function Page({
  classes,
  children,
  hasNavigation = true,
  hasFooter = true,
  isAdmin = false,
}: PageProps) {
  const { t, i18n } = useTranslation("page-block");
  const currentLanguage = i18n.language;
  const hasUser = auth.currentUser;
  console.log(hasUser);
  

  const navigationTexts = [
    {
      key: "/",
      value: t("home"),
    },
    {
      key: "/shop",
      value: t("shop"),
    },
    {
      key: "/contact",
      value: t("contact"),
    },
  ];

  const footerTexts = [
    {
      key: "/",
      value: t("home"),
    },
    {
      key: "/shop",
      value: t("shop"),
    },
    {
      key: "/contact",
      value: t("contact"),
    },
  ];

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleLanguageChange = useCallback(() => {
    const newLanguage = currentLanguage === "en" ? "bg" : "en";
    localStorage.setItem("selectedLanguage", newLanguage);
    i18n.changeLanguage(newLanguage);
  }, [currentLanguage, i18n]);

  return (
    <div className={["page", classes].join(" ")}>
      {hasNavigation && (
        <Navigation
          classes="page__navigation"
          texts={navigationTexts}
          handleLanguageChange={handleLanguageChange}
          isAdmin={isAdmin}
          dropdownTexts={
            hasUser !== null
              ? [
                  {
                    key: "/profile",
                    value: t("profile"),
                  },
                  {
                    key: "/logout",
                    value: t("logout"),
                  },
                ]
              : [
                  {
                    key: "/login",
                    value: t("login"),
                  },
                  {
                    key: "/register",
                    value: t("register"),
                  },
                ]
          }
          handleSignOut={handleSignOut}
          hasUser={hasUser !== null}
        />
      )}
      <div className="page__content-container">{children}</div>
      {hasFooter && <Footer classes="page__footer" texts={footerTexts} />}
    </div>
  );
}
export default Page;
