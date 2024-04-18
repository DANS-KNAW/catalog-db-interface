import { Column, Entity } from 'typeorm';

@Entity({ name: 'institution_institutionrole' })
export class InstitutionInstitutionrole {
  @Column({ type: 'text' })
  uuid_institution: string;

  @Column({ type: 'text' })
  institution: string;

  @Column({ type: 'text' })
  institutionroleid: string;

  @Column({ type: 'text' })
  institutionalrole: string;
}
