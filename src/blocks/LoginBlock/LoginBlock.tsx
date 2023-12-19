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
import { useAuth } from "#utils";

interface LoginBlockProps {
  isAdminLogin?: boolean;
}

function LoginBlock({ isAdminLogin = false }: LoginBlockProps) {
  const { t } = useTranslation("login-block");
  const schema = LoginFormSchema(t);
  type types = z.infer<typeof schema>;
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
      setUser(auth.currentUser);
      navigate(
        isAdminLogin ? "/admin-dashboard" : auth.currentUser ? "/" : "/login"
      );
    }
    reset();
  };

  return (
    <Block classes="login-block">
      <Grid>
        <GridItem md={8} lg={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box heading={t("Login")}>
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
                <GridItem md={8} lg={12} classes="login-block__button">
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

export default LoginBlock;
