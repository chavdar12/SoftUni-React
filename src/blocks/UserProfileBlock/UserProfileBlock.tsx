import React, { useEffect, useState } from "react";
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

function UserProfileBlock() {
  const { t } = useTranslation("user-profile-block");
  const [image, setImage] = useState<File | null>(null);
  const { user } = useAuth();

  const userProfile = useGetUserProfile(user?.uid || "");
  const { uploadImage, uploading } = useImageUpload();
  const updateUserProfile = useUpdateUserProfile();

  const schema = UserProfileSchema(t);

  type types = z.infer<typeof schema>;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

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
      updateUserProfile(user.uid, data);
      if (image) {
        await uploadImage(image, user.uid);
      }
    }
    reset();
  };

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [reset, userProfile]);

  const handleUpload = async () => {
    if (image && user) {
      const url = await uploadImage(image, user.uid);
      console.log("Uploaded a blob or file!", url);
    }
  };

  return (
    <Block classes="user-profile-block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <GridItem md={8} lg={12}>
            <Box>
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
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
