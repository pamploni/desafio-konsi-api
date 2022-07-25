import {MigrationInterface, QueryRunner} from "typeorm";

export class migTablesCrawlers1658669224608 implements MigrationInterface {
    name = 'migTablesCrawlers1658669224608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crawlers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying, "password" character varying, "cpf" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT ''ativo'', CONSTRAINT "PK_179c3f770c5e191b94cb4ab6211" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "crawlers"`);
    }

}
