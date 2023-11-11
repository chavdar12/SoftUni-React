import { AdminDashboardBlock, Page } from "#blocks";

function AdminDashboardPage() {
  return (
    <Page isAdmin={true}>
      <AdminDashboardBlock />
    </Page>
  );
}

export default AdminDashboardPage;
