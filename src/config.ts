import { Cast } from './infrastructure/utils/cast';
import { config, DotenvParseOutput } from 'dotenv';

export const configResult = config();

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

const { GLOBAL_HTTP_REQ_TIMEOUT, NODE_ENV, PORT, STAND_NAMESPACE, LOCALHOST } = process.env as DotenvParseOutput;

export class Config {
  static endpointsCacheMaxAge = 1200; // 20 min
  static globalHttpReqTimeout = Cast.tryToInt(GLOBAL_HTTP_REQ_TIMEOUT) || 10000;
  static isProductionMode = (NODE_ENV as NodeEnv) === NodeEnv.Production;
  static localhost = LOCALHOST ?? 'https://api.livi-pro.ru';
  static nodeEnv = NODE_ENV as NodeEnv;
  static port = Cast.tryToInt(PORT) || 80;
  static standNamespace = STAND_NAMESPACE;
}
