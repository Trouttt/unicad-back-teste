import { MigrationInterface, QueryRunner } from "typeorm";

export class addCommentTable1671022061322 implements MigrationInterface {
    name = 'addCommentTable1671022061322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user" uuid, "post" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_5cc24bbf4a170c9f2c581d468da" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e5492a8073292e306965b4bc364" FOREIGN KEY ("post") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e5492a8073292e306965b4bc364"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_5cc24bbf4a170c9f2c581d468da"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
