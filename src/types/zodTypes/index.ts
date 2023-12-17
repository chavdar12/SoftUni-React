import { TFunction } from "i18next";
import { z } from "zod";

export function RegisterFormSchema(t: TFunction) {
  return z

    .object({
      firstName: z.string().min(2, { message: t("firstName_error") }),
      lastName: z.string().min(2, { message: t("lastName_error") }),
      email: z.string().email({ message: t("email_error") }),
      password: z.string().min(4, { message: t("password_error") }),
      confirmPassword: z.string().min(4, { message: t("password_error") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("password_match_error"),
      path: ["confirmPassword"],
    });
}

export function LoginFormSchema(t: TFunction) {
  return z.object({
    email: z.string().email({ message: t("email_error") }),
    password: z.string().min(4, { message: t("password_error") }),
  });
}

export function ForgotPasswordFormSchema(t: TFunction) {
  return z.object({
    email: z.string().email({ message: t("email_error") }),
  });
}

export function ResetPasswordFormSchema(t: TFunction) {
  return z.object({
    password: z.string().min(4, { message: t("password_error") }),
    confirmPassword: z.string().min(4, { message: t("password_error") }),
  });
}

export function ChangePasswordFormSchema(t: TFunction) {
  return z.object({
    oldPassword: z.string().min(4, { message: t("password_error") }),
    newPassword: z.string().min(4, { message: t("password_error") }),
    confirmNewPassword: z.string().min(4, { message: t("password_error") }),
  });
}
