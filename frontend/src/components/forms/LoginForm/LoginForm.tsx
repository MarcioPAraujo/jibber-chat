"use client";

import DefaultInput from "@/components/inputs/DefaultInput/DefaultInput";
import PasswordInput from "@/components/inputs/PasswordInput/PasswordInput";
import { LoginSchema, LoginSchemaType } from "@/validations/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IoIosCheckmark } from "react-icons/io";
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Acesse sua conta</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <DefaultInput
          id="email"
          label="Email"
          placeholder="Digite seu email"
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <PasswordInput
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          register={register("password")}
          errorMessage={errors.password?.message}
        />
        <label htmlFor="rememberMe" className={styles.rememberMe}>
          <div className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
            />
            <IoIosCheckmark />
          </div>
          Lembrar-me
        </label>
        <button
          type="submit"
          disabled={!isValid}
          className={styles.submitButton}
        >
          Entrar
        </button>
        <Link href="/cadastro" className={styles.link}>
          Não tem uma conta? Cadastre-se
        </Link>
        <Link href="/esqueci-senha" className={styles.link}>
          Esqueci minha senha
        </Link>
      </form>
    </div>
  );
};
export default LoginForm;
