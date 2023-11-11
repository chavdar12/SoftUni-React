import {
  Block,
  Box,
  Dropdown,
  Grid,
  GridItem,
  Input,
  TextEditor,
} from "#components";

function AdminAddItemBlock() {
  return (
    <Block classes="admin-add-item-block">
      <Box>
        <Grid>
          <GridItem md={8} lg={12}>
            <Input />
          </GridItem>
          <GridItem md={8} lg={12}>
            photos placeholder
          </GridItem>
          <GridItem md={8} lg={12}>
            <Dropdown />
          </GridItem>
          <GridItem md={8} lg={12}>
            <TextEditor />
          </GridItem>
        </Grid>
      </Box>
    </Block>
  );
}

export default AdminAddItemBlock;
