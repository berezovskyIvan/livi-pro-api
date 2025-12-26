import { Query } from '@nestjs-architects/typed-cqrs';

import type { IDialog } from '../interfaces';

export class DialogsListDbQuery extends Query<IDialog[]> {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
  ) {
    super();
  }
}
