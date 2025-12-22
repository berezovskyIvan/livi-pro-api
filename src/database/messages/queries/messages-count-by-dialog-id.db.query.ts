import { Query } from '@nestjs-architects/typed-cqrs';

export class MessagesCountByDialogIdDbQuery extends Query<number> {
  constructor(public readonly dialogId: string) {
    super();
  }
}
