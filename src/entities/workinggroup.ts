import { Column, Entity } from 'typeorm';

@Entity({ name: 'workinggroup' })
export class Workinggroup {
  uuid_workinggroup: string;

  title: string;

  description: string;

  uuid_domain: string;

  domains: string;

  url: string;
}
