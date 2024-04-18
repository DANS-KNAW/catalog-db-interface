import { Column, Entity } from 'typeorm';

@Entity({ name: 'resource_pathway' })
export class ResourcePathway {
  @Column({ type: 'text' })
  uuid_resource: string;

  @Column({ type: 'text' })
  resource: string;

  @Column({ type: 'text' })
  relation_uuid: string;

  @Column({ type: 'text' })
  relation: string;

  @Column({ type: 'text' })
  uuid_pathway: string;

  @Column({ type: 'text' })
  pathway: string;
}
