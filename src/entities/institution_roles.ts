import { Column, Entity } from 'typeorm';

@Entity({ name: 'institution_roles' })
export class InstitutionRoles {
  @Column({ name: '#', type: 'text' })
  hash: string;

  @Column({ type: 'text' })
  institutionroleid: string;

  @Column({ type: 'text' })
  institutionrole: string;

  @Column({ type: 'text' })
  rda_taxonomy: string;

  @Column({ type: 'text' })
  description: string;
}
