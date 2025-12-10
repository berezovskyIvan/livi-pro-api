import { Query } from '@nestjs-architects/typed-cqrs';

export class MessagesCountDbQuery extends Query<number> {
  constructor() {
    super();
  }
}
