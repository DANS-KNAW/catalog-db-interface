export class Annotation {
  page_url: string;
  annotation: string;
  uritype: string;
  citation: {
    title: string;
    description?: string;
    notes?: string;
    submitter?: string;
    language: {
      id: string;
      label: string;
      value: string;
    };
    created_at: string;
    resource? : string;
  };
  vocabularies: {
    pathways: [];
    gorc_attributes: [];
    gorc_elements: [];
    working_groups: [];
    domains: [];
  };
}
