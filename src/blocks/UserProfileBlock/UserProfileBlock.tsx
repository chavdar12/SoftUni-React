import { useEffect, useState } from "react";
import { Block, Box, Button, Grid, GridItem, Input } from "#components";
import "./user-profile.scss";
import { useAuth } from "#utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { UserProfileSchema } from "#types";
import {
  useGetUserProfile,
  useImageUpload,
  useUpdateUserProfile,
} from "#hooks";
import ImageUploading, { ImageListType } from "react-images-uploading";

function UserProfileBlock() {
  const { t } = useTranslation("user-profile-block");
  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 1;
  const { user } = useAuth();

  const userProfile = useGetUserProfile(user?.uid || "");
  const { uploadImage, uploading } = useImageUpload();
  const updateUserProfile = useUpdateUserProfile();

  const schema = UserProfileSchema(t);

  type types = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<types>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<types> = async (data: types) => {
    if (isValid && user) {
      let photoUrl = userProfile?.photo_url;
      if (images.length > 0 && images[0].file) {
        photoUrl = await uploadImage(images[0].file, user.uid);
      }

      const updatedProfile = { ...data, photo_url: photoUrl };
      updateUserProfile(updatedProfile);
    }
    reset();
  };

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [reset, userProfile]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
      if (userProfile.photo_url) {
        setImages([{ data_url: userProfile.photo_url }]);
      }
    }
  }, [reset, userProfile]);

  return (
    <Block classes="user-profile-block">
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
                  onImageUpdate,
                  onImageRemove,
                }) => (
                  <Grid>
                    {imageList.map((image, index) => (
                      <GridItem
                        md={8}
                        lg={12}
                        key={index}
                        classes={"user-profile-block__container"}
                      >
                        <Grid>
                          <GridItem md={8} lg={12}>
                            <img
                              src={image["data_url"]}
                              className="user-profile-block__image"
                            />
                          </GridItem>
                          <GridItem md={4} lg={6}>
                            <Button
                              type="button"
                              onClick={() => onImageUpdate(index)}
                              text={t("update")}
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
                    <GridItem
                      md={8}
                      lg={12}
                      classes="user-profile-block__button"
                    >
                      <Button
                        type="button"
                        onClick={onImageUpload}
                        text={t("upload")}
                      />
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
                    label={t("first_name")}
                    type="text"
                    register={register("firstName")}
                    errors={errors.firstName}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("last_name")}
                    type="text"
                    register={register("lastName")}
                    errors={errors.lastName}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("birthday")}
                    type="text"
                    register={register("birthdate")}
                    errors={errors.birthdate}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("phone_number")}
                    type="text"
                    register={register("phone_number")}
                    errors={errors.phone_number}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("address")}
                    type="text"
                    register={register("address")}
                    errors={errors.address}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    size="full"
                    label={t("city")}
                    type="text"
                    register={register("city")}
                    errors={errors.city}
                  />
                </GridItem>
                <GridItem md={8} lg={12} classes="user-profile-block__button">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    text={t("submit")}
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

export default UserProfileBlock;
