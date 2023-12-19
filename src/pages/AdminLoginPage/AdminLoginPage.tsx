import { LoginBlock, Page } from "#blocks";
import "./admin-login-page.scss";

function AdminLoginPage() {
  return (
    <Page hasFooter={false} hasNavigation={false} classes="admin-login-page">
      <LoginBlock isAdminLogin={true} />
    </Page>
  );
}

export default AdminLoginPage;
