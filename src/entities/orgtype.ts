import { Column, Entity } from 'typeorm';

@Entity({ name: 'orgtype' })
export class Orgtype {
  @Column({ name: '#', type: 'text' })
  hash: string;

  @Column({ type: 'text' })
  rda_uuid: string;

  @Column({ type: 'text' })
  organisationtypeid: string;

  @Column({ type: 'text' })
  linktext: string;

  @Column({ type: 'text' })
  description: string;
}
