import { Column, Entity } from 'typeorm';

@Entity({ name: 'relation' })
export class Relation {
  @Column({ type: 'text' })
  uuid_relation: string;

  @Column({ type: 'text' })
  relation: string;

  @Column({ type: 'text' })
  uuid_relationtype: string;

  @Column({ type: 'text' })
  relation_type: string;

  @Column({ type: 'text' })
  shortdescription: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  last_update: string;
}
