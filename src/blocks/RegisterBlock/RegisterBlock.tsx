import "./register-block.scss";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Block, Box, Button, Grid, GridItem, Input } from "#components";
import { RegisterFormSchema } from "#types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "#utils";
import { useUpdateUserProfile } from "#hooks";

function RegisterBlock() {
  const { t } = useTranslation("register-block");
  const schema = RegisterFormSchema(t);
  type Types = z.infer<typeof schema>;
  const navigate = useNavigate();
  const updateUserProfile = useUpdateUserProfile();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<Types>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Types> = async (data) => {
    if (isValid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: `${data.firstName} ${data.lastName}`,
        });

        await updateUserProfile(user.uid, {
          first_name: data.firstName,
          last_name: data.lastName,
        });
        setUser(auth.currentUser);
        reset();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    reset();
  };
  return (
    <Block classes="register-block">
      <Grid>
        <GridItem md={8} lg={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid>
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
                <GridItem md={8} lg={12} classes="register-block__button">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    text={t("submit")}
                  />
                </GridItem>
              </Grid>
            </Box>
          </form>
        </GridItem>
      </Grid>
    </Block>
  );
}
export default RegisterBlock;
