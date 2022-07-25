import { container } from 'tsyringe';
import ZApiMailProvider from './implementations/ZApiProvider';
import IWhatsAppProvider from './models/IWhatsAppProvider';


const providers = {
  zapi: container.resolve(ZApiMailProvider),
};

container.registerInstance<IWhatsAppProvider>(
  'WhatsAppProvider',
  providers['zapi']
);
