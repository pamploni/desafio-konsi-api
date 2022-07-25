
export interface ISendWhatsAppMessageDTO {
  phone: string;
  message: string;
}

export interface ISendWhatsAppLinkDTO {
  phone: string;
  message: string;
  image: string;
  linkUrl: string;
  title: string;
  linkDescription: string;
}
