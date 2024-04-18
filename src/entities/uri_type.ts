import { Column, Entity } from 'typeorm';

@Entity({ name: 'uri_type' })
export class UriType {
  @Column({ type: 'text' })
  uuid_uritype: string;

  @Column({ type: 'text' })
  uritype: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  lasttouch: string;
}
