import { Column, Entity } from 'typeorm';

@Entity({ name: 'pathway' })
export class Pathway {
  @Column({ type: 'text' })
  uuid_pathway: string;

  @Column({ type: 'text' })
  pathway: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  datasource: string;
}
