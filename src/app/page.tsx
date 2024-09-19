import AdminSetup from '@/components/admin-setup/admin-setup';
import Home from '@/components/home/home';
import fs from 'fs';
import path from 'path';


export default function Main() {
  let adminSet: boolean = false; 
  const configFilePath = path.resolve("./config", "database.json");
  const isInstalled = fs.existsSync(configFilePath);
  if (isInstalled) {
    const configData = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    adminSet = configData.adminSet ?? false;
  }

  return (
   <div>
      {adminSet ? <Home /> : <AdminSetup />}
    </div> 
  );
}
