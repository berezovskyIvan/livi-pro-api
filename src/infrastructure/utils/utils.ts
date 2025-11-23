import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { createHash } from 'crypto';
import { Cast } from './cast';
import { loc } from '../locale/ru';

export class Utils {
  static MOBILE_PHONE_LENGTH = 11;
  static emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)*$/;
  static phoneRegExp = /^(?:8|(?:\+7))([0-9]{3})([0-9]{3})([0-9]{2})([0-9]{2})$/;
  static tempUserLastname = 'temp';

  static camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  static countTotalPages({ totalItems, itemsPerPage }: { totalItems: number; itemsPerPage: number }): number {
    return Math.ceil(totalItems / itemsPerPage);
  }

  static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static extractEnumValues(enumValue: any): any[] {
    const values = Object.values(enumValue);
    const hasNumbers = values.some((value) => !Number.isNaN(Number(value)));
    if (hasNumbers) {
      return Utils.getLastHalfOfArray(values);
    }
    return values;
  }

  static extractTextFromHtml(html: string): string {
    return html.replace(/<[^>]*>|[\r\n\u2028\u2029]|[[&hellip;\]]+/g, '').trim();
  }

  static formatEnumToHumanFriendlyView(enumValue: Record<string | number, string | number>): Record<string, string | number> {
    /*
    ? Example of enums
    {
      "push": "push",
      "email": "email",
      "phone": "phone",
      "address": "address",
      "code": "code"
    }
    {
      "1": "catalog",
      "2": "mainCategories",
      "3": "subCategories",
      "catalog": 1,
      "mainCategories": 2,
      "subCategories": 3
    }
     */
    const keys = Object.keys(enumValue);
    let isKeysSimilarToValues = true;
    for (const key of keys) {
      const value = enumValue[key];
      if (key !== value) {
        isKeysSimilarToValues = false;
        break;
      }
    }
    const titles: string[] = isKeysSimilarToValues ? keys : Utils.getLastHalfOfArray(keys);
    const result: Record<string, string | number> = {};
    for (const title of titles) {
      result[title] = (enumValue as unknown as Record<string, string | number>)[title];
    }

    return result;
  }

  static getAuthHeaders(token: string): { Authorization: string } {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  static getRshbAuthHeaders(key: string): { [key: string]: string } {
    return {
      'X-Rshb-Api-Key': key,
    };
  }

  static getLastHalfOfArray<T>(values: T[]): T[] {
    const lastHalf = Math.ceil(values.length / 2);
    return values.splice(lastHalf);
  }

  static isDefined<T>(value: T | undefined | null): value is T {
    return !Utils.isNullOrUndefined(value);
  }

  static isNullOrUndefined(value: any): boolean {
    return value === undefined || value === null;
  }

  static async processPromisesBatch(items: Array<any>, limit: number, fn: (item: any) => Promise<any>): Promise<any> {
    let results: any[] = [];

    for (let start = 0; start < items.length; start += limit) {
      const end = start + limit > items.length ? items.length : start + limit;

      const slicedResults = await Promise.all(items.slice(start, end).map(fn));

      results = [...results, ...slicedResults];
    }

    return results;
  }

  static removeNullUndefined<T extends Record<string, unknown>>(obj: T): NonNullable<T> {
    const result = {} as NonNullable<T>;

    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }

    return result;
  }

  static snakeToCamelCase(str: string): string {
    return str.replace(/(_\w)/g, (k) => k[1].toUpperCase());
  }

  /*
    Standard phone number is [+79990001122]
    Backend phone number (in some methods, not all) is [+7 (999) 400-00-01]
   */
  static transformPhoneToBackendFormat(phone: string): string {
    /*
      Matches:
      0: +79990001122
      1: 999
      2: 000
      3: 11
      4: 22
       */
    const matches = Utils.phoneRegExp.exec(phone);
    return `+7 (${matches?.[1]}) ${matches?.[2]}-${matches?.[3]}-${matches?.[4]}`;
  }

  static validateAndTransformLogin(login: string): string | null {
    const isEmail = Utils.emailRegExp.test(login);
    const isPhone = Utils.phoneRegExp.test(login);

    if (!isEmail && !isPhone) {
      return null;
    }
    if (isPhone) {
      return Utils.transformPhoneToBackendFormat(login);
    }
    return login;
  }

  static getHashOf(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  static isObjectEmpty(obj?: object): boolean {
    return !Cast.toBool(obj && Object.keys(obj).length);
  }

  static declOfNum(n: number, titles: string[]): string {
    return titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }

  static addUrlSubdomain(url: string, subDomain: string): string {
    return url.replace('://', `://${subDomain}.`);
  }

  static replaceTempUserName(name: string | null): string {
    if (!name) {
      return '';
    }
    return name === this.tempUserLastname ? '' : name;
  }
}
