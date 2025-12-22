import { Query } from '@nestjs-architects/typed-cqrs';

import type { IMessage } from '../interfaces';

export class MessagesListByDialogIdDbQuery extends Query<IMessage[]> {
  constructor(
    public readonly dialogId: string,
    public readonly page: number,
    public readonly perPage: number,
  ) {
    super();
  }
}
