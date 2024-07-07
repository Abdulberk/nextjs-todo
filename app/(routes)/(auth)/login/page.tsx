"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import CustomInput from "@/app/_components/custom-input";
import useLogin from "./api/useLogin";
import { useRouter } from "next/navigation";
import BarLoader from "react-spinners/BarLoader";
export default function Login() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({
    error: "",
    success: "",
    loading: false,
  });
  const { signInMutation } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginState({ ...loginState, loading: true });

    try {
      await signInMutation.mutateAsync({
        email: loginData.email,
        password: loginData.password,
      });
    } catch (error: any) {
      console.error("Authentication failed:", error);
      setLoginState({ ...loginState, error: error.message, loading: false });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.logo}>
        
        </div>
        <div className={styles.header}>
          <h1>Sign in</h1>
          <p className={styles.subtitle}>
            Dont have an account ?{" "}
            <span>
              <Link href="/signup">Sign up</Link>
            </span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputsContainer}>
              <CustomInput
                label="Email address"
                inputType="email"
                placeholder="email@email.com"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
              <CustomInput
                label="Password"
                inputType="password"
                placeholder="password"
                message={loginState && loginState.error}
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>

            <button
              className={styles.button}
              type="submit"
              disabled={
                !loginData.email || !loginData.password 
              }
            >
              {loginState.loading ? (
                <BarLoader
                  color="#ffffff"
                  height={5}
                  speedMultiplier={2}
                  width={50}
                />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
