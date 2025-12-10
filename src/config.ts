import { config, DotenvParseOutput } from 'dotenv';

import { Cast } from './infrastructure/utils/cast';

export const configResult = config();

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

const {
  GLOBAL_HTTP_REQ_TIMEOUT,
  NODE_ENV,
  PORT,
  STAND_NAMESPACE,
  LOCALHOST,
  DB_CA_PATH,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env as DotenvParseOutput;

export class Config {
  static dbCaPath = DB_CA_PATH;
  static dbHost = DB_HOST;
  static dbName = DB_NAME;
  static dbPassword = DB_PASSWORD;
  static dbPort = Cast.tryToInt(DB_PORT);
  static dbUsername = DB_USERNAME;
  static endpointsCacheMaxAge = 1200; // 20 min
  static globalHttpReqTimeout = Cast.tryToInt(GLOBAL_HTTP_REQ_TIMEOUT) || 10000;
  static isProductionMode = (NODE_ENV as NodeEnv) === NodeEnv.Production;
  static localhost = LOCALHOST ?? 'https://api.livi-pro.ru';
  static nodeEnv = NODE_ENV as NodeEnv;
  static port = Cast.tryToInt(PORT) || 3003;
  static standNamespace = STAND_NAMESPACE;
}
