import { Column, Entity } from 'typeorm';

@Entity({ name: 'resource_rights' })
export class ResourceRights {
  @Column({ type: 'text' })
  uuid_resource: string;

  @Column({ type: 'text' })
  relation_uuid: string;

  @Column({ type: 'text' })
  relation: string;

  @Column({ type: 'text' })
  lod_pid: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'text' })
  type: string;
}
