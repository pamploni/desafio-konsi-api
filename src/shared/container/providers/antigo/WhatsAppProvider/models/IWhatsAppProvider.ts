
import  { ISendWhatsAppMessageDTO, ISendWhatsAppLinkDTO }  from '../dtos/IWhatsAppDTO';

export default interface IWhatsAppProvider {
  sendSimpleMessage(data: ISendWhatsAppMessageDTO): Promise<void>;
  sendLinkMessage(data: ISendWhatsAppLinkDTO): Promise<void>;
}
