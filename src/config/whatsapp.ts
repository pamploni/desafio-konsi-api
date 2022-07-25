interface IWhatsAppConfig {
  driver: 'z_api' | 'zap1' | 'zap2';
  defaults: {
    to: {
      fone: string;
      name: string;
      link: string;
    };
  };
}

export default {
  driver: process.env.WHATSAPP_DRIVER || 'z_api',
  defaults: {
    to: {
      fone: '+5583996394015',
      name: 'Kanbuu - Suporte',
      link: 'aap.kanbuu.com.br/defdffsdfsdfsdfsd',
    },
  },
} as IWhatsAppConfig;
