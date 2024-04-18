import { Column, Entity } from 'typeorm';

@Entity({ name: 'individual_groupall' })
export class IndividualGroupall {
  @Column({ type: 'text' })
  uuid_group: string;

  @Column({ type: 'text' })
  group: string;

  @Column({ type: 'text' })
  relation: string;

  @Column({ type: 'text' })
  uuid_individual: string;

  @Column({ type: 'text' })
  individual: string;
}
