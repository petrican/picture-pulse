import React from "react";
import Image from "next/image";
import styles from "./admin-setup.module.scss";

export const AdminSetup = () => {
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
      <div className={styles["message-box"]}>
        <div className={styles["welcome-title"]}>Welcome</div>

        <div className={styles["sub-header"]}>Welcome to the Picture Pulse installation process!</div>

        <div className={styles["information-needed"]}>Information needed</div>

        <div className={styles["info-title"]}>Please provide the following informations.</div>


      </div>
    </div>
  );
};

export default AdminSetup;
