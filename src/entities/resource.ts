import { Column, Entity } from 'typeorm';

@Entity({ name: 'resource' })
export class Resource {
  @Column({ type: 'text' })
  uuid: string;

  @Column({ type: 'text' })
  uuid_link: string;

  @Column({ type: 'text' })
  uuid_uritype: string;

  @Column({ type: 'text' })
  uuid_rda: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  notes: string;

  @Column({ type: 'text' })
  uri: string;

  @Column({ type: 'text' })
  uri2: string;

  @Column({ type: 'text' })
  pid_lod_type: string;

  @Column({ type: 'text' })
  pid_lod: string;

  @Column({ type: 'text' })
  dc_date: string;

  @Column({ type: 'text' })
  dc_description: string;

  @Column({ type: 'text' })
  dc_language: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  dc_type: string;

  @Column({ type: 'text' })
  card_url: string;
}
