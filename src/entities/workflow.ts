import { Column, Entity } from 'typeorm';

@Entity({ name: 'workflow' })
export class Workflow {
  @Column({ type: 'text' })
  uuid_workflow: string;

  @Column({ type: 'text' })
  worklowstate: string;

  @Column({ type: 'text' })
  description: string;
}
