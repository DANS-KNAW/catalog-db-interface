import { Column, Entity } from 'typeorm';

@Entity({ name: 'institutions' })
export class Institutions {
  @Column({ type: 'text' })
  uuid_institution: string;

  @Column({ type: 'text' })
  institution: string;

  @Column({ type: 'text' })
  english_name: string;

  @Column({ type: 'text' })
  parent_institution: string;
}
