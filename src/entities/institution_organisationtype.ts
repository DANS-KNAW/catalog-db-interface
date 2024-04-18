import { Column, Entity } from 'typeorm';

@Entity({ name: 'institution_organisationtype' })
export class InstitutionOrganisationtype {
  @Column({ type: 'text' })
  uuid_institution: string;

  @Column({ type: 'text' })
  institution: string;

  @Column({ type: 'text' })
  uuid_orgtype: string;

  @Column({ type: 'text' })
  organisationtype: string;
}
