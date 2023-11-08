import './login-page.scss';

import { LoginBlock, Page } from '#blocks';

export function LoginPage() {
  return (
    <Page hasFooter={false} hasNavigation={false} classes="login-page">
      <LoginBlock />
    </Page>
  );
}
export default LoginPage;
