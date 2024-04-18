import { Column, Entity } from 'typeorm';

@Entity({ name: 'subject_resource' })
export class SubjectResource {
  @Column({ type: 'text' })
  uuid_resource: string;

  @Column({ type: 'text' })
  resource: string;

  @Column({ type: 'text' })
  keyword: string;
}
