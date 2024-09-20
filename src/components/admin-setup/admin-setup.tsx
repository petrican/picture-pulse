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
        <div className={styles["welcome"]}>Welcome</div>
      </div>
    </div>
  );
};

export default AdminSetup;
