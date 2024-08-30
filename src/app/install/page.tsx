"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Install = () => {
    const [dbHost, setDbHost] = useState('');
    const [dbPort, setDbPort] = useState('3306'); 
    const [dbName, setDbName] = useState('');
    const [dbUser, setDbUser] = useState('');
    const [dbPassword, setDbPassword] = useState('');
    const router = useRouter();

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

    return (
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
    );
};

export default Install;
