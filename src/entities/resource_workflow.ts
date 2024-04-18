import { Column, Entity } from 'typeorm';

@Entity({ name: 'resource_workflow' })
export class ResourceWorkflow {
  @Column({ type: 'text' })
  uuid_resource: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  uuid_adoptionstate: string;

  @Column({ type: 'text' })
  status: string;
}
