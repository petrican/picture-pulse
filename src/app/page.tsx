import AdminSetup from '@/components/admin-setup/admin-setup';
import Dashboard from '@/components/home/dashboard';
import fs from 'fs';
import path from 'path';
import { cookies } from "next/headers";
import MainUnauthenticated from '@/components/main-unauthenticated/main-unauthenticated';



export default async function Main() {
  let adminSet: boolean = false; 
  let isAuthenticated: boolean = false;

  const configFilePath = path.resolve("./config", "database.json");
  const isInstalled = fs.existsSync(configFilePath);
  if (isInstalled) {
    const configData = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    adminSet = configData.adminSet ?? false;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    isAuthenticated = true;
  }

  return (
    <div>
    {!adminSet ? (
      <AdminSetup />
    ) : isAuthenticated ? (
      <Dashboard />
    ) : (
      <MainUnauthenticated />
    )}
  </div>
  );
}
