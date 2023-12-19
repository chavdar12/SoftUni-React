import { Page, RegisterBlock } from "#blocks";
import "./register-page.scss";

function RegisterPage() {
  return (
    <Page hasFooter={false} hasNavigation={false} classes="register-page">
      <RegisterBlock />
    </Page>
  );
}
export default RegisterPage;
