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

        <div className={styles["sub-header"]}>Welcome to the <b>Picture Pulse</b> installation process!</div>

        <div className={styles["information-needed"]}>Information needed</div>

        <div className={styles["info-title"]}>Please provide the following informations.</div>

        <div className={styles["field-box"]}>
            <div className={styles["field-title"]}>Site Title</div>
            <div className={styles["input-wrapper"]}><input type="text" name="siteTitle" autoFocus id="siteTitle" required /></div>
        </div>

        <div className={styles["field-box"]}>
            <div className={styles["field-title"]}>Username</div>
            <div className={styles["input-wrapper"]}><input type="text" name="siteUsername" id="siteUsername" required/></div>
        </div>

        <div className={styles["field-box"]}>
            <div className={styles["field-title"]}>Password</div>
            <div className={styles["input-wrapper"]}><input type="password" name="sitePassword" id="sitePassword" required /></div>
        </div>

        <div className={styles["field-box"]}>
            <div className={styles["field-title"]}>Your Email</div>
            <div className={styles["input-wrapper"]}><input type="text" name="siteEmail" id="siteEmail" required /></div>
        </div>

        <div className={styles["start-install"]}>
          <button className={styles["save-button"]}>Install PicturePulse</button>
        </div>


      </div>
    </div>
  );
};

export default AdminSetup;
