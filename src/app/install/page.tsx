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
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const dbHostInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkInstallation = async () => {
      try {
        const res = await fetch("/api/check-installation");
        const data = await res.json();
        if (data.isInstalled) {
          router.push("/"); 
        } else {
          setIsInstalled(false);
        }
      } catch (error) {
        console.error("Error checking installation:", error);
      }
    };

    checkInstallation();
  }, [router]);

  useEffect(() => {
    if (dbHostInputRef.current) {
      dbHostInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/save-db-connection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dbHost, dbPort, dbName, dbUser, dbPassword }),
    });

    if (res.ok) {
      router.push("/"); 
    } else if (res.status === 500) {
      setError("Could not connect to the database. Please check the credentials.");
    }
  };

  // Show nothing while checking installation status
  if (isInstalled === null) return null;

  return step === "1" ? (
    <div className={styles["welcome-wrapper"]}>
      <div className={styles["logo"]}>
        <Image src="/logo-main-small.png" alt="Picture Pulse Logo" width={84} height={84} priority />
      </div>
      <div className={styles["message-box"]}>
        <h2>Database Setup</h2>
        <p className={styles["instructions"]}>
          Please enter below your database connection details. If you’re not sure about these, contact your host.
        </p>
        <form className={styles["form-group"]} onSubmit={handleSubmit}>
          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Host:</div>
            <div className={styles["db-item-input"]}>
              <input type="text" value={dbHost} ref={dbHostInputRef} onChange={(e) => setDbHost(e.target.value)} required />
            </div>
            <div className={styles["db-item-info"]}>Usually <i>localhost</i>. Ask the provider if it does not work.</div>
          </div>

          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Port:</div>
            <div className={styles["db-item-input"]}>
              <input type="number" value={dbPort} onChange={(e) => setDbPort(e.target.value)} required />
            </div>
            <div className={styles["db-item-info"]}>The port used to access the database for Picture Pulse.</div>
          </div>

          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Name:</div>
            <div className={styles["db-item-input"]}>
              <input type="text" value={dbName} onChange={(e) => setDbName(e.target.value)} required />
            </div>
            <div className={styles["db-item-info"]}>Your database name.</div>
          </div>

          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database User:</div>
            <div className={styles["db-item-input"]}>
              <input type="text" value={dbUser} onChange={(e) => setDbUser(e.target.value)} required />
            </div>
            <div className={styles["db-item-info"]}>Your database username.</div>
          </div>

          <div className={styles["db-item"]}>
            <div className={styles["db-item-text"]}>Database Password:</div>
            <div className={styles["db-item-input"]}>
              <input type="password" value={dbPassword} onChange={(e) => setDbPassword(e.target.value)} required />
            </div>
            <div className={styles["db-item-info"]}>Your database password.</div>
          </div>

          {errorMessage && <div className={styles["db-errors"]}>{errorMessage}</div>}

          <div className={`${styles["db-item"]} ${styles["button-space"]}`}>
            <button className={styles["save-button"]} type="submit">Save</button>
          </div>        
        </form>
      </div>
    </div>
  ) : (
    <div className={styles["welcome-wrapper"]}>
      <div className={styles["logo"]}>
        <Image src="/logo-main-small.png" alt="Picture Pulse Logo" width={84} height={84} priority />
      </div>
      <div className={styles["message-box"]}>
        <p>Welcome to Picture Pulse installation process. Before getting started, we need some information on the database.</p>
        <ol className={styles["needed"]}>
          <li>Database name</li>
          <li>Database username</li>
          <li>Database password</li>
          <li>Database host</li>
        </ol>
        <div className={styles["start-btn-wrapper"]}>
          <a href="/install?step=1">
            <button type="button" className={styles["start-btn"]}>Start Installation</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Install;
