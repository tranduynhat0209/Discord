declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: "dev" | "prod";
      PORT: string;
      WEBSITE_URL: string;
      EMAIL_ADDRESS: string;
      EMAIL_PASSWORD: string;
      SESSION_SECRET: string;
      RECAPTCHA_SECRET: string;
      MYSQL_HOST: string;
      MYSQL_PORT: number;
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
    }
  }
}
export {};
