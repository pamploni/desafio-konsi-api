import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';



@Entity('crawlers')
class Crawlers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  login: string; // são as chaves

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  cpf: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ default: "'ativo'" })
  status: string;


}

export default Crawlers;
