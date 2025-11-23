import { loc as locale } from 'src/infrastructure/locale/ru';
import { Utils } from './utils';
import { Logger } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
  NotEquals,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

import { validateModel } from '../interceptors/model-validator.interceptor';
import { loc } from '../locale/ru';
import type { TransformFnParams } from 'class-transformer';
import type { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';

export interface NestedValidatorParams {
  notEmpty?: boolean;
  allMustValid?: boolean;
}

export const IsDefinedDefault = IsDefined({ message: loc.errors.isNotDefined });

export const IsStringDefault = (payload?: Pick<ValidationOptions, 'each'>) => IsString({ ...payload, message: locale.errors.isNotString });

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export const IsEnumDefault = (value: Object, options?: Omit<ValidationOptions, 'message'>) =>
  IsEnum(value, {
    ...options,
    message: locale.errors.isNotValidEnum(Utils.extractEnumValues(value)),
  });

export const IsNotEmptyDefault = IsNotEmpty({ message: locale.errors.isNotEmpty });

export const IsNotEmptyArrayDefault = ArrayNotEmpty({ message: locale.errors.isNotEmpty });

export const IsPhoneNumberDefault = IsPhoneNumber('RU', { message: locale.errors.isNotCorrectPhone });

export const IsIntDefault = IsInt({ message: locale.errors.isNotInt });

export const MinDefault = (min: number) => Min(min, { message: locale.errors.minError(min) });

export const LengthDefault = (min: number, max?: number) => Length(min, max, { message: loc.errors.length(min) });

export const MaxDefault = (max: number) => Max(max, { message: locale.errors.maxError(max) });

export const IsEmailDefault = IsEmail(undefined, { message: loc.errors.isNotEmail });

export const IsArrayDefault = IsArray({ message: locale.errors.isNotArray });

export const IsNumberDefault = IsNumber(undefined, { message: locale.errors.isNotNumber });

export const IsNotEqualDefault = <T>(value: T) => NotEquals(value);

export const IsBooleanDefault = IsBoolean({ message: locale.errors.isNotBoolean });

export const IsDateStringDefault = IsDateString({}, { message: loc.errors.isNotDateString });

export const IsDateDefault = IsDate({ message: locale.errors.isNotDate });

export const ValidateNestedDefault =
  (
    params: NestedValidatorParams = {
      notEmpty: false,
      allMustValid: false,
    },
  ) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: params.allMustValid
        ? 'All deep fields must been valid'
        : params.notEmpty
          ? 'Deep fields must been valid and not empty'
          : 'Deep fields must been valid',
      target: object.constructor,
      propertyName,
      constraints: [params],
      options: {},
      async: false,
      validator: {
        validate: nestedFilterValidator,
      },
    });
  };

const nestedFilterValidator = (value: unknown[], args: ValidationArguments): boolean => {
  try {
    const notEmpty = (args.constraints[0] as NestedValidatorParams)?.notEmpty === true;
    const allMustValid = (args.constraints[0] as NestedValidatorParams)?.allMustValid === true;
    if (Array.isArray(value)) {
      let isAnyItemInvalid = false;
      args.object[args.property] = value.filter((me) => {
        const isItemValid = validateModel(me);
        if (!isItemValid) {
          isAnyItemInvalid = true;
        }
        return isItemValid;
      });
      if (allMustValid && isAnyItemInvalid) {
        return false;
      }
      if (notEmpty) {
        return args.object[args.property].length > 0;
      }
      return true;
    }
    return validateModel(value);
  } catch (error) {
    if (error instanceof Error) {
      Logger.error(`Deep validator failed with error: ${error}`, error.stack, 'class-validator-decorators.ts');
    }
    return false;
  }
};

export type ValueMapper<T> = (value: unknown) => T;

export function toArrayTransformer<T>(valueMapper?: ValueMapper<T>): (params: TransformFnParams) => unknown {
  return ({ key, value }: TransformFnParams): unknown => {
    if (typeof key === 'string' && typeof value === 'string' && value.includes('[')) {
      let arrayAsString = value;
      arrayAsString = arrayAsString.replace('[', '').replace(']', '');

      value = arrayAsString
        .split(',')
        .map((stringParam) => stringParam.trim())
        .filter((stringParam) => !!stringParam);
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    if (valueMapper) {
      value = (value as unknown[]).map((arrayValue) => valueMapper(arrayValue));
    }
    return value;
  };
}
