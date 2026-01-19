import { Query } from '@nestjs-architects/typed-cqrs';

export class ConsentsCountDbQuery extends Query<number> {
  constructor() {
    super();
  }
}
