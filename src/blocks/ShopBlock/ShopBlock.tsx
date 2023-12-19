import { Block, Box, Grid, GridItem, ProductCard } from "#components";
import { useGetCategories, useGetProducts } from "#hooks";
import { useMemo, useState } from "react";
import "./shop-block.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function ShopBlock() {
  const { categories } = useGetCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { t } = useTranslation("shop-block");
  const { products, loading } = useGetProducts();
  const navigate = useNavigate();

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

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return products;
    }

    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }, [products, selectedCategories]);

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
        <GridItem md={8} lg={12}>
          <Box heading={t("products")}>
            <Grid>
              {filteredProducts.map((product) => (
                <GridItem md={4} lg={4} key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => {
                      navigate(`/product/${encodeURIComponent(product.id!)}`);
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </Block>
  );
}

export default ShopBlock;
