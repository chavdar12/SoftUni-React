import { LoginBlock, Page } from "#blocks";

function AdminLoginPage() {
  return (
    <Page>
      <LoginBlock isAdminLogin={true} />
    </Page>
  );
}

export default AdminLoginPage;
