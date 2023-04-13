declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGO_URI: string;
      NODE_ENV: 'dev' | 'prod';
      PORT: string;
    }
  }
}
export {};