import { TFunction } from "i18next";
import "./sales-card.scss";

interface SalesCardProps {
  classes?: string;
  t: TFunction;
  text?: string;
}

function SalesCard({ classes, t, text }: SalesCardProps) {
  return (
    <div className={["sales-card", classes].join(" ")}>
      <div className="sales-card__container">
        <h3>{t("period")}</h3>
        <h1>{text}</h1>
        <p>{`${text} ${t("sales")}`}</p>
      </div>
    </div>
  );
}

export default SalesCard;
