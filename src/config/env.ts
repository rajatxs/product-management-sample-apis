export const SERVER_HOST = process.env.APP_HOST || '127.0.0.1';
export const SERVER_PORT = Number(process.env.APP_PORT) || 5000;

export const MYSQL_HOST = process.env.APP_MYSQL_HOST;
export const MYSQL_PORT = Number(process.env.APP_MYSQL_PORT);
export const MYSQL_USER = process.env.APP_MYSQL_USER;
export const MYSQL_PSWD = process.env.APP_MYSQL_PSWD;
export const MYSQL_DB = process.env.APP_MYSQL_DB;

export const JWT_SECRET = process.env.APP_JWT_SECRET;
