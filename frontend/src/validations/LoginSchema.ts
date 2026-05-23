import * as yup from "yup";

export type LoginSchemaType = yup.InferType<typeof LoginSchema>;

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  rememberMe: yup.boolean().default(false),
});
