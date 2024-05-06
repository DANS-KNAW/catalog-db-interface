import { Column, Entity } from 'typeorm';

@Entity({ name: 'uri_type' })
export class UriType {
  uuid_uritype: string;

  uritype: string;

  description: string;

  lasttouch: string;
}
