import { Column, Entity } from 'typeorm';

@Entity({ name: 'individual_member' })
export class IndividualMember {
  @Column({ type: 'text' })
  uuid_individual: string;

  @Column({ type: 'text' })
  combinedname: string;

  @Column({ type: 'text' })
  uuid_institution: string;

  @Column({ type: 'text' })
  institution: string;
}
