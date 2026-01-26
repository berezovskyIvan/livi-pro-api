import { Entity, Column, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';
import { ConsentsEntity } from '../../consents/entity/consents.entity';
import { MessagesEntity } from '../../messages/entity/messages.entity';

@Entity({ schema: 'public', name: 'users' })
export class UsersEntity {
  @PrimaryColumn({
    type: 'text',
    name: 'id',
    comment: 'Id',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'text',
    name: 'user_identity',
    comment: 'User Identity',
    nullable: true,
  })
  userIdentity: string | null;

  @Column({
    type: 'boolean',
    name: 'identity_confirmed',
    comment: 'Identity Confirmed',
    nullable: true,
  })
  identityConfirmed: boolean | null;

  @Column({
    type: 'text',
    name: 'rights',
    comment: 'Rights',
    nullable: true,
  })
  rights: string | null;

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

  @Column({
    type: 'text',
    name: 'phone',
    comment: 'Phone',
    nullable: true,
  })
  phone: string | null;

  @Column({
    type: 'text',
    name: 'first_name',
    comment: 'First Name',
    nullable: true,
  })
  firstName: string | null;

  @Column({
    type: 'text',
    name: 'middle_name',
    comment: 'Middle Name',
    nullable: true,
  })
  middleName: string | null;

  @Column({
    type: 'text',
    name: 'last_name',
    comment: 'Last Name',
    nullable: true,
  })
  lastName: string | null;

  @Column({
    type: 'date',
    name: 'date_of_birth',
    comment: 'Date Of Birth',
    nullable: true,
  })
  dateOfBirth: Date | null;

  @Column({
    type: 'text',
    name: 'profile_source',
    comment: 'Profile Source',
    nullable: true,
  })
  profileSource: string | null;

  @Column({
    type: 'boolean',
    name: 'profile_verified',
    comment: 'Profile Verified',
    nullable: true,
  })
  profileVerified: boolean | null;

  @OneToMany(() => MessagesEntity, (message) => message.user)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'userId',
  })
  messages!: MessagesEntity[];

  @OneToMany(() => ConsentsEntity, (consent) => consent.user)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'userId',
  })
  consent!: ConsentsEntity[];
}
