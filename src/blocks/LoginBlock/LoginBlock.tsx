import "./login-block.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Block, Box, Button, Grid, GridItem, Input } from "#components";
import { LoginFormSchema } from "#types";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginBlock() {
  const { t } = useTranslation("login-block");
  const schema = LoginFormSchema(t);
  type types = z.infer<typeof schema>;
  const navigate = useNavigate();

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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    }
    reset();
  };

  return (
    <Block classes="login-block">
      <Grid>
        <GridItem md={8} lg={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
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
                  type="password"
                  register={register("password")}
                  errors={errors.password}
                />
              </GridItem>
              <GridItem md={8} lg={12}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  text={t("submit")}
                />
              </GridItem>
            </Grid>
          </form>
        </GridItem>
      </Grid>
    </Block>
  );
}

export default LoginBlock;
