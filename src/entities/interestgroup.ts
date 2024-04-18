import { Column, Entity } from 'typeorm';

@Entity({ name: 'interestgroup' })
export class Interestgroup {
  @Column({ type: 'text' })
  uuid_interestgroup: string;

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
