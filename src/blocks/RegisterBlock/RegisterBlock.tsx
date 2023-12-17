import "./register-block.scss";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Block, Button, Grid, GridItem, Input } from "#components";
import { RegisterFormSchema } from "#types";

function RegisterBlock() {
  const { t } = useTranslation("register-block");
  const schema = RegisterFormSchema(t);
  type types = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<types>({
    resolver: zodResolver(RegisterFormSchema(t)),
  });

  const onSubmit: SubmitHandler<types> = async (data) => {
    if (isValid) {
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(auth.currentUser!, {
          displayName: `${data.firstName} ${data.lastName}`,
        });
        reset();
      } catch (error) {
        console.log(error);
      }
    }
    reset();
  };
  return (
    <Block classes="register-block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid classes="register-blocks__form">
          <GridItem md={8} lg={12}>
            <Input
              label={t("first_name")}
              type="text"
              register={register("firstName")}
              errors={errors.firstName}
            />
          </GridItem>
          <GridItem md={8} lg={12}>
            <Input
              label={t("last_name")}
              type="text"
              register={register("lastName")}
              errors={errors.lastName}
            />
          </GridItem>
          <GridItem md={8} lg={12}>
            <Input
              label={t("email")}
              type="text"
              register={register("email")}
              errors={errors.email}
            />
          </GridItem>
          <GridItem md={8} lg={12}>
            <Input
              label={t("password")}
              type="text"
              register={register("password")}
              errors={errors.password}
            />
          </GridItem>
          <GridItem md={8} lg={12}>
            <Input
              label={t("confirm_password")}
              type="text"
              register={register("confirmPassword")}
              errors={errors.confirmPassword}
            />
          </GridItem>
          <GridItem md={8} lg={12}>
            <Button type="submit" disabled={isSubmitting} text={t("submit")} />
          </GridItem>
        </Grid>
      </form>
    </Block>
  );
}
export default RegisterBlock;
