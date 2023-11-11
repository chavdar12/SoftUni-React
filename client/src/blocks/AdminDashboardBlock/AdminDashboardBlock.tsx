import { Block, Grid, GridItem, SalesCard } from "#components";
import { useTranslation } from "react-i18next";

function AdminDashboardBlock() {
  const { t } = useTranslation();
  const items = [
    {
      value: "10",
    },
    {
      value: "10",
    },
    {
      value: "10",
    },
  ];
  return (
    <Block classes="admin-dashboard-block">
      <Grid classes="admin-dashboard-block__grid">
        <GridItem md={8} lg={12}>
          {t("sales")}
        </GridItem>
        {items.map((item, index) => (
          <GridItem key={index}>
            <SalesCard t={t} text={item.value} />
          </GridItem>
        ))}
        <GridItem md={8} lg={12}>
          {t("sales")}
        </GridItem>
        {items.map((item, index) => (
          <GridItem key={index}>
            <SalesCard t={t} text={item.value} />
          </GridItem>
        ))}
      </Grid>
    </Block>
  );
}

export default AdminDashboardBlock;
