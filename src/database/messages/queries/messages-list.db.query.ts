import { Query } from '@nestjs-architects/typed-cqrs';

import type { IMessage } from '../interfaces';

export class MessagesListDbQuery extends Query<IMessage[]> {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
  ) {
    super();
  }
}
