import { getRepository, Repository } from 'typeorm';

import ICrawlersRepository from '@modules/crawlers/repositories/ICrawlersRepository';
import ICreateCrawlersDTO from '@modules/crawlers/dtos/ICreateCrawlersDTO';
import Crawlers from '../entities/Crawlers';

class CrawlersRepository implements ICrawlersRepository {
  private ormRepository: Repository<Crawlers>;

  constructor() {
    this.ormRepository = getRepository(Crawlers);
  }

  public async findById(id: string): Promise<Crawlers | undefined> {
    const subs = await this.ormRepository.findOne(id, {
      where: { status: 'ativo' },
    });

    return subs;
  }
  public async findByCpf(cpf: string): Promise<Crawlers[]> {
    const subs = await this.ormRepository.find({
      where: { status: 'ativo', cpf },
    });

    return subs;
  }

  // public async findAll(): Promise<SubscribeForm[]> {
  //   const subs = await this.ormRepository.find({
  //     relations: ['atletas', 'comissao'],
  //     where: { status: 'ativo' },
  //     order: { nome_responsavel: 'ASC' },
  //   });
  //   return subs;
  // }

  public async newResearch(data: ICreateCrawlersDTO): Promise<Crawlers> {
    const subs = await this.ormRepository.create(data);

    await this.ormRepository.save(subs);

    return subs;
  }

  public async save(subs: Crawlers): Promise<Crawlers> {
    return this.ormRepository.save(subs);
  }
}

export default CrawlersRepository;
