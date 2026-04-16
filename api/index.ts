import { startServer } from "../server.js";

let cachedApp: any;

export default async function handler(req: any, res: any) {
  if (!cachedApp) {
    console.log("Vercel: Initializing new Express instance...");
    cachedApp = await startServer();
  }
  
  console.log(`Vercel API: ${req.method} ${req.url}`);
  return cachedApp(req, res);
}
