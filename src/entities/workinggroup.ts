import { Column, Entity } from 'typeorm';

@Entity({ name: 'workinggroup' })
export class Workinggroup {
  @Column({ type: 'text' })
  uuid_workinggroup: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  uuid_domain: string;

  @Column({ type: 'text' })
  domains: string;

  @Column({ type: 'text' })
  url: string;
}
