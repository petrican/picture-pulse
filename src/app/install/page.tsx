"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Install = () => {
    const [dbHost, setDbHost] = useState('');
    const [dbPort, setDbPort] = useState('3306'); 
    const [dbName, setDbName] = useState('');
    const [dbUser, setDbUser] = useState('');
    const [dbPassword, setDbPassword] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();  // Access URL search params

    const step = searchParams.get('step');  // Get the value of 'step' from URL

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('/api/save-db-connection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dbHost, dbPort, dbName, dbUser, dbPassword }),
        });

        if (res.ok) {
            router.push('/'); // Redirect to home page after setup
        }
    };

    // Conditionally render content based on 'step' parameter
    return step === '1' ? (
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
        <div>
            <h1>Welcome! Please start the installation process.</h1>
            <a href="/install?step=1">
                <button type="button">Start Installation</button>
            </a>
        </div>
    );
};

export default Install;
