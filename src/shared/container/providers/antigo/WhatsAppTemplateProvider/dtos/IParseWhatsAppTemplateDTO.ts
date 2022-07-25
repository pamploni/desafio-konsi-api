interface ITemplateVariable {
  [key: string]: string | number;
}

export default interface IParseWhatsAppTemplateDTO {
  file: string;
  variables: ITemplateVariable;
}
