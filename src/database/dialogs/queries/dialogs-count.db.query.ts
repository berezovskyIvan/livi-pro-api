import { Query } from '@nestjs-architects/typed-cqrs';

export class DialogsCountDbQuery extends Query<number> {
  constructor() {
    super();
  }
}
