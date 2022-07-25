import Crawlers from '../infra/typeorm/entities/Crawlers';

import ICreateCrawlersDTO from '../dtos/ICreateCrawlersDTO';

export default interface ICrawlersRepository {
  findById(id: string): Promise<Crawlers | undefined>;
  newResearch(data: ICreateCrawlersDTO): Promise<Crawlers>;
  findByCpf(cpf: string): Promise<Crawlers[]>;
  save(subscribeForm: Crawlers): Promise<Crawlers>;


}
