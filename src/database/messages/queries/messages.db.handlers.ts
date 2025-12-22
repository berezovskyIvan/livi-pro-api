import { MessagesCountByDialogIdDbHandler } from './handlers/messages-count-by-dialog-id.db.handler';
import { MessagesCountDbHandler } from './handlers/messages-count.db.handler';
import { MessagesListByDialogIdDbHandler } from './handlers/messages-list-by-dialog-id.db.handler';
import { MessagesListDbHandler } from './handlers/messages-list.db.handler';

export const QueryHandlers = [
  MessagesListDbHandler,
  MessagesCountDbHandler,
  MessagesListByDialogIdDbHandler,
  MessagesCountByDialogIdDbHandler,
];
