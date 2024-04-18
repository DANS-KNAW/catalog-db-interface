import { Column, Entity } from 'typeorm';

@Entity({ name: 'rights' })
export class Rights {
  @Column({ type: 'text' })
  lod_pid: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  datasource: string;
}
