// UserProfileBlock.tsx
import React, { useState } from "react";
import { Block, Box, Grid, GridItem, Input } from "#components";
import "./user-profile.scss";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useAuth } from "#utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { UserProfileSchema } from "#types";

function UserProfileBlock() {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const { user } = useAuth();
  const { t } = useTranslation("user-profile-block");

  const schema = UserProfileSchema(t);

  type types = z.infer<typeof schema>;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image && user) {
      const imageRef = ref(storage, `profile/${user.uid}/${image.name}`);
      setUploading(true);

      try {
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        console.log("Uploaded a blob or file!", url);
      } catch (error) {
        console.error("Error uploading file", error);
      }

      setUploading(false);
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
    if (isValid) {
      console.log("data", data);
    }
    reset();
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
                    label={t("first_name")}
                    type="text"
                    register={register("firstName")}
                    errors={errors.firstName}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    label={t("last_name")}
                    type="text"
                    register={register("lastName")}
                    errors={errors.lastName}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    label={t("birthday")}
                    type="text"
                    register={register("birthdate")}
                    errors={errors.birthdate}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    label={t("phone")}
                    type="text"
                    register={register("phone")}
                    errors={errors.phone}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    label={t("address")}
                    type="text"
                    register={register("address")}
                    errors={errors.address}
                  />
                </GridItem>
                <GridItem md={4} lg={6}>
                  <Input
                    label={t("city")}
                    type="text"
                    register={register("city")}
                    errors={errors.city}
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
