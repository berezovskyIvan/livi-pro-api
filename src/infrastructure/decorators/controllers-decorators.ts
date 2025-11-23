import { ok } from 'assert';
import { applyDecorators, Controller, Delete, Get, Head, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiDefaultResponse, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { ApiError } from '../filters/base-exception.filter';
import { ModelValidationPredicate, modelValidator } from '../interceptors/model-validator.interceptor';
import type { Json } from '../interfaces/common.interfaces';

type MethodDecoratorFunction = (methodPath?: string) => MethodDecorator;

export interface ActionDecoratorArguments<T> {
  description: string;
  response: T;
  path?: string;
  version?: number;
  validator?: ModelValidationPredicate<T>;
  disableValidation?: boolean;
  isDeprecated?: boolean;
  detailedDescription?: string;
}

const operationsIds = new Set<string>();

function Action(
  description: string,
  responseType: unknown,
  version: number,
  detailedDescription: string,
  isDeprecated: boolean,
): MethodDecorator {
  return (target: Json, key: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
    let operationId = String(key);
    if (operationsIds.has(operationId) && version > 1) {
      operationId = `${operationId}V${version}`;
    }
    ok(!operationsIds.has(operationId));
    operationsIds.add(operationId);
    const operationDescriptor = ApiOperation({
      operationId: operationId,
      summary: description,
      description: detailedDescription,
      deprecated: isDeprecated,
    })(target, key, descriptor);
    const errorDescriptor = ApiDefaultResponse({
      type: ApiError,
      description: 'Ошибка сервера',
    })(target, key, operationDescriptor as PropertyDescriptor);
    const result = ApiOkResponse({ type: responseType as never })(target, key, errorDescriptor as PropertyDescriptor);
    return (result as PropertyDescriptor) || errorDescriptor;
  };
}

function createAction(methodDecorator: MethodDecoratorFunction) {
  return ({
    description,
    path,
    response,
    validator,
    version = 1,
    disableValidation = false,
    detailedDescription = '',
    isDeprecated = false,
    /* eslint-disable @typescript-eslint/no-explicit-any */
  }: ActionDecoratorArguments<any>): MethodDecorator => {
    return (target: Json, key: string | symbol, methodDescriptor: PropertyDescriptor): any => {
      const actionDescriptor = Action(description, response, version, detailedDescription, isDeprecated)(target, key, methodDescriptor);
      const securityDescriptor = ApiSecurity('securityToken')(target, String(key), actionDescriptor as TypedPropertyDescriptor<any>);
      const validationDescriptor = UseInterceptors(modelValidator<any>(disableValidation, validator))(
        target,
        key,
        securityDescriptor as TypedPropertyDescriptor<any>,
      );
      return methodDecorator(path)(target, key, validationDescriptor as TypedPropertyDescriptor<any>);
      /* eslint-enable @typescript-eslint/no-explicit-any */
    };
  };
}

function createSecuredAction(methodDecorator: MethodDecoratorFunction) {
  return ({
    description,
    path,
    response,
    detailedDescription = '',
    disableValidation = false,
    validator,
    version = 1,
    isDeprecated = false,
    /* eslint-disable @typescript-eslint/no-explicit-any */
  }: ActionDecoratorArguments<any>): MethodDecorator => {
    return applyDecorators(
      methodDecorator(path),
      Action(description, response, version, detailedDescription, isDeprecated),
      ApiBearerAuth(),
      ApiSecurity('securityToken'),
      UseInterceptors(modelValidator<any>(disableValidation, validator)),
    );
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export const TagController = (prefix: string, version = 1): ClassDecorator => {
  if (!prefix || prefix.trim().length === 0) {
    throw new Error('Prefix cannot be empty');
  }

  if (version < 1) {
    throw new Error('Version must be greater than 0');
  }

  return (target) => {
    ApiTags(prefix)(target);
    return Controller(`v${version}/${prefix}`)(target);
  };
};

export const GetAction = createAction(Get);

export const PostAction = createAction(Post);

export const PatchAction = createAction(Patch);

export const DeleteAction = createAction(Delete);

export const PutAction = createAction(Put);

export const HeadAction = createAction(Head);

export const SecuredGetAction = createSecuredAction(Get);

export const SecuredPostAction = createSecuredAction(Post);

export const SecuredPatchAction = createSecuredAction(Patch);

export const SecuredDeleteAction = createSecuredAction(Delete);

export const SecuredPutAction = createSecuredAction(Put);

export const SecuredHeadAction = createSecuredAction(Head);
