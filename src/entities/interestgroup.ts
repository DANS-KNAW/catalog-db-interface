import { Column, Entity } from 'typeorm';

@Entity({ name: 'interestgroup' })
export class Interestgroup {
  uuid_interestgroup: string;

  title: string;

  description: string;

  uuid_domain: string;

  domains: string;

  url: string;
}
