import React from "react";
import styles from "./main-unauthenticated.module.scss";

export const MainUnauthenticated = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Main page - <a href="/login">Login</a> to be able to upload pictures
        </p>
      </div>
    </main>
  );
};

export default MainUnauthenticated;
