import { MessagesCountDbHandler } from './handlers/messages-count.db.handler';
import { MessagesListDbHandler } from './handlers/messages-list.db.handler';

export const QueryHandlers = [MessagesListDbHandler, MessagesCountDbHandler];
