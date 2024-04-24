import { Column, Entity } from 'typeorm';

@Entity({ name: 'group_resource' })
export class GroupResource {
  uuid_group: string;

  title_group: string;

  relation_uuid: string;

  relation: string;

  uuid_resource: string;

  title_resource: string;
}
