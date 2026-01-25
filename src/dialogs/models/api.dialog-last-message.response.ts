import { PickType } from '@nestjs/swagger';

import { ApiMessageResponse } from '../../messages/models/api.message.response';

export class ApiDialogLastMessageResponse extends PickType(ApiMessageResponse, [
  'id',
  'createdAt',
  'bodyMain',
  'senderRole',
  'generatedAi',
  'user',
]) {}
