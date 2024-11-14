"use client";
import styles from "./page.module.scss";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const Install = () => {
  const [dbHost, setDbHost] = useState("");
  const [dbPort, setDbPort] = useState("3306");
  const [dbName, setDbName] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); // Access URL search params

  const step = searchParams.get("step"); // Get the value of 'step' from URL

  // Create a reference to the first input (dbHost)
  const dbHostInputRef = useRef<HTMLInputElement>(null);

  // Use useEffect to focus on the dbHost input when the component mounts
  useEffect(() => {
    if (dbHostInputRef.current) {
      dbHostInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/save-db-connection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dbHost, dbPort, dbName, dbUser, dbPassword }),
    });

    console.log('RES:', res);
    
    if (res.ok) {
      router.push("/"); // Redirect to home page after setup
    }

    if (res.status === 500) {
      setError("Could not connect to the database. Please check the credentials.")
    }
  };

  // Conditionally render content based on 'step' parameter
  return step === "1" ? (
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
        <h2>Database Setup</h2>
        <p className={styles["instructions"]}>
          Please enter below your database connection details. If you’re not
          sure about these, contact your host.
        </p>
        <form className={styles["form-group"]} onSubmit={handleSubmit}>
          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Host:</div>

            <div className={styles["db-item-input"]}>
              <input
                type="text"
                value={dbHost}
                ref={dbHostInputRef}
                onChange={(e) => setDbHost(e.target.value)}
                required
              />
            </div>
            <div className={styles["db-item-info"]}>Usually <i>localhost</i>. Ask the provider if it does not work.</div>
          </div>

          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Port:</div>
            <div className={styles["db-item-input"]}>
              <input
                type="number"
                value={dbPort}
                onChange={(e) => setDbPort(e.target.value)}
                required
              />
            </div>
            <div className={styles["db-item-info"]}>The port used to access the database for Picture Pulse.</div>
          </div>
          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Name:</div>
            <div className={styles["db-item-input"]}>
              <input
                type="text"
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                required
              />
            </div>
            <div className={styles["db-item-info"]}>Your database name.</div>
          </div>
          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database User:</div>
            <div className={styles["db-item-input"]}>
              <input
                type="text"
                value={dbUser}
                onChange={(e) => setDbUser(e.target.value)}
                required
              />
            </div>
            <div className={styles["db-item-info"]}>Your database username.</div>
          </div>

          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Password:</div>
            <div className={styles["db-item-input"]}>
              <input
                type="password"
                value={dbPassword}
                onChange={(e) => setDbPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles["db-item-info"]}>Your database password.</div>
          </div>

          {errorMessage ? (<div className={styles["db-errors"]}>{errorMessage}</div>) : null}
              
          <div className={`${styles["db-item"]} ${styles["button-space"]}`}>
            <div className={styles["db-item-text"]}></div>

            <div className={styles["db-item-input"]}>
            <button className={styles["save-button"]} type="submit">Save</button>
            </div>
          </div>        
        </form>
      </div>
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
        We’re going to use this information to create a database.json file. If
        for any reason this automatic file creation doesn’t work, don’t worry.
        All this does is fill in the database information to a configuration
        file named database.json under the config folder. If the automatic
        process does not work you can create a file under config/config.json
        <div className={styles["start-btn-wrapper"]}>
          <a href="/install?step=1">
            <button type="button" className={styles["start-btn"]}>
              Start Installation
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Install;
