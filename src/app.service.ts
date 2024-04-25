import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';
import {
  Annotation,
  GorcAttribute,
  GorcElement,
  GroupResource,
  Interestgroup,
  Pathway,
  Resource,
  ResourceGorcAttribute,
  ResourceGorcElement,
  ResourcePathway,
  UriType,
  Workinggroup,
} from './entities';
import { customAlphabet } from 'nanoid';
import { formatISO } from 'date-fns';
import * as es7 from 'es7';
import { InterestGroupDto } from './dto/InterestGroupsDto';
import { WorkingGroupDto } from './dto/WorkingGroupDto';
import { PathwaysDto } from './dto/PathwaysDto';

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

      const interestGroups = await Promise.all(
        annotation.vocabularies.interest_groups.map(
          async (interestGroupAnnotaton): Promise<InterestGroupDto> => {
            const groupResource = new GroupResource();
            groupResource.uuid_group = interestGroupAnnotaton.id;
            groupResource.title_group = interestGroupAnnotaton.label;
            groupResource.relation_uuid = 'rda_graph:T0ZC84O2';
            groupResource.relation = 'wgLink';
            groupResource.uuid_resource = resource.uuid_rda;
            groupResource.title_resource = resource.title;

            await this.client.query(
              'INSERT INTO group_resource (uuid_group, title_group, relation_uuid, relation, uuid_resource, title_resource) VALUES ($1, $2, $3, $4, $5, $6)',
              [
                groupResource.uuid_group,
                groupResource.title_group,
                groupResource.relation_uuid,
                groupResource.relation,
                groupResource.uuid_resource,
                groupResource.title_resource,
              ],
            );

            const interestGroupRow = await this.client.query(
              'SELECT * FROM interestgroup WHERE uuid_interestgroup = $1 LIMIT 1',
              [interestGroupAnnotaton.id],
            );

            if (interestGroupRow.rowCount === 0) {
              throw new BadRequestException();
            }

            this.nullRemover(interestGroupRow.rows[0]);

            const interestGroup = new Interestgroup();
            Object.assign(interestGroup, interestGroupRow.rows[0]);

            const interestGroupDto = new InterestGroupDto();
            Object.assign(interestGroupDto, interestGroup);
            interestGroupDto.relation = 'wgLink';

            return interestGroupDto;
          },
        ),
      );

      const working_groups = await Promise.all(
        annotation.vocabularies.working_groups.map(
          async (workingGroupAnnotation): Promise<WorkingGroupDto> => {
            const groupResource = new GroupResource();
            groupResource.uuid_group = workingGroupAnnotation.id;
            groupResource.title_group = workingGroupAnnotation.label;
            groupResource.relation_uuid = 'rda_graph:T0ZC84O2';
            groupResource.relation = 'wgLink';
            groupResource.uuid_resource = resource.uuid_rda;
            groupResource.title_resource = resource.title;

            await this.client.query(
              'INSERT INTO group_resource (uuid_group, title_group, relation_uuid, relation, uuid_resource, title_resource) VALUES ($1, $2, $3, $4, $5, $6)',
              [
                groupResource.uuid_group,
                groupResource.title_group,
                groupResource.relation_uuid,
                groupResource.relation,
                groupResource.uuid_resource,
                groupResource.title_resource,
              ],
            );

            const workingGroupRow = await this.client.query(
              'SELECT * FROM workinggroup WHERE uuid_workinggroup = $1 LIMIT 1',
              [workingGroupAnnotation.id],
            );

            if (workingGroupRow.rowCount === 0) {
              throw new BadRequestException();
            }

            this.nullRemover(workingGroupRow.rows[0]);

            const workingGroup = new Workinggroup();
            Object.assign(workingGroup, workingGroupRow.rows[0]);

            const workingGroupDto = new WorkingGroupDto();
            Object.assign(workingGroupDto, workingGroup);
            workingGroupDto.relation = 'wgLink';

            return workingGroupDto;
          },
        ),
      );

      const pathways = await Promise.all(
        annotation.vocabularies.pathways.map(
          async (pathwayAnnotation): Promise<PathwaysDto> => {
            const resourcePathway = new ResourcePathway();
            resourcePathway.uuid_resource = resource.uuid_rda;
            resourcePathway.resource = resource.title;
            resourcePathway.relation_uuid = 'rda_graph:E8904E44';
            resourcePathway.relation = 'supports';
            resourcePathway.uuid_pathway = pathwayAnnotation.id;
            resourcePathway.pathway = pathwayAnnotation.label;

            await this.client.query(
              'INSERT INTO resource_pathway (uuid_resource, resource, relation_uuid, relation, uuid_pathway, pathway) VALUES ($1, $2, $3, $4, $5, $6)',
              [
                resourcePathway.uuid_resource,
                resourcePathway.resource,
                resourcePathway.relation_uuid,
                resourcePathway.relation,
                resourcePathway.uuid_pathway,
                resourcePathway.pathway,
              ],
            );

            const resourcePathwayRow = await this.client.query(
              'SELECT * FROM pathway WHERE uuid_pathway = $1 LIMIT 1',
              [pathwayAnnotation.id],
            );

            if (resourcePathwayRow.rowCount === 0) {
              throw new BadRequestException();
            }

            this.nullRemover(resourcePathwayRow.rows[0]);

            const pathway = new Pathway();
            Object.assign(pathway, resourcePathwayRow.rows[0]);

            const pathwayDto = new PathwaysDto();
            Object.assign(pathwayDto, pathway);
            pathwayDto.relation = 'supports';

            return pathwayDto;
          },
        ),
      );

      const gorcElements = await Promise.all(
        annotation.vocabularies.gorc_elements.map(
          async (gorcElementAnnotation): Promise<GorcElement> => {
            const gorcElement = new ResourceGorcElement();
            gorcElement.uuid_resource = resource.uuid_rda;
            gorcElement.resource = resource.title;
            gorcElement.uuid_element = gorcElementAnnotation.id;
            gorcElement.element = gorcElementAnnotation.label;

            await this.client.query(
              'INSERT INTO resource_gorc_element (uuid_resource, resource, uuid_element, element) VALUES ($1, $2, $3, $4)',
              [
                gorcElement.uuid_resource,
                gorcElement.resource,
                gorcElement.uuid_element,
                gorcElement.element,
              ],
            );

            const gorcElementRow = await this.client.query(
              'SELECT * FROM gorc_element WHERE uuid_element = $1 LIMIT 1',
              [gorcElementAnnotation.id],
            );

            if (gorcElementRow.rowCount === 0) {
              throw new BadRequestException();
            }

            this.nullRemover(gorcElementRow.rows[0]);

            const element = new GorcElement();
            Object.assign(element, gorcElementRow.rows[0]);

            return element;
          },
        ),
      );

      const gorcAttributes = await Promise.all(
        annotation.vocabularies.gorc_attributes.map(
          async (gorcAttributeAnnotation): Promise<GorcAttribute> => {
            const gorcElement = new ResourceGorcAttribute();
            gorcElement.uuid_resource = resource.uuid_rda;
            gorcElement.resource = resource.title;
            gorcElement.uuid_attribute = gorcAttributeAnnotation.id;
            gorcElement.attribute = gorcAttributeAnnotation.label;

            await this.client.query(
              'INSERT INTO resource_gorc_attribute (uuid_resource, resource, uuid_attribute, attribute) VALUES ($1, $2, $3, $4)',
              [
                gorcElement.uuid_resource,
                gorcElement.resource,
                gorcElement.uuid_attribute,
                gorcElement.attribute,
              ],
            );

            const gorcAttributeRow = await this.client.query(
              'SELECT * FROM gorc_attributes WHERE uuid_attribute = $1 LIMIT 1',
              [gorcAttributeAnnotation.id],
            );

            if (gorcAttributeRow.rowCount === 0) {
              throw new BadRequestException();
            }

            this.nullRemover(gorcAttributeRow.rows[0]);

            const attribute = new GorcAttribute();
            Object.assign(attribute, gorcAttributeRow.rows[0]);

            return attribute;
          },
        ),
      );

      const uriTypeRow = await this.client.query(
        'SELECT * FROM uri_type WHERE uuid_uritype = $1 LIMIT 1',
        [annotation.uritype],
      );

      if (uriTypeRow.rowCount === 0) {
        throw new BadRequestException();
      }

      this.nullRemover(uriTypeRow.rows[0]);

      const uriType = {
        uritype: uriTypeRow.rows[0].uritype,
        description: uriTypeRow.rows[0].description,
      };

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
          uuid_uritype: resource.uuid_uritype,
          uuid_rda: resource.uuid_rda,
          uuid: resource.uuid,
          title: resource.title,
          notes: resource.notes,
          uri: resource.uri,
          dc_date: resource.dc_date,
          dc_description: resource.dc_description,
          dc_language: resource.dc_language,
          type: resource.type,
          dc_type: resource.dc_type,
          pathways: pathways.length > 0 ? pathways : null,
          working_groups: working_groups.length > 0 ? working_groups : null,
          interest_groups: interestGroups.length > 0 ? interestGroups : null,
          gorc_elements: gorcElements.length > 0 ? gorcElements : null,
          gorc_attributes: gorcAttributes.length > 0 ? gorcAttributes : null,
          uritype: uriType,
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

  private nullRemover(row: any) {
    for (const key in row) {
      if (row[key] === 'NULL') {
        row[key] = null;
      } else if (typeof row[key] === 'object') {
        this.nullRemover(row[key]);
      }
    }
  }
}
