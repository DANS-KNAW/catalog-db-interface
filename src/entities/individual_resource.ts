import { Column, Entity } from 'typeorm';

@Entity({ name: 'individual_resource' })
export class IndividualResource {
  @Column({ type: 'text' })
  uuid_individual: string;

  @Column({ type: 'text' })
  individual: string;

  @Column({ type: 'text' })
  relation_uuid: string;

  @Column({ type: 'text' })
  relation: string;

  @Column({ type: 'text' })
  uuid_resource: string;

  @Column({ type: 'text' })
  resource: string;
}
