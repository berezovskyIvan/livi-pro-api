import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'consent' })
export class ConsentsEntity {
  @PrimaryColumn({
    type: 'integer',
    name: 'id',
    comment: 'Id',
    nullable: false,
  })
  id: number;

  @Column({
    type: 'text',
    name: 'user_id',
    comment: 'user ID',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'boolean',
    name: 'consent',
    comment: 'Consent',
    nullable: false,
  })
  consent: boolean;

  @Column({
    type: 'timestamp without time zone',
    name: 'created_at',
    comment: 'Created At',
    nullable: true,
  })
  createdAt: Date | null;

  @Column({
    type: 'integer',
    name: 'text_id',
    comment: 'Text ID',
    nullable: false,
  })
  textId: number;
}
