import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { DialogsEntity } from '../../dialogs/entity/dialogs.entity';
import { UsersEntity } from '../../users/entity/users.entity';

/* eslint-disable @typescript-eslint/member-ordering */
@Entity({ schema: 'public', name: 'messages' })
export class MessagesEntity {
  @PrimaryColumn({
    type: 'text',
    name: 'id',
    comment: 'Id',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'text',
    name: 'dialog_id',
    comment: 'Dialog Id',
    nullable: false,
  })
  dialogId: string;

  @Column({
    type: 'timestamp without time zone',
    name: 'created_at',
    comment: 'Created At',
    nullable: true,
  })
  createdAt: Date | null;

  @Column({
    type: 'text',
    name: 'sender_role',
    comment: 'Sender Role',
    nullable: false,
  })
  senderRole: string;

  @Column({
    type: 'text',
    name: 'direction',
    comment: 'Direction',
    nullable: false,
  })
  direction: string;

  @Column({
    type: 'text',
    name: 'provider_raw',
    comment: 'Provider Raw',
    nullable: true,
  })
  providerRaw: string | null;

  @Column({
    type: 'text',
    name: 'body_raw',
    comment: 'Body Raw',
    nullable: true,
  })
  bodyRaw: string | null;

  @Column({
    type: 'text',
    name: 'body_main',
    comment: 'Body Main',
    nullable: true,
  })
  bodyMain: string | null;

  @Column({
    type: 'boolean',
    name: 'has_footer',
    comment: 'Has Footer',
    nullable: true,
  })
  hasFooter: boolean | null;

  @Column({
    type: 'text',
    name: 'footer_raw',
    comment: 'Footer Raw',
    nullable: true,
  })
  footerRaw: string | null;

  @Column({
    type: 'text',
    name: 'footer_parsed',
    comment: 'Footer Parsed',
    nullable: true,
  })
  footerParsed: string | null;

  @Column({
    type: 'boolean',
    name: 'generated_ai',
    comment: 'Generated AI',
    nullable: true,
  })
  generatedAi: boolean | null;

  @Column({
    type: 'text',
    name: 'user_id',
    comment: 'userId',
    nullable: true,
  })
  userId: string | null;

  @ManyToOne(() => DialogsEntity, (dialog) => dialog.messages)
  @JoinColumn({
    name: 'dialog_id',
    referencedColumnName: 'id',
  })
  dialog: DialogsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.messages)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UsersEntity;
}
/* eslint-enable @typescript-eslint/member-ordering */
