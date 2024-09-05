"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const Install = () => {
  const [dbHost, setDbHost] = useState("");
  const [dbPort, setDbPort] = useState("3306");
  const [dbName, setDbName] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); // Access URL search params

  const step = searchParams.get("step"); // Get the value of 'step' from URL

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/save-db-connection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dbHost, dbPort, dbName, dbUser, dbPassword }),
    });

    if (res.ok) {
      router.push("/"); // Redirect to home page after setup
    }
  };

  // Conditionally render content based on 'step' parameter
  return step === "1" ? (
    <div>
      <h1>Database Setup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Database Host:
          <input
            type="text"
            value={dbHost}
            onChange={(e) => setDbHost(e.target.value)}
            required
          />
        </label>
        <label>
          Database Port:
          <input
            type="number"
            value={dbPort}
            onChange={(e) => setDbPort(e.target.value)}
            required
          />
        </label>
        <label>
          Database Name:
          <input
            type="text"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
            required
          />
        </label>
        <label>
          Database User:
          <input
            type="text"
            value={dbUser}
            onChange={(e) => setDbUser(e.target.value)}
            required
          />
        </label>
        <label>
          Database Password:
          <input
            type="password"
            value={dbPassword}
            onChange={(e) => setDbPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  ) : (
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
        <p>
          Welcome to Picture Pulse installation process. Before getting started,
          we need some information on the database. You will need to know the
          following items before proceeding.
        </p>
        <ol className={styles["needed"]}>
          <li>Database name</li>
          <li>Database username</li>
          <li>Database password</li>
          <li>Database host</li>
        </ol>
        We’re going to use this information to create a database.json file. If for
        any reason this automatic file creation doesn’t work, don’t worry. All
        this does is fill in the database information to a configuration file named database.json under the config folder.
        If the automatic process does not work you can create a file under config/config.json
        <div className={styles['start-btn-wrapper']}>
        <a href="/install?step=1">
          <button type="button" className={styles['start-btn']}>Start Installation</button>
        </a>
        </div>
      </div>

    </div>
  );
};

export default Install;
