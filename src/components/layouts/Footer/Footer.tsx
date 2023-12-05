import "./footer.scss";

import { Block } from "../Block";

type textsType = {
  key: string;
  value: string;
};

interface FooterProps {
  classes?: string;
  texts?: textsType[];
}

export function Footer({ classes, texts }: FooterProps) {
  return <Block classes="footer__block"></Block>;
}
export default Footer;
