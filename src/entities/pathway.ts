import { Column, Entity } from 'typeorm';

@Entity({ name: 'pathway' })
export class Pathway {
  uuid_pathway: string;

  pathway: string;

  description: string;

  datasource: string;
}
