declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      EMAIL_ADDRESS: string;
      EMAIL_PASSWORD: string;
      WEBSITE_URL: string;
      NODE_ENV: "dev" | "prod";
      PORT: string;
    }
  }
}
export {};
