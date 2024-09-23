"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./admin-setup.module.scss";

export const AdminSetup = () => {
  const [formData, setFormData] = useState({
    siteTitle: "",
    siteUsername: "",
    sitePassword: "",
    siteEmail: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data. Please try again.");
      }

      const result = await response.json();
      setSuccess("Installation completed successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError("An unknown error occurred."); 
      }
    }
  };

  return (
    <div className={styles["welcome-wrapper"]}>
      <div className={styles["logo"]}>
        <Image
          src="/logo-main-small.png"
          alt="Picture Pulse Logo"
          width={84}
          height={84}
          priority
        />
      </div>
      <form className={styles["message-box"]} onSubmit={handleSubmit}>
        <div className={styles["welcome-title"]}>Welcome</div>

        <div className={styles["sub-header"]}>
          Welcome to the <b>Picture Pulse</b> installation process!
        </div>

        <div className={styles["information-needed"]}>Information needed</div>

        <div className={styles["info-title"]}>
          Please provide the following information.
        </div>

        <div className={styles["field-box"]}>
          <div className={styles["field-title"]}>Site Title</div>
          <div className={styles["input-wrapper"]}>
            <input
              type="text"
              name="siteTitle"
              autoFocus
              id="siteTitle"
              value={formData.siteTitle}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles["field-box"]}>
          <div className={styles["field-title"]}>Username</div>
          <div className={styles["input-wrapper"]}>
            <input
              type="text"
              name="siteUsername"
              id="siteUsername"
              value={formData.siteUsername}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles["field-box"]}>
          <div className={styles["field-title"]}>Password</div>
          <div className={styles["input-wrapper"]}>
            <input
              type="password"
              name="sitePassword"
              id="sitePassword"
              value={formData.sitePassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles["field-box"]}>
          <div className={styles["field-title"]}>Your Email</div>
          <div className={styles["input-wrapper"]}>
            <input
              type="email"
              name="siteEmail"
              id="siteEmail"
              value={formData.siteEmail}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <div className={styles["db-errors"]}>{error}</div>}
        {success && <div className={styles["success-message"]}>{success}</div>}

        <div className={styles["start-install"]}>
          <button className={styles["save-button"]} type="submit">
            Install PicturePulse
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSetup;
