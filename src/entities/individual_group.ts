import { Column, Entity } from 'typeorm';

@Entity({ name: 'individual_group' })
export class IndividualGroup {
  @Column({ type: 'text' })
  uuid_individual: string;

  @Column({ type: 'text' })
  individual: string;

  @Column({ type: 'text' })
  member_type: string;

  @Column({ type: 'text' })
  uuid_group: string;

  @Column({ type: 'text' })
  group_type: string;

  @Column({ type: 'text' })
  group_title: string;
}
