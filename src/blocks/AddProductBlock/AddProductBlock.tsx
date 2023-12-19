import {
  Block,
  Box,
  Button,
  Dropdown,
  Grid,
  GridItem,
  Input,
  TextArea,
} from "#components";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { z } from "zod";

import "./add-product.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Product, ProductSchema } from "#types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories, useUploadProduct } from "#hooks";
import { useAuth } from "#utils";

function AddProductBlock() {
  const { t } = useTranslation("add-product-block");
  const schema = ProductSchema(t);
  type types = z.infer<typeof schema>;
  const maxNumber = 10;
  const [images, setImages] = useState<ImageListType>([]);
  const { uploadProduct, error } = useUploadProduct();
  const { user } = useAuth();
  const { categories } = useGetCategories();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<types>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<types> = async (data: types) => {
    if (isValid) {
      const product: Product = {
        ...data,
        photos: images.map((image) => image.data_url),
        user_id: user?.uid,
      };

      const imageFiles = images
        .map((image) => image.file)
        .filter((file): file is File => !!file);
      await uploadProduct(product, imageFiles);
      if (!error) {
        reset();
        setImages([]);
      }
    }
    reset();
  };

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  return (
    <Block classes="add-product-block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <GridItem md={8} lg={12}>
            <Box>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                }) => (
                  <Grid>
                    {imageList.map((image, index) => (
                      <GridItem
                        md={3}
                        lg={4}
                        key={index}
                        classes={"add-product-block__container"}
                      >
                        <Grid>
                          <GridItem md={8} lg={12}>
                            <img
                              src={image["data_url"]}
                              alt=""
                              className="add-product-block__image"
                            />
                          </GridItem>
                          <GridItem
                            md={4}
                            lg={6}
                            classes="add-product-block__button"
                          >
                            <Button
                              type="button"
                              onClick={() => onImageUpdate(index)}
                              text={t("update")}
                              classes="add-product-block__button"
                            />
                          </GridItem>
                          <GridItem md={4} lg={6}>
                            <Button
                              type="button"
                              onClick={() => onImageRemove(index)}
                              text={t("remove")}
                            />
                          </GridItem>
                        </Grid>
                      </GridItem>
                    ))}
                    <GridItem md={8} lg={12}>
                      <Grid>
                        <GridItem
                          md={4}
                          lg={6}
                          classes="add-product-block__button"
                        >
                          <Button
                            type="button"
                            onClick={onImageUpload}
                            text={t("upload")}
                          />
                        </GridItem>
                        <GridItem
                          md={4}
                          lg={6}
                          classes="add-product-block__button"
                        >
                          <Button
                            type="button"
                            onClick={onImageRemoveAll}
                            text={t("remove_all")}
                          />
                        </GridItem>
                      </Grid>
                    </GridItem>
                  </Grid>
                )}
              </ImageUploading>
            </Box>
          </GridItem>
          <GridItem md={8} lg={12}>
            <Box>
              <Grid>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("name")}
                    register={register("name")}
                    errors={errors.name}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("price")}
                    register={register("price")}
                    errors={errors.price}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("quantity")}
                    register={register("quantity")}
                    errors={errors.quantity}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  {/* <Input
                    size="full"
                    label={t("category")}
                    register={register("category")}
                    errors={errors.category}
                  /> */}
                  <Dropdown
                    label={t("category")}
                    items={categories}
                    register={register("category")}
                    errors={errors.category}
                  />
                </GridItem>
                <GridItem md={8} lg={12} classes="add-product-block__text-area">
                  <TextArea
                    label={t("description")}
                    register={register("description")}
                    errors={errors.description}
                  />
                </GridItem>
                <GridItem md={8} lg={12} classes="add-product-block__button">
                  <Button
                    type="submit"
                    text={t("submit")}
                    disabled={isSubmitting}
                  />
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </form>
    </Block>
  );
}

export default AddProductBlock;
