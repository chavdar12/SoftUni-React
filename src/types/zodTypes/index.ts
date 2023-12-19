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

export function UserProfileSchema(t: TFunction) {
  return z.object({
    firstName: z.string().min(2, { message: t("firstName_error") }),
    lastName: z.string().min(2, { message: t("lastName_error") }),
    birthdate: z.string().min(2, { message: t("birthdate_error") }),
    address: z.string().min(10, { message: t("address_error") }),
    city: z.string().min(2, { message: t("city_error") }),
    phone_number: z.string().min(10, { message: t("phone_error") }),
  });
}

export function ProductSchema(t: TFunction) {
  return z.object({
    name: z.string().min(2, { message: t("name_error") }),
    description: z.string().min(10, { message: t("description_error") }),
    price: z.string().min(0, { message: t("price_error") }),
    quantity: z.string().min(0, { message: t("quantity_error") }),
    category: z.string().min(2, { message: t("category_error") }),
  });
}
