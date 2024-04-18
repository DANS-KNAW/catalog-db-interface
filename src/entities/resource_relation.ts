import { Column, Entity } from 'typeorm';

@Entity({ name: 'resource_relation' })
export class ResourceRelation {
  @Column({ type: 'text' })
  uuid_resource: string;

  @Column({ type: 'text' })
  relation: string;

  @Column({ type: 'text' })
  lod_pid: string;

  @Column({ type: 'text' })
  uuid_relationtype: string;

  @Column({ type: 'text' })
  relation_type: string;

  @Column({ type: 'text' })
  datasource: string;

  @Column({ type: 'text' })
  datadate: string;
}
