import { Entity, Column, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';

import { MessagesEntity } from '../../messages/entity/messages.entity';

@Entity({ schema: 'public', name: 'dialogs' })
export class DialogsEntity {
  @PrimaryColumn({
    type: 'text',
    name: 'id',
    comment: 'Id',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'text',
    name: 'session_key',
    comment: 'Session Key',
    nullable: true,
  })
  sessionKey: string;

  @Column({
    type: 'text',
    name: 'channel_id',
    comment: 'Channel Id',
    nullable: true,
  })
  channelId: string;

  @Column({
    type: 'text',
    name: 'user_id',
    comment: 'User id',
    nullable: true,
  })
  userId: string;

  @Column({
    type: 'text',
    name: 'operator_id',
    comment: 'Operator Id',
    nullable: true,
  })
  operatorId: string;

  @Column({
    type: 'text',
    name: 'fsm_state',
    comment: 'Fsm State',
    nullable: true,
  })
  fsmState: string;

  @Column({
    type: 'timestamp without time zone',
    name: 'created_at',
    comment: 'Created At',
    nullable: true,
  })
  createdAt: Date | null;

  @Column({
    type: 'timestamp without time zone',
    name: 'updated_at',
    comment: 'Updated At',
    nullable: true,
  })
  updatedAt: Date | null;

  @OneToMany(() => MessagesEntity, (message) => message.dialog)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'dialogId',
  })
  messages!: MessagesEntity[];
}
