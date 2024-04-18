import { Column, Entity } from 'typeorm';

@Entity({ name: 'group_resource' })
export class GroupResource {
  @Column({ type: 'text' })
  uuid_group: string;

  @Column({ type: 'text' })
  title_group: string;

  @Column({ type: 'text' })
  relation_uuid: string;

  @Column({ type: 'text' })
  relation: string;

  @Column({ type: 'text' })
  uuid_resource: string;

  @Column({ type: 'text' })
  title_resource: string;
}
