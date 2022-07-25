// declare global {
//   var globalString: string;

//   interface GlobalInterface {
//     value: unknown;
//   }

//   type GlobalType = {
//     value: unknown;
//   };
// }

export {};

import CondoUnity from '@modules/condoUnits/infra/typeorm/entities/CondoUnity';
import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import ViewRelationUsersCondos from '@modules/relationUsersCondos/infra/typeorm/entities/ViewRelationUserCondo';
import Condominium from '@modules/condominiums/infra/typeorm/entities/Condominium';
import CondoServices from '@modules/condoServices/infra/typeorm/entities/CondoServices';

declare global {
  var arrObj: IRequestResident[];

  var arrObjSalao: IRequest[];

  interface IRequestResident {
    phone: string;
    lastState: string;
    whatsAppData: object;
    lastDate: Date;
    opcoes: number;
    menu: string;
    menuArr: string[];
    relations: CondoUnity[];
    lastObjectConversation: IRequestResident;
  }

  interface IObjExtra {
    servicos: CondoServices[];
    dataAtual: Date;
  }

  interface IRequest {
    phone: string;
    lastState: string;
    whatsAppData: object;
    lastDate: Date;
    opcoes: number;
    menu: string;
    menuArr: string[];
    customer: Customers | undefined;
    ecossistema: Condominium | undefined;
    objExtra: IObjExtra;
    lastObjectConversation: IRequest;
  }

  type RequestResidentType = {
    phone: string;
    lastState: string;
    whatsAppData: object;
    lastDate: Date;
    opcoes: number;
    menu: string;
    menuArr: string[];
    relations: CondoUnity[];
    lastObjectConversation: IRequestResident;
  };

  type RequestType = {
    phone: string;
    lastState: string;
    whatsAppData: object;
    lastDate: Date;
    opcoes: number;
    menu: string;
    menuArr: string[];
    customers: Customers | undefined;
    ecossistema: Condominium | undefined;
    objExtra: IObjExtra;
    lastObjectConversation: IRequest;
  };
}

export {};
