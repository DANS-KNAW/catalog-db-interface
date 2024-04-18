import { Column, Entity } from 'typeorm';

@Entity({ name: 'individual_institution' })
export class IndividualInstitution {
  @Column({ name: '#', type: 'text' })
  hash: string;

  @Column({ type: 'text' })
  uuid_institution: string;

  @Column({ type: 'text' })
  organisation: string;

  @Column({ type: 'text' })
  uuid_rda_member: string;

  @Column({ type: 'text' })
  member: string;
}
