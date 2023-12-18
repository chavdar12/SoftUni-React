import {
  Block,
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  TextArea,
} from "#components";
import { storage } from "../../firebase";
import ImageUploading, { ImageListType } from "react-images-uploading";

import "./add-product.scss";
import { useState } from "react";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { useTranslation } from "react-i18next";

function AddProductBlock() {
  const { t } = useTranslation("add-product-block");
  const maxNumber = 10;

  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const uploadImages = async () => {
    const imageUrls: string[] = [];

    for (const image of images) {
      if (!image.file) continue;

      const uniqueName = `images/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 11)}-${image.file.name}`;
      const storageRef = ref(storage, uniqueName);

      const snapshot = await uploadBytes(storageRef, image.file);
      const url = await getDownloadURL(snapshot.ref);
      imageUrls.push(url);
    }
  };

  return (
    <Block classes="add-product-block">
      <form>
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
                        <GridItem md={3} lg={4}>
                          <Button
                            type="button"
                            onClick={onImageUpload}
                            text={t("upload")}
                            classes="add-product-block__button"
                          />
                        </GridItem>
                        <GridItem md={3} lg={4}>
                          <Button
                            type="button"
                            onClick={onImageRemoveAll}
                            text={t("remove_all")}
                            classes="add-product-block__button"
                          />
                        </GridItem>
                        <GridItem md={3} lg={4}>
                          <Button
                            type="button"
                            onClick={uploadImages}
                            text={t("upload_all")}
                            classes="add-product-block__button"
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
                  <Input label={t("name")} />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input label={t("price")} />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input label={t("size")} />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input label={t("category")} />
                </GridItem>
                <GridItem md={8} lg={12}>
                  <TextArea label={t("description")} />
                </GridItem>
                <GridItem md={8} lg={12}>
                  <Button type="submit" text={t("submit")} />
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
