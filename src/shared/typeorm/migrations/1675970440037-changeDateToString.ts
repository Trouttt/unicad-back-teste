import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeDateToString1675970440037 implements MigrationInterface {
  name = 'changeDateToString1675970440037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "deliveries" ADD "date" date NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "deliveries" ADD "date" TIME NOT NULL`,
    );
  }
}
