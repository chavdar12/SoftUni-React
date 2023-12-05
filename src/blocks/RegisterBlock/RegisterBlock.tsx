import "./register-block.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import {
  Block,
  Button,
  Grid,
  GridItem,
  Input,
  SuccessToast,
} from "#components";
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
      console.log(data);
      SuccessToast({ text: "Success" });
    }
    reset();
  };

  return (
    <Block classes="register-block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <GridItem md={8} lg={12}>
            <Input
              type="text"
              register={register("email")}
              errors={errors.email}
            />
          </GridItem>
          <GridItem md={8} lg={12}>
            <Input
              type="text"
              register={register("password")}
              errors={errors.password}
            />
          </GridItem>
          <GridItem md={8} lg={12}>
            <Input
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
