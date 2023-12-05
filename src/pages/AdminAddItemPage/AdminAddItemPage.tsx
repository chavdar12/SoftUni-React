import { AdminAddItemBlock, Page } from "#blocks";

function AdminAddItemPage() {
  return (
    <Page isAdmin={true}>
      <AdminAddItemBlock />
    </Page>
  );
}

export default AdminAddItemPage;
