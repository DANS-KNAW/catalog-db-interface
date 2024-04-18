import { Column, Entity } from "typeorm";

@Entity({ name: 'individual' })
export class Individual {
    @Column({ type: 'text' })
    uuid_individual: string;

    @Column({ type: 'text' })
    combinedname: string;

    @Column({ type: 'text' })
    lastname: string;

    @Column({ type: 'text' })
    firstname: string;

    @Column({ type: 'text' })
    fullname: string;

    @Column({ type: 'text' })
    _revision_id: string;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    privacy_ticked: string;

    @Column({ type: 'text' })
    short_bio: string;

    @Column({ type: 'text' })
    rda_page: string;

    @Column({ type: 'text' })
    linked_in: string;

    @Column({ type: 'text' })
    twitter: string;

    @Column({ type: 'text' })
    identifier: string;

    @Column({ type: 'text' })
    source: string;

    @Column({ type: 'text' })
    uuid_rda_country: string;

    @Column({ type: 'text' })
    country: string;

    @Column({ type: 'text' })
    check: string;
}