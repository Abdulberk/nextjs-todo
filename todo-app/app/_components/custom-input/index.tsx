"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import WarningIcon from "../../_assets/warning-circle.svg"
interface CustomInputProps {
  label?: string;
  message?: string;
  inputType: string;
}

export default function CustomInput({
  label,
  inputType,
  message,
  ...props
}: CustomInputProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  }) {
    const [hasBlurred, setHasBlurred] = useState(false);

    const isInvalidMail = (mail: string) => {
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !mailRegex.test(mail);
    }

    const isInvalidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        return !passwordRegex.test(password);
    }

    const isInvalid = (type: string, value: string) => {
        switch (type) {
            case "email":
                return hasBlurred && isInvalidMail(value);
            case "password":
                return hasBlurred && isInvalidPassword(value);
            default:
                return false;
        }
    }

    const getWarningMessage = (type: string) => {
        switch (type) {
            case "email":
                return "Please enter a valid email address";
            case "password":
                return "Password must contain at least 6 characters, one uppercase, one lowercase and one number";
            default:
                return "";
        }
    }

    const getMessage = (type: string, value: string) => {
        if (isInvalid(type, value)) {
            return getWarningMessage(type);
        }
        return "";
    }

    const msg = message ? message : getMessage(inputType, props.value as string);



  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} {...props} type={inputType}
        onBlur={() => setHasBlurred(true)}
        
      />
       
        {msg &&
            <div className={styles.warningWrapper}>
          <div className={styles.warningIcon}>
            <Image src={WarningIcon} alt="Warning icon" width={0} height={0} />
          </div>
          <p>
            {msg}
          </p>
        </div>

        }
      
    </div>
  );
}
