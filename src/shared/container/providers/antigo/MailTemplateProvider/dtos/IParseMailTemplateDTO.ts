interface ITemplateVariable {
  [key: string]: string | number | Date;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariable;
}
