import { Query } from '@nestjs-architects/typed-cqrs';

import type { IConsent } from '../interfaces';

export class ConsentsListDbQuery extends Query<IConsent[]> {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
  ) {
    super();
  }
}
