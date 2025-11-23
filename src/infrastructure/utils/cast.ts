export class Cast {
  static toNumber(value: any): number {
    if (typeof value === 'string') {
      const num = Number(value);
      if (Number.isNaN(num)) {
        throw Cast.showError(value, 'Number');
      }
      return num;
    }
    if (typeof value === 'number') {
      return value;
    }
    throw Cast.showError(value, 'Number');
  }

  static tryToNumber(value: any): number | undefined {
    return Cast.tryWrapper(Cast.toNumber, value);
  }

  static toInt(value: any): number {
    if (typeof value === 'string') {
      const num = Number.parseInt(value.replace(',', '.'));
      if (Number.isNaN(num)) {
        throw Cast.showError(value, 'Integer');
      }
      return num;
    }
    if (typeof value === 'number') {
      return Number.parseInt(value.toString());
    }
    throw Cast.showError(value, 'Integer');
  }

  static tryToInt(value: any): number | undefined {
    return Cast.tryWrapper(Cast.toInt, value);
  }

  static toDouble(value: any): number {
    if (typeof value === 'string') {
      const num = Number.parseFloat(value.replace(',', '.'));
      if (Number.isNaN(num)) {
        throw Cast.showError(value, 'Double');
      }
      return num;
    }
    if (typeof value === 'number') {
      return Number.parseFloat(value.toString());
    }
    throw Cast.showError(value, 'Double');
  }

  static tryToDouble(value: any): number | undefined {
    return Cast.tryWrapper(Cast.toDouble, value);
  }

  static toTrimmedString(value: any): string {
    if (!value) {
      return '';
    }
    return `${value}`.trim();
  }

  static tryToTrimmedString(value: any): string | undefined {
    const str = Cast.toTrimmedString(value);
    return str.length > 0 ? str : undefined;
  }

  static toLowercaseString(value: string | undefined): string {
    if (!value) {
      return '';
    }

    const str = String(value).toLowerCase();
    return str || '';
  }

  static toBool(value: any): boolean {
    const falsy = ['f', '0', 'false', '-1', 'FALSE', 'False', 'F', null, undefined, false, ''];
    const truthful = ['1', 'yes', 'YES', 'Yes', 'Y', 'y', 'true', 'TRUE', 'True', 1, true];

    return (
      truthful.includes(value) ||
      (typeof value === 'number' && value > 0) ||
      (typeof value === 'string' && !falsy.includes(value)) ||
      (typeof value === 'object' && Array.isArray(value) && Boolean(value.length)) ||
      (typeof value === 'object' && !Array.isArray(value) && !falsy.includes(value) && Boolean(Object.keys(value).length))
    );
  }

  static toDate(value: any): Date {
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }
    throw Cast.showError(value, 'Date');
  }

  static tryToDate(value: any): Date | undefined {
    return Cast.tryWrapper(Cast.toDate, value);
  }

  static toTrimmedLowerCaseString(value: string): string {
    return value.trim().toLowerCase();
  }

  static toRegionCode(value: any): number {
    // 0100000000000 -> 01 -> 1
    // 0200000000000 -> 02 -> 2
    // 1100000000000 -> 11 -> 11
    // 1000000000000 -> 1 -> 10, not 1!

    let regionCode = value.toString().replace(/0+$/, '');
    // 1000000000000 -> 10, not 1
    if (regionCode.length === 1) {
      regionCode = `${regionCode}0`;
    }
    const num = Number(regionCode);
    if (Number.isNaN(num)) {
      return 0;
    }
    return num;
  }

  static addressToPostalCode(value: string): string {
    if (!value) {
      return '';
    }

    const addressArr = value.split(',');
    const postalCode = addressArr[0];

    if (!isNaN(Number(postalCode))) {
      return postalCode;
    }

    return '';
  }

  static trimStartZeros(value: string): string {
    return Cast.toTrimmedString(value).replace(/^0+/, '');
  }

  static boolToNumber(value: boolean): 0 | 1 {
    if (typeof value === 'boolean') {
      if (value) {
        return 1;
      }
      return 0;
    }
    throw Cast.showError(value, 'Number');
  }

  static tryBoolToNumber(value: boolean): number | undefined {
    return Cast.tryWrapper(Cast.boolToNumber, value);
  }

  static toSlug(value: string): string {
    const TRANSLIT_MAP: Record<string, string> = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'yo',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'sch',
      ъ: '',
      ы: 'y',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya',
    };

    return value
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => TRANSLIT_MAP[char] || char)
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static tryToSlug(value: string): string | undefined {
    return Cast.tryWrapper(Cast.toSlug, value);
  }

  static capitalize(value: any, onlyFirstLetter = false): string {
    if (typeof value === 'string') {
      if (onlyFirstLetter) {
        return value[0].toUpperCase() + value.slice(1);
      }
      return value
        .split(' ')
        .map((s) => Cast.capitalize(s, true))
        .join(' ');
    }
    throw Cast.showError(value, 'String');
  }

  static tryCapitalize(value: any, capitalizeFirstLetters = false): string | undefined {
    return Cast.tryWrapper(Cast.capitalize, value, capitalizeFirstLetters);
  }

  private static tryWrapper<V, R>(func: (...val: V[]) => R, ...args: V[]): R | undefined {
    try {
      return func(...args);
    } catch (error) {
      if (process.env.DEBUG_MODE) {
        console.error(error, undefined, 'cast.ts');
      }
    }
    return undefined;
  }

  private static showError(value: any, to: string): Error {
    return Error(`Trying to cast variable of type ${typeof value} with value = ${value} to ${to}`);
  }
}

export function tryTo<R>(func: () => R): R | undefined {
  try {
    return func();
  } catch (error) {
    if (process.env.DEBUG_MODE) {
      console.error(error, undefined, 'cast.ts');
    }
  }
  return undefined;
}

export function tryMap<T, R>(items: T[], mapper: (value: T, index: number, array: T[]) => R): R[] {
  let wasErrors = false;
  const tryMapper = (value: T, index: number, array: T[]): R | undefined => {
    try {
      return mapper(value, index, array);
    } catch (error) {
      wasErrors = true;
      if (process.env.DEBUG_MODE) {
        console.error(error, undefined, 'cast.ts');
      }
      return undefined;
    }
  };
  const mappedItems: (R | undefined)[] = items.map(tryMapper);
  if (!wasErrors) {
    return mappedItems as R[];
  }
  const undefinedPredicate = (value: R | undefined): value is R => value !== undefined;
  return mappedItems.filter(undefinedPredicate);
}

export async function tryOr<T>(call: () => Promise<T>, or: T): Promise<T> {
  try {
    return await call();
  } catch {
    return or;
  }
}

export function ifExistThen<T, R>(maybe: T | undefined, then: (exist: T) => R): R | undefined {
  // TODO: change to `Utils.isDefined(maybe)`
  if (!(maybe === undefined || maybe === null)) {
    return then(maybe);
  }
  return undefined;
}

export async function tryOrLog<T>(call: () => Promise<T>): Promise<T | undefined> {
  try {
    return await call();
  } catch (error) {
    // Handle error
    if (process.env.DEBUG_MODE) {
      console.error(error, undefined, 'cast.ts');
    }
  }
}
