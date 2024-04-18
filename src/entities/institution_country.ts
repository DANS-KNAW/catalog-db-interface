import { Column, Entity } from 'typeorm';

@Entity({ name: 'institution_country' })
export class InstitutionCountry {
  @Column({ type: 'text' })
  uuid_institution: string;

  @Column({ type: 'text' })
  institution: string;

  @Column({ type: 'text' })
  uuidcountry: string;

  @Column({ type: 'text' })
  country: string;
}
