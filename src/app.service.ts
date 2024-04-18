import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';
import { Annotation, Resource } from './entities';
import { customAlphabet } from 'nanoid';
import { formatISO } from 'date-fns';
import * as es7 from 'es7';

@Injectable()
export class AppService {
  private readonly pool: Pool;
  private client: PoolClient;
  private readonly es: es7.Client;
  private readonly esEndpoint: string;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      user: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS'),
      database: this.configService.get('DB_NAME'),
    });
    this.esEndpoint = this.configService.get('ES_ENDPOINT');
  }

  private async connect() {
    this.client = await this.pool.connect();
  }

  private async disconnect() {
    await this.client.release();
  }

  public async insertAnnotation(annotation: Annotation) {
    await this.connect();
    try {
      this.client.query('BEGIN');

      const checkFragment = await this.client.query(
        'SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND column_name = $2',
        ['resource', 'fragment'],
      );

      if (checkFragment.rowCount === 0) {
        await this.client.query(
          'ALTER TABLE resource ADD COLUMN fragment TEXT',
        );
      }

      const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXZ');

      const date = formatISO(annotation.citation.created_at);

      const resource = new Resource();
      resource.uuid = annotation.page_url;
      resource.uuid_rda = `rda_tiger:${nanoid()}`;
      resource.uuid_uritype = annotation.uritype;
      resource.title = annotation.citation.title;
      resource.notes = annotation.citation.notes;
      resource.uri = annotation.page_url;
      resource.dc_date = date;
      resource.dc_description = annotation.citation.description;
      resource.dc_language = annotation.citation.language.value;
      resource.type = 'publication-other';
      resource.dc_type = 'info:eu-repo/semantics/other';
      resource.fragment = annotation.annotation;
      resource.uuid_uritype = annotation.uritype;

      this.client.query(
        'INSERT INTO resource (uuid, uuid_rda, uuid_uritype, title, notes, uri, dc_date, dc_description, dc_language, type, dc_type, fragment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [
          resource.uuid,
          resource.uuid_rda,
          resource.uuid_uritype,
          resource.title,
          resource.notes,
          resource.uri,
          resource.dc_date,
          resource.dc_description,
          resource.dc_language,
          resource.type,
          resource.dc_type,
          resource.fragment,
        ],
      );

      const es = new es7.Client({
        node: process.env.ES_ENDPOINT,
      });

      const indexExists = await es.indices.exists({
        index: 'dans-rda2',
      });

      if (!indexExists.body) {
        throw new HttpException('Index does not exist', 500);
      }

      await es.index({
        index: 'dans-rda2',
        body: {
          uuid: resource.uuid,
          uuid_rda: resource.uuid_rda,
          uuid_uritype: resource.uuid_uritype,
          title: resource.title,
          notes: resource.notes,
          uri: resource.uri,
          dc_date: resource.dc_date,
          dc_description: resource.dc_description,
          dc_language: resource.dc_language,
          type: resource.type,
          dc_type: resource.dc_type,
          fragment: resource.fragment,
        },
      });

      es.close();

      await this.client.query('COMMIT');
      return true;
    } catch (e) {
      this.client.query('ROLLBACK');
      await this.disconnect();
      console.log(e);
      throw new BadRequestException();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
