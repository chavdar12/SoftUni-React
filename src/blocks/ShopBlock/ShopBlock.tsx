import { Block, Box, Grid, GridItem } from "#components";
import { useGetCategories } from "#hooks";
import { useMemo, useState } from "react";
import "./shop-block.scss";
import { useTranslation } from "react-i18next";
function ShopBlock() {
  const { categories } = useGetCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { t } = useTranslation("shop-block");

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryKey)) {
        return prevSelectedCategories.filter((key) => key !== categoryKey);
      } else {
        return [...prevSelectedCategories, categoryKey];
      }
    });
  };

  const sortedCategories = useMemo(() => {
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  return (
    <Block classes="shop-block">
      <Grid>
        <GridItem md={8} lg={12}>
          <Box heading={t("categories")}>
            <div className="shop-block__chip-wrapper">
              {sortedCategories.map((category) => (
                <div
                  key={category.key}
                  className={[
                    "shop-block__chip-wrapper__item",
                    selectedCategories.includes(category.key)
                      ? "shop-block__chip-wrapper__item--selected"
                      : "",
                  ].join(" ")}
                  onClick={() => handleCategorySelect(category.key)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </Box>
        </GridItem>
      </Grid>
    </Block>
  );
}

export default ShopBlock;
