"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import CustomInput from "../../../_components/custom-input";
import useSignup from "./api/useSignup";
import { useRouter } from "next/navigation";
import BarLoader from "react-spinners/BarLoader";
export default function Login() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loginState, setLoginState] = useState({
    error: "",
    success: "",
    loading: false,
  });
  const { signUpMutation } = useSignup();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginState({ ...loginState, loading: true });

    try {
      await signUpMutation.mutateAsync({
        email: loginData.email,
        password: loginData.password,
        name: loginData.name,
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
      
        <div className={styles.header}>
          <h1>Sign up</h1>
          <p className={styles.subtitle}>
            Already have an account?{" "}
            <span>
              <Link href="/login">Sign in</Link>
            </span>
          </p>
          

          <form onSubmit={handleSubmit}>
            <div className={styles.inputsContainer}>
                <CustomInput
                  label="Name"
                  inputType="text"
                  placeholder="John Doe"
                  name="name"
                  value={loginData.name}
                  onChange={handleChange}
                />

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
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
