import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import IWhatsAppProvider from '../models/IWhatsAppProvider';
import { ISendWhatsAppMessageDTO, ISendWhatsAppLinkDTO } from '../dtos/IWhatsAppDTO';
import axios from 'axios';

@injectable()
export default class ZApiProvider implements IWhatsAppProvider {

  public async sendSimpleMessage({ phone, message }: ISendWhatsAppMessageDTO): Promise<void> {
    try {

      await axios.post(String(process.env.Z_API_API), { phone, message })

    } catch (e) {
      console.log(e);
    }
  }

  public async sendLinkMessage({ phone, message, image, linkUrl, title, linkDescription }: ISendWhatsAppLinkDTO): Promise<void> {
    try {
      //console.log(String(process.env.Z_API_API));
      await axios.post(String(process.env.Z_API_API), { phone, message, image, linkUrl, title, linkDescription  })

    } catch (e) {
      console.log(e);
    }
  }
}
